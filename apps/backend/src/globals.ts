type GlobalsType = {
    port: number;
};

export const Globals: GlobalsType = {
    port: Number.parseInt(process.env.PORT ?? "3000"),
};
