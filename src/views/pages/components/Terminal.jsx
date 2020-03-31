import React from "react";
import { Container, Row, Col, InputGroup, Input, Button, Table, Modal, ModalBody } from "reactstrap";
import { registerTerminal } from "../../../actions/terminal";
import { connect } from "react-redux";
import "./terminal.css";
class Terminal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      terminal_id: "",
      password: "",
      fieldMessage: "",
      updateTerminal:true,
      generateTerminal:true
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  handleModel = () => {
    this.setState({
      model: !this.state.model,
      updateTerminal: false,
      generateTerminal: true
    });
  };
 updateTerminal = terminal => {
    let updateTerminal = { ...this.state.updateTerminal };
    updateTerminal = terminal;
    this.setState({
      model: !this.state.model,
      updateTerminal: true,
      generateTerminal: false,
      updateTerminal
    });
  };

  toggle = () => {
    this.setState({ model: !this.state.model });
  };

  handleChangeData = e => {
    let updateTerminal = { ...this.state.updateTerminal };
    updateTerminal[e.target.name] = e.target.value;
    this.setState({
      updateTerminal
    });
  };
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  onSave() {
    if (!this.state.terminal_id) {
      this.setState({
        fieldMessage: "terminal_id is required"
      });
    } else if (isNaN(this.state.terminal_id)) {
      this.setState({
        fieldMessage: "terminal_id must be number value"
      });
    } else if (!this.state.password) {
      this.setState({
        fieldMessage: "password is required"
      });
    } else if (!this.props.brand.brand) {
      this.setState({
        fieldMessage: "please create your brand before creating terminal"
      });
    } else {
      let terminal = {
        password: this.state.password,
        terminal_id: this.state.terminal_id,
        terminal_status: false,
        branch_id: this.props.brand.brand.id
      };
      this.props.registerTerminal(terminal);
    }
  }

  deleteTerminal = terminal => {
    this.props.deleteTerminal(terminal.id);
  };
  renderBranch(terminals) {
    return (
      <Table borderless>
        <thead>
          <tr>
            <th className="table-head td">Terminal Name</th>
            <th className="table-head td">Terminal Id</th>
            <th className="table-head td">Actions</th>
          </tr>
        </thead>
        <tbody>
          {terminals.map(terminal => {
            return (
              <tr>
                <td className="table-body-content ">{terminal.terminal_name}</td>
                <td className="table-body-content ">{terminal.terminal_id}</td>
                <td className="table-body-content">
                  <button
                    onClick={() => this.updateTerminal(terminal)}
                    style={{
                      border: "none",
                      outline: "none",
                      backgroundColor: "#ffffff"
                    }}
                  >
                    <i class="fas fa-user-edit"></i>
                  </button>
                  <button
                    onClick={() => this.deleteTerminal(terminal)}
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
    return (
      <>
        <Container>
          <Row className="justify-content-center">
            <Col
              lg={{ size: "10", offset: "2" }}
              style={{ paddingTop: "70px" }}
            >
              <Button
                className="generate-terminal "
                onClick={this.handleModel}
                style={{ margin: "70px", float: "right" }}
              >
               Generate Terminal
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
                    className="Start-a-new-terminal"
                    style={{ paddingLeft: "49px" }}
                  >
                    {this.state.startBranch
                      ? "Create a new Terminal"
                      : "Update Terminal"}
                  </h5>
              <InputGroup style={{ width: "100%" }}>
                <Input
                  className="input-terminal"
                  placeholder="P34 7G4 997"
                  style = {{with:'60%'}}
                  name="terminal_id"
                  onChange={this.handleChange}
                />
                <Input
                  className="password-required"
                  style = {{with:'40%'}}
                  placeholder="Enter password (4 digits)"
                  name="password"
                  onChange={this.handleChange}
                />
              </InputGroup>
              <div style={{ marginTop: "10px", display: this.state.generateTerminal ? "block" : "none" }}>
                <Button
                  className="generate-terminal-button"
                  onClick={this.onSave}
                >
                  Generate
                </Button>
                <Button
                      style={{
                        marginLeft: "42px",
                        marginTop: "14px",
                        display: this.state.updateTerminal ? "block" : "none"
                      }}
                      className="start-terminal"
                      onClick={this.handleUpdate}
                    >
                      Update Terminal
                    </Button>
                <p style={{ marginTop: "10px", color: "red" }}>
                  {this.state.fieldMessage}
                </p>
                {this.props.terminal.terminals.error &&
                  this.props.terminal.terminals.error && (
                    <p style={{ marginTop: "10px", color: "red" }}>
                      {this.props.terminal.terminals.error}
                    </p>
                  )}
               </div>
               </ModalBody>
              </Modal> 
            </Col>
          </Row>
          {/* <Row style={{ marginTop: "20px" }} className="justify-content-center">
            <Col
              lg={{ size: "9", offset: "2" }}
              offset={{ size: 3 }}
              className="terminal-table"
            >
              {terminal && terminal.terminals && terminal.terminals.length > 0 ? (
                this.renderTerminal(Terminal.terminals)
              ) : (
                <></>
              )}
            </Col>
          </Row> */}
        </Container>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    terminal: state.terminal,
    brand: state.brand,
    branch: state.branch
  };
};
const mapDispatchToProps = dispatch => {
  return {
    registerTerminal: terminal => dispatch(registerTerminal(terminal))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Terminal);
