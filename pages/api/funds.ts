import type { NextApiResponse } from 'next';
import { UserRole } from '@prisma/client';
import { prisma } from '../../lib/prisma';
import { AuthenticatedNextApiRequest, withAuth } from '../../lib/auth';

interface CreateFundBody {
  name?: string;
  currency?: string;
}

async function handler(req: AuthenticatedNextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
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

  if (req.method === 'POST') {
    const { name, currency } = req.body as CreateFundBody;

    if (!name || !currency) {
      return res.status(400).json({ message: 'Name and currency are required' });
    }

    const fund = await prisma.fund.create({
      data: {
        name,
        currency
      }
    });

    return res.status(201).json({ fund });
  }

  return res.status(405).json({ message: 'Method not allowed' });
}

export default withAuth(handler, [UserRole.ADMIN, UserRole.GP]);
