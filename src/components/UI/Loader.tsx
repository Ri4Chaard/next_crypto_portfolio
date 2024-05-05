import { SignalIcon } from "@heroicons/react/20/solid";

export const Loader = () => {
    return (
        <>
            <div className="flex justify-center items-center h-96">
                <SignalIcon className="animate-spin w-12 h-12 text-cyan-600" />
            </div>
        </>
    );
};
