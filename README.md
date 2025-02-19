# Loan Management Application

A web application built with Next.js, Tailwind CSS, shadcn/ui, and Prisma for managing loans. This application allows users to create, view, update, and delete loans efficiently and effortlessly.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [License](#license)

## Features

- **CRUD Operations**: Create, Read, Update, and Delete loans.
- **Responsive Design**: Built with Tailwind CSS for a modern and responsive UI.
- **User-Friendly Interface**: Intuitive navigation and user experience.

## Technologies Used

- **Next.js**: A React framework for server-side rendering and static site generation.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **shadcn/ui**: A collection of UI components for React.
- **Prisma**: An ORM for database interactions.
- **PostgreSQL**: A relational database for storing loan data.

## Getting Started

### Prerequisites

- Node.js (version 14 or later)
- PostgreSQL (installed and running)

### Installation

1. Clone the repository:
   
   ```bash
   git clone <your-repo-url>
   cd loan-management-app
   ```

2. Install dependencies:
   
   ```bash
   npm install
   ```

3. Set up the database:
   
   - Create a PostgreSQL database named `loan_management`.
   - Update the `.env` file with your database connection string:
     
     ```env
     DATABASE_URL="postgresql://admin:admin@localhost:5432/loan_management?schema=public"
     ```

4. Run database migrations:
   
   ```bash
   npx prisma migrate dev --name init
   ```

5. Start the development server:
   
   ```bash
   npm run dev
   ```

6. Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

## Usage

- **Home Page**: View a welcoming message and navigate to the loans page.
- **Loan List Page**: View all loans, create new loans, edit existing loans, and delete loans.
- **Loan Form Page**: Fill out a form to create or edit loan details.

## API Endpoints

- **GET** `/api/loans`: Fetch all loans.
- **GET** `/api/loans?id={id}`: Fetch a specific loan by ID.
- **POST** `/api/loans`: Create a new loan.
- **PUT** `/api/loans`: Update an existing loan.
- **DELETE** `/api/loans?id={id}`: Delete a loan by ID.

## License

This project is licensed under the MIT License.
