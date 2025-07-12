"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const Error = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center space-y-4 dark:bg-[#1F1F1F]">
      <Image
        src="/run.png"
        height="400"
        width="400"
        alt="error"
        className="block"
      />
      <h2 className="text-xl font-semibold">I think your document ran off!!</h2>
      <h2 className="text-lg font-normal">Something went wrong!</h2>
      <Button asChild>
        <Link href="/documents">Go back</Link>
      </Button>
    </div>
  );
};
export default Error;
