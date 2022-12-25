import Spinner from 'react-bootstrap/Spinner';

const Loading = () => {
    return (
        <div style={{width: "fit-content", minHeight: "150px", margin: "auto", lineHeight: "150px"}}>
            <Spinner animation="border" variant="warning"/>
        </div>
    )
}

export default Loading;