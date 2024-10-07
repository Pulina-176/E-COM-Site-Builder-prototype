import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    items: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action){
            const {productId, image, title, quantity, price} = action.payload;  // { title } is what will be displayed as the name.
            const indexProductId = (state.items).findIndex(item => item.productId === productId);
            if (indexProductId >= 0){
                state.items[indexProductId].quantity += quantity
            }
            else{
                state.items.push({productId, image, title, quantity, price})
            }
        },
        removeFromCart(state, action){
            const {productId, quantity} = action.payload;
            const indexProductId = (state.items).findIndex(item => item.productId === productId);
            if (state.items[indexProductId].quantity > 1){
                state.items[indexProductId].quantity -= quantity
            }
            else{
                state.items.pop(indexProductId)
            }
        }

    }
})

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;

