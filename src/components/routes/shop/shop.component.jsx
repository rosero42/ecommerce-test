import { useContext } from "react"
import ProductCard from "../../product-card.component/product-card.component"
import './shop.styles.scss'
import { CategoriesContext } from "../../../contexts/categories.context"
const Shop = () =>{
    const{categoriesMap} = useContext(CategoriesContext)

    return(
        <div className='products-container'>
            {categoriesMap.map((product) => (
                <ProductCard key={product.id} product={product}></ProductCard>
            ))}
        </div>
    )
}

export default Shop