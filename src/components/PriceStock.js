import NumberFormat from "react-number-format";

const PriceStock = (props) => {
  const { price, aQuantity, sQuantity } = props;

  return (
    <div className="price-stock-seller">
      <span className="item-data-price-modal">
        <NumberFormat
          value={price}
          displayType={"text"}
          thousandSeparator={"."}
          decimalSeparator={","}
          prefix={"$"}
        />
      </span>
      <div>{aQuantity + " "} unidades disponibles</div>
      <div>{sQuantity + " "} unidades vendidas</div>
    </div>
  );
};

export default PriceStock;
