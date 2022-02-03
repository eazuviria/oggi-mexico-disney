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

import './styles.css';
// import './styles/App.global.css';
import { useOnScreen } from "./hooks/useOnScreen";
const CSS_HANDLES = ['Slider--vertical-container', 'Slide--vertical-container', 'Bullet--vertical-active', "Bullet--vertical"]

SwiperCore.use([EffectFade, Mousewheel, Navigation, Pagination, Controller]);

const App = ({ children }: PropsWithChildren<any>) => {
  const handles = useCssHandles(CSS_HANDLES)
  const [swiper, setSwiper] = useState<SwiperCore>();
  const [scrollTop, setScrollTop] = useState(0);



  const slideTo = (index: number) => swiper?.slideTo(index);

  const [sliderRef, visible] = useOnScreen({ threshold: 0 })

  function toggleMenuVisibility(hide: boolean) {
    const menuEl = Array.from(document.getElementsByClassName('vtex-flex-layout-0-x-flexRow--desk-row-bottom') as HTMLCollectionOf<HTMLElement>)[0] || null;
    let parent = menuEl.parentElement;
    if (hide) {
      if (parent) {
        parent.style.pointerEvents = "none";
      }
      menuEl.style.opacity = "0";
    } else {
      if (parent) {
        parent.style.pointerEvents = "auto";
      }
      menuEl.style.opacity = "1";
    }
  }

  useEffect(() => {
    const onScroll = (e: any) => {
      setScrollTop(e.target.documentElement.scrollTop);
    };
    if (window.innerWidth > 1024) {
      toggleMenuVisibility(scrollTop >= (window.innerHeight / 3))
      window.addEventListener("scroll", onScroll);
    }

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollTop]);


  useEffect(() => {
    if (visible) {
      slideTo(0)
      window.scrollTo({ behavior: "smooth", top: 0, })
    }
  }, [visible])

  function loadStyles() {
    var link = document.createElement("link");
    link.href = "https://street47.vteximg.com.br/arquivos/swiper.css";
    link.type = "text/css";
    link.rel = "stylesheet";
    link.media = "screen,print";
    document.getElementsByTagName("head")[0].appendChild(link);
    console.log("Carga exitosamente los estilos del swiper")
  }

  useEffect(() => {
    loadStyles()
  }, [])

  return <div style={{ width: "100vw", height: "100vh" }} ref={sliderRef}>
    <Swiper
      direction={"vertical"}
      slidesPerView={1}
      autoHeight
      // height={window.innerHeight}
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
      {children.map((item: ReactElement, index: number) => <SwiperSlide className={handles['Slide--vertical-container']} key={index}>{item}</SwiperSlide>)}
    </Swiper>
  </div>
}

export default App