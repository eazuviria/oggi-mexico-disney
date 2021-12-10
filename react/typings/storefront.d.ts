import { FunctionComponent } from 'react'

declare global {
  interface ModalContext {
    colors: any[];
  }
  interface CartContext {
    cartItems: any[];
  }
}
