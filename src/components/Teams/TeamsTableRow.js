import React, { useState, useContext } from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import { useNavigate } from 'react-router-dom';
import GlobalContext from '../../context/global-context';
import TeamDetailsCollapsable from './TeamDetailsCollapsable';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const TeamsTableRow = (props) => {
  const globalCtx = useContext(GlobalContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleClickConstructor = (teamId) => {
    const LinkTo = `/teams/details/${teamId}`;
    navigate(LinkTo);
  };

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label='expand row'
            size='small'
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component='th' scope='row' className='tableRow-cell'>
          {props.team.position}
        </TableCell>
        <TableCell
          onClick={() =>
            handleClickConstructor(props.team.Constructor.constructorId)
          }
          className='mouseHandle tableRow-cell'
        >
          <div className='flagName'>
            {globalCtx.flagFn(props.team.Constructor.nationality)}
            <span> </span>
            {props.team.Constructor.name}
          </div>
        </TableCell>
        <TableCell className='details-btn'>
          <a href={props.team.Constructor.url} target='_blank'>
            Details <OpenInNewIcon />
          </a>
        </TableCell>
        <TableCell className='tableRow-cell'>{props.team.points}</TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ margin: 0 }}>
              <TeamDetailsCollapsable
                teamId={props.team.Constructor.constructorId}
              />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};
export default TeamsTableRow;
