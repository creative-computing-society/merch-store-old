# Merch Store

Portal for distributing Creative Computing Scoiety merch to society members. 

## Tech Stack

**Client:** ReactJs

**Server:** Python, Django-Rest-Framework

**Database:** PostgreSQL

## Run Locally

Clone the project

```bash
  git clone https://github.com/creative-computing-society/merch-store.git
```

### To start the backend server 

Go to the project directory

```bash
  cd backend/config
```

We recommend you to use virtual environment

```bash
  python -m venv env
```

Activate virtual environment

&emsp;&emsp;For Windows PowerShell

```bash
    env/Scripts/activate.ps1
```

&emsp;&emsp;For Linux and MacOS

```bash
    source env/bin/activate
```

Install dependencies

```bash
  pip install -r requirements.txt
```

Create ```.env``` file in project's root directory(base directory), and add _SECURITY_KEY_, _EMAIL_HOST_USER_, and _EMAIL_HOST_PASSWORD_

Run Migrations

```
 python manage.py makemigrations
```

```
 python manage.py migrate
```

Start the server

```bash
  python manage.py runserver
```

## Endpoints

- auth/login/ - Login
- auth/logout/ - Logout
- auth/change-password/ - change password
- auth/user/ - get user details
- order/all/ - get all user orders
- order/initiate/ - intitate an order
- order/place/ - place an order
- order/<order-id>/- get order details
- product/all/ - all products
- product/<product_id>/ - product details
- cart/add/ - add to cart
- cart/view/ - view cart
- cart/delete/ - delete cart item



