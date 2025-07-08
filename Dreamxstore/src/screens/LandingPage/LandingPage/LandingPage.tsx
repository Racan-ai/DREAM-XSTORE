import React from "react";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import { HeroSection } from "./sections/HeroSection";
import { MainBannerSection } from "./sections/MainBannerSection";
import { ProductCategoriesSection } from "./sections/ProductCategoriesSection";
import { TrendingFashionSection } from "./sections/TrendingFashionSection";

export const LandingPage = (): JSX.Element => {
  // Category buttons data
  const categoryButtons = [
    {
      id: 1,
      label: "Shirts",
      bgColor: "bg-[#f1f1f1]",
      textColor: "text-[#004d84]",
      active: false,
    },
    {
      id: 2,
      label: "T-Shirts",
      bgColor: "bg-[#f1ff8c]",
      textColor: "text-black",
      active: true,
    },
    {
      id: 3,
      label: "Hoodies",
      bgColor: "bg-[#f1ff8c]",
      textColor: "text-black",
      active: true,
    },
  ];

  // View more section data
  const viewMoreSections = [
    { id: 1, title: "T-shirts For Men", top: "top-[2271px]" },
    {
      id: 2,
      title: "Trending Fashion",
      top: "top-[4115px]",
      topButton: "top-[4145px]",
    },
  ];

  // Fashion images data
  const fashionImages = [
    {
      id: 1,
      src: "/rectangle-17.png",
      width: "w-[1069px]",
      height: "h-[702px]",
      top: "top-[4286px]",
      left: "left-[84px]",
    },
    {
      id: 2,
      src: "/rectangle-18.png",
      width: "w-[636px]",
      height: "h-[702px]",
      top: "top-[4286px]",
      left: "left-[1208px]",
    },
    {
      id: 3,
      src: "/rectangle-20.png",
      width: "w-[636px]",
      height: "h-[702px]",
      top: "top-[5029px]",
      left: "left-[86px]",
    },
    {
      id: 4,
      src: "/rectangle-19.png",
      width: "w-[1076px]",
      height: "h-[702px]",
      top: "top-[5029px]",
      left: "left-[767px]",
    },
  ];

  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white overflow-hidden w-[1920px] relative">
        {/* Hero Section */}
        <div className="relative w-[1932px]">
          <HeroSection />
          <img
            className="w-[1920px] h-[899px] mt-[167px] object-cover"
            alt="Rectangle"
            src="/rectangle-3.png"
          />

          <Card className="absolute w-[237px] h-[89px] top-[805px] left-[108px] bg-white rounded-sm shadow-[0px_4px_10px_#00000040] border-none">
            <div className="absolute w-[173px] top-[20px] left-[32px] font-['Cascadia_Mono',Helvetica] font-normal text-[#004d84] text-[40px]">
              Buy Now
            </div>
          </Card>

          <Badge className="absolute w-[68px] h-[68px] top-[582px] left-[1809px] bg-[#edededf5] rounded-[34.25px] shadow-[0px_4px_10px_#00000040] p-0">
            <img
              className="w-12 h-12 m-2.5 object-cover"
              alt="Navigation icon"
              src="/image-2-2.png"
            />
          </Badge>
        </div>

        {/* Brand Banner */}
        <div className="w-[1920px] h-32 bg-[url(/rectangle-4.svg)] bg-[100%_100%]">
          <img
            className="w-[387px] h-11 mx-auto my-[42px] object-cover"
            alt="Brand logo"
            src="/image-1.png"
          />
        </div>

        {/* Main Banner Section */}
        <MainBannerSection />

        {/* Category Buttons */}
        <div className="flex justify-center gap-6 mt-8">
          {categoryButtons.map((button) => (
            <Button
              key={button.id}
              className={`${button.bgColor} ${button.textColor} h-[74px] rounded-[68.9px] border border-solid border-black shadow-[0px_4px_10px_#00000040] [-webkit-text-stroke:1px_#000000] font-['Inter',Helvetica] font-medium text-[32px]`}
            >
              {button.label}
            </Button>
          ))}
        </div>

        {/* T-shirts For Men Section */}
        <div className="w-[1717px] h-[65px] mx-auto mt-8 flex justify-between items-center">
          <div className="font-['Shinko_Sans-Regular',Helvetica] font-normal text-black text-5xl">
            T-shirts For Men
          </div>

          <div className="flex items-center">
            <Button
              variant="link"
              className="font-['Poppins',Helvetica] font-medium text-[#0e6eff] text-2xl underline p-0"
            >
              View More
            </Button>
            <img
              className="w-[30px] h-[30px] ml-2 object-cover"
              alt="Arrow icon"
              src="/image-63-2.png"
            />
          </div>
        </div>

        {/* Product Categories Section */}
        <ProductCategoriesSection />

        {/* Trending Fashion Section */}
        <TrendingFashionSection />

        {/* Trending Fashion Title */}
        <div className="w-full px-[77px] mt-16 flex justify-between items-center">
          <div className="font-['Shinko_Sans-Regular',Helvetica] font-normal text-black text-5xl">
            Trending Fashion
          </div>

          <div className="flex items-center">
            <Button
              variant="link"
              className="font-['Poppins',Helvetica] font-medium text-[#0e6eff] text-2xl underline p-0"
            >
              View More
            </Button>
            <img
              className="w-[30px] h-[30px] ml-2 object-cover"
              alt="Arrow icon"
              src="/image-63-2.png"
            />
          </div>
        </div>

        {/* Fashion Images */}
        <div className="relative mt-4">
          {fashionImages.map((image) => (
            <img
              key={image.id}
              className={`absolute ${image.width} ${image.height} ${image.top} ${image.left} object-cover`}
              alt="Fashion item"
              src={image.src}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="w-[1920px] h-[784px] mt-[136px] bg-[#00428e]">
          <div className="absolute w-[535px] top-[317px] left-[695px] font-['Azeret_Mono',Helvetica] font-normal text-white text-9xl whitespace-nowrap">
            Footer
          </div>

          <div className="absolute w-[218px] top-[76px] left-[86px] font-['Horizon-Regular',Helvetica] font-normal text-white text-[40px]">
            Dream X<br />
            Store
          </div>
        </div>

        {/* Chat Button */}
        <Button className="fixed w-[84px] h-[84px] bottom-[40px] right-[40px] bg-[#ddff80] rounded-[56.61px] border border-solid border-black p-0">
          <img
            className="w-11 h-7 object-cover"
            alt="Chat icon"
            src="/image-77.png"
          />
        </Button>
      </div>
    </div>
  );
};
