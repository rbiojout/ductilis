import React from "react";
import Loadable from "react-loadable"

function Loading() {
  return <div>Loading...</div>;
}

const Charts = Loadable({
  loader: () => import("./views/Charts/Charts"),
  loading: Loading,
});

const Dashboard = Loadable({
  loader: () => import("./views/Dashboard/Dashboard"),
  loading: Loading,
});

// Main implementation

const Data = Loadable({
  loader: () => import("./views/Data/Data"),
  loading: Loading,
});

const Portfolios = Loadable({
  loader: () => import("./views/Portfolios/Portfolios"),
  loading: Loading,
});


// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/data", name: "Data", component: Data }, 
  { path: "/portfolios", name: "Portfolios", component: Portfolios, restricted:true },
  { path: "/charts", name: "Charts", component: Charts },
];


export { routes };
