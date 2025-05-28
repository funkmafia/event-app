import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 text-center py-6 mt-12 text-sm text-gray-600 dark:text-gray-300">
      © {new Date().getFullYear()} AdApp Project. All rights reserved.
    </footer>
  );
};

export default Footer;
