const Button = ({ text, isLoading, disabled }) => {
  return <button disabled={disabled}>{isLoading ? "loading..." : text}</button>;
};
export default Button;
