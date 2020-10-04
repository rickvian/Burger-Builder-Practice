import React, { Component } from "react";

import classes from "./Modal.module.css";
import Aux from "../../../hoc/AuxComponent/AuxComponent";
import Backdrop from "../Backdrop/Backdrop.js";

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    //return true to update, return false to prevent update
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children 
  }
  
  
  componentWillUpdate() {
    console.log("component will update");
  }

  render() {
    return (
      <Aux>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0",
          }}
        >
          {this.props.children}
        </div>
      </Aux>
    );
  }
}

export default Modal;
