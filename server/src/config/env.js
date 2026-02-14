/**
 * Environment configuration.
 * Centralizes all env vars for the backend.
 */
import dotenv from 'dotenv';

dotenv.config();

export const env = {
  port: parseInt(process.env.PORT || '4000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || 'dev-secret-change-me',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/leadseed',
  linkedin: {
    clientId: process.env.LINKEDIN_CLIENT_ID || '',
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET || '',
    callbackUrl: process.env.LINKEDIN_CALLBACK_URL || 'http://localhost:4000/auth/linkedin/callback',
  },
  dashboardUrl: process.env.DASHBOARD_URL || 'http://localhost:3000',
};
