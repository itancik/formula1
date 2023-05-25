import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { RiseLoader } from 'react-spinners';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Link,
  Breadcrumbs,
} from '@mui/material';
import GlobalContext from '../context/global-context';

const TeamDetails = (props) => {
  const globalCtx = useContext(GlobalContext);

  const [teamDetails, setTeamDetails] = useState({});
  const [teamResults, setTeamResults] = useState([]);
  // const [teamResultIndex, setTeamResultIndex] = useState(0);
  const [isLoading, setIsLoading] = useState([]);

  const params = useParams();

  const teamId = params.teamId;

  const navigate = useNavigate();

  const handleDrivers = (raceDetails) => {
    console.log('klik na race');
    const linkTo = `/races/details/${raceDetails}`;
    navigate(linkTo);
  };

  useEffect(() => {
    getTeamDetails();
  }, []);

  function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb. -- teamDetails');
  }

  const handleBCRoute = (path) => {
    console.log("klikcic")
    navigate(path)
  }

  const getTeamDetails = async () => {
    const urlDetails = `http://ergast.com/api/f1/${globalCtx.chosenYear}/constructors/${teamId}/constructorStandings.json`;
    const urlResults = `http://ergast.com/api/f1/${globalCtx.chosenYear}/constructors/${teamId}/results.json`;
    const responseDetails = await axios.get(urlDetails);
    const responseResults = await axios.get(urlResults);

    console.log('test:', responseResults.data.MRData.RaceTable);

    setTeamDetails(
      responseDetails.data.MRData.StandingsTable.StandingsLists[0]
        .ConstructorStandings[0]
    );
    setTeamResults(responseResults.data.MRData.RaceTable.Races);

    setIsLoading(false);
  };

  if (isLoading) {
    return <RiseLoader />;
  }

  return (
    <>
      
      <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" 
        color="black"
        onClick={()=>handleBCRoute("/")}
        className="rucica" >
          Home
        </Link>
        <Link
          underline="hover"
          color="black"
          onClick={()=>handleBCRoute("/teams")}
          className="rucica"
        >
          Teams
        </Link>
        <Link
          underline="hover"
          color="text.red"
          onClick={()=>handleBCRoute(`/races/details/${raceDetails}`)}
          aria-current="page"
          className="rucica"
        >
          Team Details
        </Link>
      </Breadcrumbs>
    </div>



      <div className='team-details'>
        <div>
          <img src='/teams/aston_martin.webp' />
        </div>

        <div>

        

          <h1>Team Details</h1>
          <p className='name-details'>Name: {teamDetails.Constructor.name}</p>
          <p>Nationality: {teamDetails.Constructor.nationality}</p>
          <p>Positon: {teamDetails.position}</p>
          <p>Points: {teamDetails.points}</p>
          <p>
            History:{' '}
            <a href={teamDetails.Constructor.url + "#History"} target='_blank'>
              ↗
            </a>
          </p>
        </div>
      </div>
      <Table>
        <TableHead>
          <TableRow className='table-header'>
            <TableCell>Round</TableCell>
            <TableCell>Race Name</TableCell>
            <TableCell>{teamResults[0].Results[0].Driver.familyName}</TableCell>
            <TableCell>{teamResults[0].Results[1].Driver.familyName}</TableCell>
            <TableCell>Points</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {teamResults.map((teamResult) => {
            return (
              <TableRow key={teamResult.round}>
                <TableCell>{teamResult.round}</TableCell>
                <TableCell onClick={() => handleDrivers(teamResult.round)}>
                  {teamResult.raceName}
                </TableCell>
                <TableCell
                  className={'position_' + teamResult.Results[0].position}
                >
                  {teamResult.Results[0].position}
                </TableCell>
                <TableCell
                  className={'position_' + teamResult.Results[1].position}
                >
                  {teamResult.Results[1].position}
                </TableCell>
                <TableCell>
                  {Number(teamResult.Results[0].points) +
                    Number(teamResult.Results[1].points)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};
export default TeamDetails;
