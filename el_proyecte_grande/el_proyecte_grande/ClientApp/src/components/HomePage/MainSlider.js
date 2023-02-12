import Carousel from 'react-bootstrap/Carousel'
import firstSlide from '../../images/first_slide_carousel.jpg'
import adSpaceImgBlack from '../../images/ad_space_img_black.png'
import thirdSlide from '../../images/Logo/png/logo-white-third-slide.png'
import './MainSlider.css'

function MainSlider() {
    return (
        <Carousel 
            className="w-75 mx-auto mt-5" style={{ backgroundColor: "black" }} 
            onMouseEnter={() => {onMouseActionShadow("enter")}} 
            onMouseLeave={() => {onMouseActionShadow("leave")}}
        >
            <Carousel.Item>
                <img
                    style={{height: "25vh"}}
                    className="d-block m-auto"
                    src={firstSlide}
                    alt="First slide"
                />
                <div className={"image_shadow"}></div>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    style={{height: "25vh"}}
                    className="d-block m-auto pt-4"
                    src={adSpaceImgBlack}
                    alt="Second slide"
                />
                <div className={"image_shadow"}></div>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    style={{height: "25vh"}}
                    className="d-block m-auto pt-4"
                    src={thirdSlide}
                    alt="Third slide"
                />
                <div className={"image_shadow"}></div>
            </Carousel.Item>
        </Carousel>
    );
}

const onMouseActionShadow = (action) => {
    const boxShadow = document.querySelectorAll(".image_shadow");
    boxShadow.forEach((x) => {
        if (action === "enter") x.classList.add("image_shadow_hover")
        else if (action === "leave") x.classList.remove("image_shadow_hover")
    })
}

export default MainSlider;