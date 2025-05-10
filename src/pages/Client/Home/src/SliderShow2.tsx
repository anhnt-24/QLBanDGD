import { Carousel } from "antd";

function SliderShow2() {
  return (
    <div className="w-[100%] overflow-hidden">
      <Carousel
        autoplay
        slidesToShow={2}
        slidesToScroll={1}
        dots={false}
        className="-mx-5 !flex gap-2"
      >
        {Array.from({ length: 3 }, (_, i) => i + 1).map((i) => (
          <div className="px-1">
            <img src={`assets/Slider2 (${i}).png`} alt="" />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default SliderShow2;
