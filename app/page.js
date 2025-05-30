import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          Post Your Ads Here!
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          The simplest way to create and manage your advertisements. Reach your target audience in minutes.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/create" className="px-8 py-3 bg-[var(--color-mint)] text-black rounded-full font-medium hover:bg-[var(--color-accent)] transition-colors">
            Post an Ad
          </Link>
          <Link href="/ads" className="px-8 py-3 bg-white text-gray-900 rounded-full font-medium border border-gray-200 hover:bg-[var(--color-accent)] transition-colors">
            Browse Ads
          </Link>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-[var(--color-mint)] dark:bg-[var(--color-mint)] rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-black mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already posting their ads and reaching their target audience.
          </p>
          <Link href="/create" className="px-8 py-3 bg-white text-black rounded-full font-medium hover:bg-[var(--color-accent)] transition-colors">
            Create Your First Ad
          </Link>
        </div>
      </div>
    </div>
  );
}
