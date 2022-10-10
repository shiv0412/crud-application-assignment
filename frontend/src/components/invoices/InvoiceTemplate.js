import React from "react";
import styled from "styled-components";
import _ from "lodash";
import { forwardRef } from "react";

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

const InvoiceTemplate = (
  { invoiceValues, updateStore, handleClose, handlePopUp, handlePrint },
  ref
) => {
  const invoiceItemsTotal = [];
  const handleInvoicePrint = () => {
    handlePrint();
    updateStore();
    handleClose();
    handlePopUp();
  };
  return (
    <>
      {invoiceValues &&
        invoiceValues.map((invoiceValues) => {
          return (
            <>
              <Contianer ref={ref}>
                <Header>
                  <h1>Invoice</h1>
                </Header>
                <Details>
                  <div>
                    <ul>
                      <li>
                        Cust LoginId: {invoiceValues.customerDetails[0].loginID}
                      </li>
                      <li>
                        Cust Name: {invoiceValues.billingDetails.customerName}
                      </li>
                      <li>Phone: {invoiceValues.customerDetails[0].phone}</li>
                    </ul>
                  </div>
                  <div>
                    <ul>
                      <li>
                        Invoice No.:{" "}
                        {invoiceValues.billingDetails.invoiceNumber}
                      </li>
                      <li>
                        Invoice Date: {invoiceValues.billingDetails.invoiceDate}
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
                    {invoiceValues.purchasedProducts.length > 0 &&
                      invoiceValues.purchasedProducts.map((product) => {
                        return (
                          <>
                            <tr>
                              <td>{product.productName}</td>
                              <td>{product.unitPrice}</td>
                              <td>{product.productQuantity}</td>
                              <td>
                                {parseInt(product.unitPrice) *
                                  parseInt(product.productQuantity)}
                              </td>
                            </tr>
                            <span style={{ display: "none" }}>
                              {invoiceItemsTotal.push(
                                parseInt(product.unitPrice) *
                                  parseInt(product.productQuantity)
                              )}
                            </span>
                          </>
                        );
                      })}
                  </table>
                </div>
                <TotalDetails>
                  <div>Invoice Total</div>
                  <div>&#8377; {_.sum(invoiceItemsTotal)}/-</div>
                </TotalDetails>
                <Button onClick={() => handleInvoicePrint()}>Print Invoice</Button>
              </Contianer>
            </>
          );
        })}
    </>
  );
};

export default forwardRef(InvoiceTemplate);
