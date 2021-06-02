import { Paper } from "@material-ui/core";
import { Pagination, TopToolbar } from "react-admin";
import { ListBase } from "ra-core";
import {
  CreateButton,
  ExportButton,
  ListProps,
  SortButton,
  Title,
} from "ra-ui-materialui";
import React from "react";
import GridList from "./grid";

const ListActions: React.FC<any> = () => (
  <TopToolbar>
    <SortButton fields={["name", "price"]} />
    <CreateButton basePath="/products" />
    <ExportButton />
  </TopToolbar>
);

const ProductList: React.FC<ListProps> = (props) => {
  return (
    <Paper
      variant="outlined"
      square
      style={{ minHeight: "100vh", width: "95%", margin: "auto" }}
    >
      <ListBase sort={{ field: "name", order: "ASC" }} {...props}>
        <Title defaultTitle={"Products"} />
        <ListActions />
        <GridList />
        <Pagination rowsPerPageOptions={[5, 10, 20, 50, 100]} />
      </ListBase>
    </Paper>
  );
};

export default ProductList;
