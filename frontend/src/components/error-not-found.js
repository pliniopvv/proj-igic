
import { Container } from "react-bootstrap";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <Container>
      <div id="error-page" className="mt-4">
        <h1>Oops! 404</h1>
        <p>Desculpe, Página não encontrada!</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    </Container>
    );
}