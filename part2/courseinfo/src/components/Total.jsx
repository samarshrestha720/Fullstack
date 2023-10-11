const Total = ({ course }) => {
  const total = course.parts.reduce((temp, part) => temp + part.exercises, 0);
  return <h2>total of {total} exercises</h2>;
};

export default Total;
