import express from "express";
import cors from "cors";
import { serve } from "inngest/express";

import { inngest, functions } from "./lib/inngest.js";
import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: ENV.CLIENT_URL || "*",
    credentials: true,
  })
);

await connectDB();

app.use("/api/inngest", serve({ client: inngest, functions }));

app.get("/", (req, res) => {
  res.status(200).json({
    msg: "Backend running successfully",
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    msg: "API is healthy",
  });
});

export default app;

