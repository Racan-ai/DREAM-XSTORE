import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../../components/ui/carousel";

export const ProductCategoriesSection = (): JSX.Element => {
  // Product data for mapping
  const products = [
    {
      id: 1,
      name: "ART ADDICTS T-SHIRT",
      price: "Rs. 2,837.00",
      image: "/rounded-rectangle.png",
      wishlistIcon: "/image-62-4.png",
      cartIcon: "/image-61-4.png",
    },
    {
      id: 2,
      name: "ART ADDICTS T-SHIRT",
      price: "Rs. 2,837.00",
      image: "/image.png",
      wishlistIcon: "/image-62-4.png",
      cartIcon: "/image-61-4.png",
    },
    {
      id: 3,
      name: "ART ADDICTS T-SHIRT",
      price: "Rs. 2,837.00",
      image: "/image-3.png",
      wishlistIcon: "/image-62-4.png",
      cartIcon: "/image-61-4.png",
    },
    {
      id: 4,
      name: "ART ADDICTS T-SHIRT",
      price: "Rs. 2,837.00",
      image: "/image-4.png",
      wishlistIcon: "/image-62-4.png",
      cartIcon: "/image-61-4.png",
    },
    {
      id: 5,
      name: "ART ADDICTS T-SHIRT",
      price: "Rs. 2,837.00",
      image: "/image-5.png",
      wishlistIcon: "/image-62-4.png",
      cartIcon: "/image-61-4.png",
    },
  ];

  return (
    <section className="w-full py-8 overflow-hidden">
      <div className="container px-4 md:px-6">
        <Carousel
          className="w-full"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="-ml-4">
            {products.map((product) => (
              <CarouselItem
                key={product.id}
                className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <Card className="border-0 rounded-none overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative w-full h-[625px]">
                      <div
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${product.image})` }}
                      >
                        <div className="absolute top-6 right-6">
                          <img
                            className="w-[65px] h-[65px] object-cover"
                            alt="Wishlist icon"
                            src={product.wishlistIcon}
                          />
                        </div>

                        <div className="absolute bottom-[136px] right-6">
                          <img
                            className="w-[66px] h-[66px] object-cover"
                            alt="Add to cart"
                            src={product.cartIcon}
                          />
                        </div>

                        <div className="absolute bottom-[164px] left-7 w-[210px]">
                          <p className="font-medium text-white text-2xl font-['Poppins',Helvetica]">
                            {product.name}
                          </p>
                        </div>

                        <div className="absolute bottom-[79px] left-[30px] w-[140px]">
                          <p className="font-medium text-white text-xl font-['Poppins',Helvetica]">
                            {product.price}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4 bg-white/80 hover:bg-white" />
          <CarouselNext className="right-4 bg-white/80 hover:bg-white" />
        </Carousel>
      </div>
    </section>
  );
};
