
import { create } from 'zustand';

const useStore = create((set) => ({
  // states
  toggleCartVisibility: false,
  cart: [],
  cartTotal: 0,

  // actions
  setToggleCartVisibility: (value) => set((state) => ({ toggleCartVisibility: value })),
  addToCart: (item) => set((state) => ({ cart: [...state.cart, item] })),
  removeFromCart: (index) => set((state) => ({ cart: state.cart.filter((_, i) => i !== index) })),
  clearCart: () => set((state) => ({ cart: [] })),

}));

export default useStore;
