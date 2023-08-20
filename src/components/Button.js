const Button = ({ button, handleDisplay }) => {
  const handleOutput = () => {
    const btnValue = button.value;
    const btnType = button.type;
    const btnText = button.text;

    handleDisplay(btnValue, btnType, btnText);
  };

  return (
    <button
      onClick={handleOutput}
      value={button.value}
      className={`${button.className} ${button.type}`}
    >
      {button.text}
    </button>
  );
};
export default Button;
