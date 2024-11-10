# Todo List Application

This is a full-stack Todo List application built with a **React frontend** and a **Node.js/Express backend**. It allows users to create, edit, delete, and search through their todos. The application also includes user authentication for secure access to the todo list. It's deployed on **Vercel**, providing users with an easily accessible live version.

## Features
- **User Authentication** (Login/Logout)
- **Create, Edit, and Delete Todos**
- **Search Todos**
- **Filtering** todos based on status

## Project Structure
1. Clone the Repository
Clone the repository to your local machine:
git clone https://github.com/neelbardoliya17/ToDoApp
cd your-repo-name

2. Install Dependencies
Frontend:
Navigate to the frontend directory and install the required dependencies:

cd frontend
npm install
Backend:
Navigate to the backend directory and install the required dependencies:

cd ../backend
npm install

3. Setting Up Environment Variables
Frontend:
In the frontend directory, create a .env file and add the following:

REACT_APP_API_URL=http://localhost:5000/api
Backend:
In the backend directory, create a .env file and add the following:

plaintext
Copy code
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

4. Running the Application Locally
Start the Backend Server:
In the backend directory, run the following command to start the backend server:

npm run dev
The backend server will be available at http://localhost:5000.

Start the Frontend Application:
Open a new terminal, navigate to the frontend directory, and start the frontend:

npm start
The frontend application will be available at http://localhost:3000.

5. Access the Application
Open your browser and go to http://localhost:3000 to use the app.
