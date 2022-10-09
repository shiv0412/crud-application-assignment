import React from "react";
import styled from "styled-components";
import { ToastContainer } from "react-toastify";
import "./App.css";

import Customer from "./components/customers/Customer";
import Invoices from "./components/invoices/Invoices";
import Products from "./components/products/Products";

const Row = styled.div`
  margin: 0;
  padding: 0;
`;
const Column = styled.div`
  margin: 0;
  padding: 0;
`;
const ToastMessage = styled(ToastContainer)`
  width: 50%;
`;

const App = () => {
  return (
    <div className="contianer-fluid">
      <ToastMessage />
      <Row className="row">
        <Column className="col-12 col-md-4">
          <Customer />
        </Column>
        <Column className="col-12 col-md-4">
          <Invoices />
        </Column>
        <Column className="col-12 col-md-4">
          <Products />
        </Column>
      </Row>
    </div>
  );
};

export default App;
