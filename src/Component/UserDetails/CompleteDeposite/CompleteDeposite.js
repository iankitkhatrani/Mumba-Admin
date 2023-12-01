

import React, { useState } from 'react';
import styles from './CompleteDeposite.module.css'; // Import the CSS module


const CompleteDeposite = (props) => {
    const [selectedClub, setSelectedClub] = useState('');
    const [searchPhoneNumber, setSearchPhoneNumber] = useState('');
    const [entriesPerPage, setEntriesPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);

    let gameHistoryData  = props.completeDepositeData
   

    const filteredData = gameHistoryData.filter((entry) => {
        // Filter by selected club
        if (selectedClub && entry.Club !== selectedClub) {
            return false;
        }

        // Filter by phone number
        if (searchPhoneNumber && !entry.PhoneNumber.includes(searchPhoneNumber)) {
            return false;
        }

        return true; // Include all entries matching the filters
    });

    // Calculate the number of pages based on entriesPerPage
    const totalPages = Math.ceil(filteredData.length / entriesPerPage);

    // Calculate the range for the current page
    const startIndex = (currentPage - 1) * entriesPerPage;
    const endIndex = startIndex + entriesPerPage;

    // Filter data for the current page
    const dataOnCurrentPage = filteredData.slice(startIndex, endIndex);


   
    return (
        <div className={styles.rouletteHistory}>
            <h1>Complete Deposite</h1>

            <div className={styles.filters}>
                <div className={styles.filtersactions}>
                    <div className={styles.filterPerpage}>
                        <div>Show  </div>
                        <div>
                            <input
                                type="number"
                                placeholder="Entries per page"
                                value={entriesPerPage}
                                onChange={(e) => setEntriesPerPage(e.target.value)}
                            />
                        </div>
                        <div> entries</div>
                    </div>
                    <div className={styles.filterButton}>
                        <button >PDF</button>
                        <button>Excel</button>
                        <button onClick={() => window.print()}>Print</button>
                    </div>
                </div>
                <div className={styles.filterssearch}>
                    <input
                        type="text"
                        placeholder="Search by Phone Number"
                        value={searchPhoneNumber}
                        onChange={(e) => setSearchPhoneNumber(e.target.value)}
                    />
                </div>

            </div>
            <table className={styles.historyTable}>
                <thead>
                    <tr>
                        <th className={styles.tableHeader}>SrNo</th>
                        <th className={styles.tableHeader}>DateTime</th>
                        <th className={styles.tableHeader}>Name</th>
                        <th className={styles.tableHeader}>PhoneNumber</th>
                        <th className={styles.tableHeader}>RoomId</th>
                        <th className={styles.tableHeader}>Amount</th>
                        <th className={styles.tableHeader}>Type</th>
                        <th className={styles.tableHeader}>Club</th>
                    </tr>
                </thead>
                <tbody>
                    {dataOnCurrentPage.map((entry, index) => (
                        (index%2 == 1) ? 

                        <tr key={entry.SrNo} className={styles['row-odd']}>
                            <td className={styles.tableData}>{startIndex + index + 1}</td>
                            <td className={styles.tableData}>{entry.DateTime}</td>
                            <td className={styles.tableData}>{entry.Name}</td>
                            <td className={styles.tableData}>{entry.PhoneNumber}</td>
                            <td className={styles.tableData}>{entry.RoomId}</td>
                            <td className={styles.tableData}>{entry.Amount}</td>
                            <td className={styles.tableData}>{entry.Type}</td>
                            <td className={styles.tableData}>{entry.Club}</td>
                        </tr> : <tr key={entry.SrNo}>
                            <td className={styles.tableData}>{startIndex + index + 1}</td>
                            <td className={styles.tableData}>{entry.DateTime}</td>
                            <td className={styles.tableData}>{entry.Name}</td>
                            <td className={styles.tableData}>{entry.PhoneNumber}</td>
                            <td className={styles.tableData}>{entry.RoomId}</td>
                            <td className={styles.tableData}>{entry.Amount}</td>
                            <td className={styles.tableData}>{entry.Type}</td>
                            <td className={styles.tableData}>{entry.Club}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className={styles.pagination}>
                <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                    Previous
                </button>
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default CompleteDeposite;


