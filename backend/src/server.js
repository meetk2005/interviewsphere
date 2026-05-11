import express from "express";
import cors from "cors";
import { serve } from "inngest/express";
import { clerkMiddleware } from '@clerk/express'

import { inngest, functions } from "./lib/inngest.js";
import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
// import { protectRoute } from "./middleware/protectRoute.js";
import chatRoutes from "./routes/chatRoutes.js"
import sessionRoutes from "./routes/sessionRoutes.js"


const app = express();

app.use(express.json());

app.use(
  cors({
    origin: ENV.CLIENT_URL || "*",
    credentials: true,
  })
);
app.use(clerkMiddleware());

await connectDB();

app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat",chatRoutes)
app.use("/api/sessions",sessionRoutes)

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


//when you pass an array of middleware to Express, it automatically flattens and executes
//them sequentially ,one by one

// app.get("/video-calls",protectRoute, (req, res) => {
//   res.status(200).json({
//     msg: "This is protected route",
//   });
// });

export default app;

