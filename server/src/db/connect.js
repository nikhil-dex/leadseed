/**
 * MongoDB connection with error handling for DNS/SRV and network issues.
 */
import mongoose from 'mongoose';
import { env } from '../config/env.js';
import { User } from '../models/User.js';

const isSrvDnsError = (err) =>
  err.code === 'ENOTFOUND' ||
  err.code === 'ETIMEDOUT' ||
  (err.message && /querySrv|getaddrinfo|ENOTFOUND/i.test(err.message));

function formatSrvHint() {
  return [
    'If you see querySrv ENOTFOUND, DNS cannot resolve the Atlas SRV hostname.',
    'Switch to the standard connection string:',
    '  1. In Atlas: Cluster → Connect → "Drivers" → copy the connection string.',
    '  2. Choose "Connect your application" and look for the option to use a standard (non-SRV) connection string, e.g.:',
    '     mongodb://user:pass@cluster0-shard-00-00.xxxxx.mongodb.net:27017,cluster0-shard-00-01.xxxxx.mongodb.net:27017,.../dbname?ssl=true&replicaSet=atlas-xxx&authSource=admin',
    '  3. Set MONGODB_URI in server/.env to that string (no mongodb+srv://).',
  ].join('\n');
}

export async function connectDb() {
  try {
    await mongoose.connect(env.mongodbUri);
    console.log('MongoDB connected');
    // Drop indexes that are no longer in the schema (e.g. old unique email_1) to avoid E11000 on upsert
    await User.syncIndexes();
  } catch (err) {
    console.error('MongoDB connection error:', err.message);

    if (isSrvDnsError(err)) {
      console.error('\n' + formatSrvHint());
    }

    throw err;
  }
}
