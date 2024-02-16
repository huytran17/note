"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Link href="/list">List</Link>
      <Link href="/create">Create</Link>
    </main>
  );
}
