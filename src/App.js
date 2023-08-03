import { Routes, Route} from 'react-router-dom'
import Home from "./components/routes/home/home.component";
import Navigation from './components/routes/home/navigation/navigation.component';
const App = () => {



  const Shop =()=>{
    return <h1>I am the shop page</h1>
  }

  return (
    <Routes>
      <Route path='/' element={<Navigation/>}>
        <Route index element={<Home/>}/>
        <Route path='shop' element={<Shop/>}/>
      </Route>
    </Routes>
  );
};

export default App;