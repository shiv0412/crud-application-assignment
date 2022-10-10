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

const ProductRead = ({
  products,
  editProductDetails,
  handleProductDelete,
}) => {
  return (
    <>
      <TableContainer>
        <table className="table table-bordered">
          <tr>
            <th>Product Name</th>
            <th>Unit Price (&#8377;)</th>
            <th>Action</th>
          </tr>
          {products &&
            products.map((product) => {
              return (
                <>
                  <tr>
                    <td>{product.productName}</td>
                    <td>{product.unitPrice}</td>
                    <td>
                      <i
                        className="edit icon"
                        onClick={()=>editProductDetails(product.productName)}
                      ></i>
                      <i
                        className="trash icon"
                        onClick={() => handleProductDelete(product.productName)}
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

export default ProductRead;
