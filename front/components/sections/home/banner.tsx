"use client";

import { Button } from "@nextui-org/react";
import EventosBanner from "@/public/images/e.jpg";

export const Banner = () => {
    return (
        <section
            className="relative bg-cover bg-center"
            style={{
                backgroundImage: "url( " + EventosBanner.src + ")",
            }}
        >
            <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/90 to-black/0"></div>

            <div className="relative z-10 flex flex-col items-center justify-center h-screen px-4 text-center sm:px-6 lg:px-8">
                <h2 className="text-3xl font-extrabold text-white sm:text-5xl">
                    Let us find your{" "}
                    <span className="text-rose-500">Forever Home.</span>
                </h2>

                <p className="mt-4 max-w-lg text-white sm:text-xl sm:leading-relaxed">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt illo tenetur fuga ducimus numquam
                    ea!
                </p>

                <div className="mt-8 flex flex-wrap gap-4 justify-center">
                    <Button
                        className="bg-rose-600 hover:bg-rose-700 focus:ring-rose-500 text-white font-medium"
                        size="lg"
                    >
                        Get Started
                    </Button>
                    <Button

                        className="border-rose-600 text-rose-600 hover:text-rose-700 hover:border-rose-700 focus:ring-rose-500"
                        size="lg"
                    >
                        Learn More
                    </Button>
                </div>
            </div>
        </section>
    );
};
