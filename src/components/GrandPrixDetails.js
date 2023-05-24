import React, { useState, useEffect } from 'react';
import { RiseLoader } from 'react-spinners';
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
} from '@mui/material';
import axios from 'axios';

const GrandPrixDetails = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [grandPrix, setGrandPrix] = useState([]);

    useEffect(() => {
        getGrandPrix();
    }, []);

    const getGrandPrix = async () => {
        const url = 'http://ergast.com/api/f1/2013/results/1.json';
        setIsLoading(true);
        try {
            const response = await axios.get(url);
            const data = response.data.MRData.RaceTable.Races;
            setGrandPrix(data);
            setIsLoading(false);
        } catch (err) {
            setError(err);
        }
    };

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    if (isLoading) {
        return (
            <RiseLoader
                style={{
                    height: '50vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            />
        );
    }

    return (
        <>
            <h1>Grand Prix component</h1>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell>-Slika zastave-</TableCell>
                        <TableCell>-Slika staze-</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>{grandPrix[0].raceName}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Country:</TableCell>
                        <TableCell>{grandPrix[0].Circuit.Location.country}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Location:</TableCell>
                        <TableCell>{grandPrix[0].Circuit.Location.locality}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Date:</TableCell>
                        <TableCell>{grandPrix[0].date}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Full Report:</TableCell>
                        <TableCell>{grandPrix[0].url}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </>
    );
};

export default GrandPrixDetails;