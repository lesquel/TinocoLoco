import { fontMontserrat } from "@/components/utils/fonts/montserrat";
import { fontPoppins } from "@/components/utils/fonts/poppins";
import type { ConfigurationBusiness } from "@/services/interfaces/IUBusiness";
import { LoginLink } from "@/features/auth/components/linkLogin";

import Link from "next/link";

export function Header({ business }: { business: ConfigurationBusiness }) {
  return (
    <header className="flex py-6 items-center justify-between bg-white">
      <div className="">
        <h1 className={fontMontserrat.className + " text-3xl font-bold"}>{business.business_name}</h1>
      </div>

      <nav className={fontPoppins.className + " text-base flex items-center gap-4 [&>*]:py-2 [&>*]:px-5  [&>*]:rounded-xl"}>
        <Link className="bg-black text-white" href={"/"}> Home </Link>
        <Link className="hover:bg-gray-900 hover:text-white" href={"/about"}> About </Link>
        <Link className="hover:bg-gray-900 hover:text-white" href={"/contact"}> Contact </Link>
        <Link className="hover:bg-gray-900 hover:text-white" href={"/contact"}> Contact </Link>
        <LoginLink />
      </nav>
    </header>
  );
}
