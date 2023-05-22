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
import RaceTableRow from './RaceTableRow';


const Races = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [races, setRaces] = useState([]);

    useEffect(() => {
        getRaces();
    }, []);

    const getRaces = async () => {
        const url = 'http://ergast.com/api/f1/2013/results/1.json';
        setIsLoading(true);
        try {
            const response = await axios.get(url);
            //   console.log('response', response);
            //   if (response.request.status !== 200) {
            //     throw new Error('Something went wrong!');
            //   }
            const data =
                response.data.MRData.RaceTable.Races;
            console.log(data);
            setRaces(data);
            setIsLoading(false);
        } catch (err) {
            //   console.log(err);
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
            <h1>Races component</h1>
            <Table>
                <TableHead>
                    <TableRow className='table-header'>
                        <TableCell>Round</TableCell>
                        <TableCell>Grand Prix</TableCell>
                        <TableCell>Circuit</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Winner</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {races.map((race, index) => (
                        <RaceTableRow key={race.Circuit.circuitId} race={race} />
                    ))}
                </TableBody>
            </Table>
        </>
    );
};

export default Races;