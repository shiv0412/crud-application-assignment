import { initialstate } from "../InitialState";

export const recepitReducer = (
  purchasedProducts = initialstate.purchasedProducts,
  action
) => {
  switch (action.type) {
    case "SAVEPURCHASEDPRODUCT":
      return [...purchasedProducts, action.values];

    case "UPDATESTORE":
      purchasedProducts = [];
      return purchasedProducts;

    default:
      return purchasedProducts;
  }
};
