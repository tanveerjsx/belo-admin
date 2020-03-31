import React from "react";
import {
  Container,
  Row,
  Col,
  InputGroup, InputGroupAddon, InputGroupText, Input,Button 
} from "reactstrap";
// core components
import AuthHeader from "components/Headers/AuthHeader.jsx";
class Pricing extends React.Component {
  render() {
    return (
      <>
        <Container>
          <Row className="justify-content-center">
            <Col  md={{ size: 10, offset: 2 }}>
              <p style={{margin:'50px'}}>you have no reward lines</p>
              <h3>create a new reward line</h3>
              <InputGroup>
                <Input placeholder="Reward Name" />
                <InputGroupAddon addonType="append">
                  <InputGroupText>Stamps required 8</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <Input style={{marginTop:'5px'}} type="text" name="description" id="dec" placeholder="Describe the Prize" />
              <div style={{marginTop:'10px'}}>
                <Button color="primary">Start Reward</Button>
             </div>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
export default Pricing;
