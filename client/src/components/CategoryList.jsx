import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { GET_CATEGORIES } from "../utils/queries";

function CategoryList() {
    const { loading, data } = useQuery(GET_CATEGORIES);

    if (loading) return <h2>Loading</h2>;
    if (!data || !data.getCategories) {
        console.erro("Fail to fetch categories");
        return <h2>Internal error</h2>
    }

    return (
        <div className="category-container">
            {data.map(category => {
                return (
                    <div className="category" key={category._id}>
                        <Link to={`/${category.name}`}>{category.name}</Link>
                    </div>
                )
            })}
        </div>
    )
}

export default CategoryList;