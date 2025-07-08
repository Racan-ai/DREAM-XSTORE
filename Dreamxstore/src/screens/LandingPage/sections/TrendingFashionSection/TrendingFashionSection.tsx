import React from "react";
import { Button } from "../../../../components/ui/button";
import { Card } from "../../../../components/ui/card";

export const TrendingFashionSection = (): JSX.Element => {
  // Navigation buttons data
  const navigationButtons = [
    { position: "left", top: "top-[426px]", left: "left-[115px]" },
    { position: "right", top: "top-[425px]", left: "left-[1813px]" },
  ];

  return (
    <section className="relative w-full h-[920px] bg-[#fbfbfb] border border-solid border-[#004d84]">
      {/* Navigation buttons */}
      {navigationButtons.map((button) => (
        <div
          key={button.position}
          className={`absolute w-[68px] h-[68px] ${button.top} ${button.left} bg-[#dbdbdb33] rounded-[34.25px] shadow-[0px_4px_10px_#00000040] flex items-center justify-center`}
        >
          <img
            className="w-12 h-12 object-cover"
            alt={`${button.position} navigation`}
            src="/image-2-2.png"
          />
        </div>
      ))}

      {/* Product image */}
      <div className="absolute w-[643px] h-[643px] top-[103px] left-[358px] bg-[url(/image-63.png)] bg-cover bg-[50%_50%]" />

      {/* Product information */}
      <div className="absolute w-[503px] top-[221px] left-[1097px] font-['Poppins',Helvetica] font-normal text-[40px]">
        <a
          href="https://www.zalando.co.uk/polo-ralph-lauren/"
          rel="noopener noreferrer"
          target="_blank"
          className="text-black"
        >
          Polo Ralph Lauren
          <br />
        </a>
        <span className="text-black">CUSTOM FIT LINEN SHIRT - Shirt</span>
      </div>

      {/* Price information */}
      <div className="absolute top-[436px] left-[1095px] font-['Inter',Helvetica] font-medium text-[#ff4d4d] text-xl whitespace-nowrap">
        £180.00VAT include
      </div>

      {/* Shop now button */}
      <div className="absolute w-[284px] h-[85px] top-[505px] left-[1088px]">
        <Card className="relative w-[282px] h-[85px] bg-white rounded-[42.75px] border-2 border-solid border-black">
          <Button
            variant="ghost"
            className="absolute top-[17px] left-[60px] [-webkit-text-stroke:1px_#000000] font-['Inter',Helvetica] font-medium text-black text-[32px] p-0 h-auto"
          >
            Shop Now
          </Button>
        </Card>
      </div>

      {/* Color selector */}
      <div className="absolute w-[78px] h-[77px] top-[669px] left-[1097px] bg-black rounded-[39.16px/38.41px]" />
    </section>
  );
};