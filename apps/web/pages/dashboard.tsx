"use client";

import { useSession, signIn, signOut } from 'next-auth/react';

export const dynamic = "force-dynamic";

export default function Dashboard() {
  const sessionData = useSession(); const session = sessionData?.data;

  if (session) {
    return (
      <>
        <p>Signed in as {session.user?.email}</p>
        <button onClick={() => signOut()}>Sign out</button>
        <p>TeamSpancerski Dashboard</p>
      </>
    );
  }

  return (
    <>
      <p>Not signed in</p>
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
