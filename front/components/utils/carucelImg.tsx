'use client'

import React, { useState } from 'react'
import { Card, CardBody, Button, Image } from "@nextui-org/react"
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import No_Found_Event from "@/public/images/no_fount_events.jpg"

export function ImageCarousel({ images }: { images: string[] }) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const placeholderImage = No_Found_Event.src

    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0
        const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1
        setCurrentIndex(newIndex)
    }

    const goToNext = () => {
        const isLastSlide = currentIndex === images.length - 1
        const newIndex = isLastSlide ? 0 : currentIndex + 1
        setCurrentIndex(newIndex)
    }

    return (
        <Card className="w-full max-w-lg mx-auto h-[400px]">
            <CardBody className="p-0 relative h-full flex items-center justify-center overflow-hidden">
                <Image
                    src={images.length > 0 ? images[currentIndex] : placeholderImage}
                    alt={`Carousel image ${currentIndex + 1}`}
                    className="w-full h-full object-cover object-center"
                />
                {images.length > 1 && (
                    <>
                        <Button
                            isIconOnly
                            className="z-40 absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                            onClick={goToPrevious}
                            aria-label="Previous image"
                        >
                            <FaAngleLeft className="h-6 w-6" />
                        </Button>
                        <Button
                            isIconOnly
                            className="z-40 absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                            onClick={goToNext}
                            aria-label="Next image"
                        >
                            <FaAngleRight className="h-6 w-6" />
                        </Button>
                    </>
                )}
                {images.length > 1 && (
                    <div className="z-40 absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {images.map((_, index) => (
                            <div
                                key={index}
                                className={`h-2 w-2 rounded-full ${
                                    index === currentIndex ? 'bg-white' : 'bg-white/50'
                                }`}
                            />
                        ))}
                    </div>
                )}
            </CardBody>
        </Card>
    )
}

