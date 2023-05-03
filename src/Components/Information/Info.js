import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import {csvString} from "./data";
import states from '../StateCities/StateCityDropdowns'

const parseCSV = (csvString) => {
    return new Promise((resolve, reject) => {
        Papa.parse(csvString, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                resolve(results.data);
            },
            error: (err) => {
                reject(err);
            },
        });
    });
};
function Info() {
    const [csvData, setCsvData] = useState([]);

    useEffect(() => {
        const parseData = async () => {
            try {
                const data = await parseCSV(csvString);
                setCsvData(data);
            } catch (err) {
                console.error('Error parsing CSV string:', err);
            }
        };

        parseData();
    }, []);
    return (
        <div>
            <h1>Data from CSV string</h1>
            <table>
                <thead>
                <tr>
                    <th>State</th>
                    <th>District</th>
                    <th>Murder</th>
                </tr>
                </thead>
                <tbody>
                {csvData.map((item, index) => (
                    <tr key={index}>
                        <td>{item.STATE}</td>
                        <td>{item.DISTRICT}</td>
                        <td>{item.Murder}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default Info;