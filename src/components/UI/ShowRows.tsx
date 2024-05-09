export const ShowRows = ({ setPerPage }: { setPerPage: any }) => {
    return (
        <div className="flex items-center">
            <p className="mr-2">Show rows:</p>
            <select
                className="p-1 mr-2 border border-solid border-cyan-600 rounded bg-slate-900"
                name="count"
                onChange={(e: any) => setPerPage(e.target.value)}
            >
                {[10, 15, 20, 25].map((val: any) => (
                    <option key={val} value={val}>
                        {val}
                    </option>
                ))}
            </select>
        </div>
    );
};
