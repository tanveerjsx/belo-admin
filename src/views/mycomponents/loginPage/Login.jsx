import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./loginPage.scss";
import left_image from "../../../assets/update-image/left_img.jpg";
import logo from "../../../assets/update-image/logo.jpg";
import { connect } from "react-redux";
import { login } from "../../../actions/auth.js";
import { Button, Container, Row, Col, FormGroup, Input, Spinner } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);
const validateForm = errors => {
  let valid = true;
  Object.values(errors).forEach(val => val.length > 0 && (valid = false));
  return valid;
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      errors: {
        email: "",
        password: ""
      }
    };
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps.auth.loggedInStatus);
    if (nextProps.auth.loggedInStatus) {
      this.props.history.push("/admin");
    }
  }

  // handlePassword = e => {
  //   this.setState({
  //     password: e.target.value
  //   });
  // };

  // handleEmail = e => {
  //   this.setState({
  //     email: e.target.value
  //   });
  // };

  handleChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    console.log(event.target);
    let errors = this.state.errors;
    console.log(event.target.value);
    console.log("changed field is ", name);
    switch (name) {
      case "email": {
        console.log("Checking", value);
        errors.email = validEmailRegex.test(value) ? "" : "Email is not valid!";
        break;
      }
      case "password":
        errors.password = value.length < 8 ? "Password must be 8 characters long!" : "";
        break;
      default:
        break;
    }

    this.setState({ errors, [name]: value }, () => {
      console.log(errors);
    });
  };
  handleSubmit = event => {
    // event.preventDefault();
    if (validateForm(this.state.errors)) {
      console.info("Valid Form");
      let userData = {
        email: this.state.email,
        password: this.state.password
      };
      this.props.login(userData.email, userData.password);
    } else {
      console.error("Invalid Form");
    }
  };
  render() {
    const { errors } = this.state;
    const { auth } = this.props;
    console.log("auth", auth);
    return (
      <>
        <Container className="main">
          {auth && auth.loading && (
            <Spinner
              color="primary"
              style={{
                display: auth.loading ? "block" : "none",
                position: "absolute",
                top: "40%",
                zIndex: "3",
                left: "44%",
                width: "80px",
                height: "80px"
              }}
            />
          )}
          {auth && !auth.loading && (
            <Row>
              <Col md="6">
                <Container className="left-section">
                  <Container className="logo">
                    <img src={logo} className="logo-img" alt="logo" />
                  </Container>
                  <Container className="image-content">
                    Belo brings you new customers and helps you make each customer the best customer
                  </Container>
                  <Container className="main-image-container">
                    <img src={left_image} alt="Smiley flower" height="100%" width="100%" />
                  </Container>
                </Container>
              </Col>

              <Col md="6">
                <div className="right-section">
                  <Link to="/register">
                    <Button color="info login-control-btn">Sign up</Button>
                  </Link>
                  <Container className="form-container">
                    <Container className="sign-In-form">
                      {this.props.auth.loginError && (
                        <p className="alert alert-danger mb-3 mr-sm-6 col-xs-offset-0 col-sm-offset-3">
                          {this.props.auth.loginError}
                        </p>
                      )}
                      <div className="start-now-content">Sign In</div>
                      {/* <FormGroup className="mb-3 mr-sm-6 col-xs-offset-0 col-sm-offset-3">
                        <Input
                          className="input-rectangle full-name"
                          style={{ boxShadow: "0 0 5px #dadada" }}
                          type="fullName"
                          name="fullName"
                          onChange={this.handleChange}
                          placeholder="Full Name"
                        />
                        {errors.fullName.length > 0 && 
                         <span className='error' style = {{color:"red",fontSize:"12px"}}>{errors.fullName}</span>}
                      </FormGroup> */}
                      <FormGroup className="mb-3 mr-sm-6 col-xs-offset-0 col-sm-offset-3">
                        <Input
                          className="input-rectangle full-name"
                          style={{ boxShadow: "0 0 5px #dadada" }}
                          type="email"
                          name="email"
                          onChange={this.handleChange}
                          id="exampleEmail"
                          placeholder="Email"
                        />
                        {errors.email.length > 0 && (
                          <span className="error" style={{ color: "red", fontSize: "12px" }}>
                            {errors.email}
                          </span>
                        )}
                      </FormGroup>
                      <FormGroup className="mb-3 mr-sm-6 col-xs-offset-0 col-sm-offset-3">
                        <Input
                          className="input-rectangle full-name"
                          style={{ boxShadow: "0 0 5px #dadada" }}
                          type="password"
                          name="password"
                          id="examplePassword"
                          placeholder="Password"
                          onChange={this.handleChange}
                        />
                        {errors.password.length > 0 && (
                          <span className="error" style={{ color: "red", fontSize: "12px" }}>
                            {errors.password}
                          </span>
                        )}
                      </FormGroup>
                      <span style={{ color: "white" }}>
                        <Button className="rectangle-btn next" onClick={() => this.handleSubmit()}>
                          Next
                        </Button>
                      </span>
                      <div className="By-signing-up-you-ag">
                        By singing up you agree to{" "}
                        <span className="text-style">Terms of Services</span>
                      </div>
                    </Container>
                  </Container>
                </div>
              </Col>
            </Row>
          )}
        </Container>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};
const mapDispatchToProps = dispatch => {
  return {
    login: (email, password) => dispatch(login(email, password))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
