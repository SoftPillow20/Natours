import { configDotenv } from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
configDotenv({ path: path.join(__dirname, "config.env") });

import mongoose from "mongoose";

const { default: app } = await import("./app.js");

app.set("query parser", "extended");

await mongoose.connect(process.env.DATABASE);

// 4) START SERVER
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

// handling unhandled rejections
// each time that there is an unhandled rejection somewhere in our application
// the process object will emit an object called **unhandled rejection**
process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLER REJECTION! shutting down...");
  process.exit(1);
});
