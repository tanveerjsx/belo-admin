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
import Alternative from "views/pages/dashboards/Alternative.jsx";
import Buttons from "views/pages/components/Buttons.jsx";
import SettingInformation from "views/pages/Accounts/SettingInformation";
import Cards from "views/pages/components/Cards.jsx";
import Charts from "views/pages/Charts.jsx";
import Components from "views/pages/forms/Components.jsx";
import Dashboard from "views/pages/dashboards/Dashboard.jsx";
import Branch from 'views/mycomponents/Branch';
import Google from "views/pages/maps/Google.jsx";
import Terminal from "views/pages/components/Terminal.jsx";
import Icons from "views/pages/components/Icons.jsx";
import Lock from "views/pages/examples/Lock.jsx";
import Login from "views/pages/examples/Login.jsx";
import Notifications from "views/pages/components/Notifications.jsx";
import Reward from "views/mycomponents/reward";
import Profile from "views/pages/examples/Profile.jsx";
import StoreFront from "views/pages/tables/StoreFront";
import Register from "views/pages/examples/Register.jsx";
import Sortable from "views/pages/tables/Sortable.jsx";
import Tables from "views/pages/tables/Tables.jsx";
import Timeline from "views/pages/examples/Timeline.jsx";
import Typography from "views/pages/components/Typography.jsx";
import Validation from "views/pages/forms/Validation.jsx";
import Vector from "views/pages/maps/Vector.jsx";
import Widgets from "views/pages/Widgets.jsx";
const routes = [
  {
    name: "Dashboard",
    icon: "ni ni-shop text-primary",
    path: "/dashboard",
    component: Alternative,
    layout: "/admin"
  },
  {
    name: "Rewards",
    icon: "ni ni-ungroup text-orange",
    path: "/rewards",
    component: Reward,
    layout: "/admin"
  },
  {
    name: "Terminals",
    icon: "ni ni-tv-2 text-info",
    path: "/terminals",
    component: Terminal,
    layout: "/admin"
  },
  {
    name: "Branches",
    icon: "ni ni-single-copy-04 text-pink",
    path: "/branches",
    component: Branch,
    layout: "/admin"
  },
  {
    name: "Storefront",
    icon: "ni ni-align-left-2 text-default",
    path: "/StoreFront",
    component: StoreFront,
    layout: "/admin"
  },
  {
    name: "Setting",
    icon: "ni ni-map-big text-primary",
    path: "/SettingInformation",
    component: SettingInformation,
    layout: "/admin"
  },
];

export default routes;
