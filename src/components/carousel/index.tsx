import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Square } from "./square";
import { RubberWithStringDates, TFeatures } from "../../interface";

type Props = {
  values: { title: TFeatures; value: string; rubber?: RubberWithStringDates }[];
};

export const Features = ({ values }: Props) => {
  const settings = {
    dots: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1224,
        settings: {
          dots: true,
          slidesToShow: 5,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          dots: true,
          slidesToShow: 4,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 780,
        settings: {
          dots: true,
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 480,
        settings: {
          dots: true,
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 360,
        settings: {
          dots: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
    ],
  };
  return (
    <div className="container px-6 mx-auto max-w-screen-lg">
      <div>
        <Slider {...settings}>
          {values.map((item, i) => (
            <Square
              key={i}
              title={item.title}
              value={item.value}
              rubber={item.rubber || undefined}
            />
          ))}
        </Slider>
      </div>
    </div>
  );
};
