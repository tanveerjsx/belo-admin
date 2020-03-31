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
import "./Sidebar.css";
import React from "react";
// react library for routing
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
// nodejs library that concatenates classes
import classnames from "classnames";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";
// react library that creates nice scrollbar on windows devices
import PerfectScrollbar from "react-perfect-scrollbar";
import { connect } from "react-redux";
import { saveBrandRequest } from "../../actions/brand.js";
// reactstrap components
import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  Progress
} from "reactstrap";
import {setSelectedBrand} from '../../actions/brand'

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseOpen: false,
      dropdownOpen: false,
      // ...this.getCollapseStates(props.routes)
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.brand && nextProps.brand != this.props.brand) {
      // this.props.history.push("/CompanyBrandName");
    }
  }

  componentDidMount() {
    console.log(this.props.brand.brands);
    console.log(this.props.brand.message);
  }

  handleBrandInput = e => {
    let brand = { ...this.state.brand };
    brand[e.target.name] = e.target.value;
    this.setState({
      brand
    });
  };
  handleChangeBrand = (brand) =>{
    console.log('selected',brand)
    //  this.props.setSelectedBrand(brand);
  }
 

  handleSubmit = () => {
    if (this.state.brand.industry == -1) {
    } else {
      this.props._saveBrand(this.state.brand);
    }
  };
  // verifies if routeName is the one active (in browser input)
  activeRoute = routeName => {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  // makes the sidenav normal on hover (actually when mouse enters on it)
  onMouseEnterSidenav = () => {
    if (!document.body.classList.contains("g-sidenav-pinned")) {
      document.body.classList.add("g-sidenav-show");
    }
  };
  // makes the sidenav mini on hover (actually when mouse leaves from it)
  onMouseLeaveSidenav = () => {
    if (!document.body.classList.contains("g-sidenav-pinned")) {
      document.body.classList.remove("g-sidenav-show");
    }
  };
  // toggles collapse between opened and closed (true/false)
  toggleCollapse = () => {
    this.setState({
      collapseOpen: !this.state.collapseOpen
    });
  };
  // closes the collapse
  closeCollapse = () => {
    this.setState({
      collapseOpen: false
    });
  };
  // this creates the intial state of this component based on the collapse routes
  // that it gets through this.props.routes
  getCollapseStates = routes => {
    let initialState = {};
    routes.map((prop, key) => {
      if (prop.collapse) {
        initialState = {
          [prop.state]: this.getCollapseInitialState(prop.views),
          ...this.getCollapseStates(prop.views),
          ...initialState
        };
      }
      return null;
    });
    return initialState;
  };

  getCollapseInitialState(routes) {
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse && this.getCollapseInitialState(routes[i].views)) {
        return true;
      } else if (window.location.href.indexOf(routes[i].path) !== -1) {
        return true;
      }
    }
    return false;
  }
  // this is used on mobile devices, when a user navigates
  // the sidebar will autoclose
  closeSidenav = () => {
    if (window.innerWidth < 1200) {
      this.props.toggleSidenav();
    }
  };
  // this function creates the links and collapses that appear in the sidebar (left menu)
  createLinks = routes => {
    return routes.map((prop, key) => {
      if (prop.redirect) {
        return null;
      }
      if (prop.collapse) {
        var st = {};
        st[prop["state"]] = !this.state[prop.state];
        return (
          <NavItem key={key}>
            <NavLink
              href="#pablo"
              data-toggle="collapse"
              aria-expanded={this.state[prop.state]}
              className={classnames({
                active: this.getCollapseInitialState(prop.views)
              })}
              onClick={e => {
                e.preventDefault();
                this.setState(st);
              }}
              style={{ borderLeft: "2px solid blue" }}
            >
              {prop.icon ? <i className={prop.icon} /> : null}
              <span className="nav-link-text">{prop.name}</span>
            </NavLink>
            <Collapse isOpen={this.state[prop.state]}>
              <Nav className="nav-sm flex-column">
                {this.createLinks(prop.views)}
              </Nav>
            </Collapse>
          </NavItem>
        );
      }
      return (
        <NavItem
          className={this.activeRoute(prop.layout + prop.path)}
          key={key}
        >
          <NavLink
            to={prop.layout + prop.path}
            activeClassName=""
            onClick={this.closeSidenav}
            tag={NavLinkRRD}
          >
            {prop.icon !== undefined ? (
              <>
                <i className={prop.icon} />
                <span className="nav-link-text">{prop.name}</span>
              </>
            ) : (
              prop.name
            )}
          </NavLink>
        </NavItem>
      );
    });
  };
  toggle = () => {
    //dropdown toggle handle
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };
  render() {
    const { routes, logo } = this.props;
    const {brand}=this.props;
    let navbarBrandProps;
    if (logo && logo.innerLink) {
      navbarBrandProps = {
        to: logo.innerLink,
        tag: Link
      };
    } else if (logo && logo.outterLink) {
      navbarBrandProps = {
        href: logo.outterLink,
        target: "_blank"
      };
    }
    const scrollBarInner = (
      <div className="scrollbar-inner">
        <div
          className="sidenav-header d-flex align-items-center"
          style={{
            background: "#f5f5f5",
            boxShadow: "1px 2px 4px rgba(0, 0, 0, .5)",
            height: "55px"
          }}
        >
          { brand.selectedBrand ? ( 
            <NavbarBrand>
              {/* <img
                alt={logo.imgAlt}
                className="navbar-brand-img"
                src={logo.imgSrc}
              /> */}{brand.selectedBrand.brandName}
            </NavbarBrand>
           ) : null} 
          <div className="ml-auto">
            <ButtonDropdown
              isOpen={this.state.dropdownOpen}
              toggle={this.toggle}
            >
              <DropdownToggle
                color="none"
                style={{ outline: "none", boxShadow: "none" }}
              >
                <i className="fa fa-angle-down"></i>
              </DropdownToggle>
              <DropdownMenu>
            
              {brand.brands.map(brand => {
                return (
                  <DropdownItem  onClick = {() =>this.handleChangeBrand(brand)}>{brand.brand_name}</DropdownItem>
                );
              })}
             </DropdownMenu>
            </ButtonDropdown>
          </div>
        </div>
        <Container className="create-first-revard">
          <p className="setup-description">Setup your Store</p>
          <p3 className="revard-description">
            Create your first reward ( 3/5 )
          </p3>
          <Progress className="progress-barr" color="success" value="30" />
        </Container>
        <div className="navbar-inner">
          <Collapse navbar isOpen={true}>
            <Nav navbar>{this.createLinks(routes)}</Nav>
            {/* <hr className="my-3" />
            <h6 className="navbar-heading p-0 text-muted">Documentation</h6> */}
            {/* <Nav className="mb-md-3" navbar>
              <NavItem>
                <NavLink
                  href="https://demos.creative-tim.com/argon-dashboard-pro-react/#/documentation/overview?ref=adpr-sidebar"
                  target="_blank"
                >
                  <i className="ni ni-spaceship" />
                  <span className="nav-link-text">Getting started</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  href="https://demos.creative-tim.com/argon-dashboard-pro-react/#/documentation/colors?ref=adpr-sidebar"
                  target="_blank"
                >
                  <i className="ni ni-palette" />
                  <span className="nav-link-text">Foundation</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  href="https://demos.creative-tim.com/argon-dashboard-pro-react/#/documentation/alert?ref=adpr-sidebar"
                  target="_blank"
                >
                  <i className="ni ni-ui-04" />
                  <span className="nav-link-text">Components</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  href="https://demos.creative-tim.com/argon-dashboard-pro-react/#/documentation/charts?ref=adpr-sidebar"
                  target="_blank"
                >
                  <i className="ni ni-chart-pie-35" />
                  <span className="nav-link-text">Plugins</span>
                </NavLink>
              </NavItem>
            </Nav> */}
          </Collapse>
        </div>
      </div>
    );
    return (
      <Navbar
        className="sidenav navbar-vertical fixed-left navbar-expand-xs navbar-light bg-white"
        style={{ top: "54px", padding: "0" }}
        onMouseEnter={this.onMouseEnterSidenav}
        onMouseLeave={this.onMouseLeaveSidenav}
      >
        {navigator.platform.indexOf("Win") > -1 ? (
          <PerfectScrollbar>{scrollBarInner}</PerfectScrollbar>
        ) : (
          scrollBarInner
        )}
      </Navbar>
    );
  }
}

Sidebar.defaultProps = {
  routes: [{}],
  toggleSidenav: () => {},
  sidenavOpen: false
};

Sidebar.propTypes = {
  // function used to make sidenav mini or normal
  toggleSidenav: PropTypes.func,
  // prop to know if the sidenav is mini or normal
  sidenavOpen: PropTypes.bool,
  // links that will be displayed inside the component
  routes: PropTypes.arrayOf(PropTypes.object),
  // logo
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the image src of the logo
    imgSrc: PropTypes.string.isRequired,
    // the alt for the img
    imgAlt: PropTypes.string.isRequired
  })
};

const mapStateToProps = state => {
  return {
    brand: state.brand
  };
};
const mapDispatchToProps = dispatch => {
  return {
    _saveBrand: brand => dispatch(saveBrandRequest(brand)),
    setSelectedBrand:brand=>dispatch(setSelectedBrand(brand))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar);
