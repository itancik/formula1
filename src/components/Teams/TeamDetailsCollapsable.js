import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Skeleton,
} from '@mui/material';
import GlobalContext from '../../context/global-context';

const TeamDetailsCollapsable = (props) => {
  const globalCtx = useContext(GlobalContext);
  const [teamDetails, setTeamDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getTeamDetails();
  }, []);

  const getTeamDetails = async () => {
    const urlDetails = `https://ergast.com/api/f1/${globalCtx.chosenYear}/constructors/${props.teamId}/constructorStandings.json`;
    try {
      const responseDetails = await axios.get(urlDetails);
      setTeamDetails(
        responseDetails.data.MRData.StandingsTable.StandingsLists[0]
          .ConstructorStandings[0]
      );
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(err);
    }
  };

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (isLoading) {
    return (
      <>
        <Skeleton
          variant='rounded'
          animation='wave'
          height={50}
          style={{ width: '95%', margin: 20, alignContent: 'center' }}
        />
      </>
    );
  }

  return (
    <>
      <Table
        size='small'
        aria-label='purchases'
        sx={{ margin: 0, marginBottom: 5, padding: 0 }}
        className='tableContainer'
      >
        <TableHead>
          <TableRow className='color-wrap'>
            <TableCell className='tableRow-cell'>Team Name</TableCell>
            <TableCell className='tableRow-cell'>Nationality</TableCell>
            <TableCell className='tableRow-cell'>Wins</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow className='color-wrap'>
            <TableCell>
              <div className='flagName tableRow-cell'>
                {globalCtx.flagFn(teamDetails.Constructor.nationality)}
                <span> </span>
                {teamDetails.Constructor.name}
              </div>
            </TableCell>
            <TableCell className='tableRow-cell'>
              {teamDetails.Constructor.nationality}
            </TableCell>
            <TableCell className='tableRow-cell'>{teamDetails.wins}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};

export default TeamDetailsCollapsable;
