import { useContext, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_CATEGORIES, GET_PRODUCTS } from "../utils/queries";
import { CategoryContext } from "../utils/CategoryContext";

function CategoryList() {
    const { loading: categoryLoading, data: categoryData } = useQuery(GET_CATEGORIES);
    const { setCategoryProducts } = useContext(CategoryContext)
    const [selectedCategory, setSelectedCategory] = useState(null);
    const { loading: productLoading, data: productData } = useQuery(GET_PRODUCTS, {
        skip: !selectedCategory, // Skip fetching products if no category is selected
        variables: { categoryId: selectedCategory },
    });

    useEffect(() => {
        // Set the first category as the default selected category when categories are fetched
        if (categoryData && categoryData.getCategories.length > 0) {
            const categoryId = categoryData.getCategories[0]._id;
            setSelectedCategory(categoryId);
        }
    }, [categoryData]);

    useEffect(() => {
        // Once products are fetched, set them in the context
        if (productData) {
            const products = productData.getProducts;
            setCategoryProducts(products);
        }
    }, [productData, setCategoryProducts]);

    if (categoryLoading || productLoading) return <h2>Loading</h2>;

    if (!categoryData || !categoryData.getCategories) {
        console.error("Fail to fetch categories");
        return <h2>Internal error</h2>
    }

    const setCategoryHandler = (categoryId) => {
        setSelectedCategory(categoryId);
    }

    return (
        <div className="category-container mb-20">
            {categoryData.getCategories.map(category => {
                return (
                    <div className={`${category._id === selectedCategory ? "category category-selected" : "category"}`} key={category._id}>
                        <button
                            className="btn"
                            onClick={() => setCategoryHandler(category._id)}
                        >{category.name}</button>
                    </div>
                )
            })}
        </div>
    )
}

export default CategoryList;