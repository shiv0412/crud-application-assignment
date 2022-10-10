import React from "react";
import styled from "styled-components";
import _ from "lodash";
import { forwardRef } from "react";

const Container = styled.div`
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

const NewInvoice = (
  { invoiceDetails, updateStore, handlePopUpClose, handlePrint },
  ref
) => {
  const invoiceItemsTotal = [];
  const handleInvoicePrint = () => {
    handlePrint();
    updateStore();
    handlePopUpClose();
  };
  return (
    <>
      {invoiceDetails &&
        invoiceDetails.map((invoiceDetails) => {
          return (
            <>
              <Container ref={ref}>
                <Header>
                  <h1>Invoice</h1>
                </Header>
                <Details>
                  <div>
                    <ul>
                      <li>
                        Cust LoginId:
                        {invoiceDetails.customerDetails[0].loginID}
                      </li>
                      <li>
                        Cust Name: {invoiceDetails.billingDetails.customerName}
                      </li>
                      <li>Phone: {invoiceDetails.customerDetails[0].phone}</li>
                    </ul>
                  </div>
                  <div>
                    <ul>
                      <li>
                        Invoice No.:
                        {invoiceDetails.billingDetails.invoiceNumber}
                      </li>
                      <li>
                        Invoice Date:
                        {invoiceDetails.billingDetails.invoiceDate}
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
                    {invoiceDetails.purchasedProducts.length > 0 &&
                      invoiceDetails.purchasedProducts.map((product) => {
                        return (
                          <>
                            <tr>
                              <td>{product.productName}</td>
                              <td>
                                {parseInt(product.unitPrice).toLocaleString(
                                  "en-IN"
                                )}
                              </td>
                              <td>{product.productQuantity}</td>
                              <td>
                                {(
                                  parseInt(product.unitPrice) *
                                  parseInt(product.productQuantity)
                                ).toLocaleString("en-IN")}
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
                  <div>
                    &#8377; {_.sum(invoiceItemsTotal).toLocaleString("en-IN")}/-
                  </div>
                </TotalDetails>
                <Button onClick={() => handleInvoicePrint()}>
                  Print Invoice
                </Button>
              </Container>
            </>
          );
        })}
    </>
  );
};

export default forwardRef(NewInvoice);
