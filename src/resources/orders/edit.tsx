import React from "react";
import {
  Edit,
  SaveButton,
  SelectInput,
  SimpleForm,
  Toolbar,
} from "react-admin";

const OrderEdit: React.FC = (props) => (
  <Edit {...props}>
    <SimpleForm toolbar={<EnhancedToolbar />}>
      <SelectInput
        source="orderStatus"
        choices={[
          { name: "Shipping", id: "SHIPPING" },
          { name: "Pending", id: "PENDING" },
          { name: "Placed", id: "PLACED" },
          { name: "Delivered", id: "DELIVERED" },
        ]}
        variant="outlined"
      />
      <SelectInput
        source="paymentStatus"
        choices={[
          { name: "Voided", id: "VOIDED" },
          { name: "Saved", id: "SAVED" },
          { name: "Payer Action Required", id: "PAYER_ACTION_REQUIRED" },
          { name: "Created", id: "CREATED" },
          { name: "Completed", id: "COMPLETED" },
          { name: "Approved", id: "APPROVED" },
        ]}
        variant="outlined"
      />
    </SimpleForm>
  </Edit>
);

const EnhancedToolbar: React.FC = (props) => (
  <Toolbar {...props}>
    <SaveButton />
  </Toolbar>
);
export default OrderEdit;
