import React, { useReducer } from 'react'
import { CartReducer } from './reducers/CartReducer';

const initialcartState = {
  cartItems: []
}

export const CartContext = React.createContext<{
  cartState: any;
  cartDispatch: React.Dispatch<any>;
}>({
  cartState: initialcartState,
  cartDispatch: () => null
})


export const CartProvider: React.FunctionComponent = ({ children }: any) => {
  const [cartState, cartDispatch] = useReducer(CartReducer, initialcartState);
  return (
    <CartContext.Provider value={{ cartState, cartDispatch }}>
      {children}
    </CartContext.Provider>
  )
}