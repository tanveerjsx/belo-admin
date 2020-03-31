import React from "react";
// import Pagination from "react-js-pagination";
// require("bootstrap/less/bootstrap.less");
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Input,
  Table,
  CustomInput,
  Modal,
  ModalBody,
} from "reactstrap";
import "./branch.css";
import { connect } from "react-redux";
import {
  registerBranch,
  updateBranch,
  deleteBranch
} from "../../../actions/branch";
class Branch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      branchName: "",
      streetName: "",
      googlePin: "",
      Dine_in: false,
      takeaway: false,
      delivery: false,
      errorMessage: "",
      checked: false,
      model: false,
      updateBranch: true,
      startBranch: true,
      updateBranch: {}
    };
    // this.handleChangeName = this.handleChangeName.bind(this);
    // this.handleChangeStreet = this.handleChangeStreet.bind(this);
    // this.handleChangeGooglePin = this.handleChangeGooglePin.bind(this);
    // this.handleChangeServingType = this.handleChangeServingType.bind(this);
    // this.handleSave = this.handleSave.bind(this);
  }
  handleModel = () => {
    this.setState({
      model: !this.state.model,
      updateBranch: false,
      startBranch: true
    });
  };  
  UpdateBranch = branch => {
    let updateBranch = { ...this.state.updateBranch };
    updateBranch = branch;
    this.setState({
      model: !this.state.model,
      updateBranchData: true,
      startBranch: false,
      updateBranch
    });
  };

  toggle = () => {
    this.setState({ model: !this.state.model });
  };

  handleChangeData = e => {
    let updateBranch = { ...this.state.updateBranch };
    updateBranch[e.target.name] = e.target.value;
    this.setState({
      updateBranch
    });
  };

  handleChangeServingType = (e) =>{
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSave = () => {
    if (!this.state.branchName) {
      this.setState({
        errorMessage: "branch name required"
      });
    } else if (!this.state.streetName) {
      this.setState({
        errorMessage: "street name is required "
      });
    } else if (
      !this.state.Dine_in &&
      !this.state.delivery &&
      !this.state.takeaway
    ) {
      this.setState({
        errorMessage: "service type is  required"
      });
    } else {
      let branch = {
        name: this.state.branchName,
        address: this.state.streetName,
        latitude: "",
        longitude: "",
        Dine_in: this.state.Dine_in,
        takeaway: this.state.takeaway,
        delivery: this.state.delivery
      };
      this.props.registerBranch(branch);
    }
  }

  deleteBranch = branch => {
    this.props.deleteBranch(branch.id);
  };

  renderBranch(branches) {
    return (
      <Table borderless>
        <thead>
          <tr>
            <th className="table-head td">Branch Name</th>
            <th className="table-head td">Country</th>
            <th className="table-head td">Publicity</th>
            <th className="table-head td">Status</th>
            <th className="table-head td">Access</th>
            <th className="table-head td">Actions</th>
          </tr>
        </thead>
        <tbody>
          {branches.map((branch,index) => {
            return (
              <tr key = {index.id}>
                <td className="table-body-content ">{branch.branch_name}</td>
                <td className="table-body-content ">{branch.Address}</td>
                <td className="table-body-content ">{branch.Publicty}</td>
                <td className="table-body-content ">{branch.Status}</td>
                <td className="table-body-content ">{branch.Access}</td>
                <td className="table-body-content">
                  <button
                    onClick={() => this.UpdateBranch(branch)}
                    style={{
                      border: "none",
                      outline: "none",
                      backgroundColor: "#ffffff"
                    }}
                  >
                    <i class="fas fa-user-edit"></i>
                  </button>
                  <button
                    onClick={() => this.deleteBranch(branch)}
                    style={{
                      outline: "none",
                      border: "none",
                      backgroundColor: "#ffffff"
                    }}
                  >
                    <i class="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  }
  render() {
    let { branch } = this.props;
    return (
      <>
        <Container>
          <Row className="justify-content-center">
            <Col lg={{ size: "10", offset: "2" }}>
              <Button
                className="start-branch "
                onClick={this.handleModel}
                style={{ margin: "70px", float: "right" }}
              >
                Start Branch
              </Button>
              <Modal
                isOpen={this.state.model}
                toggle={this.toggle}
                style={{
                  borderRadius: "8px ",
                  backgroundColor: "#ffffff"
                }}
              >
                <ModalBody
                  style={{
                    borderRadius: "8px ",
                    backgroundColor: "#ffffff"
                  }}
                >
                  <h5
                    className="Start-a-new-Branch"
                    style={{ paddingLeft: "49px" }}
                  >
                    {this.state.startBranch
                      ? "Start a new Branch"
                      : "Update Branch"}
                  </h5>
                  <Form>
                    <FormGroup style={{ marginLeft: "40px" }}>
                      <Input
                        className="input-branch-name"
                        type="text"
                        name="branch_name"
                        placeholder="Branch Name"
                        style={{ margin: "10px", color: "#333" }}
                        onChange={this.handleChangeData}
                        value={
                          this.state.updateBranch
                            ? this.state.updateBranch.branch_name
                            : ""
                        }
                      />
                      <Input
                        className="input-street-name"
                        type="text"
                        name="streetName"
                        placeholder="Street Name"
                        style={{ marginLeft: "10px" }}
                        onChange={this.handleChangeData}
                        value={
                          this.state.updateBranch
                            ? this.state.updateBranch.streetName
                            : ""
                        }
                      />
                      <Input
                        className="google-map-pin"
                        type="textarea"
                        name="googlePin"
                        placeholder="Google map Pin"
                        style={{ marginLeft: "10px", marginTop: "10px" }}
                        onChange={this.handleChangeData}
                        value={
                          this.state.updateBranchData
                            ? this.state.updateBranchData.googlePin
                            : ""
                        }
                      />
                    </FormGroup>
                    <FormGroup check inline>
                      <div>
                        <h5 className="Type" style={{ paddingLeft: "49px" }}>
                          Type
                        </h5>
                        <div style={{ paddingLeft: "50px" }}>
                          <CustomInput
                            className="type-content"
                            type="checkbox"
                            id="exampleCustomInline"
                            label="Dine in"
                            onChange={this.handleChangeServingType}
                            inline
                          />
                          <CustomInput
                            className="type-content"
                            type="checkbox"
                            id="exampleCustomInline2"
                            label="Take away"
                            onChange={this.handleChangeServingType}
                            inline
                          />
                          <CustomInput
                            className="type-content"
                            type="checkbox"
                            id="exampleCustomInline3"
                            label="Drive through"
                            onChange={this.handleChangeServingType}
                            inline
                          />
                          <CustomInput
                            className="type-content"
                            type="checkbox"
                            id="exampleCustomInline4"
                            label="Delivery"
                            onChange={this.handleChangeServingType}
                            inline
                          />
                        </div>
                      </div>
                    </FormGroup>
                    <hr></hr>
                    <h5 className="Publicity " style={{ paddingLeft: "47px" }}>
                      Publicity{" "}
                    </h5>
                    <FormGroup check inline>
                      <div style={{ paddingLeft: "43px" }}>
                        <CustomInput
                          className="Publicity-content"
                          type="radio"
                          id="exampleCustomRadio"
                          name="customRadio"
                          label="Public Location"
                          onChange={this.handleChangeServingType}
                          inline
                        />
                        <CustomInput
                          className="Publicity-content"
                          type="radio"
                          id="exampleCustomRadio2"
                          name="customRadio"
                          label="Private Location"
                          onChange={this.handleChangeServingType}
                          inline
                        />
                      </div>
                    </FormGroup>
                    <br />
                    <Button
                      style={{
                        marginLeft: "42px",
                        marginTop: "14px",
                        display: this.state.startBranch ? "block" : "none"
                      }}
                      className="start-branch"
                      onClick={this.handleSave}
                    >
                      Start Branch
                    </Button>
                    <Button
                      style={{
                        marginLeft: "42px",
                        marginTop: "14px",
                        display: this.state.updateBranch ? "block" : "none"
                      }}
                      className="start-branch"
                      onClick={this.handleUpdate}
                    >
                      Update Branch
                    </Button>
                  </Form>
                </ModalBody>
              </Modal>
            </Col>
          </Row>
          <Row style={{ marginTop: "20px" }} className="justify-content-center">
            <Col
              lg={{ size: "9", offset: "2" }}
              offset={{ size: 3 }}
              className="branch-table"
            >
              {branch && branch.branches && branch.branches.length > 0 ? (
                this.renderBranch(branch.branches)
              ) : (
                <></>
              )}
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    branch: state.branch
  };
};
const mapDispatchToProps = dispatch => {
  return {
    registerBranch: branch => dispatch(registerBranch(branch)),
    updateBranch: branch => dispatch(updateBranch(branch)),
    deleteBranch: branch => dispatch(deleteBranch(branch))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Branch);
