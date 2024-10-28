import ProductCard from '../product-card.component/product-card.component'
import { CategoryPreviewContainer, CategoryPreviewTitle, Preview } from './category-preview.styles.jsx'

const CategoryPreview = ({title, products}) =>{
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
