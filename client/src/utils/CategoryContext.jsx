/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const CategoryContext = createContext();

export function CategoryProvider({children}) {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categoryProducts, setCategoryProducts] = useState([]);

    return (
        <CategoryContext.Provider value={{selectedCategory, setSelectedCategory, categoryProducts, setCategoryProducts}}>
            {children}
        </CategoryContext.Provider>
    )
}