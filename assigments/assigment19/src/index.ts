import "dotenv/config";
import express from "express";
import { connectToDatabase } from "./config/db.config";
import { errorMiddleware } from "./middlewares/error.middleware";
import productRouter from "./routes/product.routes";

const app = express();

const port = Number(process.env.PORT) || 3000;

app.use(express.json());

app.use("/products", productRouter);

app.use(errorMiddleware);

async function startServer(): Promise<void> {
  try {
    await connectToDatabase();

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.log("Could not start server", error);
  }
}

startServer();
