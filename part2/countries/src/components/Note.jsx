import Country from "./Country";
const Note = ({ name, countries, showClick }) => {
  const getFilteredCountires = () => {
    return countries.filter((country) =>
      country.name.common.toLowerCase().includes(name.toLowerCase())
        ? country
        : null
    );
  };
  const filtedCountries = getFilteredCountires();

  if (filtedCountries.length > 10 && name != "") {
    return (
      <>
        <p>Too many matches, specify another filter.</p>
      </>
    );
  } else if (name == "") {
    return null;
  } else if (filtedCountries.length == 1) {
    return <Country country={filtedCountries[0]} />;
  }
  return (
    <>
      {filtedCountries.map((country) => (
        <p key={country.cca3}>
          {country.name.official}
          <button onClick={() => showClick(country.name.common)}> show</button>
        </p>
      ))}
    </>
  );
};

export default Note;
