export const CartReducer = (state: CartContext, action: any) => {
  switch (action.type) {
    case 'SET_CART_ITEMS':
      return {
        ...state,
        cartItems: action.payload
      }
    default:
      return state;
  }
}