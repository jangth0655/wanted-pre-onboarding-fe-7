const Input = ({ label, type, value, placeholder, id, onChange }) => {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        onChange={onChange}
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
      />
    </>
  );
};
export default Input;
