import { FC, memo } from "react";
import { Route, Routes } from "react-router-dom";
import { homeRoutes } from "./HomeRoutes";
import { Page404 } from "../components/pages/Page404";
import { HeaderLayout } from "../components/templates/HeaderLayout";

export const Router: FC = memo(() => {
    return (
        <Routes>
            <Route path="/home">
                {homeRoutes.map((route) => (
                    <Route key={route.path} path={route.path} element={<HeaderLayout>{route.element}</HeaderLayout>} />
                ))}
            </Route>
            <Route path="*" element={<Page404 />} />
        </Routes>
    )
})