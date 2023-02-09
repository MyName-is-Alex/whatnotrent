import {Button} from "reactstrap";
import {useEffect, useState} from "react";
import Products from "../HomePage/Products";

const SortByButton = ({ option, setSortDirection, setSortBy, enumKey, sortByTemp, setSortByTemp, 
                          sortDirectionTemp, setSortDirectionTemp }) => {
    const upArrowActive = <i className="bi bi-arrow-up-circle-fill"></i>;
    const upArrowInactive = <i className="bi bi-arrow-up-circle"></i>;
    const downArrowActive = <i className="bi bi-arrow-down-circle-fill"></i>;
    const downArrowInactive = <i className="bi bi-arrow-down-circle"></i>;
    
    const [upArrowState, setUpArrowState] = useState(upArrowInactive)
    const [downArrowState, setDownArrowState] = useState(downArrowInactive)
    
    const onClick = (e) => {
        if (sortByTemp === e.currentTarget.value) {
            if (sortDirectionTemp === "0") {
                setSortDirectionTemp("1")
                setSortDirection("1")
            } else {
                setSortDirectionTemp("0")
                setSortDirection("0")
            }
        } else {
            setSortBy(e.currentTarget.value)
            setSortByTemp(e.currentTarget.value)
            setSortDirection("0")
            setSortDirectionTemp("0")
        }
    }
    
    return (
        <div>
            <Button 
                type={"button"}
                className={"w-100"}
                value={enumKey}
                onClick={onClick}
            >
                {option}
            </Button>
            {upArrowState}
            {downArrowState}
        </div>
    )
}

export default SortByButton;