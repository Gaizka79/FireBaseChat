const fbApiKey = process.env.REACT_APP_FB_APIKEY;
const fbAuthDomain = process.env.REACT_APP_FB_AUTHDOMAIN;
const fbProjectId = process.env.REACT_APP_FB_PROJECTID;
const fbStorage = process.env.REACT_APP_FB_STORAGEBUCKET;
const fbMessage = process.env.REACT_APP_FB_MESSAGINGSENDERID;
const fbAppId = process.env.REACT_APP_FB_APPID;
const fbMeasurementId = process.env.REACT_APP_FB_MEASUREMENTID;

const firebaseConfig = {
  apiKey: fbApiKey,
  authDomain: fbAuthDomain,
  projectId: fbProjectId,
  storageBucket: fbStorage,
  messagingSenderId: fbMessage,
  appId: fbAppId,
  measurementId: fbMeasurementId
};

export default firebaseConfig; 