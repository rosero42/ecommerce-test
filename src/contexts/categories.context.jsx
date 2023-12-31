import { createContext, useState, useEffect } from "react";
import { getCategoriesAndDocuments } from "../util/firebase/firebase.utils";

export const CategoriesContext = createContext({
    //id, name, imageUrl, price      
    categoriesMap: {},
})

export const CategoriesProvider = ({ children }) => {
    const [categoriesMap, setCategoriesMap] = useState({})
  
    useEffect(() => {
      const getCategoriesMap = async () => {
        const categoryMap = await getCategoriesAndDocuments('categories')
        console.log(categoryMap)
        setCategoriesMap(categoryMap)
      }
      getCategoriesMap()
    }, [])
  
    const value = { categoriesMap }
    return (
      <CategoriesContext.Provider value={value}>
        {children}
      </CategoriesContext.Provider>
    )
}
