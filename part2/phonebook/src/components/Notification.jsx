const Notification = ({ message }) => {
  const error = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };
  if (message === null) {
    return null;
  } else if (message.includes("removed")) {
    error.color = "red";
  }

  return <div style={error}>{message}</div>;
};

export default Notification;
