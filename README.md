# Farrukhbek's Article Website

Farrukhbek's Article Website is a full-stack MERN (MongoDB, Express.js, React, Node.js) application for publishing and managing articles. This website allows users to read, comment on, and share various articles across different categories. 

## Features

- **Responsive Design**: Fully optimized for both desktop and mobile devices.
- **Article Management**: CRUD functionality for articles.
- **User Authentication**: Secure login and registration using JWT.
- **Comments Section**: Readers can add comments to articles.
- **Dynamic Categories**: Articles can be filtered by category.
- **SEO Optimized**: Server-side rendering (SSR) for better search engine visibility.

## Tech Stack

### Frontend
- React
- Axios
- Tailwind CSS (or your preferred CSS framework)

### Backend
- Node.js
- Express.js
- MongoDB (via Mongoose)

### Deployment
- **Frontend**: Vercel/Netlify
- **Backend**: Render/Heroku
- **Database**: MongoDB Atlas

## Installation

### Prerequisites

Ensure you have the following installed on your system:

- Node.js (v14 or later)
- npm or yarn
- MongoDB (local or MongoDB Atlas account)

### Steps to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/Farrukhbek-s-article-website.git
   cd Farrukhbek-s-article-website
   ```

2. Install dependencies for both frontend and backend:
   ```bash
   # Navigate to frontend folder
   cd client
   npm install

   # Navigate to backend folder
   cd ../server
   npm install
   ```

3. Configure Environment Variables:
   - Create a `.env` file in the `server` directory with the following keys:
     ```env
     MONGO_URI=<your-mongodb-connection-string>
     JWT_SECRET=<your-secret-key>
     PORT=5000
     ```

4. Run the backend server:
   ```bash
   cd server
   npm start
   ```

5. Run the frontend:
   ```bash
   cd ../client
   npm start
   ```

6. Open the application:
   - Frontend: `http://localhost:3000`
   - Backend: `http://localhost:5000`

## Folder Structure

```plaintext
Farrukhbek-s-article-website/
├── client/                # Frontend code (React)
│   ├── public/            # Static files
│   ├── src/               # Source code
│       ├── components/    # Reusable components
│       ├── pages/         # Page components
│       ├── App.js         # Main app component
│       └── index.js       # Entry point
├── server/                # Backend code (Node.js + Express.js)
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   ├── controllers/       # Route logic
│   ├── server.js          # Main server file
│   └── package.json       # Backend dependencies
├── README.md              # Project documentation
└── package.json           # Root-level dependencies
```

## API Endpoints

### Public Endpoints
- `GET /api/articles` - Fetch all articles
- `GET /api/articles/:id` - Fetch a single article

### Protected Endpoints
- `POST /api/articles` - Create a new article
- `PUT /api/articles/:id` - Update an existing article
- `DELETE /api/articles/:id` - Delete an article

### User Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get JWT token

## Deployment

1. Deploy the frontend on **Vercel** or **Netlify**.
2. Deploy the backend on **Render**, **Heroku**, or any other Node.js-compatible hosting service.
3. Use **MongoDB Atlas** for the database.

## Contributing

Feel free to fork this repository and contribute to the project by submitting a pull request. Please follow the standard coding practices and include detailed documentation for your changes.

## License

This project is licensed under the [MIT License](LICENSE).
