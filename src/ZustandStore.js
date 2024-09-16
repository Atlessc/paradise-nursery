import { create } from 'zustand';

const useStore = create((set) => ({
  // states
  toggleCartVisibility: false,
  cart: [],
  cartTotal: 0,

  // actions
  setToggleCartVisibility: (value) => set(() => ({ toggleCartVisibility: value })),

  addToCart: (item) => set((state) => {
    // Find the existing item in the cart by ID
    const existingItem = state.cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      // Update the quantity directly based on the provided item.quantity
      return {
        cart: state.cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: item.quantity } // Set the new quantity directly
            : cartItem
        ),
      };
    } else {
      // Add new item with quantity 1 or the specified quantity
      return {
        cart: [...state.cart, { ...item, quantity: item.quantity || 1 }],
      };
    }
  }),

  // Removes an item from the cart based on the index
  removeFromCart: (index) => set((state) => ({ cart: state.cart.filter((_, i) => i !== index) })),
  
  // Clears the entire cart
  clearCart: () => set(() => ({ cart: [] })),
}));

export default useStore;
