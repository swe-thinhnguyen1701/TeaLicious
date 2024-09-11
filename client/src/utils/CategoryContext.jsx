import { createContext, useState } from "react";

export const CartContext = createContext();

export function CategoryProvider({children}) {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categoryProducts, setCategoryProducts] = useState([]);

    return (
        <CartContext.Provider value={{selectedCategory, setSelectedCategory, categoryProducts, setCategoryProducts}}>
            {children}
        </CartContext.Provider>
    )
}