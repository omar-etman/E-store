import { CartItem, SingleProduct } from "types";

export function addItem(cartItems:CartItem[], itemToBeAdded:CartItem){
    const presentItem = cartItems.find((item:SingleProduct) => {
        return item.id === itemToBeAdded.id;
    })
    
    if(presentItem){
        const newCart = cartItems.map((item) => {
            return item.id === itemToBeAdded.id
              ? { ...item, orderedQuantity: item.orderedQuantity + 1 }
              : item;
          });
        
        return newCart
        debugger
    }else {
        [
            ...cartItems,
            {itemToBeAdded,orderedQuantity:1}
        ]
    }
    debugger
    
}

export function reduceItem(cartItems:CartItem[], itemToBeReduced:CartItem){
    const presentItem = cartItems.find((item:SingleProduct) => {
        return item.id === itemToBeReduced.id;
    })

    if(presentItem?.orderedQuantity===1){
        return cartItems.filter((item) => item.id === itemToBeReduced.id)
    }

    return cartItems.map((item) => {
        return cartItems.map((item) => {
            return item.id === itemToBeReduced.id
              ? { ...item, orderedQuantity: item.orderedQuantity - 1 }
              : item;
          });
    })


}