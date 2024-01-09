import React from "react";
import "./style.scss";

const TableComponent = ({ tableTitle, tableData }) => {
	return (
		<>
			{tableData ? (
				<div className="table-component">
					<h2 className="table-title"> {tableTitle} </h2>
					<table className="custom-table">
						<tr>
							<th>Lender Name</th>
							<th>Borrower Name </th>
							<th>Amount</th>
							<th>Date Borrowed</th>
						</tr>
						<tbody>{tableData}</tbody>
					</table>
				</div>
			) : null}
		</>
	);
};

export default TableComponent;
