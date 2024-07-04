# Project Management Tool

## Description

This Project Management Tool is a robust and efficient platform built using the MERN stack (MongoDB, Express.js, React, and Node.js) designed to streamline project management tasks. Whether you're a small team or a large enterprise, this tool offers a comprehensive solution for planning, tracking, and collaborating on projects, ensuring efficient workflow and productivity.

## Features

- **User Authentication**: Secure login and registration system to protect user data.
- **Dashboard**: An intuitive dashboard providing an overview of all projects, tasks, and progress.
- **Task Management**: Create, assign, and track tasks with detailed descriptions and due dates.
- **Status Boards**: Visual boards to manage tasks in different stages like backlog, to-do, in-progress, and done.
- **Analytics**: Detailed analytics and reporting features to track project progress and team performance.
- **Settings**: Customizable settings to manage user profiles and preferences.
- **Shared Links**: Share project updates and tasks with external stakeholders securely.
- **Mobile-Friendly**: Responsive design ensuring usability on all devices.

## Technology Stack

- **MongoDB**: Database to store user data, project details, and task information.
- **Express.js**: Backend framework to build the server-side logic and APIs.
- **React**: Frontend library to build an interactive and dynamic user interface.
- **Node.js**: JavaScript runtime for executing backend logic.

## Installation

To get started with this Project Management Tool, follow these steps:

1. **Clone the Repository**
   ```bash
   git clone https://github.com/samyak-aditya/Project_Management_Tool.git
   cd Project-Management-Tool
   ```

2. **Install Dependencies**
   ```bash
   cd frontend
   npm install
   cd backend
   npm install
   cd ..
   ```

3. **Setup Environment Variables**
   Create a `.env` file in the root directory and add the following variables:
   ```env
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```

4. **Run the Application**
   ```bash
   cd frontend
   npm start
   cd backend
   npm run dev
   ```

## Usage

Once the application is running, you can access it at `http://localhost:3000` and start managing your projects efficiently. Use the login credentials you set up during registration to access your dashboard and start exploring the features.

