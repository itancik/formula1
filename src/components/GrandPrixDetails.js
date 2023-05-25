import React, { useState, useEffect, useContext } from 'react';
import { RiseLoader } from 'react-spinners';
import { useParams } from 'react-router-dom';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import axios from 'axios';
import QualifyingResults from './QualifyingResults';
import RaceResults from './RaceResults';
import GlobalContext from '../context/global-context';

const GrandPrixDetails = () => {
  const globalCtx = useContext(GlobalContext);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [grandPrix, setGrandPrix] = useState([]);

  const params = useParams();
  const round = params.round;

  useEffect(() => {
    getGrandPrix();
  }, []);

  const getGrandPrix = async () => {
    const url = `http://ergast.com/api/f1/${globalCtx.chosenYear}/results/1.json`;
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
            <TableCell>
              <img
                src={`/img/circuits/${
                  grandPrix[round - 1].Circuit.circuitId
                }.webp`}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>{grandPrix[round - 1].raceName}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Country:</TableCell>
            <TableCell>
              {grandPrix[round - 1].Circuit.Location.country}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Location:</TableCell>
            <TableCell>
              {grandPrix[round - 1].Circuit.Location.locality}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Date:</TableCell>
            <TableCell>{grandPrix[round - 1].date}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Details:</TableCell>
            <TableCell>
              <a href={grandPrix[round - 1].url} target='_blank'>
                Wikipedia ↗
              </a>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <QualifyingResults round={round} />
      <RaceResults round={round} />
    </>
  );
};

export default GrandPrixDetails;
