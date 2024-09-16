import { create } from 'zustand';

const useStore = create((set) => ({
  // states
  toggleCartVisibility: false,
  cart: [],
  cartTotal: 0,

  // actions
  setToggleCartVisibility: (value) => set(() => ({ toggleCartVisibility: value })),

  addToCart: (item) => set((state) => {
    const existingItem = state.cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      // Update quantity
      return {
        cart: state.cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + (item.quantity || 1) }
            : cartItem
        ),
      };
    } else {
      // Add new item with quantity 1
      return {
        cart: [...state.cart, { ...item, quantity: item.quantity || 1 }],
      };
    }
  }),

  removeFromCart: (index) => set((state) => ({ cart: state.cart.filter((_, i) => i !== index) })),
  clearCart: () => set(() => ({ cart: [] })),
}));

export default useStore;
