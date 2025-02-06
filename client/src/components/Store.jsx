import { create } from "zustand";

const useStore = create((set) => ({
    currentPage:"About",
    setCurrentPage: (page) => set({ currentPage: page }),
    showContainer:false,
    setShowContainer: (show) => set({ showContainer: show }),
}))

export default useStore;