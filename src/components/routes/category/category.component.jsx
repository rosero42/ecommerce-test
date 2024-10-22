import './category.styles.scss'
import { useParams } from 'react-router-dom'
import { useState, useEffect, Fragment } from 'react'
import { useSelector } from 'react-redux'
import ProductCard from '../../product-card.component/product-card.component'
import { selectCategoriesMap } from '../../../store/categories/category.selector'

const Category = () =>{
    
    const {category } = useParams()
    const categoriesMap = useSelector(selectCategoriesMap)
    const [products, setProducts] = useState(categoriesMap[category])
    useEffect(()=>{
        setProducts(categoriesMap[category])
    }, [category, categoriesMap])


    return (
        <Fragment>
            <h2 className='category-title'>{category.toUpperCase()}</h2>
            <div className='category-container'>
                {products && products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </Fragment>
    )
}
export default Category;
