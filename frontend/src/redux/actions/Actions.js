export const saveCustomersDetailsToStore = (values) => {
  return {
    type: "SAVECUSTOMERS",
    values,
  };
};
export const saveProductsDetailsToStore = (values) => {
  return {
    type: "SAVEPRODUCTS",
    values,
  };
};
export const saveInvoicesDetailsToStore = (values) => {
  return {
    type: "SAVEINVOICES",
    values,
  };
};
export const setPurchasedProducts = (values) => {
  return {
    type: "SAVEPURCHASEDPRODUCT",
    values,
  };
};
export const setGeneratedInvoiceDetails = (values) => {
  return {
    type: "SAVEGENERATEDINVOICE",
    values,
  };
};
export const updateStore = () => {
  return {
    type: "UPDATESTORE",
  };
};
