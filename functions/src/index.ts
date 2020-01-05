import * as functions from 'firebase-functions';
import * as cors from "cors";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

const corsMiddleware = cors({
  origin: true,
});

// borrowing some of: https://github.com/firebase/functions-samples/blob/master/quickstarts/time-server/functions/index.js#L59
// for cors
export const helloWorld = functions.https.onRequest((request, response) => {
  return corsMiddleware(request, response, () => {
    response.json({"data": "Hello from Firebase!"});
  });
 
});
