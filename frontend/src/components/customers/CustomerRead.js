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
    i:nth-child(1) {
      color: #5dade2;
      margin-right: 20px;
    }
    i:nth-child(2) {
      color: #ec7063;
    }
    i:hover {
      cursor: pointer;
    }
  }
`;

const CustomerRead = ({
  customers,
  editCustomerDetails,
  handleCustomerDelete,
}) => {
  return (
    <>
      <TableContainer>
        <table className="table table-bordered">
          <tr>
            <th>Login ID</th>
            <th>Customer Name</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
          {customers &&
            customers.map((customer) => {
              return (
                <>
                  <tr>
                    <td>{customer.loginID}</td>
                    <td>{customer.customerName}</td>
                    <td>{customer.phone}</td>
                    <td>
                      <i
                        className="edit icon"
                        onClick={()=>editCustomerDetails(customer.loginID)}
                      ></i>
                      <i
                        className="trash icon"
                        onClick={() => handleCustomerDelete(customer.loginID)}
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

export default CustomerRead;
