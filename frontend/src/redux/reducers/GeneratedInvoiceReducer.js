import { initialstate } from "../InitialState";

export const generatedInvoiceDetailsReducer = (
  generatedInvoiceDetails = initialstate.generatedInvoiceDetails,
  action
) => {
  switch (action.type) {
    case "SAVEGENERATEDINVOICE":
      generatedInvoiceDetails = [];
      return [...generatedInvoiceDetails, action.values];
    case "UPDATESTORE":
      generatedInvoiceDetails = [];
      return generatedInvoiceDetails;

    default:
      return generatedInvoiceDetails;
  }
};
