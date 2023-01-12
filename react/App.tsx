import React, { PropsWithChildren, useEffect } from "react";
import SwiperCore, {
  Controller, EffectFade, Mousewheel, Navigation,
  Pagination
} from "swiper";

import './styles.css';
// import './styles/App.global.css';

SwiperCore.use([EffectFade, Mousewheel, Navigation, Pagination, Controller]);

const App = ({ }: PropsWithChildren<any>) => {

  function replaceElements() {
    let isMexico = window.location.pathname === "/mexico-campeon"

    let gallery = document.querySelector('#gallery-layout-container');
    let imgVertical1 = document.getElementsByClassName(isMexico ? 'vtex-store-components-3-x-imageElement--landing_mexico_vertical_1' : 'vtex-store-components-3-x-imageElement--landing_disney_small_1');
    let imgVertical2 = document.getElementsByClassName(isMexico ? 'vtex-store-components-3-x-imageElement--landing_mexico_vertical_2' : 'vtex-store-components-3-x-imageElement--landing_disney_small_2');
    let imgSquare1 = document.getElementsByClassName(isMexico ? 'vtex-store-components-3-x-imageElement--landing_mexico_cuadrada_1' : 'vtex-store-components-3-x-imageElement--landing_disney_large_1');
    let imgSquare2 = document.getElementsByClassName(isMexico ? 'vtex-store-components-3-x-imageElement--landing_mexico_cuadrada_2' : 'vtex-store-components-3-x-imageElement--landing_disney_large_2');
    if (gallery && imgVertical1[0] && imgSquare1[0] && imgVertical2[0] && imgSquare2[0]) {
      gallery.append(imgVertical1[0], imgSquare1[0], imgVertical2[0], imgSquare2[0]);
    }
    if (!isMexico) {
      let products = document.getElementsByClassName("vtex-search-result-3-x-galleryItem");
      products[0].classList.add("vtex-search-result-3-x-galleryItem-disney-1");
      products[1].classList.add("vtex-search-result-3-x-galleryItem-disney-2");
      products[2].classList.add("vtex-search-result-3-x-galleryItem-disney-3");
      products[3].classList.add("vtex-search-result-3-x-galleryItem-disney-4");
    }
  };

  function waitForElm(selector: string) {
    return new Promise(resolve => {
      if (document.querySelector(selector)) {
        return resolve(document.querySelector(selector));
      }

      const observer = new MutationObserver(() => {
        if (document.querySelector(selector)) {
          resolve(document.querySelector(selector));
          observer.disconnect();
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    });
  }

  useEffect(() => {
    waitForElm("#gallery-layout-container").then(() => {
      setTimeout(() => {
        replaceElements()
      }, 1000);
    })
  }, [])


  return <>
  </>
}

export default App