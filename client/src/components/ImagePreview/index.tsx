import React, { useState } from 'react';
import { Button } from '@material-ui/core';

const handleFileInputSelectedGetImageDataUrl = (file: File) => {
  return new Promise<string>((resolve) => {
    // Based on:
    //  https://stackoverflow.com/questions/4459379/preview-an-image-before-it-is-uploaded
    const fileReader = new FileReader();

    fileReader.onload = function (e) {
      if (!e.target || !e.target.result || typeof e.target.result != "string") {
        return;
      }
      const imageAsB64 = e.target.result;
      resolve(imageAsB64);
    }

    const filePath: Blob = new Blob([file], { type: 'image/jpeg' });

    fileReader.readAsDataURL(filePath);
  });
}

const ImagePreview = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [fileSelected, setFileSelected] = useState();

  return (
    <React.Fragment>
      <p>
        Below you can upload an arbitrary image file under 5 MB, mostly so I can have a play with storage.

        Naturally do not upload anything sensitive, be it commercially, PII etc.
    </p>
      <input
        accept="image/jpeg"
        type="file"
        onChange={function (event) {
          if (event.target && event.target.files && event.target.files[0]) {
            const selectedFile = event.target.files[0];
            setFileSelected(selectedFile);
            handleFileInputSelectedGetImageDataUrl(selectedFile).then(
              (imageDataUrl: string) => { setImageUrl(imageDataUrl) }
            )
          }
        }}
      />
      {imageUrl && <div>
        <Button variant="contained" color="primary" onClick={() => { console.error("hi"); }}>
          Press to upload your image
          </Button>
      </div>}
      <p>
        Preview (once you've selected a file)
      </p>
      {imageUrl && <img style={{ width: "15rem", height: "15rem" }} src={imageUrl} />}
    </React.Fragment>
  )
}

export default ImagePreview;