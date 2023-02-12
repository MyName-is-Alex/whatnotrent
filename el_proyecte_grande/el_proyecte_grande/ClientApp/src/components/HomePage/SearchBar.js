import {Form, InputGroup} from "react-bootstrap";


const SearchBar = ({ setSearchStr }) => {
    
    const onChange = (e) => {
        setSearchStr(e.currentTarget.value)
    }
    return (
        <div style={{ marginTop: "17vh" }}>
            <InputGroup className={"mb-4 px-5 mx-auto"} style={{ width: "90vw" }}>
                <InputGroup.Text className={"px-4 py-3 bg-white border-0 shadow-lg"}>
                    <i className="bi bi-search"></i>
                </InputGroup.Text>
                <Form.Control 
                    className={"border-0 shadow-lg"}
                    placeholder={"type product name here..."}
                    onChange={onChange}
                />
            </InputGroup>
        </div>
    )    
}

export default SearchBar;