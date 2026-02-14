/**
 * Leadseed API server.
 * Express + MongoDB + JWT + LinkedIn OAuth. Task engine is extension-driven.
 */
import express from 'express';
import cors from 'cors';
import { env } from './config/env.js';
import { connectDb } from './db/connect.js';
import authRoutes from './routes/auth.js';
import taskRoutes from './routes/tasks.js';
import leadRoutes from './routes/leads.js';

const app = express();

// Allow dashboard and Chrome extension origins (extension uses host_permissions to call API)
function corsOrigin(origin, callback) {
  const allowed =
    !origin ||
    origin === env.dashboardUrl ||
    (typeof origin === 'string' && origin.startsWith('chrome-extension://'));
  callback(null, allowed);
}
app.use(cors({ origin: corsOrigin, credentials: true }));
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);
app.use('/leads', leadRoutes);

app.get('/health', (req, res) => res.json({ ok: true }));

async function start() {
  await connectDb();
  app.listen(env.port, () => {
    console.log(`Server running at http://localhost:${env.port}`);
  });
}

start().catch((err) => {
  console.error('Startup error:', err);
  process.exit(1);
});
