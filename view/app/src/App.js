import { RouterProvider, createBrowserRouter, Route, createRoutesFromElements } from 'react-router-dom';
import './App.css';
import Root from './components/root';
import HomePage from './pages/homePage';
import ProductsPage from './pages/productsPage';
import LoginPage from './pages/loginPage';
import ProfilePage from './pages/profilePage';
import CartPage from './pages/cartPage';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={ <Root/> }>
    <Route index element={ <HomePage/> }/>
    <Route path="/products" element={ <ProductsPage/> }/>
    <Route path="/login" element={<LoginPage />}/>
    <Route path="/profile" element={<ProfilePage />}/>
    <Route path="/cart" element={<CartPage />}/>
  </Route>
));

function App() {
  return (
    <RouterProvider router={ router } />
  );
}

export default App;
