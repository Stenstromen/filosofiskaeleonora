import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Stack from "react-bootstrap/Stack";
import Quotes from "../assets/Quotes";

function Home(isMobile) {
  const { id } = useParams();
  const [quote, setQuote] = useState([]);

  useEffect(() => {
    if (id) {
      const singleQuote = Quotes.find((item) => item.id === parseInt(id));
      return setQuote((quote) => [...quote, singleQuote]);
    }
    const randomNum = Math.floor(Quotes.length * Math.random());
    return setQuote((quote) => [...quote, Quotes[randomNum]]);
  }, [id]);

  return (
    <div>
      {quote?.map((item) => {
        return (
          <Stack
            key={item?.id}
            style={{
              paddingTop: isMobile.isMobile ? "25%" : "12%",
              width: isMobile.isMobile ? "390px" : "50vw",
            }}
            className="col-md-5 mx-auto"
            direction="horizontal"
            gap={3}
          >
            <h1>
              <strong>
                <em>{item?.quote}</em>
              </strong>
            </h1>
          </Stack>
        );
      })}
      <Link to="/all"></Link>
      {Quotes.map((item) => {
        return <Link key={item.id} to={`/${item.id}`}></Link>;
      })}
    </div>
  );
}

export default Home;
