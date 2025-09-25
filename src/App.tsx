import { createBrowserRouter, RouterProvider } from "react-router";

import AppProviders from "./providers/AppProviders";

const router = createBrowserRouter([]);

export default function App() {
  return (
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  );
}
