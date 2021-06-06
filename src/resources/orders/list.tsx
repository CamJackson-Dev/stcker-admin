import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import React from "react";
import {
  Datagrid,
  DateField,
  List,
  NumberField,
  TextField,
  useRecordContext,
} from "react-admin";
import { Order, OrderItem } from "../../utils/types/order";
import { useStyles } from "./styles";

const OrderList: React.FC = (props) => {
  return (
    <List {...props}>
      <Datagrid
        rowClick="edit"
        expand={<OrderDetails />}
        hasBulkActions={false}
        selectedIds={undefined}
        isRowSelectable={() => false}
        optimized
      >
        <TextField source="id" label="Reference Id" />
        <DateField source="createdAt" label="Date" />
        <NumberField source="grossAmount" />
        <StatusField source="paymentStatus" />
        <StatusField source="orderStatus" />
      </Datagrid>
    </List>
  );
};

interface ItemCell {
  id: keyof OrderItem;
  label: string;
}

const itemCells: ItemCell[] = [
  {
    id: "_id",
    label: "Id",
  },
  {
    id: "name",
    label: "Name",
  },
  {
    id: "quantity",
    label: "Quantity",
  },
  {
    id: "price",
    label: "Unit Price ($)",
  },
];

const OrderDetails: React.FC<any> = ({ record }) => {
  const row = record as Order;
  return (
    <TableRow>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
        <Box margin={1}>
          <Typography variant="h6" gutterBottom>
            ITEMS
          </Typography>
          <Table size="small" aria-label="items">
            <TableHead>
              <TableRow>
                {itemCells.map((cell) => (
                  <TableCell align="left" key={cell.id}>
                    {cell.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {row.items.map((item) => (
                <TableRow key={item._id}>
                  {itemCells.map((cell) => (
                    <TableCell align="left" key={cell.id}>
                      {item[cell.id]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Typography variant="h6" style={{ marginTop: "1rem" }}>
            SHIPPING DETAILS
          </Typography>
          <Typography>{row.shippingDetails.fullname}</Typography>
          <Typography>{row.shippingDetails.email}</Typography>
          <Typography>{row.shippingDetails.address}</Typography>
          <Typography>
            {row.shippingDetails.city} {row.shippingDetails.state}{" "}
            {row.shippingDetails.postalCode}
          </Typography>
          <Typography>{row.shippingDetails.country}</Typography>
          <Typography>{row.shippingDetails.phoneNumber}</Typography>
        </Box>
      </TableCell>
    </TableRow>
  );
};

interface StatusProps {
  source: string;
}

const StatusField: React.FC<StatusProps> = ({ source }) => {
  const record = useRecordContext();
  const classes = useStyles();

  const value = record && record[source];
  const isSuccess = ["COMPLETED", "DELIVERED"].includes(value);

  return record ? (
    <Typography
      component="span"
      variant="body2"
      className={isSuccess ? classes.success : classes.info}
    >
      {value}
    </Typography>
  ) : null;
};

export default OrderList;
