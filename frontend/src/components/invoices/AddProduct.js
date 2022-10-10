import React, { useEffect } from "react";
import styled from "styled-components";
import { Field, Form, Formik } from "formik";

import { productQuantitySelectOptions } from "../../constants";
import { SelectField } from "../shared/CustomSelectField";

const Container = styled.div`
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
  margin: 15px auto 10px auto;
  display: block;
  padding: 5px 5px;
  border: none;
  border-radius: 50%;
  color: orangered;
  font-size: 25px;
`;

const AddProduct = ({ productsDetails, handleProductAdd }) => {
  const [productsOptions, setProductsOptions] = React.useState();

  useEffect(() => {
    setProductsOptions(createProductSelectOptions(productsDetails));
  }, []);

  const createProductSelectOptions = (productsDetails) => {
    const options = [];
    productsDetails.forEach((product) => {
      options.push({
        value: product.productName,
        label: product.productName,
      });
    });
    return options;
  };

  const createQuantitySelectOptions = (productQuantitySelectOptions) => {
    const options = [];
    productQuantitySelectOptions.forEach((quantity) => {
      options.push({
        value: quantity,
        label: quantity,
      });
    });
    return options;
  };

  const handleSelection = (option) => {
    const updatedOptions = productsOptions.filter((options) => {
      return options.value !== option.productName;
    });
    setProductsOptions(updatedOptions);
  };

  return (
    <>
      <Container>
        <h4>Add Products</h4>
        <Formik
          initialValues={{
            productName: "",
            productQuantity: "",
          }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setTimeout(() => {
              handleProductAdd(values);
              handleSelection(values);
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
                  options={productsOptions}
                  placeholder={"Select products..."}
                />
              </div>
              <div className="col-md-5">
                <StyledField
                  name={"productQuantity"}
                  component={SelectField}
                  options={createQuantitySelectOptions(
                    productQuantitySelectOptions
                  )}
                  placeholder={"Select quantity..."}
                />
              </div>
              <div className="col-md-2">
                <Button title="Add product">
                  <i className="add circle icon"></i>
                </Button>
              </div>
            </div>
          </Form>
        </Formik>
      </Container>
    </>
  );
};

export default AddProduct;
