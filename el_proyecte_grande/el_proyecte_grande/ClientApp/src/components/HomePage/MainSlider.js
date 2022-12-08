import Carousel from 'react-bootstrap/Carousel'
import firstSlide from '../../images/first_slide_carousel.jpg'
import adSpaceImgBlack from '../../images/ad_space_img_black.png'


function MainSlider() {
    return (
        <Carousel className={"min-vw-100"}>
            <Carousel.Item>
                <img
                    style={{height: "65vh"}}
                    className="d-block m-auto"
                    src={firstSlide}
                    alt="First slide"
                />
                <Carousel.Caption>
                    <h5>First slide label</h5>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    style={{height: "65vh"}}
                    className="d-block m-auto"
                    src={adSpaceImgBlack}
                    alt="Second slide"
                />
                <Carousel.Caption>
                    <h5>Second slide label</h5>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    style={{height: "65vh"}}
                    className="d-block m-auto"
                    src="holder.js/800x400?text=Third slide&bg=e5e5e5"
                    alt="Third slide"
                />
                <Carousel.Caption>
                    <h5>Third slide label</h5>
                    <p>
                        Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                    </p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}

export default MainSlider;