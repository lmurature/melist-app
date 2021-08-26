import { Button } from "react-bootstrap";

const LinkToMeli = (props) => {
  const { permalink } = props;
  return (
    <Button
      variant="primary"
      className="meli-permalink-button"
      size="lg"
      href={permalink}
      target="_blank"
    >
      <div className="button-msg">Ver en Mercado Libre</div>
    </Button>
  );
};

export default LinkToMeli;
