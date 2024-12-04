import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>404</h1>
      <h2 style={styles.subHeader}>Page Not Found</h2>
      <p style={styles.text}>
        Sorry, the page you are looking for does not exist. You can always go back to the 
        <Link to="/" style={styles.link}> homepage</Link>.
      </p>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "50px",
    color: "#333",
  },
  header: {
    fontSize: "6rem",
    color: "#FF6F61",
  },
  subHeader: {
    fontSize: "2rem",
    marginBottom: "20px",
  },
  text: {
    fontSize: "1rem",
    lineHeight: "1.5",
  },
  link: {
    color: "#007BFF",
    textDecoration: "none",
  },
};

export default PageNotFound;
