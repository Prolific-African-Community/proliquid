import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserRole } from '@prisma/client';

const JWT_EXPIRES_IN = '1d';

export interface AuthTokenPayload {
  sub: string;
  email: string;
  role: UserRole;
}

export interface AuthenticatedNextApiRequest extends NextApiRequest {
  user: AuthTokenPayload;
}

const getJwtSecret = (): string => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT_SECRET is not configured');
  }

  return secret;
};

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, 12);
};

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

export const signAuthToken = (payload: AuthTokenPayload): string => {
  return jwt.sign(payload, getJwtSecret(), { expiresIn: JWT_EXPIRES_IN });
};

export const verifyAuthToken = (token: string): AuthTokenPayload => {
  return jwt.verify(token, getJwtSecret()) as AuthTokenPayload;
};

const getBearerToken = (req: NextApiRequest): string | null => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  return authHeader.slice(7);
};

export const withAuth = (
  handler: NextApiHandler,
  allowedRoles: UserRole[] = [UserRole.ADMIN, UserRole.GP, UserRole.LP]
): NextApiHandler => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = getBearerToken(req);

    if (!token) {
      return res.status(401).json({ message: 'Authorization token is required' });
    }

    try {
      const payload = verifyAuthToken(token);

      if (!allowedRoles.includes(payload.role)) {
        return res.status(403).json({ message: 'Insufficient permissions' });
      }

      (req as AuthenticatedNextApiRequest).user = payload;

      return handler(req, res);
    } catch {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
  };
};
