import React from "react";
import styled from "styled-components";
import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import { connect } from "react-redux";
import axios from "axios";
import uniqueRandom from "unique-random";
import _ from "lodash";

import CustomErrorMessage from "../shared/CustomerErrorMessage";
import { SelectField } from "../shared/CustomSelectField";
import AddProduct from "./AddProucts";
import { setPurchasedProducts, updateStore } from "../../redux/actions/Actions";
import { setGeneratedInvoiceDetails } from "../../redux/actions/Actions";
import InvoiceTemplate from "./InvoiceTemplate";

//form validation
const validationSchema = yup.object({
  invoiceNumber: yup.number().required("invoice no. is required"),
  customerName: yup.string().required("please add customer name"),
  invoiceDate: yup.string().required("invoice date is not selected"),
});

//styled components
const ModalContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  h4 {
    text-align: center;
    border-bottom: 1px solid #cacfd2;
    padding-bottom: 10px;
    color: #566573;
  }
`;
const ModalContent = styled.div`
  width: 90%;
  background-color: #f2f3f4;
  height: auto;
`;
const ModalHeader = styled.div`
  padding: 15px;
  font-family: Arial, Helvetica, sans-serif;
  position: relative;
  background-color: black;
  color: #fff;
`;
const Span = styled.span`
  position: absolute;
  top: 12%;
  right: 10px;
  font-size: 20px;
  cursor: pointer;
`;
const ModalTitle = styled.h5`
  margin: 0;
  color: #fff;
  font-weight: bold;
`;
const ModalBody = styled.div`
  border-top: 1px solid lightgray;
  border-bottom: 1px solid lightgray;
  padding: 0 10px;
`;
const StyledField = styled(Field)`
  border: 1.5px solid lightgray;
  width: 100%;
  margin: 10px 0px;
  padding: 10px 5px;
  color: #808b96;
  &:focus {
    outline: none;
  }
`;
const Button = styled.button`
  margin: 10px auto 10px auto;
  display: block;
  padding: 5px 15px;
  border: none;
  background-color: orangered;
  color: #fff;
  font-family: Arial, Helvetica, sans-serif;
`;
const Label = styled.label``;
const TotalDetails = styled.div`
  text-align: right;
  padding-right: 40px;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
`;

const InvoiceEdit = ({
  isEditing,
  customerData,
  productData,
  purchasedProducts,
  generatedInvoiceDetails,
  handleFormClose,
  updateStore,
  setPurchasedProducts,
  setGeneratedInvoiceDetails,
}) => {
  const [isInvoiceGenerated, setIsInvoiceGenerated] = React.useState(false);
  const [isProductAddedToInvoice, setIsProductAddedToInvoice] =
    React.useState(false);
  const randomNumber = uniqueRandom(11000, 20000); //just for test not a real use case
  const invoiceItemsTotal = [];

  if (!isEditing) {
    return null;
  }

  const getCustomersOptions = (customerData) => {
    const options = [];
    customerData.forEach((customer) => {
      options.push({
        value: customer.customerName,
        label: customer.customerName,
      });
    });
    return options;
  };

  const handleProductAdd = (values) => {
    const addedProduct = productData.filter((product) => {
      return (
        product.productName.toLowerCase().trim() ===
        values.productName.toLowerCase().trim()
      );
    });
    if (addedProduct.length > 0) {
      setPurchasedProducts({
        productName: addedProduct[0].productName,
        productQuantity: values.productQuantity,
        unitPrice: addedProduct[0].unitPrice,
        total:
          parseInt(addedProduct[0].unitPrice) *
          parseInt(values.productQuantity),
      });
      setIsProductAddedToInvoice(false);
    }
  };

  const handleGenerateInvoice = (values, purchasedProducts) => {
    const customerDetails = customerData.filter((customer) => {
      return customer.customerName === values.customerName;
    });
    setGeneratedInvoiceDetails({
      billingDetails: values,
      purchasedProducts: purchasedProducts,
      customerDetails: customerDetails,
    });
    setIsInvoiceGenerated(true);
    axios({
      method: "post",
      url: "http://localhost:4200/invoices",
      data: {
        invoiceNumber: values.invoiceNumber,
        invoiceDate: values.invoiceDate,
        customerName: values.customerName,
      },
    });
  };

  const handleReceiptClosed = () => {
    updateStore();
    handleFormClose();
    setIsInvoiceGenerated(false);
    setIsProductAddedToInvoice(false);
  };

  return (
    <ModalContainer onClick={handleFormClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Generate Invoice</ModalTitle>
          <Span>
            <i className="window close icon" onClick={handleReceiptClosed}></i>
          </Span>
        </ModalHeader>
        <ModalBody>
          {isInvoiceGenerated &&
          generatedInvoiceDetails &&
          generatedInvoiceDetails.length > 0 ? (
            <InvoiceTemplate
              invoiceValues={generatedInvoiceDetails}
              handleClose={handleFormClose}
              handlePopUp={() => setIsInvoiceGenerated(false)}
              updateStore={updateStore}
            />
          ) : (
            <div className="row">
              <div className="col-md-6">
                <AddProduct
                  productData={productData}
                  handleProductAdd={handleProductAdd}
                />
                {isProductAddedToInvoice ? (
                  <span>No product added please add atleast one product.</span>
                ) : (
                  ""
                )}
                <h4>Add Billing Details</h4>
                <Formik
                  validationSchema={validationSchema}
                  initialValues={{
                    invoiceNumber: randomNumber(),
                    invoiceDate: "",
                    customerName: "",
                  }}
                  onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                      if (purchasedProducts && purchasedProducts.length > 0) {
                        handleGenerateInvoice(values, purchasedProducts);
                        setSubmitting(false);
                      } else {
                        setIsProductAddedToInvoice(true);
                      }
                    }, 400);
                  }}
                >
                  <Form>
                    <Label>Invoice No.</Label>
                    <StyledField
                      type="number"
                      name="invoiceNumber"
                      placeholder="Invoice number"
                    />
                    <CustomErrorMessage name="invoiceNumber"></CustomErrorMessage>
                    <StyledField
                      name={"customerName"}
                      component={SelectField}
                      options={getCustomersOptions(customerData)}
                      placeholder={"Select customer..."}
                    />

                    <StyledField
                      type="date"
                      name="invoiceDate"
                      placeholder="invoice date"
                    />
                    <CustomErrorMessage name="customerName"></CustomErrorMessage>
                    <br />
                    <CustomErrorMessage name="invoiceDate"></CustomErrorMessage>
                    <Button type="submit">Generate Invoice</Button>
                  </Form>
                </Formik>
              </div>
              <div className="col-md-6">
                <table className="table">
                  <tr>
                    <th>Product Name</th>
                    <th>Unit Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                  </tr>
                  {purchasedProducts &&
                    purchasedProducts.length > 0 &&
                    purchasedProducts.map((product) => {
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
                {invoiceItemsTotal.length > 0 && (
                  <TotalDetails>
                    <b>Invoice Total</b> : &#8377; {_.sum(invoiceItemsTotal)}
                  </TotalDetails>
                )}
              </div>
            </div>
          )}
        </ModalBody>
      </ModalContent>
    </ModalContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    purchasedProducts: state.recepitReducer,
    generatedInvoiceDetails: state.generatedInvoiceDetailsReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPurchasedProducts: (data) => {
      dispatch(setPurchasedProducts(data));
    },
    setGeneratedInvoiceDetails: (data) => {
      dispatch(setGeneratedInvoiceDetails(data));
    },
    updateStore: () => {
      dispatch(updateStore());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceEdit);
