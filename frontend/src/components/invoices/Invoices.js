import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import styled from "styled-components";

import InvoiceEdit from "./InvoiceEdit";
import InvoiceRead from "./InvoiceRead";
import { saveInvoicesDetailsToStore } from "../../redux/actions/Actions";
import {
  toastSuccessNotification,
  toastErrorNotification,
} from "../../constants";

const Contianer = styled.div`
  width: 100%;
  border-left: 1.5px solid black;
  border-right: 1.5px solid black;
  font-family: arial;
  height: 100vh;
`;
const Header = styled.div`
  display: flex;
  background-color: #d4ac0d;
  padding: 15px 5px;
  h3 {
    width: 60%;
    margin: 0;
    color: #fff;
  }
  div {
    width: 40%;
    text-align: right;
  }
  button {
    background-color: #a93226;
    border: none;
    padding: 5px 10px;
    display: inline-block;
    color: #fff;
  }
  button:hover {
    background-color: #922b21;
  }
`;

const Invoices = ({
  invoicesData,
  customerData,
  productData,
  saveInvoicesDetailsToStore,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isInvoicesRecordsUpdated, setInvoicesRecordsUpdated] = useState(false);
  const [initialValues, setInitialValues] = useState();
  const [label, setLabel] = useState("Add");

  useEffect(() => {
    axios
      .get("http://localhost:4200/invoices")
      .then((response) => saveInvoicesDetailsToStore(response.data))
      .catch((error) => toastErrorNotification(error.message));
    setInvoicesRecordsUpdated(false);
  }, [isInvoicesRecordsUpdated, initialValues, isEditing]);

  const handleInvoiceDelete = (invoiceNumber) => {
    axios({
      method: "delete",
      url: "http://localhost:4200/invoices/" + invoiceNumber,
    })
      .then(() => {
        setInvoicesRecordsUpdated(true);
        toastSuccessNotification("invoice deleted successfully");
      })
      .catch((error) => {
        toastErrorNotification(error.message);
      });
  };

  const handleCustomerEdit = (invoiceNumber) => {
    if (invoicesData.length > 0) {
      const customer = invoicesData.filter((customer) => {
        return customer.loginID === invoiceNumber;
      });
      setInitialValues({
        loginID: customer[0].loginID,
        customerName: customer[0].customerName,
        phone: customer[0].phone,
      });
      setIsEditing(true);
      setLabel("Update");
    }
  };

  return (
    <Contianer>
      <Header>
        <h3>Manage Invoices</h3>
        <div>
          <button
            onClick={() => {
              setIsEditing(true);
              setInitialValues({
                loginID: "",
                customerName: "",
                phone: "",
              });
              setLabel("Add");
            }}
          >
            Generate invoice
          </button>
        </div>
      </Header>
      <InvoiceRead
        invoices={invoicesData}
        editCustomerDetails={(invoiceNumber) =>
          handleCustomerEdit(invoiceNumber)
        }
        handleInvoiceDelete={handleInvoiceDelete}
      />
      <InvoiceEdit
        handleFormClose={() => setIsEditing(false)}
        isEditing={isEditing}
        label={label}
        invoicesData={invoicesData}
        customerData={customerData}
        productData={productData}
      />
    </Contianer>
  );
};

const mapStateToProps = (state) => {
  return {
    invoicesData: state.invoiceReducer,
    customerData: state.customerReducer,
    productData: state.productsReducer,
    generatedInvoiceDetails: state.generatedInvoiceDetailsReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveInvoicesDetailsToStore: (data) => {
      dispatch(saveInvoicesDetailsToStore(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Invoices);
