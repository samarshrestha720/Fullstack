import { useState, useEffect } from "react";
import Note from "./components/Note";
import Form from "./components/Form";
import Filter from "./components/Filter";
import phoneService from "./services/phones";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [query, setQuery] = useState("");
  const [update, setUpdate] = useState(true);

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };

    const check = persons.map((person) => person.name === personObject.name);
    check.includes(true)
      ? alert(`${newName} is already added to phonebook`)
      : phoneService
          .create(personObject)
          .then((response) => setPersons(persons.concat(response)));

    setNewName("");
    setNewNumber("");
  };

  const inputChange = (event) => {
    console.log(event.target.value);
    // event.target.id === "name"
    //   ? setNewName(event.target.value)
    //   : setNewNumber(event.target.value);
    if (event.target.id === "name") {
      setNewName(event.target.value);
    } else if (event.target.id === "number") {
      setNewNumber(event.target.value);
    } else {
      setQuery(event.target.value);
    }
  };

  const delPerson = (event) => {
    console.log(event.target.id);

    const res = phoneService.remove(event.target.id);
    res.then(
      () => console.log("promise completed"),
      setPersons(persons.filter((person) => person.id !== event.target.id))
    );
    console.log(persons);
  };

  useEffect(() => {
    phoneService.getAll().then((response) => setPersons(response));
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter query={query} inputChange={inputChange} />
      <h3>Add new</h3>
      <Form
        newName={newName}
        newNumber={newNumber}
        addPerson={addPerson}
        inputChange={inputChange}
      />
      <h2>Numbers</h2>
      <Note persons={persons} del={delPerson} query={query} />
    </div>
  );
};

export default App;
