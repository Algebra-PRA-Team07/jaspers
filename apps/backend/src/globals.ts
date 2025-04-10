type GlobalsType = {
    port: number;
};

export const Globals: GlobalsType = {
    port: parseInt(process.env.PORT ?? "3000"),
};
