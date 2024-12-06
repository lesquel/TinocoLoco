import { getBusiness } from "@/features/business/services/businessServices";
import logoDefault from "@/../public/images/logoDefault.jpg";

import { fontMontserrat } from "@/components/utils/fonts/montserrat"; 


export async function Header() {
  const business = await getBusiness();
  if (!business) {
    return <h1>Cargando...</h1>;
  }

  return (
    <header>
      <div>
        <h1 className={fontMontserrat.className +" text-3xl" }>{business.business_name}</h1>

      </div>
    </header>
  );
}
