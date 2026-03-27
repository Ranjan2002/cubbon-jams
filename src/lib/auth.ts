import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';

// Admin credentials (in production, store in database)
const ADMIN_USERNAME = 'Ranjan';
const ADMIN_PASSWORD_HASH = bcrypt.hashSync('Ranjan@123', 10);

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
  
  return bcrypt.compareSync(password, ADMIN_PASSWORD_HASH);
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
