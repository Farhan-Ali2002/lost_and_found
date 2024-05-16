import { Row, Col, Card, CardBody, CardTitle, CardText, CardImg } from "reactstrap";
import img from "../assets/images/broken-placeholder-image.png";

function ItemSingle(params) {
  const itemId = 2;
  return (
    <Row className="p-5">
      <div> <h2>Item Details</h2></div>
      <Col md={8}>
        {/* Image section */}
        <Card className="p-3">
          <CardBody>
            <CardImg top src={img} alt="Item" className="img-fluid" style={{ maxHeight: "70%" }} />
          </CardBody>
        </Card>
      </Col>
      <Col md={4}>
        {/* Details section */}
        <Card>
          <CardBody>
            <CardTitle tag="h3">Item Details</CardTitle>
            <CardText>
              <strong>Item Description:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </CardText>
            <CardText>
              <strong>Category:</strong> Electronics
            </CardText>
            <CardText>
              <strong>Title:</strong> Lost Phone
            </CardText>
            <CardText>
              <strong>Date:</strong> 2024-05-14
            </CardText>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}

export default ItemSingle;
