import React, { useEffect, useRef, useState, PropsWithChildren, ReactElement } from "react";
// import { useCssHandles } from 'vtex.css-handles'
import { Slider } from 'vtex.store-components'
import useScreenDetect from "./hooks/useDetectScreen";

import { useOnScreen } from "./hooks/useOnScreen";


import "./styles/App.css";

// const CSS_HANDLES = [
//   'mySwiper',
// ]

const App = ({ children }: PropsWithChildren<any>) => {
  // const handles = useCssHandles(CSS_HANDLES)
  const [mouseHover, setMouseHover] = useState(false)
  const [isLastSlide, setLastSlide] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [touched, setTouched] = useState(false)
  const [firstClientY, setFirstClientY] = useState(0)
  const [clientY, setClientY] = useState(0)

  const sliderRef = useRef<Slider>();

  const { isMobile } = useScreenDetect()

  const handleWheel = (event: any) => {
    event.preventDefault();
    return event.deltaY > 0 ? sliderRef.current._slick.slickNext() : sliderRef.current._slick.slickPrev()
  }

  const touchStart = (event: any) => {
    setFirstClientY(event.touches[0].clientY)
  }

  useEffect(() => {
    if (currentSlide === children.length - 1) {
      setLastSlide(true)
    } else {
      setLastSlide(false)
    }
  }, [currentSlide])

  useEffect(() => {
    if (isLastSlide) {
      window.removeEventListener('touchstart', touchStart);
      window.removeEventListener('touchmove', preventTouch);
    }
  }, [isLastSlide])


  const preventTouch = (event: any) => {
    setClientY(event.touches[0].clientY)
  }

  const [pepe, visible] = useOnScreen({ threshold: 0 })

  useEffect(() => {
    if (visible) {
      sliderRef.current._slick.slickGoTo(0)
      window.scrollTo({ behavior: "smooth", top: 0, })
    }
  }, [visible])


  useEffect(() => {
    const minValue = 10;
    if (clientY && window.scrollY < window.innerHeight && clientY < firstClientY + minValue) {
      // return;
      return sliderRef.current._slick.slickNext();
    }
    if (clientY && window.scrollY < window.innerHeight && clientY > firstClientY - minValue)
      // return;
      return sliderRef.current._slick.slickPrev();
  }, [clientY, touched])


  useEffect(() => {
    if (!isMobile) {
      if (mouseHover) {
        document.addEventListener("wheel", handleWheel)
      }
      if (!mouseHover) {
        document.removeEventListener("wheel", handleWheel)
      }
    }
    return () => {
      if (!isMobile) {
        document.body.style.overflow = "auto"
        document.removeEventListener("wheel", handleWheel)
      }
    }
  }, [mouseHover])

  useEffect(() => {
    if (isMobile) {
      document.body.style.overflow = "hidden";
      window.addEventListener('touchstart', touchStart);
      window.addEventListener('touchmove', preventTouch, { passive: false });
    }
    return () => {
      if (isMobile) {
        document.body.style.overflow = "auto"
        window.removeEventListener('touchstart', touchStart);
        window.removeEventListener('touchmove', preventTouch);
      }
    }
  }, [isMobile])


  return <div
    onTouchEnd={() => setTouched(false)}
    onTouchStart={() => setTouched(true)}
    ref={pepe}
    style={!isLastSlide && isMobile ? { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, maxWidth: "100vw", zIndex: 5, background: "white" } : undefined}
    onMouseEnter={() => setMouseHover(true)}
    onMouseLeave={() => setMouseHover(false)}
  >
    <Slider adaptiveHeight={false} ref={sliderRef} style={{ innerHeight: "100vh", outerHeight: "100vh" }} sliderSettings={{
      dots: true,
      slideToShow: 1, slidesToScroll: 1,
      vertical: true,
      verticalSwiping: true,
      speed: 750,
      arrows: false,
      fade: true,
      infinite: false,
      touchMove: true,
      beforeChange: (current: any) => {
        if (current === 0 && window.scrollY === 0) { document.body.style.overflow = "hidden" }
      },
      afterChange: (current: any) => {
        setCurrentSlide(current);
        if (current === children.length - 1) {
          // setLastSlide(true)
          document.body.style.overflow = "auto"
        } else {
          if (!isMobile) document.body.style.overflow = "hidden"
        }
      }
    }}>
      {children.map((item: ReactElement, index: number) => <div key={index}>{item}</div>)}
    </Slider>
  </div>
}

export default App