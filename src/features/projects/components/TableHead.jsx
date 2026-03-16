const TableHead = ({ headers }) => {
  return (
    <thead className="bg-[#F8FAFC] border-b border-hudc-light/30">
      <tr>
        {headers.map((title) => {
          // Logic: Hide specific headers on mobile
          const isOptional = title === "Tech_Stack" || title === "Status";
          return (
            <th 
              key={title} 
              className={`px-4 md:px-6 py-4 text-[10px] font-mono font-bold text-hudc-dark/40 uppercase tracking-wider ${
                isOptional ? "hidden md:table-cell" : ""
              } ${title === "Action" ? "text-right" : ""}`}
            >
              {title}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default TableHead