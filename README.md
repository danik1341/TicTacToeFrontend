---

# Tic-Tac-Toe Game Frontend

## Project Overview

This repository contains the frontend code for a Tic-Tac-Toe game application, designed as part of a full-stack project. The application enables users to play Tic-Tac-Toe against an artificially intelligent bot with adjustable difficulty levels. It is built using TypeScript, Next.js, and App Router, with a focus on creating an engaging and responsive user interface.

## Technologies

- **TypeScript:** For adding static type definitions to JavaScript, enhancing development and maintainability.
- **Next.js:** A React framework for server-side rendering, static site generation, and building web applications.
- **App Router:** For handling routing in our Next.js application.
- **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
- **MUI:**: A UI framework for built in UI components.
- **Redux + Toolkit:** For state management, using the Redux Toolkit to simplify boilerplate.
- **React Query + Axios:** For fetching, caching, and updating data in React applications using Axios for HTTP requests.
- **React Hook Form + Joi:** For efficient and easy form handling with validation using Joi.

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

- Node.js (LTS version recommended)
- npm

  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo

   ```sh
   git clone https://github.com/danik1341/TicTacToeFrontend.git
   ```

2. Install NPM packages

   ```sh
   cd tic-tac-toe-frontend
   npm install
   ```

3. Start the development server

   ```sh
   npm run dev
   ```

   Visit `http://localhost:3000` to view the application.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env.local file:

- `NEXT_PUBLIC_API_URL` - URL to your backend API.

## Features

- **Login Page:** Users can login using their email. Authentication is simulated; no actual user data is stored except an email address which you can use a mock address.
- **Gameplay Interface:** After login, users can select the AI difficulty level (Easy, Medium, Hard) and play Tic-Tac-Toe against the AI bot.
- **State Management:** Utilizes Redux Toolkit for state management, ensuring a seamless gameplay experience.
- **Responsive Design:** Built with Tailwind CSS and MUI, the UI is fully responsive and provides an excellent user experience on both desktop and mobile devices.
- **Form Validation:** Utilizes React Hook Form along with Joi for efficient form handling and validation.

## Building and Deployment

To build the application for production, run:

```sh
npm run build
```

To deploy, consider using Vercel (recommended for Next.js applications), Netlify, or any other hosting service that supports Node.js.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---
