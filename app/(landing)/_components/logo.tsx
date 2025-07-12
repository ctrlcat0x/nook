import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const Logo = () => {
  return (
    <div className="hidden md:flex items-center gap-x-2">
      <Image
        src="/icon-dark.png"
        height={30}
        width={30}
        alt="Logo"
        className="dark:block hidden"
      />
      <Image
        src="/icon.png"
        height={30}
        width={30}
        alt="Logo"
        className="dark:hidden block"
      />
      <p className={cn("text-xl font-semibold", font.className)}>Nook</p>
    </div>
  );
};
