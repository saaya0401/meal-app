import { FC, memo } from "react";
import { Route, Routes } from "react-router-dom";
import { homeRoutes } from "./HomeRoutes";
import { Page404 } from "../components/pages/Page404";
import { HeaderLayout } from "../components/templates/HeaderLayout";
import { LogsProvider } from "../providers/LogsContext";
import { AllLogsProvider } from "../providers/AllLogsContext";
import { Login } from "../components/pages/Login";
import { RequireAuth } from "../components/RequireAuth";
import { Register } from "../components/pages/Register";
import { PetProfileRegister } from "../components/pages/PetProfileRegister";
import { LoginUserProvider } from "../providers/LoginUserProvider";
import { ProfileProvider } from "../providers/ProfileContext";

export const Router: FC = memo(() => {
    return (
        <LoginUserProvider>
            <ProfileProvider>
                <AllLogsProvider>
                    <LogsProvider>
                        <Routes>
                            <Route path="/login" element={<Login />}></Route>
                            <Route path="/register" element={<Register />}></Route>
                            <Route element={<RequireAuth />}>
                                <Route path="/home">
                                    {homeRoutes.map((route) => (
                                        <Route key={route.path} path={route.path} element=  {<HeaderLayout>{route.element}</    HeaderLayout>} />
                                    ))}
                                </Route>
                                <Route path="/petProfile/register" element= {<PetProfileRegister />} />
                            </Route>
                            <Route path="*" element={<Page404 />} />
                        </Routes>
                    </LogsProvider>
                </AllLogsProvider>
            </ProfileProvider>
        </LoginUserProvider>
    )
})