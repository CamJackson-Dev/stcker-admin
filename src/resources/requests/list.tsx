import React from "react";
import { Datagrid, EmailField, List, TextField } from "react-admin";

import { EnhancedBooleanField, TextAreaField } from "../../components/common";

const RequestList: React.FC = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit" expand={<TextAreaField source="message" />}>
      <TextField source="id" />
      <TextField source="subject" />
      <EmailField source="email" />
      <EnhancedBooleanField source="replied" />
    </Datagrid>
  </List>
);

export default RequestList;
