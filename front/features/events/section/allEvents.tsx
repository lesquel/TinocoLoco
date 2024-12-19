"use client"
import { useState } from "react";
import { TitleSection } from "@/components/utils/titleSection";
import {SearchForm} from "@/components/utils/SearchForm";
import { AllEventsComponents } from "../components/allEventsComponents";

export function AllEvents() {
    const [search, setSearch] = useState<any>({});
    return (
        <div>
            <TitleSection title="Nuestros" description="Eventos" />
            <SearchForm setSearch={setSearch} />
            <AllEventsComponents search={search} />
        </div>
    )
}

