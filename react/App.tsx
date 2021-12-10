import React from 'react'
import MinicartEdit from './components/MinicartEdit/MinicartEdit'
import { ModalProvider } from './context/ModalContext'
import { CartProvider } from './context/CartContext'

const App: React.FunctionComponent = () => {
  return (
    <ModalProvider>
      <CartProvider>
        <MinicartEdit />
      </CartProvider >
    </ModalProvider>
  )
}
export default App
