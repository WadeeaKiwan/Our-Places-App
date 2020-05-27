import React, { useRef, ChangeEvent } from "react";
import "./ImageUpload.css";

import Button from "./Button";

type Props = Readonly<{
  id: string;
  center: boolean;
}>;

const ImageUpload: React.FC<Props> = (props) => {
  const filePickerRef = useRef<HTMLInputElement>(null);

  const pickedHandler = (event: ChangeEvent) => {
    console.log(event.target);
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
          <img src='' alt='Preview' />
        </div>
        <Button type='button' onClick={pickImageHandler}>
          PICK IMAGE
        </Button>
      </div>
    </div>
  );
};

export default ImageUpload;
