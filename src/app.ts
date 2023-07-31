/**
 * Required External Modules
 */
import * as dontenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import users_router from "./users/users_router";
// import wishlist_router from "./wishlist/wishlist_router";

dontenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/users", users_router);
// app.use("/wishlist", wishlist_router);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
