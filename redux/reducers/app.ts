import { createSlice } from '@reduxjs/toolkit'
import { createInterface } from 'readline'
import {
  AppStateType,
  CartItem,
  Category,
  Order,
  Product,
  SingleProduct,
} from 'types'
import { addItem, reduceItem } from './utils'

const initialState: AppStateType = {
  products: [],
  categories: [],
  cart: [],
  orders: [],
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setProducts: (state, { payload }: { payload: Product[] }) => {
      state.products = payload
    },
    setCategories(state, { payload }: { payload: Category[] }) {
      state.categories = payload
    },
    setCart(state, { payload }: { payload: CartItem[] }) {
      state.cart = payload
    },
    //addToCart ---> find item by , if not present , appendItem
    addCartItem(state, { payload }: { payload: SingleProduct }) {
      const item = state.cart.find((item) => {
        return item.id === payload.id
      })
      console.log({ payload })

      if (!item) {
        console.log('pushing', payload)
        state.cart.push({ ...payload, orderedQuantity: 1 })
      } else {
        item.orderedQuantity += 1
      }

      console.log({ item, payload, state })

      // if(presentItem){
      //     const newCart = cartItems.map((item) => {
      //         return item.id === itemToBeAdded.id
      //           ? { ...item, orderedQuantity: item.orderedQuantity + 1 }
      //           : item;
      //       });

      //     return newCart

      // }else {
      //     [
      //         ...cartItems,
      //         {itemToBeAdded,orderedQuantity:1}
      //     ]
      // }
    },
    //reduceQuantity ---> find item by slug, decrease the item's Variant.quantity , multiply quantity by price
    reduceCartItem(state, { payload }: { payload: CartItem }) {
      // reduceItem(state.cart, payload)
      const item = state.cart.find((item) => {
        return item.id === payload.id
      })

      if (payload.orderedQuantity === 1) {
        state.cart.filter((item) => item.id !== payload.id)
      } else {
        payload.orderedQuantity -= 1
      }
    },
    removeCartItem(state, { payload }: { payload: CartItem }) {
      // console.log(payload)
      const newCart = state.cart.filter((item) => item.id !== payload.id)
      state.cart = newCart
    },
    setCartItemQty(state, { payload }: { payload: any }) {
      //note that
      const itemIndex = state.cart.findIndex((item) => {
        return item.id === payload.product.id
      })

      if (itemIndex >= 0) {
        state.cart[itemIndex].orderedQuantity = payload.value
      }
    },
    addOrder(state, { payload }: { payload: Order }) {
      state.orders.push(payload)
    },
  },
})

export const {
  setProducts,
  setCategories,
  setCart,
  addCartItem,
  reduceCartItem,
  removeCartItem,
  setCartItemQty,
  addOrder,
} = appSlice.actions

export default appSlice.reducer
