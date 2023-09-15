const FieldWrapper = ({ children, label }) => {
  return (
    <div>
      <label className="text-sm">{label}</label>
      <div>{children}</div>
    </div>
  );
};

export default FieldWrapper;