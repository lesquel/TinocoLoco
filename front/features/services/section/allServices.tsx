"use client"
import { useState } from "react";
import { TitleSection } from "@/components/utils/titleSection";
import {SearchForm} from "@/components/utils/SearchForm";
import { AllServicesComponents } from "../components/allServicesComponents";

export function AllServices() {
    const [search, setSearch] = useState<any>({});
    return (
        <div>
            <TitleSection title="Nuestros" description="Eventos" />
            <SearchForm setSearch={setSearch} />
            <AllServicesComponents search={search} />
        </div>
    )
}

