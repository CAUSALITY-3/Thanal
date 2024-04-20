"use client";
import { FC, useEffect, useState } from "react";
import * as stylex from "@stylexjs/stylex";
import Image from "next/image";

import pdt1 from "@public/pdt1.jpg";

interface Props {
  slides: string[];
}

const styles = stylex.create({
  mainContainer: {
    display: "flex",
    height: "100%",
    maxHeight: "60vh",
  },
  sliderStyles: {
    width: "100%",
    position: "relative",
  },
  dotsContainerStyles: {
    position: "absolute",
    bottom: "0px",
    left: "50%",
    right: "50%",
    display: {
      default: "none",
      "@media (max-width: 500px)": "flex",
    },
    justifyContent: "center",
  },
  dotStyle: {
    margin: "10px 3px",
    cursor: "pointer",
    fontSize: "20px",
    color: "white",
  },
  dotStyleSelect: {
    color: "green",
  },
  slideStylesWidthBackground: {
    width: "100%",
    height: "100%",
    borderRadius: "10px",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  imageTemplateContainer: {
    display: {
      default: "flex",
      "@media (max-width: 500px)": "none",
    },
    alignItems: "center",
    flexDirection: "column",
  },
  imageTemplateBox: {
    width: "50px",
    height: "50px",
    borderRadius: "2px",
    border: "1px solid green",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "2px 5px",
  },
  imageTemplateBoxActive: {
    border: "2px solid green",
  },
  templateImage: {
    height: "90%",
    width: "90%",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
});
const stt = {
  height: "90%",
  width: "90%",
  backgroundSize: "cover",
  backgroundPosition: "center",
};
const stt1 = {
  width: "100%",
  height: "100%",
  borderRadius: "10px",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

export const ImageSlider: FC<Props> = ({ slides }) => {

  const getCookieValue = (name: string) =>
  document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)")?.pop() || ""; 

  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    const cookie = getCookieValue("isMobile")
    setIsMobile(cookie === "true")
  }, [])

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  const minSwipeDistance = 50;

  const onTouchStart = (e: any) => {
    if (isMobile) {
      setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
      setTouchStart(e.targetTouches[0].clientX);
    }
  };

  const onTouchMove = (e: any) => {
    if (isMobile) {
      setTouchEnd(e.targetTouches[0].clientX);
    }
  };

  const onTouchEnd = () => {
    if (isMobile) {
      if (!touchStart || !touchEnd) return;
      const distance = touchStart - touchEnd;
      const isLeftSwipe = distance > minSwipeDistance;
      const isRightSwipe = distance < -minSwipeDistance;
      if (isLeftSwipe || isRightSwipe) {
        console.log("swipe", isLeftSwipe ? "left" : "right");
        isLeftSwipe ? goToNext() : goToPrevious();
      }
    }
  };

  const bgimage = {
    backgroundImage: `url(${slides[currentIndex]})`,
  };

  return (
    <div {...stylex.props(styles.mainContainer)}>
      {/* {!isMobile && ( */}
      <div {...stylex.props(styles.imageTemplateContainer)}>
        {slides.map((slide, slideIndex: number) => (
          <div
            key={slideIndex}
            {...stylex.props(
              styles.imageTemplateBox,
              slideIndex === currentIndex ? styles.imageTemplateBoxActive : null
            )}
            onMouseOver={() => setCurrentIndex(slideIndex)}
          >
            <Image src={pdt1} alt="Picture of the author" style={stt} />
            {/* <Image
                src={}
                {...stylex.props(styles.templateImage)}
                style={{ backgroundImage: `url(${slide})` }}
              > */}
          </div>
        ))}
      </div>
      {/* )} */}
      <div
        {...stylex.props(styles.sliderStyles)}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* <div {...stylex.props(styles.slideStylesWidthBackground)} style={bgimage}></div> */}
        <Image src={pdt1} alt="Picture of the author" style={stt1} />
        {/* {isMobile && ( */}
        <div {...stylex.props(styles.dotsContainerStyles)}>
          {slides.map((slide, slideIndex: number) => (
            <div
              {...stylex.props(
                styles.dotStyle,
                currentIndex === slideIndex ? styles.dotStyleSelect : null
              )}
              key={slide}
              onClick={() => goToSlide(slideIndex)}
            >
              ●
            </div>
          ))}
        </div>
        {/* // )} */}
      </div>
    </div>
  );
};
