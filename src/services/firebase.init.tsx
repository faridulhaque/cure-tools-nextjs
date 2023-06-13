import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
require("dotenv").config();


const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const authDomain = process.env.NEXT_PUBLIC_AUTH_DOMAIN;
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
const storageBucket = process.env.NEXT_PUBLIC_STORAGE_BUCKET;
const messagingSenderId = process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID;
const appId = process.env.NEXT_PUBLIC_APP_ID;




const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
