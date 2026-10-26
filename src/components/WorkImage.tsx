import { useEffect, useRef, useState } from "react";
import { MdArrowOutward } from "react-icons/md";

interface Props {
  image: string;
  alt?: string;
  video?: string;
  link?: string;
}

const WorkImage = (props: Props) => {
  const [isVideo, setIsVideo] = useState(false);
  const [video, setVideo] = useState("");
  const objectUrlRef = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
    };
  }, []);

  const handleMouseEnter = async () => {
    if (props.video) {
      setIsVideo(true);
      if (objectUrlRef.current) return;
      const response = await fetch(`src/assets/${props.video}`);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      objectUrlRef.current = blobUrl;
      setVideo(blobUrl);
    }
  };

  const inner = (
    <>
      {props.link && (
        <div className="work-link">
          <MdArrowOutward />
        </div>
      )}
      <img
        src={props.image}
        alt={props.alt ?? ""}
        loading="lazy"
        decoding="async"
      />
      {isVideo && <video src={video} autoPlay muted playsInline loop></video>}
    </>
  );

  if (!props.link) {
    return (
      <div className="work-image">
        <div
          className="work-image-in"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={() => setIsVideo(false)}
        >
          {inner}
        </div>
      </div>
    );
  }

  return (
    <div className="work-image">
      <a
        className="work-image-in"
        href={props.link}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsVideo(false)}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor={"disable"}
      >
        {inner}
      </a>
    </div>
  );
};

export default WorkImage;
