import React, { useState } from 'react';
import { Button, TableContainer, Paper, Table, makeStyles, TableHead, TableRow, TableBody, TableCell } from '@material-ui/core';
import ImagePreview from '../ImagePreview';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const StorageTable: React.FC = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Preview and upload</TableCell>
              <TableCell>Previously uploaded</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            <TableRow key="Content">
              <TableCell>
                <ImagePreview />
              </TableCell>
              <TableCell>
                Yo
              </TableCell>
            </TableRow>

          </TableBody>
        </Table>
      </TableContainer>


    </React.Fragment>
  )
}

export default StorageTable;