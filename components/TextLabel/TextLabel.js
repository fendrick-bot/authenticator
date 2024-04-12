export function TextLabel({ label_text }) {
  return (
    <label htmlFor="" style={{ fontSize: "1rem", color:"lightgrey" }}>
      {label_text}
    </label>
  );
}
