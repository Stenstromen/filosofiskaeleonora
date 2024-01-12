import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Stack from "react-bootstrap/Stack";
import Quotes from "../assets/Quotes";

function Home() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quote, setQuote] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isValidId, setIsValidId] = useState(true);

  useEffect(() => {
    let singleQuote;

    if (id) {
      singleQuote = Quotes.find((item) => item.id === parseInt(id));
      setIsValidId(!!singleQuote);
    } else {
      const randomNum = Math.floor(Quotes.length * Math.random());
      singleQuote = Quotes[randomNum];
    }

    if (singleQuote) setQuote([singleQuote]);

    setIsLoading(false);
  }, [id]);

  useEffect(() => {
    if (!isLoading && !isValidId) {
      navigate("/");
    }
  }, [isLoading, isValidId, navigate]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {quote.map(({ id, quote }) => {
        const stringId = id.toString();
        return (
          <>
            <Helmet>
              <title>Quote #{stringId} | Filosofiskaeleonora.se</title>
            </Helmet>
            <Stack
              key={id}
              className="home col-md-5 mx-auto"
              direction="horizontal"
              gap={3}
            >
              <h1>
                <strong>
                  <em>{quote}</em>
                </strong>
              </h1>
            </Stack>
          </>
        );
      })}
      <Link key={0} to="/all" aria-label="All quotes"></Link>
      {Quotes?.map(({ id }) => {
        return <Link key={id} to={`/${id}`} aria-label={`Quote #${id}`}></Link>;
      })}
    </div>
  );
}

export default Home;
