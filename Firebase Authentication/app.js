console.log("Starting the script...");

const firebaseConfig = {
  apiKey: "AIzaSyD4beTLPz98ksb_b0_0PghbmwZj4WB-LWk",
  authDomain: "ghw-cloud-f54ff.firebaseapp.com",
  projectId: "ghw-cloud-f54ff",
  storageBucket: "ghw-cloud-f54ff.appspot.com",
  messagingSenderId: "858201405139",
  appId: "1:858201405139:web:e0da6faf999c0ab40ec626",
};

console.log("Firebase configuration:", firebaseConfig);

const express = require("express");
const { initializeApp } = require("firebase/app");
const { getAuth, signInWithEmailAndPassword } = require("firebase/auth");

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const server = express();

server.use(express.static("public"));

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

server.post("/login", (req, res) => {
  const { username, password } = req.body;

  signInWithEmailAndPassword(auth, username, password)
    .then(() => {
      res.send("Login successful");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(
        `Login failed with error code: ${errorCode}, message: ${errorMessage}`
      );
      res.status(500).send(`Login failed: ${errorMessage}`);
    });
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, (err) => {
  if (err) {
    console.error("Error starting the server:", err);
  } else {
    console.log(`Server is running on http://localhost:${PORT}`);
  }
});
