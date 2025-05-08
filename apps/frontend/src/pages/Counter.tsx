import { FC, useState } from "react";

import { Button } from "@/components/ui/button.tsx";

export const Counter: FC = () => {
    const [count, setCount] = useState(0);

    return (
        <div className="flex flex-col items-center justify-center text-center gap-2">
            <h1>Jaspers</h1>
            <div>
                <Button onClick={() => setCount((count) => count + 1)}>Count is {count}</Button>
            </div>
        </div>
    );
};
