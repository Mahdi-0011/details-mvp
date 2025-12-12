"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();


  return (
    <div style={{ padding: 50, fontFamily: "Arial", textAlign: "center" }}>
      <h1>Azure AD Login</h1>

      {!session && status !== "loading" && (
        <>
          <p>Please log in.</p>
          <button
            onClick={() => signIn("azure-ad")}
            className="border border-blue-500 bg-blue-100"
          >
            Login
          </button>
        </>
      )}

      {session && (
        <>
          <p>Welcome, {session.user?.name}!</p>
          <button onClick={() => signOut()}>Logout</button>
        </>
      )}
    </div>
  );
}
