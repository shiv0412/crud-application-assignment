import React from "react";
import styled from "styled-components";
import { Field, Form, Formik } from "formik";

import { defaultQuanity } from "../../constants";
import { SelectField } from "../shared/CustomSelectField";

const Contianer = styled.div`
  div {
    margin: 0;
  }
  h4 {
    text-align: center;
    border-bottom: 1px solid black;
    padding: 10px 0;
  }
`;

const StyledField = styled(Field)`
  border: 1.5px solid lightgray;
  width: 100%;
  margin: 10px 0px;
  padding: 5px 5px;
  color: #808b96;
  &:focus {
    outline: none;
  }
`;
const Button = styled.button`
  margin: 20px auto 10px auto;
  display: block;
  padding: 5px 5px;
  border: none;
  background-color: orangered;
  color: #fff;
  font-family: Arial, Helvetica, sans-serif;
`;

const AddProduct = ({ productData, handleProductAdd }) => {
  const getProductsOptions = (productData) => {
    const options = [];
    productData.forEach((product) => {
      options.push({
        value: product.productName,
        label: product.productName,
      });
    });
    return options;
  };
  const getQuantityOptions = (defaultQuanity) => {
    const options = [];
    defaultQuanity.forEach((quantity) => {
      options.push({
        value: quantity,
        label: quantity,
      });
    });
    return options;
  };
  return (
    <>
      <Contianer>
        <h4>Add Products</h4>
        <Formik
          initialValues={{
            productName: "",
            productQuantity: "",
          }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setTimeout(() => {
              handleProductAdd(values);
              setSubmitting(false);
              resetForm();
            }, 400);
          }}
        >
          <Form>
            <div className="row">
              <div className="col-md-5">
                <StyledField
                  name={"productName"}
                  component={SelectField}
                  options={getProductsOptions(productData)}
                  placeholder={"Select products..."}
                />
              </div>
              <div className="col-md-5">
                <StyledField
                  name={"productQuantity"}
                  component={SelectField}
                  options={getQuantityOptions(defaultQuanity)}
                  placeholder={"Select quantity..."}
                />
              </div>
              <div className="col-md-2">
                <Button>Add Product</Button>
              </div>
            </div>
          </Form>
        </Formik>
      </Contianer>
    </>
  );
};

export default AddProduct;
