export function Button({ btn_text }) {
  return (
    <button
      style={{
        minWidth:"200px",
        maxWidth:"300px",
        height: "40px",
        borderRadius: "10px",
        backgroundColor: "white",
        fontWeight: "bold",
        cursor: "pointer",
        padding: "5px 10px",
        fontSize:"1.1rem",
        border:"none",
        textAlign:"center"
      }}
    >
      {btn_text}
    </button>
  );
}
