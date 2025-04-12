import { FC } from "react";
import { Link, Outlet } from "react-router";

type NavbarLinkType = {
    name: string;
    route: string;
};

const NAVBAR_LINKS: NavbarLinkType[] = [
    {
        name: "Counter",
        route: "counter",
    },
    {
        name: "Gates (backend example)",
        route: "gates",
    },
    {
        name: "Users (database example)",
        route: "users",
    },
];

const NavbarLink: FC<{ link: NavbarLinkType }> = ({ link }) => {
    return (
        <Link
            to={link.route}
            className="px-2 py-1 bg-slate-800 hover:bg-slate-700 transition-colors"
        >
            {link.name}
        </Link>
    );
};

export const Root: FC = () => {
    return (
        <div className="w-full h-screen p-12 flex flex-col items-center jusfity-center gap-8 bg-slate-900">
            <div className="w-full max-w-[1000px] flex flex-col gap-8">
                <div className="w-full flex justify-center items-center gap-4">
                    {NAVBAR_LINKS.map((link) => (
                        <NavbarLink key={link.route} link={link} />
                    ))}
                </div>
                <Outlet />
            </div>
        </div>
    );
};
