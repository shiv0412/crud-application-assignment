import { initialstate } from "../InitialState";

export const productsReducer = (products = initialstate.products, action) => {
  switch (action.type) {
    case "SAVEPRODUCTS":
      products = action.values;
      products.reverse();
      return products;

    default:
      return products;
  }
};
