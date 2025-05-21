import { getProductImages } from "@/apis/productImage.api";
import { ChildrenPropsType } from "@/types";
import { ProductImage } from "@/types/ProductImage.type";
import { useQuery } from "@tanstack/react-query";
import { Carousel, Spin } from "antd";
import { useRef } from "react";

function SamplePrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} !text-black`}
      style={{ ...style }}
      onClick={onClick}
    />
  );
}

function CarouselShow({ productId }: ChildrenPropsType) {
  const { data, isLoading } = useQuery({
    queryKey: ["productImages", productId],
    queryFn: () => getProductImages(productId).then((res) => res.data),
  });

  const mainCarouselRef = useRef<any>(null);

  if (isLoading) return <Spin />;

  const images = data?.data || [];

  return (
    <>
      <Carousel
        className="flex items-center px-10"
        arrows
        dots={false}
        nextArrow={<SamplePrevArrow />}
        prevArrow={<SamplePrevArrow />}
        ref={mainCarouselRef}
      >
        {images.length > 0
          ? images.map((img: ProductImage, index: number) => (
              <img
                key={index}
                src={img.url || ""}
                className="h-100 !w-[100%] !max-w-1000 object-cover"
                alt=""
              />
            ))
          : Array.from({ length: 10 }, (_, i) => i).map((i) => (
              <img
                key={i}
                src={`/assets/Slider2 (${i + 1}).png`}
                className="h-100 !w-[100%] !max-w-1000 object-contain"
                alt=""
              />
            ))}
      </Carousel>

      <Carousel
        className="mt-2 px-8"
        arrows
        dots={false}
        slidesToShow={8}
        slidesToScroll={1}
        infinite
        nextArrow={<SamplePrevArrow />}
        prevArrow={<SamplePrevArrow />}
      >
        {images.length > 0
          ? images.map((img: ProductImage, index: number) => (
              <div
                key={index}
                className="cursor-pointer px-1"
                onClick={() => mainCarouselRef.current?.goTo(index)}
              >
                <img
                  src={img.url || ""}
                  alt=""
                  className="h-10 w-30 rounded border object-cover"
                />
              </div>
            ))
          : Array.from({ length: 10 }, (_, i) => i).map((i) => (
              <div
                key={i}
                className="cursor-pointer px-1"
                onClick={() => mainCarouselRef.current?.goTo(i)}
              >
                <img
                  src={`/assets/Slider2 (${i + 1}).png`}
                  alt=""
                  className="h-10 rounded border object-cover"
                />
              </div>
            ))}
      </Carousel>
    </>
  );
}

export default CarouselShow;
