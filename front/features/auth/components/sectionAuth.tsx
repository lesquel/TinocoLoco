import Link from "next/link";
import { fontMontserrat } from "@/config/montserrat"

export const SectionAuth = ({
    children,
    title,
    idForm,
    handleSubmit,
    textFooter,
    linkHrefFooter,
    linkNameFooter,
}: {
    children: React.ReactNode,
    title: string,
    idForm: string,
    handleSubmit: any,
    textFooter: string,
    linkHrefFooter: string,
    linkNameFooter: string,
}) => {
    return (
        <section className=" flex flex-wrap h-screen items-center ">
            <div className="bg-[#E6EEF8] rounded-3xl px-4 py-6 sm:px-6 sm:py-6 lg:px-6 lg:py-6 flex flex-col justify-center gap-3">
                <div className="mx-auto mt-10">
                    <h1 className={fontMontserrat.className + " text-2xl font-bold"}>{title}</h1>

                </div>

                <form id={idForm} onSubmit={handleSubmit} className="mx-auto mb-0 mt-8 max-w-md space-y-4" method="post">
                    <div className="flex flex-col gap-3 justify-center items-center">
                        {children}
                    </div>

                </form>
                <div className={fontMontserrat.className + " mt-5"}>
                    <p>
                        {textFooter}
                        <span className="text-blue-500 hover:text-blue-700">
                            <Link href={linkHrefFooter}>
                                {linkNameFooter}
                            </Link>
                        </span>
                    </p>
                </div>
            </div>
        </section>
    );
};
