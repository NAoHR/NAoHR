import ReactDOM from 'react-dom/client';
import './index.css';
import App from './pages/App';
import reportWebVitals from './reportWebVitals';
import Theme from './contexts/ThemeContexts';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CustomElement from './pages/CustomElement';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <CustomElement />,
  }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Theme>
    <RouterProvider router={router} />
  </Theme>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
