import Category from "./Category";
import {Col, Row} from "reactstrap";


const Categories = ({ setCategory, formCategories }) => {
    return (
        <Row className={"mt-4"}>
            {formCategories.map((category) => (
                <Col 
                    key={category["id"]}
                    xl={2}
                    md={3}
                    sm={4}
                    xs={12}
                >
                    <Category
                        setCategory={setCategory}
                        category={category}
                    />
                </Col>
            ))}
        </Row>
    )
}

export default Categories