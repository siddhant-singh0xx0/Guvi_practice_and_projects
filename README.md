# **Library Management System**

This is a full-stack web application for managing a library, built with Python and Django. It provides a clean, modern interface for both users and librarians to manage book borrowing and inventory.

## **Features**

* **User Management:** Secure user registration, login, and logout functionality.  
* **Book Catalog:** A public-facing page where users can view and search for all available books.  
* **Borrowing System:** Authenticated users can borrow available books and return them.  
* **User Profiles:** A personal dashboard for users to view their currently borrowed books.  
* **Librarian Admin Panel:** A secure area for staff users with special privileges:  
  * Add, edit, and delete books from the inventory.  
  * View a comprehensive list of all currently issued books and who borrowed them.

## **Technology Stack**

* **Backend:** Python, Django  
* **Frontend:** HTML, CSS, JavaScript  
* **Database:** MySQL

## **Prerequisites**

Before you begin, ensure you have the following installed on your system:

* Python (3.8 or newer)  
* pip (Python package installer)  
* Git (for cloning the repository)  
* MySQL Server

## **Setup and Installation**

Follow these steps to get your local development environment set up and running.

#### **1\. Clone the Repository**

Open your terminal and clone the project repository.

git clone \<your-repository-url\>  
cd \<project-folder-name\>

#### **2\. Create and Activate a Virtual Environment**

It is a best practice to use a virtual environment to keep project dependencies isolated.

* **On Windows:**  
  python \-m venv venv  
  venv\\Scripts\\activate

* **On macOS and Linux:**  
  python \-m venv venv  
  source venv/bin/activate

#### **3\. Install Dependencies**

Install all the required Python packages using the requirements.txt file.

pip install \-r requirements.txt

*(Note:* If a requirements.txt file is not available, you can *create one with pip freeze \> requirements.txt after installing the packages below.)*

pip install django mysqlclient

#### **4\. Configure the Database**

* Log in to your MySQL server and create a new database for this project.  
  CREATE DATABASE library\_db;

* Rename the .env.example file to .env (if provided) or open library\_system/settings.py.  
* Update the DATABASES configuration with your MySQL credentials.  
  \# In library\_system/settings.py  
  DATABASES \= {  
      'default': {  
          'ENGINE': 'django.db.backends.mysql',  
          'NAME': 'library\_db',        \# The name of the database you created  
          'USER': 'your\_mysql\_username',  
          'PASSWORD': 'your\_mysql\_password',  
          'HOST': 'localhost',         \# Or '127.0.0.1'  
          'PORT': '3306',  
      }  
  }

#### **5\. Apply Database Migrations**

This command will set up the necessary tables in your database.

python manage.py migrate

#### **6\. Create a Superuser**

This creates an admin account that can access all parts of the site, including the Django admin panel.

python manage.py createsuperuser

Follow the prompts to set a username, email, and password.

## **Running the Application**

Once the setup is complete, start the Django development server:

python manage.py runserver

The application will be running and accessible at **http://127.0.0.1:8000/**.

## **How to Use the Application**

1. **Register and Log In:** Navigate to the site and create a user account or log in if you already have one.  
2. **Borrow Books:** As a logged-in user, you can browse the catalog and borrow available books.  
3. **Manage Your Profile:** Visit your profile page to see the books you have currently borrowed and return them.  
4. **Librarian Access:**  
   * To gain librarian privileges, log in to the Django admin panel at http://127.0.0.1:8000/admin/ with your superuser account.  
   * Navigate to "Users", select your user account, and check the **"Staff status"** box under the "Permissions" section.  
   * Save the changes. Now, when you log in to the main site, you will see the "Manage Books" and "Issued Books" links in the navigation bar.