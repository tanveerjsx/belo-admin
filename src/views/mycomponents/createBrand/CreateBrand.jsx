import React from "react";
import left_image from "../../../assets/update-image/left_img.jpg";
import logo from "../../../assets/update-image/logo.jpg";
import { connect } from "react-redux";
import { saveBrandRequest } from "../../../actions/brand.js";
import {
  Button,
  Container,
  Row,
  Col,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label
} from "reactstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "./CreateBrand.scss";
import Axios from "axios";

class CreateBrand extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brand: {
        industry: null,
        brandName: "",
        brandStore: ""
      }
    };
  }
  componentWillReceiveProps(nextProps) {
    // console.log("Next props are",nextProps.brand.brand)
    // console.log("props are",this.props.brand.brand)
    // console.log("condition is ",nextProps.brand.brand != this.props.brand.brand)

    if (nextProps.brand.brand && nextProps.brand.brand != this.props.brand.brand) {
      this.props.history.push("/CompanyBrandName");
    }
  }

  async componentDidMount() {
    try{
    let result = await Axios.get(`${process.env.REACT_APP_APIURL}/industry`);
    if (result.data.status) {
      this.setState({
        industries: result.data.data
      });
    }
  }catch(err){
     console.log(err);
  }
  }
  handleBrandInput = e => {
    let brand = { ...this.state.brand };
    brand[e.target.name] = e.target.value;
    this.setState({
      brand
    });
  };

  handleSubmit = () => {
    this.props._saveBrand(this.state.brand);
  };
  habdleIndustryChange = industry => {
    this.setState({
      ...this.state.brand,
      industry: industry.id
    });
  };
  render() {
    return (
      <>
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
                  {/* <Button color="info login-control-btn">Sign in</Button> */}
                  <Container className="form-container">
                    <Container className="sign-In-form">
                      {/* {this.props.auth.loginError && (
                        <p className="alert alert-danger mb-3 mr-sm-6 col-xs-offset-0 col-sm-offset-3">
                          {this.props.auth.loginError}
                        </p>
                      )} */}

                      <Container className="heding">Create a Brand</Container>

                      <FormGroup className="">
                        <Input
                          className="input-rectangle full-name"
                          onChange={this.handleBrandInput}
                          type="select"
                          style={{ boxShadow: "0 0 3px #dadada" }}
                          name="industry"
                          id="exampleSelect"
                        >
                          {this.state.industries &&
                            this.state.industries.length > 0 &&
                            this.state.industries.map(industry => (
                              <option
                                value={industry.id}
                                onChange={this.habdleIndustryChange}
                              >
                                {industry.industry_name}
                              </option>
                            ))}
                        </Input>
                      </FormGroup>
                      <FormGroup className="">
                        <Input
                          className="input-rectangle full-name"
                          onChange={this.handleBrandInput}
                          style={{ boxShadow: "0 0 5px #dadada" }}
                          name="brandName"
                          id="exampleEmail"
                          placeholder="Brand name"
                        />
                      </FormGroup>
                      <InputGroup
                        className="signUpInput"
                        style={{ width: "330px" }}
                      >
                        <Input
                          className="input-rectangle full-name"
                          style={{ boxShadow: "0 0 5px #dadada" }}
                          onChange={this.handleBrandInput}
                          placeholder="Store Name"
                          name="brandStore"
                        />
                        <InputGroupAddon
                          addonType="append"
                          style={{ boxShadow: "0 0 5px #dadada" }}
                        >
                          <InputGroupText className="rectangle">
                            .BeloApp.com!
                          </InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                      <span style={{ color: "white" }}>
                        <Button
                          className="rectangle-btn next"
                          onClick={() => this.handleSubmit()}
                          color="primary"
                          style={{
                            width: "79%",
                            display: "block",
                            marginTop: "18px"
                          }}
                        >
                          Next
                        </Button>
                      </span>
                      <div className="By-signing-up-you-ag">
                        Joining an existing Company?{" "}
                        <span className="text-style">From here</span>
                      </div>
                    </Container>
                  </Container>
                </Col>
              </Container>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
const mapStateToProps = state => {
  return {
    auth: state.auth,
    brand: state.brand
  };
};
const mapDispatchToProps = dispatch => {
  return {
    _saveBrand: brand => dispatch(saveBrandRequest(brand))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateBrand);
