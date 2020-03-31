/*!

=========================================================
* Argon Dashboard PRO React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
// // nodejs library that concatenates classes
// import classnames from "classnames";
// // JavaScript library that creates a callendar with events
// import { AccountInformation } from "@fullcalendar/core";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import interaction from "@fullcalendar/interaction";
// // react component used to create sweet alerts
// import ReactBSAlert from "react-bootstrap-sweetalert";
// reactstrap components
import "./settingInformation.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
// react component used to create sweet alerts
import ReactBSAlert from "react-bootstrap-sweetalert";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col,
  Container,
  toggle,
  activeTab,
  FormGroup,
  Input
} from "reactstrap";

// core components

// import { events } from "variables/general.jsx";

class SettingInformation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accountInfo: true,
      basicInfo : {
        name:'',
        email:''
      },
      changePassword : {
        current: '',
        new:'',
        confirm:''
      },
      industry : {
        food:'',
        coffee:''
      }
    }
    }; 
    onChangeBasicInfo = e => {
      let basicInfo = { ...this.state.basicInfo};
      basicInfo[e.target.name] = e.target.value;
      this.setState({
        basicInfo
      });
    };
    onChangePassword = e => {
      let changePassword = { ...this.state.changePassword};
      changePassword[e.target.name] = e.target.value;
      this.setState({
        changePassword
      });
    };
    onChangeIndustry = e => {
      let industry = { ...this.state.industry};
      industry[e.target.name] = e.target.value;
      this.setState({
        industry
      });
      console.log('industry', industry)
    };
  // openAccountInfo() {
  //   this.setState({
  //     accountInfo: !this.state.accountInfo
  //   });
  //   console.log(this.state.accountInfo);
  // }

  state = {
    alert: null
  };
  // this function will copy to clipboard an entire table,
  // so you can paste it inside an excel or csv file
  componentDidMount = () => {
    const FloatLabel = (() => {
      const handleFocus = e => {
        const target = e.target;
        target.parentNode.classList.add("active");
      };

      // remove active class and placeholder
      const handleBlur = e => {
        const target = e.target;
        if (!target.value) {
          target.parentNode.classList.remove("active");
        }
        target.removeAttribute("placeholder");
      };

      // register events
      const bindEvents = element => {
        const floatField = element.querySelector("input");
        floatField.addEventListener("focus", handleFocus);
        floatField.addEventListener("blur", handleBlur);
      };

      // get DOM elements
      const init = () => {
        const floatContainers = document.querySelectorAll(".float-container");

        floatContainers.forEach(element => {
          if (element.querySelector("input").value) {
            element.classList.add("active");
          }

          bindEvents(element);
        });
      };

      return {
        init: init
      };
    })();

    FloatLabel.init();
  };
  copyToClipboardAsTable = el => {
    var body = document.body,
      range,
      sel;
    if (document.createRange && window.getSelection) {
      range = document.createRange();
      sel = window.getSelection();
      sel.removeAllRanges();
      try {
        range.selectNodeContents(el);
        sel.addRange(range);
      } catch (e) {
        range.selectNode(el);
        sel.addRange(range);
      }
      document.execCommand("copy");
    } else if (body.createTextRange) {
      range = body.createTextRange();
      range.moveToElementText(el);
      range.select();
      range.execCommand("Copy");
    }
    this.setState({
      alert: (
        <ReactBSAlert
          success
          style={{ display: "block", marginTop: "-100px" }}
          title="Good job!"
          onConfirm={() => this.setState({ alert: null })}
          onCancel={() => this.setState({ alert: null })}
          confirmBtnBsStyle="info"
          btnSize=""
        >
          Copied to clipboard!
        </ReactBSAlert>
      )
    });
  };
  render() {
    return (
      <>
        <div
          className="row"
          style={{
            paddingTop: 100,
            marginLeft: "0",
            marginRight: "0"
          }}
        >
          <div className="col-md-10 offset-md-2 justify-content-center">
            <Container style={{ paddingLeft: "30px",minHeight:"78vh" }}>
              <div class="tab" style={{ paddingLeft: "13px" }}>
                <button
                  class="tablinks"
                  style={{
                    opacity: '0.4',
                    fontFamily: 'Montserrat',
                    fontWeight: '500',
                    color: '#222b45',
                    boxShadow: "0 0 0 0 white",
                    outline: "none",
                    borderBottom: this.state.accountInfo
                      ? "2px solid black"
                      : "none",
                    padding: "0px",
                    marginRight: "22px",
                    fontFamily: 'Montserrat',
                    fontWeight: '500',
                    color: '#222b45',
                  }}
                  onClick={() => {
                    this.setState({ accountInfo: true });
                  }}
                >
                  Account 
                </button>
                <button
                  class="tablinks"
                  style={{

                    boxShadow: "0 0 0 white",
                    outline: "none",
                    borderBottom: this.state.accountInfo
                      ? "none"
                      : "2px solid black",
                    padding: "0px",
                    fontFamily: 'Montserrat',
                    fontWeight: '500',
                    color: '#222b45',
                  }}
                  onClick={() => {
                    this.setState({ accountInfo: false });
                  }}
                >
                  Business info
                </button>
              </div>

              <div
                id="Account"
                class="tabcontent"
                style={{ display: this.state.accountInfo ? "block" : "none" }}
              >
                <p
                  className="basic-text"
                  style={{
                    paddingTop: "10px",
                    fontFamily: "inherit",
                    wordSpacing: "2px",
                    fontFamily: 'Montserrat',
                    fontWeight: '500',
                    color: '#222b45',
                  }}
                >
                  Basic info
                </p>
                <div
                  id="floatContainer1"
                  style={{ padding: "0px", width: "400px" }}
                  class="float-container"
                >
                  <label
                    onClick={() => {
                      let nameInput = ReactDOM.findDOMNode(this.refs.nameInput);
                      if (nameInput) {
                        nameInput.focus();
                      }
                    }}
                    for="nameInput"
                    style={{ marginLeft: "10px", cursor: "text" ,fontFamily: 'Montserrat', }}
                  >
                    Name
                  </label>
                  <input
                    ref="nameInput"
                    type="text"
                    id="floatField1"
                    style={{
                      borderRadius: "7px",
                      paddingLeft: "10px",
                      padding: "19px 10px 5px",
                      fontFamily: 'Montserrat',
                    }}
                    onChange = {this.onChangeBasicInfo}
                  />
                </div>
                <div
                  id="floatContainer1"
                  style={{ padding: "0px", width: "400px" }}
                  class="float-container"
                >
                  <label
                    onClick={() => {
                      let mailInput = ReactDOM.findDOMNode(this.refs.mailInput);
                      if (mailInput)
                        // {
                        mailInput.focus();
                      // console.log('focus')
                      // }
                    }}
                    for="mailInput"
                    style={{ marginLeft: "10px", cursor: "text",   fontFamily: 'Montserrat', }}
                  >
                    Email
                  </label>
                  <input
                    ref="mailInput"
                    type="email"
                    id="floatField1"
                    style={{
                      borderRadius: "7px",
                      paddingLeft: "10px",
                      padding: "19px 10px 5px",
                      fontFamily: 'Montserrat',
                    }}
                    onChange = {this.onChangeBasicInfo}
                  />
                </div>
                <Button
                  className = "update-info"
                  style={{
                    marginTop: "10px",
                    wordSpacing: "-1px",
                    width: "205px",
                    fontFamily: 'Montserrat',
                  }}
                >
                  Update info
                </Button>

                <p className="basic-text" style={{ marginTop: "35px",   fontFamily: 'Montserrat', }}>
                  Change Password
                </p>
                <div
                  id="floatContainer1"
                  style={{ padding: "0px", width: "400px",   fontFamily: 'Montserrat', }}
                  class="float-container"
                >
                  <label
                    onClick={() => {
                      let currentPassword = ReactDOM.findDOMNode(
                        this.refs.currentPassword
                      );
                      if (currentPassword) {
                        currentPassword.focus();
                      }
                    }}
                    for="currentPassword"
                    style={{ marginLeft: "10px", cursor: "text",   fontFamily: 'Montserrat', }}
                  >
                    Current Password
                  </label>
                  <input
                    ref="currentPassword"
                    type="password"
                    id="floatField1"
                    style={{
                      borderRadius: "7px",
                      paddingLeft: "10px",
                      padding: "19px 10px 5px",
                      fontFamily: 'Montserrat',
                    }}
                    onChange = {this.onChangePassword}
                  />
                </div>
                <div
                  id="floatContainer1"
                  style={{ padding: "0px", width: "400px",   fontFamily: 'Montserrat', }}
                  class="float-container"
                >
                  <label
                    onClick={() => {
                      let newPassword = ReactDOM.findDOMNode(
                        this.refs.newPassword
                      );
                      if (newPassword) {
                        newPassword.focus();
                      }
                    }}
                    for="newPassword"
                    style={{ marginLeft: "10px", cursor: "text",   fontFamily: 'Montserrat', }}
                  >
                    New Password
                  </label>
                  <input
                    ref="newPassword"
                    type="password"
                    id="floatField1"
                    style={{
                      borderRadius: "7px",
                      paddingLeft: "10px",
                      padding: "19px 10px 5px",
                      fontFamily: 'Montserrat',
                    }}
                    onChange = {this.onChangePassword}
                  />
                </div>
                <div
                  id="floatContainer1"
                  style={{ padding: "0px", width: "400px",   fontFamily: 'Montserrat', }}
                  class="float-container"
                >
                  <label
                    onClick={() => {
                      let confirmPassword = ReactDOM.findDOMNode(
                        this.refs.confirmPassword
                      );
                      if (confirmPassword) {
                        confirmPassword.focus();
                        // alert('focus')
                      }
                    }}
                    for="confirmPassword"
                    style={{ marginLeft: "10px", cursor: "text" ,   fontFamily: 'Montserrat',
                    }}
                  >
                    Confirm Password
                  </label>
                  <input
                    ref="confirmPassword"
                    type="password"
                    id="floatField1"
                    style={{
                      borderRadius: "7px",
                      paddingLeft: "10px",
                      padding: "19px 10px 5px"
                    }}
                    onChange = {this.onChangePassword}
                  />
                </div>
                <Button
                  className = "update-info"
                  style={{
                    marginTop: "10px",
                    wordSpacing: "-1px",
                    width: "205px",
                    fontFamily: 'Montserrat',
                  }}
                >
                  Change Password
                </Button>
              </div>

              <div
                id="Account"
                class="tabcontent"
                style={{ display: this.state.accountInfo ? "none" : "block" }}
              >
                <Container style={{ padding: "0px",minHeight:"78vh" }}>
                  <p
                    style={{
                      paddingTop: "10px",
                      fontFamily: "inherit",
                      fontFamily: 'Montserrat',
                    }}
                  >
                    Industry
                  </p>
                  <FormGroup className="" style={{ width: "320px" }}>
                    <Input
                      onChange={this.handleBrandInput}
                      type="select"
                      onChange = {this.onChangeIndustry}
                      style={{
                        boxShadow: "0 0 3px #dadada",
                        fontSize: "12px",
                        fontFamily: 'Montserrat',
                        height:'37px',
                        radius:'8px',
                        fontWeight:'600'
                      }}
                      name="industry"
                      id="exampleSelect"
                    >
                      <option value={"Food & Beverages"} >Food & Beverages</option>
                      <option value={"Vegetables"}>Vegetables.</option>
                      <option value={"Fruits"}>Fruits</option>
                      <option value={"Grains, Beans and Nuts"}>Grains, Beans and Nuts</option>
                      <option value={"Fish and Seafood"}>Fish and Seafood</option>
                    </Input>
                  </FormGroup>
                  <FormGroup className="" style={{ width: "320px" }}>
                    <Input
                      onChange={this.handleBrandInput}
                      type="select"
                      onChange = {this.onChangeIndustry}
                      style={{
                        boxShadow: "0 0 3px #dadada",
                        fontSize: "12px",
                        fontFamily: 'Montserrat',
                        height:'37px',
                        fontWeight:'600',
                        radius:'8px'
                      }}
                      name="industry"
                      id="exampleSelect"
                    >
                      <option value={"Coffee Shop"}>Coffee Shop</option>
                      <option value={"Pumpkin Spice"}>Pumpkin Spice.</option>
                      <option value={"Mocha"}>Mocha. ..</option>
                      <option value={"Hazelnut"}>Hazelnut.</option>
                      <option value={"French Vanilla"}>French Vanilla.</option>
                    </Input>
                  </FormGroup>
                  <Button
                    className = "update-info"
                    style={{
                      marginTop: "10px",
                      fontFamily: 'Montserrat',
                      wordSpacing: "-1px",
                      width: "205px"
                    }}
                  >
                    Update info
                  </Button>
                </Container>
              </div>
            </Container>
          </div>
        </div>
      </>
    );
  }
}

export default SettingInformation;
