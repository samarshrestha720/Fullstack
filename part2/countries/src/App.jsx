import { useState, useEffect } from "react";
import Note from "./components/Note";
import Form from "./components/Form";
import Filter from "./components/Filter";
import countriesService from "./services/countries";

const App = () => {
  const [countries, setCountries] = useState(null);
  const [name, setName] = useState("");

  const inputChange = (event) => {
    console.log(event.target.value);
    setName(event.target.value);
  };

  useEffect(() => {
    countriesService.getAll().then((response) => setCountries(response));
  }, []);

  const showClick = (showName) => {
    setName(showName);
  };

  if (!countries) {
    return null;
  }
  return (
    <>
      <Form name={name} inputChange={inputChange} />
      <Note countries={countries} name={name} showClick={showClick} />
    </>
  );
};

export default App;
