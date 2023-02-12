import {useEffect, useRef} from "react";
import {Form, Image} from "react-bootstrap";
import {Col, Row} from "reactstrap";


const FormImages = ({files, setFiles}) => {
    //IMAGES START
    const IMAGES = ["Image 1", "Image 2", "Image 3", "Image 4", "Image 5", "image 6"];

    const imageContainer = useRef([]);

    useEffect(() => {
        imageContainer.current = imageContainer.current.slice(0, IMAGES.length);
    }, []);

    function onInputChange(event) {
        event.target.previousElementSibling.firstChild.nextSibling.src = URL.createObjectURL(event.target.files[0]);
        event.target.previousElementSibling.firstChild.style.display = "none"

        const fileReader = new FileReader()
        fileReader.onload = () => {
            URL.revokeObjectURL(imageContainer.current)
        }
    }
    //IMAGES END

    //FILE UPLOAD START
    const saveFile = (e) => {
        const index = e.target.parentElement.dataset.index;
        setFiles({
            ...files,
            [index]: e.target.files[0]
        });
    };
    //FILE UPLOAD END
    
    return  (<Row>{IMAGES.map((item, index) => (
            <Col xl={4} lg={6} md={6} key={index} className={"mb-3"}> 
                <Form.Group data-index={index}>
                    <div
                        className={"position-relative"}    
                        style={{
                            width: "100%",
                            aspectRatio: "1/0.8", 
                            boxShadow: "5px 3px 15px rgba(0, 0, 0, 0.3)", 
                            marginBottom: "5px",
                            borderRadius: "5px",
                            overflow: "hidden"
                        }}
                    >
                        <div
                            className={"position-absolute top-50 start-50 translate-middle"}
                        >
                            Add image
                        </div>
                        <img
                            src={"#"}
                            alt={""}
                            ref={el => imageContainer.current[index] = el}
                            style={{width: "100%", position: "relative", top: "50%", right: "50%", 
                                transform: "translate(50%, -50%)", overflow: "hidden"}}
                        />
                    </div>
                    <Form.Control
                        required={index === 0}
                        type={"file"}
                        onChange={(e) => {
                            onInputChange(e);
                            saveFile(e);
                        }}
                        accept="image/*"
                        aria-required={true}
                    >
                    </Form.Control>
            
                    <Form.Control.Feedback type={"invalid"}>
                        At least one image, no di*k pics!!!
                    </Form.Control.Feedback>
                </Form.Group>
            </Col>
        ))
        }</Row>
    )
}

export default FormImages;