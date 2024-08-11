import MaterialInput from "@mui/material/TextField";

export function Input({ children, ...props }) {
  return (
    <MaterialInput size="small" {...props}>
      {children}
    </MaterialInput>
  );
}
