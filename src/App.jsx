import { RouterProvider } from 'react-router-dom';
import router from './router/router.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
function App() {
  return( <RouterProvider router={router} /> );
}

export default App
