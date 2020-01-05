import React, { useState, useEffect } from 'react';
import { Button, TableContainer, Paper, Table, makeStyles, TableHead, TableRow, TableBody, TableCell, CircularProgress } from '@material-ui/core';
import ImagePreview from '../ImagePreview';
import { storage } from '../../firebase';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

interface ImageRenderWithLoadingProps extends React.Props<any> {
  imageSrc: string,
  uploading: boolean,
}

const ImageRenderWithLoading = ({ imageSrc, uploading }: ImageRenderWithLoadingProps) => {
  let content: React.ReactNode;

  if (imageSrc) {
    content = <img style={{ width: "15rem", height: "15rem" }} src={imageSrc} />
  } else if (uploading) {
    console.error("Uploading", "here")
    content = <CircularProgress />
  }

  return (
    <React.Fragment>
      {content}
    </React.Fragment>
  )
}

const StorageTable: React.FC = () => {
  const classes = useStyles();
  const [storedImageUrl, setStoredImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  const uploadImage = async (fileSelected: File) => {
    const fileSizeMB = fileSelected.size / 1024 / 1024;
    if (fileSizeMB > 10) {
      alert("Files cannot exceed 10 MB"); // enforced at storage layer too, could error better but eh, not the focus.
      return;
    }
    setUploading(true);
    console.error(uploading);
    try {
      await storage.uploadUserImage(fileSelected);
    } finally {
      setUploading(false);
    }
  }

  const checkForUserImageUrlSetIfSo = () => { // naming
    storage.fetchUserImageUrl().then((userImageUrl) => userImageUrl && setStoredImageUrl(userImageUrl));
  }

  useEffect(checkForUserImageUrlSetIfSo, []);

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
                <ImagePreview uploadImage={(fileSelected: File) => uploadImage(fileSelected).then(checkForUserImageUrlSetIfSo)} />
              </TableCell>
              <TableCell>
                {storedImageUrl &&
                  <div>
                    <ImageRenderWithLoading
                      imageSrc={storedImageUrl}
                      uploading={uploading}
                    />
                    <Button variant="contained" color="secondary" onClick={() => { storage.deleteUserFile().then(() => setStoredImageUrl('')); }}>
                      Delete the file on the server
                    </Button>
                  </div>
                  }
                
              </TableCell>
            </TableRow>

          </TableBody>
        </Table>
      </TableContainer>


    </React.Fragment>
  )
}

export default StorageTable;