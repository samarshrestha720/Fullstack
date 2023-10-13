const Note = ({ persons, del, query }) => {
  const getFiltered = (query, persons) => {
    if (query === "") {
      return persons;
    }
    return persons.filter((person) =>
      person.name.toLowerCase().includes(query)
    );
  };
  const filteredPersons = getFiltered(query, persons);
  return (
    <>
      {filteredPersons.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}{" "}
          <button id={person.id} onClick={del} type="submit">
            Delete
          </button>
        </p>
      ))}
    </>
  );
};

export default Note;
