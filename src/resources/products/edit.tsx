import {
  NumberInput,
  TextInput,
  SimpleForm,
  ImageInput,
  ImageField,
  required,
  Edit,
  EditProps,
} from "react-admin";
import React from "react";
import { Typography } from "@material-ui/core";

const ProductEdit: React.FC<EditProps> = (props) => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput source="name" variant="outlined" validate={required()} />
        <NumberInput
          source="price"
          variant="outlined"
          validate={required()}
          min={0}
        />
        <ImageInput
          source="image"
          accept={"image/jpeg"}
          maxSize={5_000_000}
          placeholder={
            <Typography>
              Drop your stcker file or click to select one. Image should be less
              than 5MB
            </Typography>
          }
        >
          <ImageField source="src" title="title" />
        </ImageInput>
      </SimpleForm>
    </Edit>
  );
};

export default ProductEdit;
