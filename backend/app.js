const database = require("./connection");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

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
  database.query("select * from invoices", (error, result) => {
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
  const sql = "DELETE FROM invoices WHERE invoices.invoiceNumber = ?";
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
  const data = {
    invoiceNumber: request.body.invoiceNumber,
    customerName: request.body.customerName,
    invoiceDate: request.body.invoiceDate,
  };
  database.query("INSERT INTO invoices SET ?", data, (error, result) => {
    if (error) {
      response.send(error.message);
    } else {
      response.send(result);
    }
  });
});

app.listen(4200);
