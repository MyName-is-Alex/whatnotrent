import {Col, Row} from "reactstrap";
import SortByButton from "./SortByButton";
import {useEffect, useState} from "react";


const SortByComponent = ({ setSortBy, setSortDirection, sortByEnum, sortDirectionEnum, category, sortBy, sortDirection }) => {
    const [sortByTemp, setSortByTemp] = useState(sortBy)
    const [sortDirectionTemp, setSortDirectionTemp] = useState(sortDirectionEnum)
    
    if (category === "1003") {
        return <p>Sorting option is available after you choose a category</p>
    }
    return (
        <Row className={"mt-3"}>
            {Object.keys(sortByEnum).map((key) => (
                <Col key={key}>
                    <SortByButton 
                        option={sortByEnum[key]}
                        sortByTemp={sortByTemp}
                        setSortByTemp={setSortByTemp}
                        setSortBy={setSortBy}
                        setSortDirection={setSortDirection}
                        sortDirectionTemp={sortDirectionTemp}
                        setSortDirectionTemp={setSortDirectionTemp}
                        enumKey={key}
                    />
                </Col>
            ))}     
            <p>{sortBy}</p>
        </Row>
    )
}

export default SortByComponent;