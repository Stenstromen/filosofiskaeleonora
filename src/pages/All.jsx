import Stack from "react-bootstrap/Stack";
import Table from "react-bootstrap/Table";
import Quotes from "../assets/Quotes";

function All(isMobile) {
  return (
    <div>
      <Stack
        style={{
          paddingTop: isMobile.isMobile ? "10%" : "10%",
          width: isMobile.isMobile ? "390px" : "50vw",
        }}
        className="col-md-5 mx-auto"
        direction="horizontal"
        gap={3}
      >
        <Table striped bordered hover style={{ backgroundColor: "white" }}>
          <thead>
            <tr>
              <th>#</th>
              <th>Quote</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {Quotes.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.quote}</td>
                  <td>{item.date}</td>
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
