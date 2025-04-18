import express from "express";
import dotenv from "dotenv";
import dbConnect from "./db.js";
import route from "./routes/users.route.js";

dotenv.config(); // dotenv
const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dbConnect().then(() => {
  app.listen(PORT, () => {
    `server has started succesfully at http://localhost:${PORT}`;
  });
  app.on("error", (error) => {
    console.log("Error: ", error);
    throw error;
  });
});

app.use("/api", route);
