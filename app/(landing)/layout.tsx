import { LandingNavbar } from "./_components/navbar";

const landingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full dark:bg-[#1f1f1f]">
      <LandingNavbar />
      <main className="h-full pt-40">{children}</main>
    </div>
  );
};

export default landingLayout;
