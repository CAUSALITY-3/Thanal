"use client";
import { FC, useEffect, useState } from "react";
import "./ImageSlider.scss";

interface Props {
  slides: string[];
}

export const ImageSlider: FC<Props> = ({ slides }) => {
  const getCookieValue = (name: string) =>
    document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)")?.pop() || "";

  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const cookie = getCookieValue("isMobile");
    setIsMobile(cookie === "true");
  }, []);

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

  return (
    <div className="mainContainer">
      <div className="imageTemplateContainer">
        {slides.map((slide, slideIndex: number) => (
          <div
            key={slideIndex}
            className={
              slideIndex === currentIndex
                ? "imageTemplateBox imageTemplateBoxActive"
                : "imageTemplateBox"
            }
            onMouseOver={() => setCurrentIndex(slideIndex)}
          >
            <img loading="lazy" src={slide} alt="Picture of the author" />
          </div>
        ))}
      </div>
      <div
        className="sliderStyles"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="slider-imageContainer">
          <img
            loading="lazy"
            src={slides[currentIndex]}
            alt="Picture of the author"
          />
        </div>
        <div className="dotsContainerStyles">
          {slides.map((slide, slideIndex: number) => (
            <div
              className={
                currentIndex === slideIndex
                  ? "dotStyle dotStyleSelect"
                  : "dotStyle"
              }
              key={slide}
              onClick={() => goToSlide(slideIndex)}
            >
              ●
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
