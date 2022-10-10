import React, { useRef } from "react";
import InvoiceTemplate from "./InvoiceTemplate";
import { useReactToPrint } from "react-to-print";

const InvoiceContainer =  ({
  invoiceValues,
  updateStore,
  handleClose,
  handlePopUp,
}) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <>
      <InvoiceTemplate
        invoiceValues={invoiceValues}
        handleClose={handleClose}
        handlePopUp={handlePopUp}
        updateStore={updateStore}
        ref={componentRef}
        handlePrint={handlePrint}
      />
    </>
  );
};

export default InvoiceContainer;
