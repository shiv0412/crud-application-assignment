import React, { useState, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { useReactToPrint } from "react-to-print";

import InvoiceRead from "./InvoiceDetailsModal";
import { toastErrorNotification } from "../../constants";

const TableContainer = styled.div`
  margin: 0;
  table {
    font-size: 13px;
    font-weight: bold;
    color: #566573;
  }
  th {
    background-color: #2c3e50;
    color: #fff;
    padding: 10px 5px;
  }
  tr:nth-child(odd) {
    background-color: #f8f9f9;
  }
  tr:hover {
    background-color: #f2f3f4;
  }
  td {
    padding: 5px 5px;
    i:nth-child(2) {
      color: #ec7063;
      margin: 0 10px;
    }
    i:hover {
      cursor: pointer;
    }
  }
`;

const InvoiceReadTable = ({ allInvoices, handleInvoiceDelete }) => {
  const [isShowInvoiceDetails, setIsShowInvoiceDetails] = useState(false);
  const [invoiceProductDetails, setInvoiceProductDetails] = useState([]);
  const [invoiceBillingDetails, setInvoiceBillingDetails] = useState([]);
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleViewInvoice = (invoiceNumber) => {
    axios
      .get("http://localhost:4200/purchased-products-details/" + invoiceNumber)
      .then((response) => setInvoiceProductDetails(response.data))
      .catch((error) => toastErrorNotification(error.message));
    const billingDetails =
      allInvoices && allInvoices.length > 0
        ? allInvoices.filter((allInvoices) => {
            return allInvoices.invoiceNumber === invoiceNumber;
          })
        : [];
    setInvoiceBillingDetails(billingDetails);
    setIsShowInvoiceDetails(true);
  };

  return (
    <>
      <TableContainer>
        <table className="table table-bordered">
          <tr>
            <th>Invoice No.</th>
            <th>Invoice Date</th>
            <th>Customer Name</th>
            <th>Action</th>
          </tr>
          {allInvoices &&
            allInvoices.map((invoice) => {
              return (
                <>
                  <tr>
                    <td>{invoice.invoiceNumber}</td>
                    <td>{invoice.invoiceDate.split("T")[0]}</td>
                    <td>{invoice.customerName}</td>
                    <td>
                      <i
                        className="eye icon"
                        onClick={() => handleViewInvoice(invoice.invoiceNumber)}
                      ></i>
                      <i
                        className="trash icon"
                        onClick={() =>
                          handleInvoiceDelete(invoice.invoiceNumber)
                        }
                      ></i>
                    </td>
                  </tr>
                </>
              );
            })}
        </table>
        {isShowInvoiceDetails && (
          <InvoiceRead
            isShowInvoiceDetails={isShowInvoiceDetails}
            handlePopUpClose={() => setIsShowInvoiceDetails(false)}
            invoiceProductDetails={invoiceProductDetails}
            invoiceBillingDetails={invoiceBillingDetails}
            handlePrint={handlePrint}
            ref={componentRef}
          />
        )}
      </TableContainer>
    </>
  );
};

export default InvoiceReadTable;
