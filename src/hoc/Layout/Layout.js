import React, { useState } from "react";
import { connect } from "react-redux";

import Aux from "../AuxComponent/AuxComponent";
import "./Layout.css";

import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

const Layout = (props) => {
  //const [state, setState] = useState(initialState);
  const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);

  const sideDrawerClosedHandler = () => {
    setSideDrawerIsVisible(false);
  };

  const sideDrawerToggleHandler = () => {
    setSideDrawerIsVisible(!sideDrawerIsVisible);
  };

  return (
    <Aux>
      <Toolbar
        isAuth={props.isAuthenticated}
        drawerToggleClicked={sideDrawerToggleHandler}
      />
      <SideDrawer
        isAuth={props.isAuthenticated}
        open={sideDrawerIsVisible}
        closed={sideDrawerClosedHandler}
      />

      <main className="Content">{props.children}</main>

        
      <div className="github">
        <div className="buttons">
        <a href="https://github.com/rickvian/Burger-Builder-Practice" className="btn btn-dark btn-mid" target="_blank">Fork me on GitHub</a>

        </div>
     

      </div>


    </Aux>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Layout);
