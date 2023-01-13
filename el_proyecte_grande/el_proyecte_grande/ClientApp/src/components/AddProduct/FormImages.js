import {useEffect, useRef} from "react";
import {Form} from "react-bootstrap";


const FormImages = ({files, setFiles}) => {
    //IMAGES START
    const IMAGES = ["Image 1", "Image 2", "Image 3", "Image 4", "Image 5", "image 6"];

    const imageContainer = useRef([]);

    useEffect(() => {
        imageContainer.current = imageContainer.current.slice(0, IMAGES.length);
    }, []);

    function onInputChange(event) {
        event.target.nextElementSibling.src = URL.createObjectURL(event.target.files[0]);

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
    
    return  IMAGES.map((item, index) => (
            <Form.Group key={index} data-index={index}>
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
                <img
                    src={"#"}
                    alt={"your image"}
                    ref={el => imageContainer.current[index] = el}
                    style={{ width: "20vw" }}
                />
                <Form.Control.Feedback type={"invalid"}>
                    At least one image, no di*k pics!!!
                </Form.Control.Feedback>
            </Form.Group>
        ))
}

export default FormImages;