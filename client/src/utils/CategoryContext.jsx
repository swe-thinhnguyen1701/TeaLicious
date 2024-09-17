/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const CategoryContext = createContext();

export function CategoryProvider({children}) {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categoryProducts, setCategoryProducts] = useState([]);
    const [shouldUpdateCart, setShouldUpdateCart] = useState(false);
    return (
        <CategoryContext.Provider value={{selectedCategory, setSelectedCategory, categoryProducts, setCategoryProducts, shouldUpdateCart, setShouldUpdateCart}}>
            {children}
        </CategoryContext.Provider>
    )
}