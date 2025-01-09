# AshaTai Backend
![ashaTai-backend](https://socialify.git.ci/vaibhav25-mnnit/ashaTai-frontend/image?font=Raleway&language=1&name=1&owner=1&theme=Dark)

This is the frontend code for an e-commerce website [AshaTai](https://asha-tai.vercel.app/). \
This code provides all the user interface based logic and calling backend apis,for appropriate running of a web app.

## Tech Stack

This project uses the following technologies:

- React
- React Router DOM
- Redux Toolkit
- Tailwind CSS
- Ant Design
- Cashfree Payments
- Firebase
- Flowbite
- AOS
- JSON Server

## Features

- User authentication and authorization using Firebase Authentication and Redux Toolkit.
- Payment integration using Cashfree Payments.
- Responsive design using Tailwind CSS and Flowbite.
- Dynamic data fetching using JSON Server.
- Form validation using React Hook Form.
- Captcha verification using hCaptcha and react-simple-captcha.
- Toast notifications using react-hot-toast.

## Usage

To run the project, follow these steps:

1. Clone the repository to your local machine.
2. Rename the `.env-local` file to `.env` and add the appropriate environment variables.
3. Install the dependencies by running `npm install`.
4. Start the server by running `npm start`.

## Environment Variables

To run the project, you'll need to add the following environment variables to your `.env.local` file:

- `REACT_APP_BACKEND_URL`: The URL of the backend API to use for the app.
- `REACT_FIREBASE_APIKEY`: The API key for your Firebase project.
- `REACT_FIREBASE_AUTHDOMAIN`: The authentication domain for your Firebase project.
- `REACT_FIREBASE_PROJECTID`: The project ID for your Firebase project.
- `REACT_FIREBASE_STORAGEBUCKET`: The storage bucket for your Firebase project.
- `REACT_FIREBASE_MESSAGINGSENDERID`: The messaging sender ID for your Firebase project.
- `REACT_FIREBASE_APPID`: The app ID for your Firebase project.

## License

This project is licensed under the MIT License.
