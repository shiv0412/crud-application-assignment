import React from "react";
import {ErrorMessage} from "formik";
import styled from "styled-components";

const Message = styled.span`
color:red;
font-size:12px;
`

const CustomErrorMessage =({name}) =>{
    return( 
   <Message className="custom_error">
    <ErrorMessage name={name}/>
  </Message>
    );
}
export default CustomErrorMessage;
