import React, { useRef, useState, useEffect } from "react";
import "./ImageUpload.css";

import Button from "./Button";

type Props = Readonly<{
  id: string;
  center: boolean;
  onInput: (id: string, pickedFile: File | undefined, fileIsValid: boolean) => void;
  errorText: string;
}>;

const ImageUpload: React.FC<Props> = (props) => {
  const [file, setFile] = useState<File>();
  const [previewUrl, setPreviewUrl] = useState<string>();
  const [isValid, setIsValid] = useState(false);

  const filePickerRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result as string);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = (event: React.FormEvent<HTMLInputElement>) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (event.currentTarget.files && event.currentTarget.files.length === 1) {
      pickedFile = event.currentTarget.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    props.onInput(props.id, pickedFile, fileIsValid);
  };

  const pickImageHandler = () => {
    filePickerRef!.current!.click();
  };

  return (
    <div className='form-control'>
      <input
        type='file'
        id={props.id}
        ref={filePickerRef}
        style={{ display: "none" }}
        accept='.jpg,.png,.jpeg'
        onChange={pickedHandler}
      />
      <div className={`image-upload ${props.center && "center"}`}>
        <div className='image-upload__preview'>
          {previewUrl && <img src={previewUrl} alt='Preview' />}
          {!previewUrl && <p>Please pick an image.</p>}
        </div>
        <Button type='button' onClick={pickImageHandler}>
          PICK IMAGE
        </Button>
      </div>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default ImageUpload;
