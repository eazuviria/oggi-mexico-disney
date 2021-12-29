import React, { PropsWithChildren, ReactElement, useEffect, useState } from "react";
import { useCssHandles } from 'vtex.css-handles'
import SwiperCore, {
  EffectFade,
  Navigation,
  Pagination,
  Mousewheel,
  Controller
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import './styles/swiper.global.css';
import './styles/App.global.css';
import { useOnScreen } from "./hooks/useOnScreen";
const CSS_HANDLES = ['Slider--vertical-container', 'Bullet--vertical-active', "Bullet--vertical"]

SwiperCore.use([EffectFade, Mousewheel, Navigation, Pagination, Controller]);

const App = ({ children }: PropsWithChildren<any>) => {
  const handles = useCssHandles(CSS_HANDLES)
  const [swiper, setSwiper] = useState<SwiperCore>();

  const slideTo = (index: number) => swiper?.slideTo(index);

  const [sliderRef, visible] = useOnScreen({ threshold: 0 })

  useEffect(() => {
    if (visible) {
      slideTo(0)
      window.scrollTo({ behavior: "smooth", top: 0, })
    }
  }, [visible])

  return <div style={{ width: "100vw", height: "100vh" }} ref={sliderRef}>
    <Swiper
      direction={"vertical"}
      slidesPerView={1}
      autoHeight
      onSwiper={setSwiper}
      controller={{ control: swiper }}
      mousewheel={{
        releaseOnEdges: true,
        sensitivity: 0.5
      }}
      effect={"fade"}
      pagination={{
        clickable: true,
        bulletActiveClass: handles["Bullet--vertical-active"],
        bulletClass: handles["Bullet--vertical"],
      }}
      draggable
      touchReleaseOnEdges
      className={handles['Slider--vertical-container']}
    >
      {children.map((item: ReactElement, index: number) => <SwiperSlide key={index}>{item}</SwiperSlide>)}
    </Swiper>
  </div>
}

export default App