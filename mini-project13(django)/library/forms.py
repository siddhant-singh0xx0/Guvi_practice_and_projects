# In library/forms.py

from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from django import forms # Import the forms module
from .models import Book # Import the Book model

# Keep the existing RegisterForm
class RegisterForm(UserCreationForm):
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email']

# Add this new form for adding and editing books
class BookForm(forms.ModelForm):
    class Meta:
        model = Book
        fields = ['title', 'author', 'isbn', 'available']