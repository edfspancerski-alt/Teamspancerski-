import { NextApiRequest, NextApiResponse } from 'next';
import stripe from '../../../lib/stripe';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const prices = await stripe.prices.list({
        lookup_keys: ['annual', 'quarterly'],
      });

      res.status(200).json(prices);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro interno';
      res.status(500).json({ error: errorMessage });
    }
  } else {
    res.setHeader('Allow', 'GET');
    res.status(405).end('Method Not Allowed');
  }
}
