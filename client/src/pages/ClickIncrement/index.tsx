import React from 'react';
import { Button } from '@material-ui/core';
import MenuAppBar from '../../components/MenuAppBar';

const ClickIncrement: React.FC = () => (
  <div>
    <MenuAppBar />
    <Button variant="contained" color="secondary" onClick={() => { console.error('Increment counter'); }}>
        Press to increment counter, current value: $x
    </Button>
    <p>
        Gotta love a red button
    </p>
  </div>
);

export default ClickIncrement;
