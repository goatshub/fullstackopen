const Header = ({ courseName }) => <h2>{courseName}</h2>;

const Total = ({ sum }) => (
  <p>
    <b>Total of {sum} exercises.</b>
  </p>
);

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => (
  <>
    {parts.map((part) => (
      <Part part={part} key={part.id} />
    ))}
  </>
);

const Course = ({ course: { name, parts } }) => {
  let sum = parts.reduce((a, b) => a + b.exercises, 0);

  return (
    <div>
      <Header courseName={name} />
      <Content parts={parts} />
      <Total sum={sum} />
    </div>
  );
};

export default Course;
