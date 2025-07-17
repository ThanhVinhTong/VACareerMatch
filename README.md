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