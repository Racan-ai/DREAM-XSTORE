import React from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

export const MainBannerSection = (): JSX.Element => {
  return (
    <section className="w-full py-8 sm:py-12 md:py-14 lg:py-16 bg-[#f1f0fff5]">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 flex flex-col lg:flex-row items-center gap-6 sm:gap-8">
        <div className="relative w-full lg:w-1/2">
          <img
            className="w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] xl:h-auto object-cover rounded-md"
            alt="DreamX custom clothing"
            src="/rectangle-6.png"
          />
          <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 lg:bottom-10 left-4 sm:left-6 md:left-8 lg:left-10 text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
            OVERALL
          </div>
        </div>

        <Card className="w-full lg:w-1/2 border-none bg-transparent">
          <CardContent className="p-4 sm:p-5 md:p-6 flex flex-col gap-6 sm:gap-7 md:gap-8">
            <div className="font-['Poppins',Helvetica] text-black text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-[32px] leading-relaxed">
              Hey, welcome to DreamX! <br />
              <br />
              #GetCustomClothing tailored just for you from your favorite brands
              and styles.
              <br />
              Discover exclusive, made-for-you fashion picks and personalize
              your wardrobe like never before.
            </div>

            <div className="flex justify-center lg:justify-end">
              <Button className="h-[70px] w-[220px] sm:h-[80px] sm:w-[250px] md:h-[90px] md:w-[280px] lg:h-[100px] lg:w-[300px] xl:h-[108px] xl:w-[318px] bg-[#f1ff8c] rounded-[35px] sm:rounded-[40px] md:rounded-[45px] lg:rounded-[50px] xl:rounded-[54.12px] border border-solid border-black hover:bg-[#e9f87a] transition-colors">
                <span className="font-['Poppins',Helvetica] font-medium text-black text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                  Join Now
                </span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};