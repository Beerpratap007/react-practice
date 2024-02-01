import React, { useState } from "react";

const useTable = (data, sortableColumns = []) => {
  const [sortBy, setSortBy] = useState(sortableColumns || null);
  const [sortOrder, setSortOrder] = useState("asc");

  const headers = data.length > 0 ? Object.keys(data[0]) : [];
  const TableHeader = () => (
    <tr>
      {headers.map((header) => (
        <th key={header} onClick={() => handleSort(header)}>
          {header} {renderSortIcon(header)}
        </th>
      ))}
    </tr>
  );

  const renderSortIcon = (column) => {
    if (sortBy === column) {
      return sortOrder === "asc" ? " 🔼" : " 🔽";
    }
    return null;
  };

  const handleSort = (column) => {
    if (sortableColumns.includes(column)) {
      if (sortBy === column) {
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
      } else {
        setSortBy(column);
        setSortOrder("asc");
      }
    }
  };

  const sortedData = () => {
    if (sortBy) {
      return data.slice().sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];
        return sortOrder === "asc"
          ? aValue?.localeCompare(bValue)
          : bValue?.localeCompare(aValue);
      });
    }
    return data;
  };

  const renderTableCell = (value) => {
    if (typeof value === "object" && value !== null) {
      return Object.values(value).map((val, index) => (
        <React.Fragment key={index}>{renderTableCell(val)}</React.Fragment>
      ));
    }
    return (
      <>
        <span>{value}</span>
        <br />
      </>
    );
  };

  const TableRow = ({ item }) => (
    <tr key={item.id}>
      {headers.map((header) => (
        <td key={header}>{renderTableCell(item[header])}</td>
      ))}
    </tr>
  );

  return { TableHeader, TableRow, sortedData };
};

export default useTable;
