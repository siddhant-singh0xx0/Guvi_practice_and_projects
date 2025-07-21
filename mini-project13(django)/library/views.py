# In library/views.py

from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from django.contrib.auth.decorators import login_required, user_passes_test
from django.utils import timezone
from .forms import RegisterForm, BookForm
from .models import Book, BorrowRecord
from django.db.models import Q # Import Q object for complex lookups

def register(request):
    if request.method == 'POST':
        form = RegisterForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            messages.success(request, f'Account created for {username}!')
            return redirect('login')
    else:
        form = RegisterForm()
    return render(request, 'library/register.html', {'form': form})

# THIS VIEW IS NOW UPDATED TO HANDLE SEARCH
def book_list(request):
    query = request.GET.get('q') # Get the search query from the URL
    if query:
        # Filter books where the title OR author contains the query
        books = Book.objects.filter(
            Q(title__icontains=query) | Q(author__icontains=query)
        ).distinct()
    else:
        books = Book.objects.all() # If no query, show all books
        
    return render(request, 'library/book_list.html', {'books': books, 'query': query})

@login_required
def profile(request):
    borrowed_books = BorrowRecord.objects.filter(user=request.user, return_date__isnull=True)
    return render(request, 'library/profile.html', {'borrowed_books': borrowed_books})

@login_required
def borrow_book(request, book_id):
    book = get_object_or_404(Book, id=book_id)
    if request.method == 'POST':
        if book.available:
            BorrowRecord.objects.create(user=request.user, book=book)
            book.available = False
            book.save()
            messages.success(request, f"You have successfully borrowed '{book.title}'.")
        else:
            messages.error(request, f"Sorry, '{book.title}' is currently unavailable.")
        return redirect('book-list')
    return redirect('book-list')

@login_required
def return_book(request, record_id):
    record = get_object_or_404(BorrowRecord, id=record_id, user=request.user)
    if request.method == 'POST':
        record.book.available = True
        record.book.save()
        record.return_date = timezone.now()
        record.save()
        messages.success(request, f"You have successfully returned '{record.book.title}'.")
        return redirect('profile')
    return redirect('profile')

# --- Staff/Librarian Views ---

def is_staff(user):
    return user.is_staff

@user_passes_test(is_staff)
def manage_books(request):
    books = Book.objects.all()
    return render(request, 'library/manage_books.html', {'books': books})

@user_passes_test(is_staff)
def add_book(request):
    if request.method == 'POST':
        form = BookForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Book added successfully!')
            return redirect('manage-books')
    else:
        form = BookForm()
    return render(request, 'library/book_form.html', {'form': form, 'title': 'Add Book'})

@user_passes_test(is_staff)
def edit_book(request, book_id):
    book = get_object_or_404(Book, id=book_id)
    if request.method == 'POST':
        form = BookForm(request.POST, instance=book)
        if form.is_valid():
            form.save()
            messages.success(request, 'Book updated successfully!')
            return redirect('manage-books')
    else:
        form = BookForm(instance=book)
    return render(request, 'library/book_form.html', {'form': form, 'title': 'Edit Book'})

@user_passes_test(is_staff)
def delete_book(request, book_id):
    book = get_object_or_404(Book, id=book_id)
    if request.method == 'POST':
        book.delete()
        messages.success(request, 'Book deleted successfully!')
        return redirect('manage-books')
    return render(request, 'library/book_confirm_delete.html', {'book': book})

@user_passes_test(is_staff)
def view_borrowed_records(request):
    borrowed_records = BorrowRecord.objects.filter(return_date__isnull=True).select_related('book', 'user')
    return render(request, 'library/view_borrowed_records.html', {'records': borrowed_records})