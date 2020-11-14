import React, { useState, useEffect } from "react";
import Modal from "../../components/UI/Modal/Modal";
import Aux from "../AuxComponent/AuxComponent";

const withErrorHandler = (WrappedComponent, axios) => {
  //just returning class wrapping component, that can report on error

  return (props) => {
    const [error, setError] = useState(true);
    //const the function because will return at below
    const reqInterceptor = axios.interceptors.request.use((req) => {
      setError(null);
      return req;
    });

    const resInterceptor = axios.interceptors.response.use(
      (res) => res,
      (err) => {
        setError(err);
        return Promise.reject(err); // https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/13556586#questions/10496934
      }
    );

    useEffect(() => {
      //if we return function in use Effect, that would be our clean up function, equivalent to componentWillUnmount
      return () => {
        axios.interceptors.request.eject(reqInterceptor);
        axios.interceptors.response.eject(resInterceptor);
      };
    }, [reqInterceptor, resInterceptor]); //the clean up function will only run if passed dependency to be checked, then run the cleanup funct

    const errorConfirmedHandler = () => {
      setError(null);
    };

    return (
      <Aux>
        <Modal show={error} modalClosed={errorConfirmedHandler}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </Aux>
    );
  };
};

export default withErrorHandler;
