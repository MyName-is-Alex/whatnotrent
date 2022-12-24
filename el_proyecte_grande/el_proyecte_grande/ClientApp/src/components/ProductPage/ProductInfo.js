

const ProductInfo = ({ product, className }) => {
    return (
        <div className={className}>
            <h2 className={"bg-white p-3 m-0"}>{product["name"]}</h2>
            <div className={"container bg-white p-3 mt-3"}>
                <p className={"mt-5"}>Disponibility</p>
                <div className={"row justify-content-center"}>
                    <p className={"col-4"}>From</p>
                    <p className={"col-1"}>-</p>
                    <p className={"col-4"}>To</p>
                </div>
                <div className={"row justify-content-center"}>
                    <p className={"col-4"}>{product["startDate"]}</p>
                    <p className={"col-1"}></p>
                    <p className={"col-4"}>{product["endDate"]}</p>
                </div>
            </div>
            <div className={"bg-white p-3 mt-3"}>
                <p>Details</p>
                <p>{product["description"]}</p>
            </div>
        </div>
    )
}

export default ProductInfo;