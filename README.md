# Task Management Web App

A full-stack task management application built with React, Node.js, Express, and MongoDB. Features user authentication, CRUD operations for tasks, search, filtering, and pagination.

## Features

- **Authentication**: Secure user registration and login with JWT tokens
- **Task Management**: Create, read, update, and delete tasks
- **Search & Filter**: Search tasks by title/description and filter by status
- **Pagination**: Efficient task loading with pagination
- **Responsive Design**: Clean and minimal UI with TailwindCSS
- **User Isolation**: Users can only access their own tasks

## Tech Stack

### Backend
- Node.js & Express
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- express-validator for input validation

### Frontend
- React 18
- React Router for navigation
- Axios for API calls
- TailwindCSS for styling
- Context API for state management

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone or download the project**
   ```bash
   cd task-management-app
   ```

2. **Install dependencies for all parts**
   ```bash
   npm run install-all
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the `server` directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/taskmanager
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   PORT=5000
   ```

4. **Start MongoDB**
   
   Make sure MongoDB is running on your system. If using MongoDB Atlas, update the `MONGODB_URI` in your `.env` file.

5. **Run the application**
   
   Start both frontend and backend:
   ```bash
   npm run dev
   ```
   
   Or start them separately:
   ```bash
   # Terminal 1 - Backend
   npm run server
   
   # Terminal 2 - Frontend
   npm run client
   ```

6. **Access the application**
   
   - Frontend: http://localhost:3000
   - Backend API: https://task-management-iota-sandy.vercel.app/

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Tasks
- `GET /api/tasks` - Get user's tasks (with search, filter, pagination)
- `GET /api/tasks/:id` - Get a specific task
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## Usage

1. **Register**: Create a new account with email and password
2. **Login**: Sign in with your credentials
3. **Dashboard**: View all your tasks with search and filter options
4. **Create Task**: Click "New Task" to create a new task
5. **Edit Task**: Click "Edit" on any task to modify it
6. **Delete Task**: Click "Delete" to remove a task
7. **Toggle Status**: Mark tasks as pending or done

## Project Structure

```
task-management-app/
├── server/                 # Backend
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── middleware/        # Custom middleware
│   ├── index.js           # Server entry point
│   └── package.json
├── client/                # Frontend
│   ├── public/            # Static files
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── contexts/      # React contexts
│   │   ├── App.js        # Main app component
│   │   └── index.js      # Entry point
│   └── package.json
└── package.json           # Root package.json
```

## Security Features

- Password hashing with bcryptjs
- JWT token-based authentication
- Input validation and sanitization
- User isolation (users can only access their own data)
- CORS configuration

## Development

- The backend runs on port 5000
- The frontend runs on port 3000
- Hot reloading is enabled for both frontend and backend
- MongoDB connection is configured for local development

## Production Deployment

For production deployment:

1. Set secure environment variables
2. Use a production MongoDB instance
3. Build the React app: `npm run build`
4. Serve the built files with a web server
5. Deploy the backend to a cloud service

## License

MIT License
