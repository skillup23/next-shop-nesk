import { createContext, useReducer } from "react";
import Cookies from "js-cookie";

export const Store = createContext();

// Инициализация Cookies в формате JSON
const initialState = {
  cart: Cookies.get("cart")
    ? JSON.parse(Cookies.get("cart"))
    : { cartItems: [], shippingAddress: {} },
};

// const ISSERVER = typeof window === "undefined";

// function test(item) {
//   if (!ISSERVER) {
//     localStorage.getItem(item);
//   }
// }

// const initialState = {
//   cart: test("cart")
//     ? JSON.parse(localStorage.getItem("cart"))
//     : { cartItems: [] },
// };

function reducer(state, action) {
  switch (action.type) {
    case "CART_ADD_ITEM": {
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item.slug === newItem.slug
      );

      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item.name === existItem.name ? newItem : item
          )
        : [...state.cart.cartItems, newItem];

      // Добавление товаров в Cookies
      Cookies.set("cart", JSON.stringify({ ...state.cart, cartItems }));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case "CART_REMOVE_ITEM": {
      const cartItems = state.cart.cartItems.filter(
        (item) => item.slug !== action.payload.slug
      );
      // Обновление товаров в Cookies
      Cookies.set("cart", JSON.stringify({ ...state.cart, cartItems }));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    //сброс корзины товаров, страницы доставки и платежной информации
    case "CART_RESET":
      return {
        ...state,
        cart: {
          cartItems: [],
          shippingAddress: { location: {} },
          paymentMethod: "",
        },
      };
    //сохраннение адреса доставки из формы на странице адреса отправки
    case "SAVE_SHIPPING_ADDRESS":
      return {
        ...state,
        card: {
          ...state.cart,
          shippingAddress: {
            ...state.cart.shippingAddress,
            ...action.payload,
          },
        },
      };

    default:
      return state;
  }
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{children}</Store.Provider>;
}
