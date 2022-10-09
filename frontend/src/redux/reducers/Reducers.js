import { combineReducers } from "redux";

import { customerReducer } from "./CustomerReducer";
import { productsReducer } from "./ProductsReducer";
import { invoiceReducer } from "./InvoiceReducer";
import { recepitReducer } from "./ReceiptReducer";
import { generatedInvoiceDetailsReducer } from "./GeneratedInvoiceReducer";

const rootReducer = combineReducers({
  customerReducer,
  productsReducer,
  invoiceReducer,
  recepitReducer,
  generatedInvoiceDetailsReducer,
});

export default rootReducer;
