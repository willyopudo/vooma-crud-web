import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect , useMemo} from "react";
import { useTable } from "react-table";
import "./Table.css";

function App() {
  const url = "http://localhost:8085/api/v1/card";
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(url, { mode: 'cors', method: "GET"});
      const accounts = await response.json();
      console.log(accounts)
      var account_cards = accounts;
      account_cards.map((data, idx) => (
        account_cards[idx].cardType =  account_cards[idx].cardType == 0 ? "Physical" : "Virtual"
      ));
      account_cards.map((data, idx) => (
        account_cards[idx].account = account_cards[idx].account.id
      ));
      setData(account_cards);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  //const Table = ({ data }) => {
    // const columns = useMemo(
    //   () => [
    //     { Header: "ID", accessor: "id" },
    //     { Header: "IBAN", accessor: "iban" },
    //     { Header: "BANK CODE", accessor: "bankCode" },
    //     { Header: "CUSTOMER ID", accessor: "customerId" }
        
    //   ],
    //   []
    // );

    const columns = useMemo(
      () => [
        { Header: "ID", accessor: "id" },
        { Header: "CARD ALIAS", accessor: "cardAlias" },
        { Header: "CARD TYPE", accessor: "cardType" },
        { Header: "ACCOUNT", accessor: "account" }
        
      ],
      []
    );
  

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({ columns, data });

 
  return (
    <div className="App">
      <h1 style={{ color: "green" }}>List of Vooma Cards</h1>
      <div className="table-container">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
