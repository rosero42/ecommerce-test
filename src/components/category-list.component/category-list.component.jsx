import DirectoryItem from '../directory-item/directory-item.component';
import { CategoriesContainer } from './category-list.styles';

const CategoryList = ({categoryList}) => {
    return(
        <CategoriesContainer className='categories-container'>
            {categoryList.map((category) => (
            <DirectoryItem key={category.id} category={category} />
      ))}
        </CategoriesContainer>
    )
}

export default CategoryList;