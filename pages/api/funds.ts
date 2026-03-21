import type { NextApiResponse } from 'next';
import { UserRole } from '@prisma/client';
import { prisma } from '../../lib/prisma';
import { AuthenticatedNextApiRequest, withAuth } from '../../lib/auth';

interface CreateFundBody {
  name?: string;
  currency?: string;
}

async function handler(
  req: AuthenticatedNextApiRequest,
  res: NextApiResponse
) {
  try {
    // -----------------------
    // GET - List user funds
    // -----------------------
    if (req.method === 'GET') {
      const funds = await prisma.fund.findMany({
        where: {
          ownerId: req.user.id
        },
        orderBy: {
          createdAt: 'desc'
        },
        include: {
          transactions: {
            orderBy: {
              date: 'desc'
            }
          }
        }
      });

      return res.status(200).json({ funds });
    }

    // -----------------------
    // POST - Create fund
    // -----------------------
    if (req.method === 'POST') {
      const { name, currency } = req.body as CreateFundBody;

      if (!name || !currency) {
        return res
          .status(400)
          .json({ message: 'Name and currency are required' });
      }

      console.log("USER:", req.user);

      const fund = await prisma.fund.create({
        data: {
          name,
          currency,
          ownerId: req.user.sub
        }
      });

      return res.status(201).json({ fund });
    }

    // -----------------------
    // Method not allowed
    // -----------------------
    return res.status(405).json({ message: 'Method not allowed' });

  } catch (error) {
    console.error('Funds API error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export default withAuth(handler, [UserRole.ADMIN, UserRole.GP]);
