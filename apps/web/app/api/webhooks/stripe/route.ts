import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '../../../../../packages/database';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24-preview',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.client_reference_id!;
    const subscriptionId = session.subscription as string;

    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    await prisma.subscription.create({
      data: {
        stripeId: subscriptionId,
        status: subscription.status,
        planId: subscription.items.data[0].price.id,
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        userId: userId,
      },
    });
  }

  return NextResponse.json({ received: true });
}
