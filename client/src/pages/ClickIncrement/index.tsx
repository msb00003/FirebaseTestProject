import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import MenuAppBar from '../../components/MenuAppBar';
import { database } from '../../firebase';


const ClickIncrement: React.FC = () => {
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
    <MenuAppBar />
    <Button variant="contained" color="secondary" onClick={() => { database.setCounter(count + 1) }}>
        Press to increment counter, current value: {count}
    </Button>
    <p>
        Gotta love a red button
    </p>
  </div>
  )
};

export default ClickIncrement;
