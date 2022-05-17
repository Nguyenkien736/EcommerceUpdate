import React from "react";
import "../slidebanner/slide.css"
import img1 from "../../media/Hyouka.jpg"
const IMG = "http://images.amazon.com/images/P/0596004478.01._PE30_PI_SCMZZZZZZZ_.jpg"
const pictures =["url("+img1+")","url("+IMG+")","url("+img1+")"] 
const delay = 2500;
export default function Slideshow() {
  const [index, setIndex] = React.useState(0);
  const timeoutRef = React.useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  React.useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === pictures.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <div className="slideshow">
      <div
        className="slideshowSlider"
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {pictures.map((backgroundImage, index) => (
          <div
            className="slide"
            key={index}
            style={{ backgroundImage:backgroundImage }}>
              
          </div>
        ))}
      </div>

      <div className="slideshowDots">
        {pictures.map((_, idx) => (
          <div
            key={idx}
            className={`slideshowDot${index === idx ? " active" : ""}`}
            onClick={() => {
              setIndex(idx);
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}