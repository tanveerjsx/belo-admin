import React from "react";
import left_image from "../../../assets/update-image/left_img.jpg";
import logo from "../../../assets/update-image/logo.jpg";
import { connect } from "react-redux";
// import {BrandName} from "../../../actions/auth"
import {
  Button,
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Input
} from "reactstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "./CompanyBrandName.scss";
import { registerBrand } from "../../../actions/brand";

class CreateBrandName extends React.Component {

  handleCompanyName = e => {
    this.setState({ companyName: e.target.value });
  };

  handleSubmit = () => {
    console.log('create brand',this.props)
    let brand ={
      company:this.state.companyName,
      brandName:this.props.brand.brand.brandName,
      brandStore:this.props.brand.brand.brandStore,
      industry:this.props.brand.brand.industry,
      owner: this.props.auth.user.id
    }
    console.log("brnad",brand)
    this.props.registerBrand(brand);
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.brand.brands.length!==nextProps.brand.brands.length) {
      this.props.history.push("/admin");
    }
  }

  render() {
    return (
      <React.Fragment>
        <Container className="main">
          <Row>
            <Col md="6">
              <Container className="left-section">
                <Container className="logo">
                  <img src={logo} className="logo-img" alt="logo" />
                </Container>
                <Container className="image-content">
                  Belo brings you new customers and helps you make each customer
                  the best customer
                </Container>
                <Container className="main-image-container">
                  <img
                    src={left_image}
                    alt="pic not found"
                    height="100%"
                    width="100%"
                  />
                </Container>
              </Container>
            </Col>

            <Col md="6">
              <Container className="right-section">
                <Col md="12">
                  {/* <Button color="info login-control-btn">
                  Sign in
                  </Button> */}
                  <Container className="form-container">
                    <Container className="sign-In-form">
                      {/* {this.props.auth.loginError && (
                        <p className="alert alert-danger mb-3 mr-sm-6 col-xs-offset-0 col-sm-offset-3">
                          {this.props.auth.loginError}
                        </p>
                      )} */}
                      <Container
                        className="heading"
                        style={{
                          width: "237px",
                          marginRight: "157px",
                          marginBottom: "10px",
                          textTransform:'none'
                        }}
                      >
                        What company is *BrandName* Under?
                      </Container>

                      <FormGroup className="mb-3 mr-sm-6 col-xs-offset-0 col-sm-offset-3">
                        <Input
                          className="input-rectangle full-name"
                          type="name"
                          style={{ boxShadow: "0 0 5px #dadada" }}
                          name="user name"
                          placeholder="Company"
                          onChange={this.handleCompanyName}
                        />
                      </FormGroup>
                      <span style={{ color: "white" }}>
                        <Button
                          className="next-button"
                          style={{ width: "79%", display: "block",height: '38px'}}
                          onClick={this.handleSubmit}
                        >
                          Next
                        </Button>
                      </span>
                      <Container
                        className="By-signing-up-you-ag"
                        style={{ padding: "0px", marginRight: "121px" }}
                      >
                        Joining an eisting Company?
                        <span className="text-style"> From here</span>
                      </Container>
                    </Container>
                  </Container>
                </Col>
              </Container>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    brand: state.brand,
    auth: state.auth
  };
};
const mapDispatchToProps = dispatch => {
  return {
    registerBrand: brand => dispatch(registerBrand(brand))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateBrandName);
