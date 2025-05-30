import React from "react";
import Link from "next/link";

const Nav = () => {
  return (
    <nav className="bg-blue-600 text-white py-4 px-8 flex justify-between items-center shadow-md">
      <Link href="/" className="text-xl font-bold">
        Project Title
      </Link>
      <div className="space-x-6">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <Link href="/register" className="hover:underline">
          Register
        </Link>
        <Link href="/user" className="hover:underline">
          Login
        </Link>
      
      </div>
    </nav>
  );
};

export default Nav;
