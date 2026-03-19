import { useSession } from 'next-auth/react';
import { signIn, signOut } from 'next-auth/react';
import Stripe from 'stripe';

export default function Dashboard() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div>
        <h1>Welcome to Team Spancerski</h1>
        <button onClick={() => signIn('google')}>Login with Google</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Welcome, {session.user?.name}</h1>
      <button onClick={() => signOut()}>Logout</button>
      <h2>Subscription Plans</h2>
      <ul>
        <li>Annual Plan: R$1199</li>
        <li>Quarterly Plan: R$349</li>
      </ul>
    </div>
  );
}