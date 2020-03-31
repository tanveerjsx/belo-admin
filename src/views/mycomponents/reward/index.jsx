import React from "react";
import { connect } from "react-redux";
import {
  registerReward,
  updateReward,
  deleteReward
} from "../../../actions/reward";
import "./reward.css";
import {
  Container,
  Row,
  Col,
  Input,
  Button,
  Table,
  Modal,
  ModalBody,
} from "reactstrap";
// core components
class Reward extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reward_name: "",
      branch_id: "",
      stamps: "",
      price_description: "",
      fieldMessage: "",
      created: false,
      model: false,
      updateRewardData: true,
      startReward: true,
      updateReward: {}
    };
  }

  handleModal = () => {
    this.setState({
      model: !this.state.model,
      updateRewardData: false,
      startReward: true
    });
  };
  toggle = () => {
    this.setState({ model: !this.state.model });
  };
  handleUpdate = reward => {
    let updateReward = { ...this.state.updateReward };
    updateReward = reward;
    this.setState({
      model: !this.state.model,
      updateRewardData: true,
      startReward: false,
      updateReward
    });
  };
  handleChangeData = e => {
    console.log('save', e.target)
    if(this.state.updateRewardData)
    {
      let updateReward = { ...this.state.updateReward };
      updateReward[e.target.name] = e.target.value;
      this.setState({
        updateReward
      });
    }
    else{
      this.setState({
        [e.target.name] : e.target.value
      })
    }
  };
  handleDeleteData = reward => {
    this.props.deleteReward(reward.id);
  };

  renderRewards = rewards => {
    rewards.map(reward => {
      return (
        <tr>
          <td className="table-body-content">{reward.reward_name}</td>
          <td className="table-body-content">{reward.price_description}</td>
          <td className="table-body-content">{reward.branch_id || "null"}</td>
          <td className="table-body-content">
            <button
              onClick={() => this.handleUpdate(reward)}
              style={{
                border: "none",
                outline: "none",
                backgroundColor: "#ffffff"
              }}
            >
              <i class="fas fa-user-edit"></i>
            </button>
            <button
              onClick={() => this.handleDeleteData(reward)}
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
    });
  };
  // handleChange = e => {
  //   this.setState({
  //     [e.target.name]: e.target.value
  //   });
  // };

  handleSubmit = () => {
    console.log('hundle submit',this.state)
    if (!this.state.reward_name) {      
      this.setState({
        fieldMessage: "Reward name is required"
      });
    } else if (!this.state.price_description) {
      this.setState({
        fieldMessage: "price description required"
      });
    } else {
      let reward = {
        reward_name: this.state.reward_name,
        price_description: this.state.price_description
      };
      this.props.createReward(reward);
    }
  };

  componentWillReceiveProps(nextProps) {
    console.log('data',nextProps);
    if (nextProps.reward.loggedInStatus) {
      this.props.history.push("/terminals");
    }
  }
  render() {
    let { created } = this.props.reward;
    return (
      <>
        <Container>
          <Row className="justify-content-center">
            <Col md={{ size: 10, offset: 2 }} style={{ paddingTop: "100px" }}>
              <Button
                className="reward-button "
                onClick={this.handleModal}
                style={{ float: "right" }}
              >
                Start Reward
              </Button>
              <Modal
                isOpen={this.state.model}
                toggle={this.toggle}
                style={{
                  borderRadius: "8px ",
                  backgroundColor: "#ffffff",
                  maxWidth: "441px"
                }}
              >
                <ModalBody
                  style={{
                    borderRadius: "8px ",
                    backgroundColor: "#ffffff"
                  }}
                >
                  <p className="reward-line">you have no reward lines</p>
                  <h5 className="Create-a-new-reward">
                    {this.state.startReward
                      ? "Create a new reward line"
                      : "Update Reward"}
                  </h5>
                  {this.props.auth.loginError && (
                    <p className="alert alert-danger mb-3 mr-sm-6 col-xs-offset-0 col-sm-offset-3">
                      {this.props.auth.loginError}
                    </p>
                  )}
                  <div class="input-group">
                    <input
                      onChange={this.handleChangeData}
                      name="reward_name"
                      placeholder="Reward name"
                      type="text"
                      value={this.state.rewardName}
                      class="form-control"
                      className="input-reward Reward-name"
                      value={
                        this.state.updateReward
                          ? this.state.updateReward.reward_name
                          : ""
                      }
                    />
                    <input
                      value={this.state.stamps}
                      onChange={this.handleChangeData}
                      type="text"
                      name="stamps"
                      placeholder="Stamps required  "
                      class="form-control"
                      className="Stamps-required Stamps-required-text"
                      value={
                        this.state.updateReward
                          ? this.state.updateReward.stamps
                          : ""
                      }
                    />
                  </div>
                  <Input
                    className="input-price prize-text"
                    value={this.state.price_description}
                    name="price_description"
                    onChange={this.handleChangeData}
                    style={{ marginTop: "7px" }}
                    type="number"
                    id="dec"
                    placeholder="Describe the Prize"
                    value={
                      this.state.updateReward
                        ? this.state.updateReward.price
                        : ""
                    }
                  />
                  <div style={{ marginTop: "10px" }}>
                    <Button
                      className="reward-button"
                      style={{
                        display: this.state.startReward ? "block" : "none"
                      }}
                      onClick={() => this.handleSubmit()}
                    >
                      Start Reward
                    </Button>
                    <Button
                      className="reward-button"
                      style={{
                        display: this.state.updateRewardData ? "block" : "none"
                      }}
                      onClick={() => this.handleSubmit()}
                    >
                      Update Reward
                    </Button>
                    {this.state.fieldMessage && (
                      <span
                        style={{
                          marginLeft: "40px",
                          color: "red",
                          fontWeight: "bold"
                        }}
                      >
                        {this.state.fieldMessage}
                      </span>
                    )}
                  </div>
                </ModalBody>
              </Modal>
            </Col>
          </Row>
          <Row className="justify-content-center" style={{ marginTop: "20px" }}>
            <Col md={{ size: 8, offset: 2 }} className="reward-table">
              <Table borderless>
                <thead>
                  <tr>
                    <th
                      style={{ textTransform: "none" }}
                      className="table-head"
                    >
                      {" "}
                      Name
                    </th>
                    <th
                      style={{ textTransform: "none" }}
                      className="table-head"
                    >
                      Price
                    </th>
                    <th
                      style={{ textTransform: "none" }}
                      className="table-head"
                    >
                      Brand ID
                    </th>
                    <th
                      style={{ textTransform: "none" }}
                      className="table-head"
                    >
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {this.props.reward &&
                  this.props.reward.rewards &&
                  this.props.reward.rewards.length > 0 ? (
                    this.renderRewards(this.props.reward.rewards)
                  ) : (
                    <tr>
                      <td>
                        <p>NO RECORD FOUND</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
const mapStateToProps = state => {
  return {
    reward: state.reward,
    auth: state.auth
  };
};
const mapDispatchToProps = dispatch => {
  return {
    createReward: reward => dispatch(registerReward(reward)),
    editReward: reward => dispatch(updateReward(reward)),
    deleteReward: reward => dispatch(deleteReward(reward))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Reward);
