import CategoryList from "../../category-list.component/category-list.component";
import { Outlet } from "react-router-dom";
const Home = () => {


  return (
    <div>
        <Outlet/>
        <CategoryList categoryList/>
    </div>
  );
};

export default Home;