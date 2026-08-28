import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#050b08] px-5 text-center">
      <p className="text-gradient-farm font-['BaskervvilleSC'] text-[18px] uppercase tracking-[2px]">
        Reset life
      </p>
      <h1 className="mt-6 font-['dtnightingale'] text-[48px] font-light text-white">
        Page not found
      </h1>
      <p className="mt-4 max-w-md font-['Raleway'] text-[16px] text-[#8e8e8e]">
        The page you are looking for does not exist or may have been moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center justify-center rounded-[12px] bg-gradient-to-r from-[#825e37] via-[#dfcba2] to-[#825e37] px-6 py-4 font-['BaskervvilleSC'] text-[16px] font-semibold text-[#050b08]"
      >
        Back to homepage
      </Link>
    </main>
  );
}
