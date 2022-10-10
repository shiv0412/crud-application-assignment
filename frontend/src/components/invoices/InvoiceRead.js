import React, { useState } from "react";
import styled from "styled-components";
import InvoiceTemplate from "./InvoiceTemplate";

//styled components
const ModalContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  h4 {
    text-align: center;
    border-bottom: 1px solid #cacfd2;
    padding-bottom: 10px;
    color: #566573;
  }
`;
const ModalContent = styled.div`
  width: 90%;
  background-color: #f2f3f4;
  height: auto;
`;
const ModalHeader = styled.div`
  padding: 15px;
  font-family: Arial, Helvetica, sans-serif;
  position: relative;
  background-color: black;
  color: #fff;
`;
const Span = styled.span`
  position: absolute;
  top: 12%;
  right: 10px;
  font-size: 20px;
  cursor: pointer;
`;
const ModalTitle = styled.h5`
  margin: 0;
  color: #fff;
  font-weight: bold;
`;
const ModalBody = styled.div`
  border-top: 1px solid lightgray;
  border-bottom: 1px solid lightgray;
  padding: 0 0 20px 0;
`;
const Contianer = styled.div`
  font-weight: bold;
  padding: 25px 25px 0 25px;
  table {
    border: 2px solid black;
    padding: 0;
    margin: 0;
  }
  tr {
    border: 2px solid black;
  }
  td {
    border: 2px solid black;
    padding: 5px 0;
  }
  th {
    border: 2px solid black;
    padding: 10px 0;
  }
`;
const Header = styled.div`
  padding: 10px 0;
  border: 2px solid black;
  h1 {
    text-align: center;
  }
`;
const Details = styled.div`
  display: flex;
  div {
    width: 50%;
    border: 2px solid black;
  }
  ul {
    list-style: none;
    padding-top: 10px;
  }
`;
const TotalDetails = styled.div`
  display: flex;
  div {
    text-align: center;
    padding: 15px 0;
  }
  div:nth-child(1) {
    width: 90%;
    border: 2px solid black;
    text-align: right;
    padding-right: 50px;
  }
  div:nth-child(2) {
    width: 14.5%;
    border: 2px solid black;
  }
`;
const Button = styled.button`
  margin: 10px auto 10px auto;
  display: block;
  padding: 5px 15px;
  border: none;
  background-color: darkred;
  color: #fff;
  font-family: Arial, Helvetica, sans-serif;
  @media print {
    display: none;
  }
`;

const InvoiceRead = (
  {
    isShowInvoice,
    invoiceProductDetails,
    invoiceBillingDetails,
    handleClose,
    handlePrint,
  },
  ref
) => {
  if (!isShowInvoice) {
    return null;
  }

  return (
    <>
      <ModalContainer onClick={handleClose} >
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <ModalHeader>
            <ModalTitle>Invoice Details</ModalTitle>
            <Span>
              <i className="window close icon" onClick={handleClose}></i>
            </Span>
          </ModalHeader>
          <ModalBody>
            <Contianer ref={ref}>
              <Header>
                <h1>Invoice</h1>
              </Header>
              <Details>
                <div>
                  <ul>
                    <li>
                      Cust LoginId: {invoiceBillingDetails[0].customerLoginID}
                    </li>
                    <li>Cust Name: {invoiceBillingDetails[0].customerName}</li>
                    <li>Phone: {invoiceBillingDetails[0].customerPhone}</li>
                  </ul>
                </div>
                <div>
                  <ul>
                    <li>
                      Invoice No.:
                      {invoiceBillingDetails[0].invoiceNumber}
                    </li>
                    <li>
                      Invoice Date:{" "}
                      {invoiceBillingDetails[0].invoiceDate.split("T")[0]}
                    </li>
                  </ul>
                </div>
              </Details>
              <div>
                <table className="table table-bodered">
                  <tr>
                    <th>Product Name</th>
                    <th>Unit Price (&#8377;)</th>
                    <th>Quantity</th>
                    <th>Total (&#8377;)</th>
                  </tr>
                  {invoiceProductDetails.length > 0 &&
                    invoiceProductDetails.map((product) => {
                      return (
                        <>
                          <tr>
                            <td>{product.productName}</td>
                            <td>{product.unitPrice}</td>
                            <td>{product.quantity}</td>
                            <td>{product.itemTotal}</td>
                          </tr>
                        </>
                      );
                    })}
                </table>
              </div>
              <TotalDetails>
                <div>Invoice Total</div>
                <div>&#8377; {invoiceBillingDetails[0].invoiceTotal}/-</div>
              </TotalDetails>
            </Contianer>
            <Button onClick={() => handlePrint()}>Print Invoice</Button>
          </ModalBody>
        </ModalContent>
      </ModalContainer>
    </>
  );
};

export default React.forwardRef(InvoiceRead);
