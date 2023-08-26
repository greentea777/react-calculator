const Display = ({ displayStr, memoryValue, prevDisplayStr }) => {
  return (
    <div className="display">
      {memoryValue && <p className="memory-sign">MS : {memoryValue}</p>}
      {prevDisplayStr && <p className="history-displaystr">{prevDisplayStr}</p>}
      <p className="number-display">{displayStr}</p>
    </div>
  );
};
export default Display;
