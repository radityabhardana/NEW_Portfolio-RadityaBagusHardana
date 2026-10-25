import "./styles/style.css";

const HoverLinks = ({ text, cursor }: { text: string; cursor?: boolean }) => {
  return (
    <span className="link" data-cursor={!cursor && "disable"}>
      {text}
    </span>
  );
};

export default HoverLinks;
