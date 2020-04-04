import React from 'react';
import {Redirect, Router} from '@reach/router';
import LandingPage from "./pages/LandingPage";
import AppLayout from "./pages/app/App";
// const ProfilePage = React.lazy(() => import('./ProfilePage')); // Lazy-loaded
const Routing = () => {
  return (
      <Router>
          {/*<LandingPage path={"/"}/>*/}
          <AppLayout path={"/app/*"} />
          <Redirect from={"/"} to={"/app"} />
      </Router>
  );
};

export default Routing;
