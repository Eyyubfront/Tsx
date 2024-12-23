const CustomInput = ({ label }: { label: string }) => {
  return (
    <>
      <label htmlFor="">{label}</label>
      <input type="text" />
    </>
  );
};

export default CustomInput;
