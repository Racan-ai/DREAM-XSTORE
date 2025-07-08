import React from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

export const MainBannerSection = (): JSX.Element => {
  return (
    <section className="w-full py-16 bg-[#f1f0fff5]">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-8">
        <div className="relative w-full lg:w-1/2">
          <img
            className="w-full h-auto object-cover rounded-md"
            alt="DreamX custom clothing"
            src="/rectangle-6.png"
          />
          <div className="absolute bottom-10 left-10 text-white text-5xl font-bold">
            OVERALL
          </div>
        </div>

        <Card className="w-full lg:w-1/2 border-none bg-transparent">
          <CardContent className="p-6 flex flex-col gap-8">
            <div className="font-['Poppins',Helvetica] text-black text-[32px]">
              Hey, welcome to DreamX! <br />
              <br />
              #GetCustomClothing tailored just for you from your favorite brands
              and styles.
              <br />
              Discover exclusive, made-for-you fashion picks and personalize
              your wardrobe like never before.
            </div>

            <div className="flex justify-end">
              <Button className="h-[108px] w-[318px] bg-[#f1ff8c] rounded-[54.12px] border border-solid border-black hover:bg-[#e9f87a]">
                <span className="font-['Poppins',Helvetica] font-medium text-black text-4xl">
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
