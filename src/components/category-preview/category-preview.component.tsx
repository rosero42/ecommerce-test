import { FC } from 'react'
import { CategoryItem } from '../../store/categories/category.types'
import ProductCard from '../product-card.component/product-card.component'
import { CategoryPreviewContainer, CategoryPreviewTitle, Preview } from './category-preview.styles'


export type CategoryPreviewProps = {
    title: string
    products: CategoryItem[]
}
const CategoryPreview: FC<CategoryPreviewProps> = ({title, products}) =>{
    return (
        <CategoryPreviewContainer>
            <h2>
                <CategoryPreviewTitle to={title}>{title.toUpperCase()}</CategoryPreviewTitle>
            </h2>
            <Preview>
              {
                products.filter((_, idx) => idx < 4 ).map((product) =>(
                    <ProductCard key={product.id} product={product}/>
                ))
              }

            </Preview>
        </CategoryPreviewContainer>
    )
}

export default CategoryPreview
