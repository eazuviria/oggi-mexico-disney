import React, { useContext, useRef, useEffect, useState } from 'react'
import { useMutation, useLazyQuery } from 'react-apollo'
import ReactDOM from "react-dom";

import { useOrderForm } from 'vtex.order-manager/OrderForm'
// import updateItems from 'vtex.store-resources/MutationUpdateItems'
import getProduct from './../../graphql/getProduct.gql'

import { ModalContext } from '../../context/ModalContext'
import ColorPicker from '../ColorPicker/ColorPicker'
import SizePicker from '../SizePicker/SizePicker'

import updateOrderMutation from './../../graphql/updateOrder.gql';
import { CartContext } from '../../context/CartContext';

const MinicartEdit: React.FunctionComponent = () => {
    const { state, dispatch } = useContext(ModalContext)
    const { cartState, cartDispatch } = useContext(CartContext)
    const { orderForm: { id: orderFormId, items: orderFormItems } } = useOrderForm()
    const inputEl = useRef(null);
    const [product, setProduct] = useState<any>({})
    const [getProductQuery, { data: productData, error: productError }] = useLazyQuery(
        getProduct
    )

    const saveOrder = () => {
        /*  updateOrder({
             variables: {
                 orderFormId,
                 orderItems: 
             }
         }) */
        console.log(updateOrder)
    }

    useEffect(() => {
        if (productData) {
            console.log("productDAta", productData)
            setProduct(productData?.productsByIdentifier[0])
            const colors = productData?.productsByIdentifier[0].skuSpecifications.find((item: any) => item.field.name === 'Color'
            )
            if (colors) dispatch({
                type: 'SET_COLORS', payload: colors.values
            })
        }
    }, [productData, productError])

    const [
        updateOrder,
        {
            loadingUpdate,
            errorUpdate,
            dataUpdate
        },
    ] = useMutation(updateOrderMutation)

    console.log("orderFormId", orderFormId)
    console.log("orderFormItems", orderFormItems)
    console.log("cartState", cartState)
    useEffect(() => {
        cartDispatch({
            type: 'SET_CART_ITEMS', payload: {
                orderItems: { ...orderFormItems }
            }
        })
      

    }, [orderFormItems])

    console.log("state.selectedSize--", state.selectedSize)
    
    useEffect(() => {
        if (loadingUpdate) console.log("loadingUpdate...")
        if (errorUpdate) console.log("errorUpdate...", errorUpdate)
        if (dataUpdate) console.log("dataUpdate...", dataUpdate)
    }, [loadingUpdate, errorUpdate, dataUpdate])



    useEffect(() => {
        if (state.selectedColor) {
            console.log("entr aca")
            const availableSizesPerColor = product.items.filter((sku: any) => {
                console.log("sku--", sku)
                const color = sku.variations.find((item: any) => item.name === 'Color')
                console.log("color--", color)
                console.log("state.selectedColor--", state.selectedColor)

                return color.values[0] === state.selectedColor
            })
            dispatch({ type: "SET_AVAILABLES_SKUS_PER_COLOR", payload: availableSizesPerColor })
            console.log("availableSizesPerColor", availableSizesPerColor)
        }
    }, [state.selectedColor])

    console.log("state.selectedColor", state.selectedColor)
    const searchProduct = async () => {
        console.log("inputElem", inputEl?.current)
        const parentEl = ReactDOM.findDOMNode(inputEl.current)?.parentElement?.parentElement;

        const productId = parentEl?.getElementsByClassName('vtex-product-list-0-x-productIdentifierValue')
        if (productId?.length) console.log("productId[0].innerHTML", productId[0].innerHTML)
        if (productId?.length) {
            console.log("entro acaaaaaa")
            getProductQuery({
                variables: {
                    productId: Number(productId[0].innerHTML)
                }
            })
        }
    }

    return (
        <>
            <ColorPicker colors={state.colors} />
            <SizePicker availableSkusPerColor={state.availableSkusPerColor} />
            <button ref={inputEl} onClick={() => searchProduct()}>editar</button>
            <button onClick={(() => saveOrder())}>guardar</button>
        </>
    )
}


export default MinicartEdit
