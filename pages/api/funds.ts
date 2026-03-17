import type { NextApiResponse } from 'next';
import { UserRole } from '@prisma/client';
import { prisma } from '../../lib/prisma';
import { AuthenticatedNextApiRequest, withAuth } from '../../lib/auth';

async function handler(req: AuthenticatedNextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const funds = await prisma.fund.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      transactions: {
        orderBy: { date: 'desc' }
      }
    }
  });

  return res.status(200).json({ funds });
}

export default withAuth(handler, [UserRole.ADMIN, UserRole.GP]);
