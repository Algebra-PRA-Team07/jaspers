import { useMutation, useQuery } from "@tanstack/react-query";
import { FC, useCallback, useEffect, useMemo } from "react";
import { Navigate, useLocation, useNavigate } from "react-router";

import { useTRPC } from "../utils/trpc.ts";

export const LoggedIn: FC = () => {
    const trpc = useTRPC();

    const userData = useQuery(trpc.auth.me.queryOptions());

    const navigate = useNavigate();

    const logout = useCallback(() => {
        localStorage.removeItem("authToken");
        navigate("/auth/login");
    }, [navigate]);

    useEffect(() => {
        const token = localStorage.getItem("authToken");

        if (!token) navigate("/auth/login");
    }, [navigate]);

    if (!userData.isSuccess) return <span>Loading...</span>;

    return (
        <div className={"flex flex-col gap-4"}>
            <div className={"flex gap-4 items-center rounded-lg bg-slate-800 px-4 py-3"}>
                <img
                    src={userData.data.picture_url}
                    alt=""
                    className={"rounded-full w-12 h-12 object-cover"}
                />
                <div className={"flex flex-col gap-1"}>
                    <span>{userData.data.name}</span>
                    <span className={"text-sm text-neutral-300"}>{userData.data.email}</span>
                </div>
            </div>
            raw user data:
            <pre className={"break-all whitespace-pre-wrap"}>
                {JSON.stringify(userData.data, null, 2)}
            </pre>
            <button className={"rounded bg-slate-800 p-2"} onClick={logout}>
                Logout
            </button>
        </div>
    );
};

export const LoginCallback: FC = () => {
    const trpc = useTRPC();

    const navigate = useNavigate();

    const loginCallback = useMutation(
        trpc.auth.oidc.login.mutationOptions({
            onSuccess: (data) => {
                // TODO: integrate with state management
                localStorage.setItem("authToken", data.jwt);
                navigate("/auth/data");
            },
        }),
    );

    const location = useLocation();

    const search = useMemo(() => new URLSearchParams(location.search), [location]);

    useEffect(() => {
        const code = search.get("code");

        if (!code || !loginCallback.isIdle) return;

        loginCallback.mutate({ code });
    }, [loginCallback, search]);

    if (!search.has("code")) return <Navigate to={"/auth/login"} />;

    if (loginCallback.isIdle || loginCallback.isPending) return <span>Logging in...</span>;

    if (loginCallback.isError) return <span>Error</span>;

    return <></>;
};

export const Login: FC = () => {
    const trpc = useTRPC();

    const loginUrl = useQuery(trpc.auth.oidc.loginUrl.queryOptions());

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("authToken");

        if (token) navigate("/auth/data");
    }, [navigate]);

    if (!loginUrl.isSuccess) return <>Loading...</>;

    return (
        <button
            className={"rounded bg-slate-800 p-2"}
            onClick={() => (globalThis.location.href = loginUrl.data)}
        >
            Log in with OIDC
        </button>
    );
};
