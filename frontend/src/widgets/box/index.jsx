import MaterialBox from "@mui/material/Box";

export function Form({ children, ...props }) {
  return (
    <MaterialBox
      component="form"
      autoComplete="off"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      {...props}
    >
      {children}
    </MaterialBox>
  );
}
