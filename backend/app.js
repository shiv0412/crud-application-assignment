const database = require("./connection");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 4200;

//api to fetch all customers
app.get("/customers", (request, response) => {
  database.query("select * from customers", (error, result) => {
    if (error) {
      response.send(error.message);
    } else {
      response.send(result);
    }
  });
});

//api to save customer details
app.post("/customers", (request, response) => {
  const data = {
    loginID: request.body.loginID,
    customerName: request.body.customerName,
    phone: request.body.phone,
  };
  database.query(
    "SELECT * FROM customers WHERE customers.loginID = ?",
    data.loginID,
    (error, result) => {
      if (error) {
        response.send(error.message);
      } else {
        if (result && result.length > 0) {
          response.send("existing");
        } else {
          database.query(
            "INSERT INTO customers SET ?",
            data,
            (error, result) => {
              if (error) {
                response.send(error.message);
              } else {
                response.send(result);
              }
            }
          );
        }
      }
    }
  );
});

//api to delete any customer
app.delete("/customers/:id", (request, response) => {
  const id = request.params.id;
  const sql = "DELETE FROM customers WHERE customers.loginID = ?";
  database.query(sql, id, (error, result) => {
    if (error) {
      response.send(error.message);
    } else {
      response.send(result);
    }
  });
});

//api to update customer details
app.put("/customers/:id", (request, response) => {
  const data = [
    request.body.customerName,
    request.body.phone,
    request.params.id,
  ];
  const sql =
    "UPDATE customers SET customerName = ?, phone=? WHERE loginID = ?";
  database.query(sql, data, (error, result) => {
    if (error) {
      response.send(error.message);
    } else {
      response.send(result);
    }
  });
});

//api to fetch all products
app.get("/products", (request, response) => {
  database.query("select * from products", (error, result) => {
    if (error) {
      response.send(error.message);
    } else {
      response.send(result);
    }
  });
});

//api to save products
app.post("/products", (request, response) => {
  const data = {
    productName: request.body.productName,
    unitPrice: request.body.unitPrice,
  };
  database.query(
    "SELECT * FROM products WHERE products.productName = ?",
    data.productName,
    (error, result) => {
      if (error) {
        response.send(error.message);
      } else {
        if (result && result.length > 0) {
          response.send("existing");
        } else {
          database.query(
            "INSERT INTO products SET ?",
            data,
            (error, result) => {
              if (error) {
                response.send(error.message);
              } else {
                response.send(result);
              }
            }
          );
        }
      }
    }
  );
});

//api to delete any product
app.delete("/products/:name", (request, response) => {
  const name = request.params.name;
  const sql = "DELETE FROM products WHERE products.productName = ?";
  database.query(sql, name, (error, result) => {
    if (error) {
      response.send(error.message);
    } else {
      response.send(result);
    }
  });
});

//api to update product details
app.put("/products/:name", (request, response) => {
  const data = [
    request.body.productName,
    request.body.unitPrice,
    request.params.name,
  ];
  const sql =
    "UPDATE products SET productName = ?, unitPrice=? WHERE productName = ?";
  database.query(sql, data, (error, result) => {
    if (error) {
      response.send(error.message);
    } else {
      response.send(result);
    }
  });
});

//api to fetch all invoices
app.get("/invoices", (request, response) => {
  database.query("select * from billingdetails", (error, result) => {
    if (error) {
      response.send(error.message);
    } else {
      response.send(result);
    }
  });
});

//api to delete any invoice
app.delete("/invoices/:id", (request, response) => {
  const id = request.params.id;
  const sql = "DELETE FROM billingdetails WHERE invoiceNumber = ?";
  const deleteInvoiceProducts =
    "DELETE FROM purchasedproducts WHERE invoiceNumber = ?";
  database.query(deleteInvoiceProducts, id);
  database.query(sql, id, (error, result) => {
    if (error) {
      response.send(error.message);
    } else {
      response.send(result);
    }
  });
});

//api to save invoices
app.post("/invoices", (request, response) => {
  const billingDetails = {
    invoiceNumber: request.body.billingDetails.invoiceNumber,
    invoiceDate: request.body.billingDetails.invoiceDate,
    customerLoginID: request.body.customerDetails[0].loginID,
    customerName: request.body.billingDetails.customerName,
    customerPhone: request.body.customerDetails[0].phone,
    invoiceTotal: request.body.invoiceTotal,
  };
  const purchasedProductsDetails = request.body.purchasedProducts;
  database.query(
    "INSERT INTO purchasedproducts (invoiceNumber, productName, unitPrice,quantity,itemTotal) VALUES ?",
    [
      purchasedProductsDetails.map((purchasedProduct) => [
        billingDetails.invoiceNumber,
        purchasedProduct.productName,
        purchasedProduct.unitPrice,
        purchasedProduct.productQuantity,
        purchasedProduct.total,
      ]),
    ]
  );
  database.query(
    "INSERT INTO billingdetails SET ?",
    billingDetails,
    (error, result) => {
      if (error) {
        response.send(error.message);
      } else {
        response.send(result);
      }
    }
  );
});

//api to fetch all purchased products
app.get("/purchased-products-details/:invoiceNumber", (request, response) => {
  const invoiceNumber = request.params.invoiceNumber;
  const sql = "SELECT * FROM purchasedproducts WHERE invoiceNumber = ?";
  database.query(sql, invoiceNumber, (error, result) => {
    if (error) {
      response.send(error.message);
    } else {
      response.send(result);
    }
  });
});

app.listen(port, () => {});
