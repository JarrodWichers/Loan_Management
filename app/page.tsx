import Image from "next/image";
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-100 animate-slideIn">
      <h1 className="text-4xl font-bold mb-4 animate-bounce">Welcome to the Loan Management App!</h1>
      <p className="text-lg mb-8 text-center">
        Manage your loans efficiently and effortlessly. Get started by clicking the button below.
      </p>
      <Button className="text-white hover:bg-blue-600 transition duration-300">
        <a href="/loans">Get Started</a>
      </Button>
      <div className="mt-8">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
      </div>
    </div>
  );
}
