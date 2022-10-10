import React, { useState } from "react";
import styled from "styled-components";
import { ToastContainer } from "react-toastify";
import "./App.css";

import Customer from "./components/customers/Customer";
import Invoices from "./components/invoices/Invoices";
import Products from "./components/products/Products";
import Spinner from "./components/shared/Spinner";

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
  const [isCustomersDataLoaded, setIsCustomersDataLoaded] = useState(false);
  const [isProductsDataLoaded, setIsProductsDataLoaded] = useState(false);
  const [isInvoicesDataLoaded, setIsInvoicesDataLoaded] = useState(false);

  const handleDataLoad = (isLoaded, module) => {
    switch (module) {
      case "customer":
        setIsCustomersDataLoaded(isLoaded);
        break;
      case "product":
        setIsProductsDataLoaded(isLoaded);
        break;
      case "invoice":
        setIsInvoicesDataLoaded(isLoaded);
        break;
      default:
    }
  };
  
  return (
    <>
      <div className="contianer-fluid">
        <ToastMessage />
        <Row className="row">
          <Column className="col-12 col-md-4">
            <Customer handleDataLoad={handleDataLoad} />
          </Column>
          <Column className="col-12 col-md-4">
            <Invoices handleDataLoad={handleDataLoad} />
          </Column>
          <Column className="col-12 col-md-4">
            <Products handleDataLoad={handleDataLoad} />
          </Column>
        </Row>
      </div>
      {(!isCustomersDataLoaded ||
        !isProductsDataLoaded ||
        !isInvoicesDataLoaded) && <Spinner />}
    </>
  );
};

export default App;
