import { useState, useEffect } from "react";
import Stack from "react-bootstrap/Stack";
import Quotes from "../assets/Quotes";

function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [quote, setQuote] = useState([]);

  function getRandomQuote() {
    const randomNum = Math.floor(Quotes.length * Math.random());
    return setQuote((quote) => [...quote, Quotes[randomNum]]);
  }

  function handleResize() {
    window.innerWidth < 425 ? setIsMobile(true) : setIsMobile(false);
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    getRandomQuote();
  }, []);

  return (
    <div>
      {quote.map((item) => {
        return (
          <Stack
            style={{ paddingTop: isMobile ? "35%" : "20%", width: isMobile ? "390px" : "50vw" }}
            className="col-md-5 mx-auto"
            direction="horizontal"
            gap={3}
          >
            <h1>
              <strong>
                <em>{item.quote}</em>
              </strong>
            </h1>
          </Stack>
        );
      })}
    </div>
  );
}

export default Home;
