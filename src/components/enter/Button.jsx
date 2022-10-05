const Button = ({ text, isLoading }) => {
  return <button>{isLoading ? "loading..." : text}</button>;
};
export default Button;
