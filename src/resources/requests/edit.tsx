import React from "react";
import { Edit, required, SimpleForm, TextInput } from "react-admin";
import { TextAreaField } from "../../components/common";

const RequestEdit: React.FC = (props) => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextAreaField source="message" />
        <TextInput
          fullWidth
          multiline
          resettable
          rows={10}
          rowsMax={20}
          source="reply"
          style={{ maxWidth: 600 }}
          validate={required()}
          variant="outlined"
        />
      </SimpleForm>
    </Edit>
  );
};

export default RequestEdit;
