import { Group } from "@material-ui/icons";
import React from "react";
import { List, Datagrid, TextField, EmailField, DateField } from "react-admin";
import { EnhancedBooleanField } from "../../components/common";

export const CustomerIcon: React.FC = Group;

export const CustomerList: React.FC = (props) => {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source="id" />
        <TextField source="firstname" />
        <TextField source="lastname" />
        <EmailField source="email" />
        <EnhancedBooleanField source="isEmailVerified" label="Verified" />
        <DateField source="createdAt" />
      </Datagrid>
    </List>
  );
};
