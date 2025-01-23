import image1 from "../../assets/images/slider/slider-image.jpg";
import image2 from "../../assets/images/slider/slider-image.jpg";
import image3 from "../../assets/images/slider/slider-image.jpg";
import ArrowLeft from "../../assets/images/slider/arrow-left.svg"
import ArrowRight from "../../assets/images/slider/arrow-right.svg"
import "./Slider.css" 
import { Flex, Image } from "@mantine/core";
import { useState } from "react";


export const Slider = () => {
  const images: string[] = [ image1, image2, image3 ]

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const prevSlide = (): void => {
    setCurrentIndex((prev: number) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = (): void => {
      setCurrentIndex((prev: number) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index: number): void => {
      setCurrentIndex(index);
  };

  return (
    <Flex direction='column' className="container-lg">
      <Flex direction='column' gap={10} className="slider">
        <Flex align='center' justify='center' gap={10}>
          <button onClick={prevSlide} className="btn">
            <Image src={ArrowLeft} w={20} h={20}/>
          </button>
          <Flex justify='center' className="imageWrapper">
            <img
              src={images[currentIndex]}
              alt={`Slide ${currentIndex + 1}`}
              className="image"
            />
          </Flex>
          <button onClick={nextSlide} className="btn">
            <Image src={ArrowRight} w={20} h={20}/>
          </button>
        </Flex>

        <Flex justify='center'>
          {images.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentIndex ? "active" : ""}`}
              onClick={() => goToSlide(index)}
            ></span>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};