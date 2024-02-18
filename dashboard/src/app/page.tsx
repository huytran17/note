"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="link-list">
        <div className="link-item">
          <Link href="/list">List</Link>
        </div>
        <div className="link-item">
          <Link href="/create">Create</Link>
        </div>
      </div>
    </main>
  );
}
