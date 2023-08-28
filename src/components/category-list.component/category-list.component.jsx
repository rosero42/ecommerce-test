import './category-list.styles.scss'
import DirectoryItem from '../directory-item/directory-item.component';

const CategoryList = ({categoryList}) => {
    return(
        <div className='categories-container'>
            {categoryList.map((category) => (
            <DirectoryItem key={category.id} category={category} />
      ))}
        </div>
    )
}

export default CategoryList;