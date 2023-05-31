import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { RiseLoader } from 'react-spinners';
import {
Table,
TableHead,
TableBody,
TableRow,
TableCell,
Skeleton,
Avatar,
Box}
from '@mui/material';
import GlobalContext from '../../context/global-context';

const DriverDetailsCollapsable = (props) => {
  const globalCtx = useContext(GlobalContext);
  const [driverDetails, setDriverDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getDriverDetails();
  }, []);

  const getDriverDetails = async () => {
    // const urlDriver = `https://ergast.com/api/f1/${globalCtx.chosenYear}/drivers/${props.driverId}/driverStandings.json`;
    const urlDriver = `https://raw.githubusercontent.com/nkezic/f1/main/DriverDetails`;
    try {
      const responseDriver = await axios.get(urlDriver);
      setDriverDetails(
        responseDriver.data.MRData.StandingsTable.StandingsLists[0]
          ?.DriverStandings[0]
      );
      setIsLoading(false);
    } catch (err) {
      //   console.log(err);
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
      {/* <RiseLoader
        size={4}
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '15px',
        }}
      /> */}
     
      <Box sx={{ display: 'flex', alignItems: 'center',  justifyContent: 'space-between'}}>
      {/* <Avatar width={200} height={200} /> */}
      <Skeleton variant="circular" width={150} height={150} />
      <Skeleton animation='wave' height={300} style={{ width: '80%' }} />
      </Box>
      </>
    );
  }
  console.log('moj props', props);
  return (
    <>
      <Table
        border='50px solid red'
        size='small'
        sx={{ margin: 0, marginBottom: 5 }}
        className='tableContainer'
      >
        <TableHead>
          <TableRow>
            <TableCell>
              <div className='flagName'>
                {globalCtx.flagFn(driverDetails?.Driver.nationality)}

                <span> </span>

                {' ' +
                  driverDetails.Driver.givenName +
                  ' ' +
                  driverDetails.Driver.familyName}
              </div>
            </TableCell>
            <TableCell>Nationality</TableCell>
            <TableCell>Wins</TableCell>
            <TableCell>Date of Birth</TableCell>
            <TableCell>Biography</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <img
                src={`/img/drivers/${driverDetails.Driver.driverId}.png`}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = `/img/drivers/unknownDriver.png`;
                }}
                style={{ width: '120px', paddingRight: '30px' }}
                alt='Driver'
              />
            </TableCell>
            <TableCell>{driverDetails?.Driver.nationality}</TableCell>
            <TableCell>{driverDetails?.wins}</TableCell>
            <TableCell>{driverDetails?.Driver.dateOfBirth}</TableCell>
            <TableCell>
              <a href={driverDetails?.Driver.url} target='_blank'>
                Wikipedia ↗
              </a>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};

export default DriverDetailsCollapsable;
