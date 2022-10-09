import { initialstate } from "../InitialState";

export const customerReducer = (customers = initialstate.customers, action) => {
  switch (action.type) {
    case "SAVECUSTOMERS":
      customers = action.values;
      customers.reverse();
      return customers;

    default:
      return customers;
  }
};
