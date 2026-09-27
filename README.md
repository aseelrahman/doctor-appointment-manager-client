# 🩺 DocTime

DocTime is a full-stack doctor appointment management web application that allows users to browse doctors, view detailed doctor information, book appointments, and manage their bookings through a private dashboard.

## 🌐 Live Website

[Visit DocTime] https://doctor-appointment-manager-client-green.vercel.app/

## ✨ Features

- Browse available doctors and view detailed information including specialty, experience, location, availability, consultation fee, and rating.
- Discover top-rated doctors dynamically based on doctor ratings.
- Secure user registration and login powered by Better Auth.
- Book appointments with doctors through an interactive appointment form.
- Manage appointments from a private user dashboard.
- Update or delete existing appointments securely.
- Manage user profile information including name and profile photo.
- JWT-based authentication between the Next.js application and Express API.
- Search doctors by name to quickly find a specific doctor.
- Responsive design for mobile, tablet, laptop, and desktop devices.
- Dark and light theme support.
- Custom loading, error, and 404 pages for a better user experience.

## 🛠️ Technologies Used

### Frontend

- Next.js
- React
- JavaScript
- Tailwind CSS
- HeroUI
- SwiperJS
- React Icons
- Next Themes

### Backend

- Node.js
- Express.js
- MongoDB
- MongoDB Node.js Driver
- JOSE

### Authentication

- Better Auth
- JWT
- JWKS

### Deployment

- Vercel
- MongoDB Atlas

## 🔐 Authentication & Security

DocTime uses Better Auth for user authentication and JWT tokens for secure communication between the Next.js application and the Express API.

Protected API requests are verified by the Express server using JWKS. User identity is derived from the verified JWT rather than trusting user identity submitted by the client.

Appointment update and delete operations are restricted to appointments belonging to the authenticated user.

## 📱 Responsive Design

DocTime is designed to work across different screen sizes, including mobile, tablet, laptop, and desktop devices.

## 🚀 Run Locally

Clone the repository:

```bash
git clone https://github.com/aseelrahman/doctor-appointment-manager-client.git
```

Navigate to the project directory:

```bash
cd doctor-appointment-manager-client
```

Install dependencies:

```bash
npm install
```

Create a `.env.local` file and add the required environment variables.

Start the development server:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## 👨‍💻 Author

**Aseel Rahman**
