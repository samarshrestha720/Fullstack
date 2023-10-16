const Form = (props) => {
  const { name, inputChange } = props;
  return (
    <form>
      <div>
        find countries:
        <input id="name" value={name} onChange={inputChange} />
      </div>
    </form>
  );
};

export default Form;
