# In library/urls.py

from django.urls import path
from django.contrib.auth import views as auth_views
from . import views

urlpatterns = [
    # --- User-facing URLs ---
    path('', views.book_list, name='book-list'),
    path('register/', views.register, name='register'),
    path('login/', auth_views.LoginView.as_view(template_name='library/login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(template_name='library/logout.html'), name='logout'),
    path('profile/', views.profile, name='profile'),
    path('borrow/<int:book_id>/', views.borrow_book, name='borrow-book'),
    path('return/<int:record_id>/', views.return_book, name='return-book'),
    
    # --- Staff/Librarian URLs ---
    path('manage/', views.manage_books, name='manage-books'),
    path('manage/add/', views.add_book, name='add-book'),
    path('manage/edit/<int:book_id>/', views.edit_book, name='edit-book'),
    path('manage/delete/<int:book_id>/', views.delete_book, name='delete-book'),
    path('manage/borrowed/', views.view_borrowed_records, name='view-borrowed-records'),
]