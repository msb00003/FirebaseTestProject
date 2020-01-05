import React, { useState, useEffect } from 'react';
import { Button, TableContainer, Paper, Table, makeStyles, TableHead, TableRow, TableBody, TableCell } from '@material-ui/core';
import MenuAppBar from '../../components/MenuAppBar';
import { database } from '../../firebase';
import StorageTable from '../../components/StorageTable';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const ClickIncrement: React.FC = () => {
  const classes = useStyles();
  /** 
   * So I need to fetch the value to render, then listen to it. 
   * iirc I can use hooks for that
   * 
   * I think an effect hook for the database listener and a state hook for the value
   * So, don't render until fetched. Could get fancy with loading if I wanted
   */
  const [count, setComponentCount] = useState(-1);


  useEffect(() => {
    // Add a listener with setCount as the callback
    database.fetchAndListenToCounter(setComponentCount);
  }, []);


  
  return (
  <div>
    <MenuAppBar pageName="Click Increment" />
    <Button variant="contained" color="secondary" onClick={() => { database.setCounter(count + 1) }}>
        Press to increment counter, current value: {count}
    </Button>
    <p>
        Gotta love a red button
    </p>
    
    <p>
      Below is me playing with the firebase storage offering, on the left side you can preview and upload a file 
      Image preview is really neat.
    </p>
    <p>
      The right side will let you see the file you have uploaded (if you have already) or after you have uploaded one
    </p>
    <StorageTable />
  </div>
  )
};

export default ClickIncrement;
