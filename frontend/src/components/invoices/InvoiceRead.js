import React from "react";
import styled from "styled-components";

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
      color: #5dade2;
      margin: 0 10px;
    }
    i:nth-child(3) {
      color: #ec7063;
    }
    i:hover {
      cursor: pointer;
    }
  }
`;

const InvoiceRead = ({
  invoices,
  handleInvoiceDelete,
}) => {
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
          {invoices &&
            invoices.map((invoice) => {
              return (
                <>
                  <tr>
                    <td>{invoice.invoiceNumber}</td>
                    <td>{invoice.invoiceDate.split("T")[0]}</td>
                    <td>{invoice.customerName}</td>
                    <td>
                      <i className="eye icon"></i>
                      <i
                        className="edit icon"
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
      </TableContainer>
    </>
  );
};

export default InvoiceRead;
