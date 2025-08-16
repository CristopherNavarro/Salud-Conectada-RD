'use client';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Image from 'next/image';

const ImageCarousel = () => {
  return (
    <Carousel
      showArrows={false}
      showIndicators={false}
      autoPlay={true}
      showStatus={false}
      interval={4000}
      infiniteLoop={true}
      showThumbs={false}
      className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
    >
      <div>
        <Image
          src="/image1.jpg"
          alt="Image 1"
          width={1920}
          height={1080}
          className="h-full w-full object-cover"
          priority
        />
      </div>
      <div>
        <Image
          src="/image2.jpg"
          alt="Image 2"
          width={1920}
          height={1080}
          className="h-full w-full object-cover"
        />
      </div>
      <div>
        <Image
          src="/image3.jpg"
          alt="Image 3"
          width={1920}
          height={1080}
          className="h-full w-full object-cover"
        />
      </div>
      <div>
        <Image
          src="/image4.jpg"
          alt="Image 4"
          width={1920}
          height={1080}
          className="h-full w-full object-cover"
        />
      </div>
      <div>
        <Image
          src="/image5.jpg"
          alt="Image 5"
          width={1920}
          height={1080}
          className="h-full w-full object-cover"
        />
      </div>
    </Carousel>
  );
};

export default ImageCarousel;
