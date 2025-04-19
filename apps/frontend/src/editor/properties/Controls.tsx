import { ButtonHTMLAttributes, FC, SelectHTMLAttributes } from "react";

export const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
    children,
    className,
    ...properties
}) => {
    return (
        <button className={`bg-zinc-800 p-2 rounded ${className}`} {...properties}>
            {children}
        </button>
    );
};

export const Select: FC<SelectHTMLAttributes<HTMLSelectElement>> = ({
    children,
    className,
    ...properties
}) => {
    return (
        <select className={`bg-zinc-800 text-white p-2 ${className}`} {...properties}>
            {children}
        </select>
    );
};
