import { Box, Typography } from "@material-ui/core";
import React from "react";
import { BooleanField, BooleanFieldProps, useRecordContext } from "react-admin";
import { useStyles } from "./styles";

export const EnhancedBooleanField: React.FC<BooleanFieldProps> = ({
  source,
  ...props
}) => {
  const record = useRecordContext();
  const classes = useStyles();

  const value = record ? record[source!] : null;

  return record ? (
    <BooleanField
      {...props}
      source={source}
      style={{
        justifyContent: "center",
      }}
      className={value ? classes.success : classes.error}
    />
  ) : null;
};

export const TextAreaField: React.FC<{ source: string }> = ({ source }) => {
  const record = useRecordContext();
  const value: string | null = record ? record[source!] : null;

  return value ? (
    <Box padding={"0.5rem 0"}>
      <Typography style={{ fontWeight: 550 }}>
        {source[0].toUpperCase() + source.slice(1)}
      </Typography>
      {value.split("\n").map((paragraph, index) => (
        <Typography key={index}>{paragraph}</Typography>
      ))}
    </Box>
  ) : null;
};
