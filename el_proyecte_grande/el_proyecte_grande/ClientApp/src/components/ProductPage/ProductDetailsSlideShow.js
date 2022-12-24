import {Options} from "@splidejs/splide";
import {Splide, SplideSlide} from "@splidejs/react-splide";
import React, {useEffect, useRef} from "react";

function ProductDetailsSlideShow({ productId, photos, classNames }) {

    //SYNC SPLIDE COMPONENTS
    
    const slider1 = useRef(null);
    const slider2 = useRef(null);

    useEffect(() => {
        if (slider1.current && slider2.current)
            slider1.current.sync(slider2.current.splide);
    }, [slider1], [slider2])
    
    
    const mainOptions: Options = {
        type      : 'loop',
        perPage   : 1,
        perMove   : 1,
        pagination: false,
        arrows: false
    };

    const thumbsOptions: Options = {
        type        : 'slide',
        rewind      : true,
        gap         : '1rem',
        pagination  : false,
        fixedWidth  : 110,
        fixedHeight : 70,
        cover       : true,
        focus       : 'center',
        isNavigation: true,
        arrows      : false,
    };

    return (
        <div className={"wrapper " + classNames}>
            <Splide
                ref={(slider) => (slider1.current = slider)}
                className={'main_slide'}
                options={ mainOptions }
            >
                {photos.map((photo, index) => (
                    <SplideSlide
                        key={index}
                        className={"img_container"}
                    >
                        <img
                            className={'main_img'}
                            src={`/ProductsImages/${productId}/${photo}`} alt="Image 1"
                        />
                    </SplideSlide>
                ))}
            </Splide>
            <Splide
                ref={(slider) => (slider2.current = slider)}
                className={'thumb_slide'}
                options={ thumbsOptions }
            >
                {photos.map((photo, index) => (
                    <SplideSlide
                        key={index}
                        className={"rounded"}
                    >
                        <img
                            className={'thumb_img'}
                            src={`/ProductsImages/${productId}/${photo}`}
                            alt="Image 1"
                        />
                    </SplideSlide>
                ))}
            </Splide>
        </div>
    )
}

export default ProductDetailsSlideShow