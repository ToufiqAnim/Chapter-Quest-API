import { Server } from "http";
import mongoose from "mongoose";
import config from "./app/config";
import app from "./app";

let server: Server;

async function bookCatalog() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log("Database Connected Successfully");

    server = app.listen(config.port, () => {
      console.log(`App listening on port ${config.port}`);
    });
  } catch (error) {
    console.log("failed to connect database", error);
  }
}
bookCatalog();
