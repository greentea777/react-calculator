const Button = ({ button, handleDisplay }) => {
  const handleOutput = (e) => {
    const btnValue = e.target.value;
    const btnType = button.type;
    const btnText = button.text;

    handleDisplay(btnValue, btnType, btnText);
  };

  return (
    <button
      onClick={handleOutput}
      value={button.value}
      className={button.className}
    >
      {button.text}
    </button>
  );
};
export default Button;
