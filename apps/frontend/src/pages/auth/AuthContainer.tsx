import { FC } from "react";
import { Outlet } from "react-router";

export const AuthContainer: FC = () => {
    return (
        <div className={"h-screen w-full flex items-center justify-center bg-slate-900/80"}>
            <Outlet />
        </div>
    );
};
