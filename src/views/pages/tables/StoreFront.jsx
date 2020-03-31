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
// react plugin that prints a given react component
import ReactToPrint from "react-to-print";
// react component for creating dynamic tables
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
// react component used to create sweet alerts
import ReactBSAlert from "react-bootstrap-sweetalert";
import "./StoreFront.scss";

// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  Container,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";
// core components
import SimpleHeader from "components/Headers/SimpleHeader.jsx";

import { dataTable } from "variables/general";

const pagination = paginationFactory({
  page: 1,
  alwaysShowAllBtns: true,
  showTotal: true,
  withFirstAndLast: false,
  sizePerPageRenderer: ({ options, currSizePerPage, onSizePerPageChange }) => (
    <div className="dataTables_length" id="datatable-basic_length">
      <label>
        Show{" "}
        {
          <select
            name="datatable-basic_length"
            aria-controls="datatable-basic"
            className="form-control form-control-sm"
            onChange={e => onSizePerPageChange(e.target.value)}
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        }{" "}
        entries.
      </label>
    </div>
  )
});

///////////copied code above

const { SearchBar } = Search;

class StoreFront extends React.Component {
  state = {
    alert: null
  };
  // this function will copy to clipboard an entire table,
  // so you can paste it inside an excel or csv file
  componentDidMount = () => {
    const FloatLabel = (() => {
      // add active class and placeholder
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
        <div className="row" style={{ marginRight: "0" }}>
          <div
            className="col-md-9 offset-md-3"
            style={{ marginLeft: "22%", paddingTop: "100px" }}
          >
            <h4 className = "Storefront-information">
              Storefront information
            </h4>
            <p className="basic-info">Basic info</p>
            <div
              id="floatContainer1"
              style={{ padding: "0px", width: "490px" }}
              class="float-container"
            >
              <label for="floatField1" style={{ marginLeft: "10px" }}>
                Brand Name
              </label>
              <input
                type="text"
                id="floatField1"
                style={{
                  borderRadius: "7px",
                  paddingLeft: "10px",
                  padding: "19px 8px 5px",
                  paddingLeft: "10px"
                }}
              />
            </div>
            <div className="input-handler">
              <div class="upload-btn-wrapper">
                <div className="store-logo-text">Store Logo</div>
                <button class="btn" style = {{height:'64px'}}>
                  <i class="fas fa-camera"></i>
                </button>
                <input type="file" name="myfile" />
              </div>
              <div class="upload-btn-wrapper" style={{ paddingLeft: "18px" }}>
                <div className="store-logo-text">Store Header</div>
                <button class="btn" style={{ width: "361px", height:'64px' }}>
                  <i class="fas fa-camera"></i>
                </button>
                <input type="file" name="myfile" />
              </div>
            </div>
            <div className="update-btn">
              <Button
               className = "Storefront"
              >
                Update Storefront
              </Button>{" "}
            </div>
            {/* {this.state.alert}
      <SimpleHeader name="React Tables" parentName="Tables" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardHeader>
                <h3 className="mb-0">React Bootstrap Table 2</h3>
                <p className="text-sm mb-0">
                  This is an exmaple of data table using the well known
                  react-bootstrap-table2 plugin. This is a minimal setup in
                  order to get started fast.
                </p>
              </CardHeader>
              <ToolkitProvider
                data={dataTable}
                keyField="name"
                columns={[
                  {
                    dataField: "name",
                    text: "Name",
                    sort: true
                  },
                  {
                    dataField: "position",
                    text: "Position",
                    sort: true
                  },
                  {
                    dataField: "office",
                    text: "Office",
                    sort: true
                  },
                  {
                    dataField: "Age",
                    text: "age",
                    sort: true
                  },
                  {
                    dataField: "start_date",
                    text: "Start date",
                    sort: true
                  },
                  {
                    dataField: "salary",
                    text: "Salary",
                    sort: true
                  }
                ]}
                search
              >
                {props => (
                  <div className="py-4 table-responsive">
                    <div
                      id="datatable-basic_filter"
                      className="dataTables_filter px-4 pb-1"
                    >
                      <label>
                        Search:
                        <SearchBar
                          className="form-control-sm"
                          placeholder=""
                          {...props.searchProps}
                        />
                      </label>
                    </div>
                    <BootstrapTable
                      {...props.baseProps}
                      bootstrap4={true}
                      pagination={pagination}
                      bordered={false}
                    />
                  </div>
                )}
              </ToolkitProvider>
            </Card>
            <Card>
              <CardHeader>
                <h3 className="mb-0">Action buttons</h3>
                <p className="text-sm mb-0">
                  This is an exmaple of data table using the well known
                  react-bootstrap-table2 plugin. This is a minimal setup in
                  order to get started fast.
                </p>
              </CardHeader>
              <ToolkitProvider
                data={dataTable}
                keyField="name"
                columns={[
                  {
                    dataField: "name",
                    text: "Name",
                    sort: true
                  },
                  {
                    dataField: "position",
                    text: "Position",
                    sort: true
                  },
                  {
                    dataField: "office",
                    text: "Office",
                    sort: true
                  },
                  {
                    dataField: "Age",
                    text: "age",
                    sort: true
                  },
                  {
                    dataField: "start_date",
                    text: "Start date",
                    sort: true
                  },
                  {
                    dataField: "salary",
                    text: "Salary",
                    sort: true
                  }
                ]}
                search
              >
                {props => (
                  <div className="py-4 table-responsive">
                    <Container fluid>
                      <Row>
                        <Col xs={12} sm={6}>
                          <ButtonGroup>
                            <Button
                              className="buttons-copy buttons-html5"
                              color="default"
                              size="sm"
                              id="copy-tooltip"
                              onClick={() =>
                                this.copyToClipboardAsTable(
                                  document.getElementById("react-bs-table")
                                )
                              }
                            >
                              <span>Copy</span>
                            </Button>
                            <ReactToPrint.default
                              trigger={() => (
                                <Button
                                  color="default"
                                  size="sm"
                                  className="buttons-copy buttons-html5"
                                  id="print-tooltip"
                                >
                                  Print
                                </Button>
                              )}
                              content={() => this.componentRef}
                            />
                          </ButtonGroup>
                          <UncontrolledTooltip
                            placement="top"
                            target="print-tooltip"
                          >
                            This will open a print page with the visible rows
                            of the table.
                          </UncontrolledTooltip>
                          <UncontrolledTooltip
                            placement="top"
                            target="copy-tooltip"
                          >
                            This will copy to your clipboard the visible rows
                            of the table.
                          </UncontrolledTooltip>
                        </Col>
                        <Col xs={12} sm={6}>
                          <div
                            id="datatable-basic_filter"
                            className="dataTables_filter px-4 pb-1 float-right"
                          >
                            <label>
                              Search:
                              <SearchBar
                                className="form-control-sm"
                                placeholder=""
                                {...props.searchProps}
                              />
                            </label>
                          </div>
                        </Col>
                      </Row>
                    </Container>
                    <BootstrapTable
                      ref={el => (this.componentRef = el)}
                      {...props.baseProps}
                      bootstrap4={true}
                      pagination={pagination}
                      bordered={false}
                      id="react-bs-table"
                    />
                  </div>
                )}
              </ToolkitProvider>
            </Card>
          </div>
        </Row>
      </Container>*/}
          </div>
        </div>
      </>
    );
  }
}

export default StoreFront;
