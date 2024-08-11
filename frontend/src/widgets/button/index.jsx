import MaterialButton from "@mui/material/Button";

export function Button({ children, variant, ...props }) {
  return (
    <MaterialButton variant={variant} {...props}>
      {children}
    </MaterialButton>
  );
}
