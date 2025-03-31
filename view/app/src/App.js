import { RouterProvider, createBrowserRouter, Route, createRoutesFromElements } from 'react-router-dom';
import './App.css';
import Root from './components/root';
import HomePage from './pages/homePage';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={ <Root/> }>
    <Route index element={ <HomePage/> }/>
  </Route>
));

function App() {
  return (
    <RouterProvider router={ router } />
  );
}

export default App;
