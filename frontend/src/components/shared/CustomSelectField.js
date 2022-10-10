import { FieldProps } from "formik";
import React from "react";
import Select, { Option, ReactSelectProps } from "react-select";
import styled from "styled-components";

const CustomSelectField = styled(Select)`
  padding: 15px 0 !important;
  border-radius: 0px;
`;

export const SelectField = ({
  options,
  field,
  form,
  placeholder,
  clearSelection,
}) => (
  <CustomSelectField
    options={options}
    name={field.name}
    value={
      options ? options.find((option) => option.value === field.value) : ""
    }
    onChange={(option) => {
      form.setFieldValue(field.name, option.value);
      clearSelection(option);
    }}
    onBlur={field.onBlur}
    placeholder={placeholder}
  />
);
