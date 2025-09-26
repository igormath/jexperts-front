import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import CreateAccount from "./components/CreateAccount/CreateAccount";
import EditUser from "./components/EditUser/EditUser";
import Homepage from "./components/Homepage/Homepage";

const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/",
        element: <Homepage />,
    },
    {
        path: "/home",
        element: <Home />,
    },
    {
        path: "/criar-conta",
        element: <CreateAccount />,
    },
    {
        path: "/edit",
        element: <EditUser />,
    },
]);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
);
