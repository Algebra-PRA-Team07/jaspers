import { FC } from "react";

export const StickerNode: FC<{ data: { image: string } }> = ({ data }) => {
    return <img src={data.image} />;
};
