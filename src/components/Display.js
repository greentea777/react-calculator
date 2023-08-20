const Display = ({ displayStr, memoryValue }) => {
  return (
    <div className="display">
      {memoryValue && <p className="memory-sign">MS : {memoryValue}</p>}
      <p className="number-display">{displayStr}</p>
    </div>
  );
};
export default Display;
