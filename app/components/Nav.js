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
    
    <nav className="bg-blue-600 text-white py-4 px-8 flex justify-between items-center shadow-md">
      <Link href="/" className="text-xl font-bold">
        Project Title
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
         <button onClick={handleLogout} className="text-black bg-blue-400 rounded-md hover:bg-white">Logout</button>
      </div>
    </nav>
  );
};

export default Nav;
