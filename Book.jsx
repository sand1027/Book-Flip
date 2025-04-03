import { useRef, useState, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import "./Book.css";

const pages = [
  //  Add pages here
];

const Book = () => {
  const bookRef = useRef(null);
  const popupRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const handleFlip = (e) => {
    setCurrentPage(e.data);
  };

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div>
      <button className="open-button" onClick={() => setIsOpen(true)}>
        Open Brochure
      </button>
      {isOpen && (
        <div className="popup-overlay">
          <div className="popup-content" ref={popupRef}>
            <button className="close-button" onClick={() => setIsOpen(false)}>
              X
            </button>
            <div className="book-wrapper">
              {currentPage > 0 && (
                <button
                  className="nav-button left"
                  onClick={() => bookRef.current.pageFlip().flipPrev()}
                >
                  &lt;
                </button>
              )}
              <div className="book-container">
                <HTMLFlipBook
                  width={400}
                  height={800}
                  size="fixed"
                  minWidth={500}
                  maxWidth={1000}
                  minHeight={600}
                  maxHeight={1200}
                  drawShadow={true}
                  flippingTime={1000}
                  useMouseEvents={true}
                  showCover={false}
                  mobileScrollSupport={false}
                  startPage={0}
                  maxShadowOpacity={0.5}
                  ref={bookRef}
                  onFlip={handleFlip}
                >
                  {pages.map((src, index) => (
                    <div key={index} className="page">
                      <img
                        src={src}
                        alt={`Page ${index + 1}`}
                        className="page-image"
                      />
                    </div>
                  ))}
                </HTMLFlipBook>
              </div>
              {currentPage < pages.length - 2 && (
                <button
                  className="nav-button right"
                  onClick={() => bookRef.current.pageFlip().flipNext()}
                >
                  &gt;
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Book;
