const path = require('path');
import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import csurf from 'csurf';
require('dotenv').config();

import AuthRoutes from './routes/authRoutes';
import UserRoutes from './routes/userRoutes';
import { requireAuth } from './middleware/authMiddleware';
import ApiErrorHandler from './error/ApiErrorHandler';
import connectDB from './config/db';

const app = express();
const port = process.env.PORT || 8080;

// middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());
const csrfProtection = csurf({
  cookie: {
    httpOnly: true
  }
});

// db connection
connectDB();

// routes
app.use("/api", AuthRoutes);

app.use(csrfProtection);
app.get('/api/csrf-token', (req: Request, res: Response) => {
  //@ts-ignore
  res.json({ csrfToken: req.csrfToken() })
});
app.use("/api/user", requireAuth, UserRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use("/", express.static(path.join(__dirname, 'client', 'build')));

  app.get('*', async (req: Request, res: Response) =>
    res.sendFile(
      path.resolve(__dirname, 'client', 'build', 'index.html')
    )
  );
}

// Error Handler
app.use(ApiErrorHandler);

// Start Server
app.listen(port, function () {
  console.log("\x1b[36m%s\x1b[0m", "Server up and running on port:", port);
});