import { Button, Col, Row } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';

function PersonAccordion({person, accordeonId}) {

  function fdate(sdt) {
    let dt = new Date(sdt);
    return dt.getDay() + "/" + (dt.getMonth()) + "/" + dt.getFullYear();
  }

  console.log(accordeonId);

  return (
      <Accordion.Item eventKey={accordeonId}>
        <Accordion.Header>#{person.id} - {person.primeiroNome}</Accordion.Header>
        <Accordion.Body>
          <Row>
            <Col>
              ID:
            </Col>
            <Col md={10}>
              {person.id}
            </Col>
            </Row>
            <Row>
            <Col>
              Primeiro Nome:
            </Col>
            <Col>
              {person.primeiroNome}
            </Col>
            <Col>
              Segundo nome:
            </Col>
            <Col>
              {person.primeiroNome}
            </Col>
          </Row>
          <Row>
            <Col>
              Data de nascimento:
            </Col>
            <Col>
              {fdate(person.nascimento)}
            </Col>
          </Row>
          <Row>
            <Col>
              Gênero:
            </Col>
            <Col>
              {person.sexoHomem ? "Homem" : "Mulher"}
            </Col>
          </Row>
          <Row>
            <Col>
              Tipo Cargo:
            </Col>
            <Col>
              {person.tipoCargo}
            </Col>
          </Row>
          <Row>
            <Col>
              Cargo:
            </Col>
            <Col>
              {person.cargo}
            </Col>
          </Row>
          <Row>
            <Col>
              Signo:
            </Col>
            <Col>
              {person.signo}
            </Col>
          </Row>
          <Row>
            <Col>
            <div className="d-grid gap-2 mt-2">
              <Button variant="info" size="xs" href={`/editar/${person.id}`} >
                Editar
              </Button>
            </div>
            </Col>
          </Row>
        </Accordion.Body>
      </Accordion.Item>
  );
}

export default PersonAccordion;