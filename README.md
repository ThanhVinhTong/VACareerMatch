# VACareerMatch

VACareerMatch is a networking platform designed to foster meaningful professional connections within the Vietnamese-Australian tech community. Developed for the 2025 VAIT (Vietnamese Aussies in IT) application building contest, the platform aims to support mentorship, collaboration, and peer discovery among participants.

## Project Overview

The application features an intuitive swipe-based interface that matches users based on shared career goals and interests. By leveraging modern web technologies, VACareerMatch enables users to connect for mentorship, project collaboration, and networking opportunities tailored to the Vietnamese-Australian IT community.

## Features
- Swipe-based user matching for easy networking
- Profile creation and interest selection
- Real-time messaging and chat
- Support for mentorship and collaboration

## Technology Stack
- **Frontend:** React.js, TailwindCSS, HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MongoDB

## Recognition
VACareerMatch was honored with the “Out of the Box” Award at the VAIT contest, recognizing its creative frontend design and innovative feature set. You can view the official award certificate [here](https://github.com/ThanhVinhTong/Certificates/blob/main/VAIT%20Hackathon%20Award/thanhvinhtong_vait_hackathon_2025_out_of_the_box.pdf).

## Getting Started

### Prerequisites
- Node.js (v16 or higher recommended)
- npm (comes with Node.js)
- MongoDB (local or cloud instance)

### Database Setup

You can use either a local MongoDB instance or a cloud-based solution like MongoDB Atlas.

#### Local Installation
- Download MongoDB Community Server from the [official website](https://www.mongodb.com/try/download/community).
- Follow the installation instructions for your operating system.
- Start the MongoDB server (usually with `mongod` or via the MongoDB Compass app).

#### MongoDB Atlas (Cloud)
- Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and sign up for a free account.
- Create a new cluster and database.
- Whitelist your IP address and create a database user with a password.
- Copy the provided connection string (it will look like `mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority`).

#### Configuring the Database Connection

1. In the `api/` directory, create a `.env` file if it doesn't exist.
2. Add the following line to your `.env` file, replacing the placeholder with your actual connection string:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   ```
   - For local MongoDB, it might look like:
     ```env
     MONGODB_URI=mongodb://localhost:27017/vacareermatch
     ```
   - For Atlas, use the string provided by the Atlas dashboard.
3. Save the file. The backend will use this variable to connect to your database.

> **Note:** Never commit your `.env` file or sensitive credentials to version control.

### Backend Setup
1. Navigate to the backend directory:
   ```sh
   cd api
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the `api/` directory with the required environment variables (e.g., database URI, JWT secret, Cloudinary credentials).
4. Start the backend server:
   ```sh
   npm start
   ```
   or for development with hot reload:
   ```sh
   npm run dev
   ```

### Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   ```sh
   cd client
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend development server:
   ```sh
   npm run dev
   ```
   The app will typically be available at `http://localhost:5173`.

## Usage
- Register or sign in to create your profile.
- Swipe to discover and match with other users based on shared interests and career goals.
- Use the chat feature to connect, collaborate, or seek mentorship.

## Contributing
Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes and push to your fork.
4. Open a pull request describing your changes.

## License
This project is for educational and contest purposes. For more details, see the repository or contact the maintainers.