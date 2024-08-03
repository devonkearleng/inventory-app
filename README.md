# Inventory Tracker App

An Inventory Tracker App that helps users manage their inventory with user authentication and personalized inventory management. This app is built with React, Firebase, and Firestore, and is deployed on Vercel.

## Features

- User authentication using Firebase.
- Personalized inventory management.
- Real-time database updates with Firestore.
- Deployed on Vercel for seamless and scalable hosting.

## Live Demo

You can view the live demo of the app [here](https://inventory-app-three-pink.vercel.app/).

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js and npm installed. You can download them [here](https://nodejs.org/).
- Firebase project set up with Firestore and Authentication. You can set up a Firebase project [here](https://console.firebase.google.com/).

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Anvesh8712/inventory-tracker-app.git
   cd inventory-tracker-app
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root of the project and add your Firebase configuration:

   ```env
   REACT_APP_FIREBASE_API_KEY=your-api-key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
   REACT_APP_FIREBASE_PROJECT_ID=your-project-id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
   REACT_APP_FIREBASE_APP_ID=your-app-id
   ```

4. Start the development server:

   ```bash
   npm start
   ```

   The app should now be running on `http://localhost:3000`.

## Deployment

This app is deployed using Vercel. Follow these steps to deploy your own version:

1. Install the Vercel CLI:

   ```bash
   npm install -g vercel
   ```

2. Deploy the app:

   ```bash
   vercel
   ```

   Follow the prompts to link your Vercel project and deploy the app.

## Built With

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces.
- [Firebase](https://firebase.google.com/) - A platform developed by Google for creating mobile and web applications.
- [Firestore](https://firebase.google.com/products/firestore) - A flexible, scalable database for mobile, web, and server development from Firebase and Google Cloud Platform.
- [Vercel](https://vercel.com/) - A cloud platform for static sites and Serverless Functions that fits perfectly with your workflow.

## Contributing

Feel free to submit issues and enhancement requests.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -m 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to [Firebase](https://firebase.google.com/) for providing an excellent platform for authentication and database management.
- Thanks to [Vercel](https://vercel.com/) for providing a seamless deployment platform.
