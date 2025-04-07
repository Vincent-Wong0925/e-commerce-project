import { RouterProvider, createBrowserRouter, Route, createRoutesFromElements } from 'react-router-dom';
import './App.css';
import Root from './components/root';
import HomePage from './pages/homePage';
import ProductsPage from './pages/productsPage';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={ <Root/> }>
    <Route index element={ <HomePage/> }/>
    <Route path="/products" element={ <ProductsPage/> }/>
  </Route>
));

function App() {
  return (
    <RouterProvider router={ router } />
  );
}

export default App;
