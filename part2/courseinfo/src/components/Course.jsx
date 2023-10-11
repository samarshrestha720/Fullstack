import Total from "./Total";

const Course = ({ course }) => {
  return (
    <>
      <Headers course={course} />
      <Total course={course} />
    </>
  );
};

const Headers = ({ course }) => {
  return (
    <>
      <h1>{course.name}</h1>
      {course.parts.map((part) => (
        <p key={part.id}>
          {part.name} {part.exercises}
        </p>
      ))}
    </>
  );
};

export default Course;
