import { Box, Typography } from "@mui/material";

const Counter = ({ title, value }: {title: string, value: number}) => {
  return (
    <Box
      sx={{
        width: "200px",
        position: "inherit",
        height: "125px",
        backgroundColor: "#F5F8FF",
        borderRadius: "4px",
        textAlign: "center",
        padding: "16px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: "#666666",
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="h5"
        sx={{
          color: "#666666",
          textAlign: "center",
        }}
      >
        ${value}
      </Typography>
    </Box>
  );
};

export default Counter;
