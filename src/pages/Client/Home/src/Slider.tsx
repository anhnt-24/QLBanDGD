import React from "react";
import { Carousel } from "antd";

const SliderShow: React.FC = () => (
  <div className="grid grid-cols-4 grid-rows-2 gap-2">
    <div className="col-span-3 row-span-2">
      <Carousel
        infinite
        draggable
        arrows
        autoplay={{ dotDuration: true }}
        autoplaySpeed={5000}
      >
        {Array.from({ length: 3 }, (_, i) => i + 1).map((i) => (
          <div>
            <img src={`assets/slider${i}.png`} alt="" />
          </div>
        ))}
      </Carousel>
    </div>
    <div className="col-span-1 row-span-1">
      <img
        src="assets/banner1.png"
        className="h-[100%] w-[100%] object-fill"
        alt=""
      />
    </div>
    <div className="col-span-1 row-span-1">
      <img src="assets/banner2.png" className="h-[100%] object-fill" alt="" />
    </div>
  </div>
);

export default SliderShow;
