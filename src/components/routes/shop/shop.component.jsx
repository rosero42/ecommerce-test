import { useContext, Fragment } from "react"
import ProductCard from "../../product-card.component/product-card.component"
import './shop.styles.scss'
import { CategoriesContext } from "../../../contexts/categories.context"
const Shop = () =>{
    const{categoriesMap} = useContext(CategoriesContext)

    return(
        <Fragment>
            {Object.keys(categoriesMap).map((title) => (
                    <Fragment key={title}>
                        <h2>{title}</h2>
                        <div className='products-container'>
                            {categoriesMap[title].map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </Fragment>

            ))}
        </Fragment>
    )
}

export default Shop

