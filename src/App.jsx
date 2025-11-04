export default function App() {
  const goToBuilder = () => {
    alert("🚧 Web builder en construcción 🚧");
  };

  return (
    <main style={styles.container}>
      <h1 style={styles.title}>Ctrl+f</h1>
      <button style={styles.button} onClick={goToBuilder}>
        Crea tu web
      </button>
    </main>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "system-ui, sans-serif",
    background: "#0d0d0d",
    color: "#fff",
  },
  title: {
    fontSize: "4rem",
    marginBottom: "2rem",
    fontWeight: "700",
  },
  button: {
    fontSize: "1.25rem",
    padding: "0.8rem 2rem",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    background: "#ffffff",
    color: "#000",
    fontWeight: "600",
  },
};
