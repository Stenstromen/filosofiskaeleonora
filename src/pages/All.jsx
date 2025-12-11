import { Stack, Table } from "react-bootstrap";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import Quotes from "../assets/Quotes";

function All() {
  useDocumentTitle("Quotes | Filosofiskaeleonora.se");
  
  return (
    <div>
      <Stack className="all col-md-5 mx-auto" direction="horizontal" gap={3}>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>Quote</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {Quotes.map(({ id, quote, date }) => {
              return (
                <tr key={id}>
                  <td>{id}</td>
                  <td>{quote}</td>
                  <td>{date}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Stack>
    </div>
  );
}

export default All;
