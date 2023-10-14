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
    if (check.includes(true)) {
      const temp = persons.find((e) => e.name == personObject.name);
      confirm(
        `${personObject.name} is already added to phonebook, replace the old number with a new one?`
      )
        ? phoneService
            .update(temp.id, personObject)
            .then((response) =>
              setPersons(
                persons.map((person) =>
                  person.id != temp.id ? person : response
                )
              )
            )
        : null;
    } else {
      phoneService
        .create(personObject)
        .then((response) => setPersons(persons.concat(response)));
    }
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

  const delPerson = (id, name) => {
    console.log(id, name);
    const res = phoneService.remove(id);
    res.then(() =>
      confirm(`Delete ${name}`)
        ? setPersons(persons.filter((person) => person.id != id))
        : console.log("not deleted")
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
