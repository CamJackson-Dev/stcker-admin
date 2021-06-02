import { linkToRecord, useListContext } from "react-admin";
import React from "react";
import {
  Box,
  GridList,
  GridListTile,
  GridListTileBar,
  withWidth,
  WithWidth,
} from "@material-ui/core";
import { Breakpoint } from "@material-ui/core/styles/createBreakpoints";

import { STICKER_URL } from "../../utils/constants";
import { Product } from "../../utils/types/product";
import { useListStyles } from "./styles";
import { Link } from "react-router-dom";

const getColsForWidth = (width: Breakpoint) => {
  if (width === "xs") return 2;
  if (width === "sm") return 3;
  if (width === "md") return 4;
  if (width === "lg") return 5;
  return 6;
};

const times = (nbChildren: number, fn: (key: number) => any) =>
  Array.from({ length: nbChildren }, (_, key) => fn(key));

const LoadedGridList: React.FC<WithWidth> = ({ width }) => {
  const classes = useListStyles();
  const { data, basePath } = useListContext();

  const products = Object.values(data) as Product[];
  return (
    <Box className={classes.root}>
      <GridList
        cellHeight={200}
        spacing={5}
        cols={getColsForWidth(width)}
        className={classes.gridList}
      >
        {products.map((product) => {
          return (
            <GridListTile
              component={Link}
              key={product.id}
              to={linkToRecord(basePath, product.id)}
              className={classes.gridTitle}
            >
              <img src={product.image || STICKER_URL} alt={product.name} />
              <GridListTileBar
                title={product.name}
                subtitle={`$${product.price}`}
              />
            </GridListTile>
          );
        })}
      </GridList>
    </Box>
  );
};

const LoadingGridList: React.FC<{ nbItems?: number; width: Breakpoint }> = ({
  width,
  nbItems = 20,
}) => {
  const classes = useListStyles();
  return (
    <GridList
      cellHeight={180}
      cols={getColsForWidth(width)}
      className={classes.gridList}
    >
      {times(nbItems, (key) => (
        <GridListTile key={key}>
          <Box className={classes.placeholder} />
        </GridListTile>
      ))}
    </GridList>
  );
};

const EnhancedGridList: React.FC<WithWidth> = ({ width }) => {
  const { loaded } = useListContext();
  return loaded ? (
    <LoadedGridList width={width} />
  ) : (
    <LoadingGridList width={width} />
  );
};

export default withWidth()(EnhancedGridList);
