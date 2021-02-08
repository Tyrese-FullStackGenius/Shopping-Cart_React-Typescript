import { CartItemType } from "../interfaces/CartItem";

/**
 * @description Get all products from API
 */
export const getProducts = async (): Promise<CartItemType[]> =>
  await (await fetch("https://fakestoreapi.com/products")).json();
