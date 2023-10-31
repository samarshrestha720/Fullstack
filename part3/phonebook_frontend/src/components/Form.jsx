const Form = (props) => {
  const { newName, newNumber, addPerson, inputChange } = props;
  return (
    <form>
      <div>
        name:
        <input id="name" value={newName} onChange={inputChange} />
        <br />
        number:
        <input id="number" value={newNumber} onChange={inputChange} />
      </div>
      <div>
        <button onClick={addPerson} type="submit">
          add
        </button>
      </div>
    </form>
  );
};

export default Form;
