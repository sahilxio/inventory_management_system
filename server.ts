import "dotenv/config";
import { connectDB } from "./src/config/db";
import { app } from "./src/app";

const PORT = process.env.PORT || 5000;

async function startServer() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
  });
}

startServer();
