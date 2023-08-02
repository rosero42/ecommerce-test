import './category-list.styles.scss'
import CategoryItem from '../category-item/category-item.component';

const CategoryList = ({categoryList}) => {
    return(
        <div className='categories-container'>
            {categoryList.map((category) => (
            <CategoryItem key={category.id} category={category} />
      ))}
        </div>
    )
}

export default CategoryList;