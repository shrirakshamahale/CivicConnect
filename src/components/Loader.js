function Loader() {
  return (
    <div style={styles.loader}>
      <div style={styles.circle}></div>
    </div>
  );
}

const styles = {
  loader: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px"
  },
  circle: {
    width: "30px",
    height: "30px",
    border: "4px solid #ccc",
    borderTop: "4px solid #0a7cff",
    borderRadius: "50%",
    animation: "spin 1s linear infinite"
  }
};

export default Loader;
