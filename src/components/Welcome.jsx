'use client'
import { signOut } from 'next-auth/react';

export default function Welcome() {

  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-semibold mb-4">Welcome to Next Auth</h1>
      <button
        onClick={() => signOut({ callbackUrl: '/login' })}
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Sign Out
      </button>
    </div>
  );
}