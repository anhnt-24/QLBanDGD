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

  const mainCarouselRef = useRef<any>(null); // tạo ref cho carousel lớn

  if (isLoading) return <Spin />;

  const images = data?.data || [];

  return (
    <>
      {/* Carousel lớn */}
      <Carousel
        className="flex items-center px-10"
        arrows
        dots={false}
        nextArrow={<SamplePrevArrow />}
        prevArrow={<SamplePrevArrow />}
        ref={mainCarouselRef}
      >
        {images.map((img: ProductImage, index: number) => (
          <img
            key={index}
            src={img.url || ""}
            className="h-100 !w-[100%] !max-w-1000 object-cover"
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
        {images.map((img: ProductImage, index: number) => (
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
        ))}
      </Carousel>
    </>
  );
}

export default CarouselShow;
