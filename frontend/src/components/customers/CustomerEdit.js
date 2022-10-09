import React from "react";
import styled from "styled-components";
import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import CustomErrorMessage from "../shared/CustomerErrorMessage";

//form validation
const validationSchema = yup.object({
  loginID: yup.string().required("login id is required"),
  customerName: yup
    .string()
    .matches(/^[a-z,A-Z_ ]*$/, "name must be in alphabets")
    .required("name is required"),
  phone: yup
    .number()
    .min(1000000000, "not a valid phone number")
    .max(9999999999, "not a valid phone number")
    .required("phone number is required"),
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
`;
const ModalContent = styled.div`
  width: 600px;
  background-color: #f2f3f4;
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
  margin: 15px 0;
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

const CustomerEdit = ({
  handleFormClose,
  isEditing,
  handleSubmit,
  initialValues,
  label,
}) => {
  if (!isEditing) {
    return null;
  }
  console.log(initialValues);

  return (
    <ModalContainer onClick={handleFormClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>{label} Customer</ModalTitle>
          <Span>
            <i className="window close icon" onClick={handleFormClose}></i>
          </Span>
        </ModalHeader>
        <ModalBody>
          <Formik
            validationSchema={validationSchema}
            initialValues={{
              loginID: initialValues.loginID,
              customerName: initialValues.customerName,
              phone: initialValues.phone,
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                handleSubmit(values, label);
                setSubmitting(false);
              }, 400);
            }}
          >
            <Form>
              <StyledField
                type="text"
                name="loginID"
                placeholder="Enter login Id"
              />
              <CustomErrorMessage name="loginID"></CustomErrorMessage>
              <StyledField
                type="text"
                name="customerName"
                placeholder="Enter customer name"
              />
              <CustomErrorMessage name="customerName"></CustomErrorMessage>
              <StyledField
                type="number"
                name="phone"
                placeholder="Enter customer phone"
              />
              <CustomErrorMessage name="phone"></CustomErrorMessage>
              <Button type="submit">{label}</Button>
            </Form>
          </Formik>
        </ModalBody>
      </ModalContent>
    </ModalContainer>
  );
};

export default CustomerEdit;
