
import React from "react";
import left_image from "../../../assets/update-image/left_img.jpg";
import logo from "../../../assets/update-image/logo.jpg";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { register} from "../../../actions/auth.js";
import {
  Button,
  Container,
  Row,
  Col,
  FormGroup,
  Input,
 Spinner
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./register.scss";

const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}


class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: null,
      email: null,
      password: null,
      errors: {
        fullName: "",
        email: "",
        password: "",
      },
    };
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.auth.loggedInStatus) {
      this.props.history.push("/createBrand");  
    }
  }

  handleChange = event => {
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case "fullName":
        errors.fullName =
          value.length < 5 ? "Full Name must be 5 characters long!" : "";
        break;
      case "email":
        errors.email = validEmailRegex.test(value) ? "" : "Email is not valid!";
        break;
      case "password":
          {
            this.setState({password:event.target.value})
            errors.password =
            value.length < 8 ? "Password must be 8 characters long!" : "";
            break;
          }
      default:
        break;
    }

    this.setState({ errors, [name]: value }, () => {
      console.log(errors);
    }); 
  };

  handleSubmit = event => {
    if (validateForm(this.state.errors)) {
      let userData = {
        name: this.state.fullName,
        email: this.state.email,
        password: this.state.password,
      };
      this.props.signUp(userData.name, userData.email, userData.password);
    } else {
      console.error("Invalid Form");
    }
  };


  render() {
    const {errors} = this.state;
    const{auth}=this.props;
    console.log("auth",auth);
    return (
      <>
        <Container className="main">
         {auth&&auth.loading &&  <Spinner color="primary"
         style={{ display: auth.loading ? "block" : "none",
         position:'absolute',
         top: '40%',
         zIndex: '3',
         left: '44%',
         width: '80px',
         height: '80px' }} />} 
          {auth&&!auth.loading && <Row>
            <Col md="6">
              <Container className="left-section">
                <Container className="logo">
                  <img
                    src={logo}
                    className="logo-img"
                    alt="logo"
                  />
                </Container>
                <Container className="image-content">
                  Belo brings you new customers and helps you make each customer
                  the best customer
                </Container>
                <Container className="main-image-container">
                  <img
                    src={left_image}
                    alt="Smiley flower"
                    height="100%"
                    width="100%"
                  />
                </Container>
              </Container>
            </Col>

            <Col md="6">
              <div className="right-section">
                  <Link to="/login">
                    <Button color="info login-control-btn">Sign in</Button>
                  </Link>
                  <Container className="form-container">
                    <Container className="sign-In-form">
                      {this.props.auth.loginError && (
                        <p className="alert alert-danger mb-3 mr-sm-6 col-xs-offset-0 col-sm-offset-3">
                          {this.props.auth.loginError}
                        </p>
                      )}
                      <div className="start-now-content">
                        Start now for free
                      </div>
                      <FormGroup className="mb-3 mr-sm-6 col-xs-offset-0 col-sm-offset-3">
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
                      </FormGroup>
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
                        {errors.email.length > 0 && 
                        <span className='error'style = {{color:"red",fontSize:"12px"}}>{errors.email}</span>}
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
                        {errors.password.length > 0 && 
                      <span className='error' style = {{color:"red",fontSize:"12px"}}>{errors.password}</span>}
                      </FormGroup>
                      <span style={{ color: "white" }}>
                        <Button
                         className = "rectangle-btn next"
                          onClick={() => this.handleSubmit()}
                        >
                          Next
                        </Button>
                      </span>
                      <div className="By-signing-up-you-ag">
                        By singing up you agree to <span className="text-style">Terms of Services</span> 
                      </div>
                    </Container>
                  </Container>
              </div>
            </Col>
          </Row>}
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
    signUp: (name, email, password) => dispatch(register(name, email, password)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);