"use client";
import React from "react";
import Link from "next/link";
import { ApiClient } from "@/apiClient/apiClient";

const Nav = () => {
  const handleLogout = async () => {
      const apiClient = new ApiClient();
      await apiClient.logout();
      }
  return (
    
    <nav className="bg-[var(--color-mint)] text-black py-4 px-8 flex justify-between items-center shadow-md">
      <Link href="/" className="text-3xl font-bold text-[var(--color-primary)]">
        SoundSide
      </Link>
      <div className="space-x-8">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <Link href="/create" className="hover:underline">
          Create
        </Link>
        <Link href="/register" className="hover:underline">
          Register
        </Link>
        <Link href="/user" className="hover:underline">
          Login
        </Link>
         <button onClick={handleLogout} className="text-black bg-[var(--color-bg-light)] rounded-md hover:bg-[var(--color-accent)] transition-colors">Logout</button>
      </div>
    </nav>
  );
};

export default Nav;
