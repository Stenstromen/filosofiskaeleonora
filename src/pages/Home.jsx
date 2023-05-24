import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Stack from "react-bootstrap/Stack";
import Quotes from "../assets/Quotes";

function Home() {
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
      {quote &&
        quote.map((item) => {
          if (item) {
            return (
              <Stack
                key={item.id}
                className="home col-md-5 mx-auto"
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
          } else {
            return null;
          }
        })}

      <Link to="/all"></Link>
      {Quotes?.map(({ id }) => {
        return <Link key={id} to={`/${id}`}></Link>;
      })}
    </div>
  );
}

export default Home;
