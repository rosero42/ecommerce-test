import {Routes,Route} from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './shop.styles.scss'
import CategoriesPreview from "../categories-preview/categories-preview.component"
import Category from "../category/category.component"
import { setCategoriesMap } from "../../../store/categories/category.action"
import { getCategoriesAndDocuments } from '../../../util/firebase/firebase.utils'

const Shop = () =>{
    const dispatch = useDispatch()

  useEffect(()=>{
    const getCategoriesMap = async () =>{
      const cateogryMap = await getCategoriesAndDocuments('categories')
      dispatch(setCategoriesMap(cateogryMap))
    }
    getCategoriesMap()
  },[dispatch])

    return(
        <Routes>
            <Route index element={<CategoriesPreview/>}/>
            <Route path=":category" element={<Category/>}/>
        </Routes>
    )
}

export default Shop
