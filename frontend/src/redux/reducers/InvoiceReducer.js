import { initialstate } from "../InitialState";

export const invoiceReducer = (invoices = initialstate.invoices, action) => {
  switch (action.type) {
    case "SAVEINVOICES":
      invoices = action.values;
      return invoices;

    default:
      return invoices;
  }
};
