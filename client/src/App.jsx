import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./routes/Home";
import RestaurantDetailPage from "./routes/RestaurantDetailPage";
import UpdatePage from "./routes/UpdatePage";
import { RestaurantContextProvider } from "./context/RestaurantsContext";
import ErrorPage from "./page/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />
  },
  {
    path: "restaurant/:id/update",
    element: <UpdatePage />,
  },
  {
    path: "restaurant/:id/detail",
    element: <RestaurantDetailPage  />,
  },
]);

const App = () => {
  return (
    <RestaurantContextProvider>
      <RouterProvider router={router} />
    </RestaurantContextProvider>
  );
};

export default App;
