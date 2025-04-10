import { FC, useState } from "react";

export const Something: FC = () => {
    const [count, setCount] = useState(0);
    
    return (
        <div className='w-full h-screen flex items-center justify-center text-center bg-slate-900'>
            <div className='flex flex-col items-center justify-center text-center gap-2'>
                <h1>Jaspers</h1>
                <div>
                <button className='px-2 py-1 rounded bg-neutral-200 text-black hover:bg-neutral-300 transition-colors' onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                </div>
            </div>
        </div>
    );
};