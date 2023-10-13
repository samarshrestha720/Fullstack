const Filter = (props) => {
  const { inputChange, query } = props;
  return (
    <>
      Filter:
      <input id="filter" value={query} onChange={inputChange} />
    </>
  );
};

export default Filter;
