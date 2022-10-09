import { initialstate } from "../InitialState";

export const invoiceReducer = (invoices = initialstate.invoices, action) => {
  switch (action.type) {
    case "SAVEINVOICES":
      invoices = action.values;
      invoices.reverse();
      return invoices;

    default:
      return invoices;
  }
};
