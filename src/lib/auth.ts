import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';

// Admin credentials — set ADMIN_USERNAME and ADMIN_PASSWORD_HASH env vars in production.
// ADMIN_PASSWORD_HASH must be a bcrypt hash (e.g. generated with `bcryptjs.hashSync(password, 10)`).
// Defaults are provided only for local development; in production these env vars must be set.
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'Ranjan';

// Accept a pre-hashed password from env to avoid recomputing the hash on startup.
// Fall back to hashing ADMIN_PASSWORD if only the plaintext is provided.
const _adminPasswordHash: string = (() => {
  if (process.env.ADMIN_PASSWORD_HASH) {
    return process.env.ADMIN_PASSWORD_HASH;
  }
  const plaintext = process.env.ADMIN_PASSWORD || 'Ranjan@123';
  return bcrypt.hashSync(plaintext, 10);
})();

// JWT secret (in production, use environment variable)
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'cubbon-jams-secret-key-change-in-production'
);

export interface AuthUser {
  username: string;
  loginTime: number;
}

// Verify admin credentials
export async function verifyCredentials(username: string, password: string): Promise<boolean> {
  if (username !== ADMIN_USERNAME) {
    return false;
  }
  
  return bcrypt.compareSync(password, _adminPasswordHash);
}

// Create JWT token
export async function createToken(user: AuthUser): Promise<string> {
  const token = await new SignJWT({ username: user.username })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(JWT_SECRET);
  
  return token;
}

// Verify JWT token
export async function verifyToken(token: string): Promise<AuthUser | null> {
  try {
    const verified = await jwtVerify(token, JWT_SECRET);
    return {
      username: verified.payload.username as string,
      loginTime: verified.payload.iat || 0,
    };
  } catch (error) {
    return null;
  }
}
