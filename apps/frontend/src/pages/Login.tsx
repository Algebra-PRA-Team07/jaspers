import { useMutation, useQuery } from "@tanstack/react-query";
import { FC, useEffect, useMemo } from "react";
import { Navigate, useLocation, useNavigate } from "react-router";

import googleLogo from "/assets/google.png";
import { useLogout } from "@/hooks/useLogout.ts";

import { useTRPC } from "../utils/trpc.ts";

// state manager, I hardly know 'er

export const LOCALSTORAGE_AUTH_KEY = "@jaspers/authToken";

export const LoggedIn: FC = () => {
    const trpc = useTRPC();

    const userData = useQuery(
        trpc.auth.me.queryOptions(undefined, {
            retry: false,
        }),
    );

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem(LOCALSTORAGE_AUTH_KEY);

        if (!token) navigate("/auth/login");
    }, [navigate]);

    const logout = useLogout();

    useEffect(() => {
        if (!userData.isError) return;

        logout();
    }, [logout, userData]);

    if (!userData.isSuccess) return <span>Loading...</span>;

    return <Navigate to={"/editor"} />;
};

export const LoginCallback: FC = () => {
    const trpc = useTRPC();

    const navigate = useNavigate();

    const loginCallback = useMutation(
        trpc.auth.oidc.login.mutationOptions({
            onSuccess: (data) => {
                localStorage.setItem(LOCALSTORAGE_AUTH_KEY, data.jwt);

                navigate("/auth/logged-in");
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
        const token = localStorage.getItem(LOCALSTORAGE_AUTH_KEY);

        if (token) navigate("/auth/data");
    }, [navigate]);

    if (!loginUrl.isSuccess) return <>Loading...</>;

    return (
        <button
            className={"rounded bg-slate-800 p-2 flex items-center gap-2"}
            onClick={() => (globalThis.location.href = loginUrl.data)}
        >
            <img src={googleLogo} className={"w-8 h-8"} alt={"Google logo"} />
            Log in with Gugel
        </button>
    );
};
