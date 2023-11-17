import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { faker } from "@faker-js/faker";
import { Col, Row, Container, Form, InputGroup, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Constants from "../constants";
import AlertToast from "../components/alert-toast";
import ReactDOM from "react-dom/client";

const API = `${Constants.BASE_API}/api/Person`;

function ClientEdit() {
  let { personId } = useParams();
  const { register, handleSubmit, setValue, getValues } = useForm();

  useEffect(() => {
    fetch(API + `/` + personId, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((_person) => {
        fillForm(_person);
      })
      .catch((e) => {
        console.error("error", e);
      });
  }, []);

  function doFaker() {
    let primeiroNome = faker.person.firstName();
    setValue("primeiroNome", primeiroNome);

    let sobrenome = faker.person.lastName();
    setValue("sobrenome", sobrenome);

    let n = faker.date.birthdate();
    let ano = n.getFullYear();
    let mes = n.getMonth() + 1;
    let dia = n.getDate();
    let data =
      ano +
      "-" +
      (mes <= 9 ? "0" + mes : mes) +
      "-" +
      (dia <= 9 ? "0" + dia : dia);
    setValue("nascimento", data);

    let sexoHomem = faker.number.int(1);

    setValue("sexoHomem", sexoHomem == 1 ? "on" : null);

    if (sexoHomem == 1) {
      setValue("sexoMulher", null);
    } else if (sexoHomem == 0) {
      setValue("sexoMulher", "on");
    }

    setValue("cargo", faker.person.jobTitle());
    setValue("tipoCargo", faker.person.jobType());
    setValue("signo", faker.person.zodiacSign());
  }

  function fillForm(person) {
    setValue("id", person.id);

    let primeiroNome = person.primeiroNome;
    setValue("primeiroNome", primeiroNome);

    let sobrenome = person.sobrenome;
    setValue("sobrenome", sobrenome);

    let n = new Date(person.nascimento);
    let ano = n.getFullYear();
    let mes = n.getMonth() + 1;
    let dia = n.getDate()+1;
    let data =
      ano +
      "-" +
      (mes <= 9 ? "0" + mes : mes) +
      "-" +
      ((dia) <= 9 ? "0" + dia : dia);

    setValue("nascimento", data);

    let sexoHomem = person.sexoHomem ? 1 : 0;

    setValue("sexoHomem", sexoHomem == 1 ? "on" : null);

    if (sexoHomem == 1) {
      setValue("sexoMulher", null);
    } else if (sexoHomem == 0) {
      setValue("sexoMulher", "on");
    }

    setValue("cargo", person.cargo);
    setValue("tipoCargo", person.tipoCargo);
    setValue("signo", person.signo);
  }

  function createPerson(person) {
    if (person.sexoHomem == "on") {
      person.sexoMulher = undefined;
      person.sexoHomem = true;
    } else {
      person.sexoMulher = undefined;
      person.sexoHomem = false;
    }
    fetch(API + "/" + person.id, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    })
      .then((r) => {
        const rootAlerts = ReactDOM.createRoot(
          document.getElementById("alerttoasts")
        );
        rootAlerts.render(
          <AlertToast
            personNome={person.primeiroNome}
            mensagem={`${person.primeiroNome} alterado com sucesso.`}
          />
        );
        setTimeout(() => rootAlerts.unmount(), 2000);
      })
      .catch((e) => {
        console.error("error", e);
      });
  }


  function setSexHomem(val) {
    let sh = document.querySelector("#sexo-homem");
    let sm = document.querySelector("#sexo-mulher");
    sh.checked = false;
    sm.checked = false;
    setValue('sexoHomem', val);
    sh.checked = val;
    sm.checked = !val;
  }

  function cmen() {
    setSexHomem(true);
  }

  function cwmen() {
    setSexHomem(false);
  }

  return (
    <Container>
      <div className="text-end mt-2">
        <Button variant="secondary" type="button" onClick={doFaker}>
          Faker.JS
        </Button>
      </div>
      <Form onSubmit={handleSubmit(createPerson)}>
        <Row>
          <Col>
            <h3>Identificação pessoal</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <InputGroup className="mb-3">
              <InputGroup.Text>Primeiro nome e sobrenome.</InputGroup.Text>
              <Form.Control
                placeholder="Primeiro nome"
                {...register("primeiroNome")}
                id="primeiroNome"
              />
              <Form.Control
                placeholder="Sobrenome"
                {...register("sobrenome")}
                id="sobrenome"
              />
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Label>Data de nascimento.</Form.Label>
            <Form.Control
              type="date"
              {...register("nascimento")}
              id="nascimento"
            />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <Form.Label>Gênero Sexual:</Form.Label>
          </Col>
          <Col>
            <Form.Check
              type="radio"
              id={`sexo-homem`}
              name="sexo"
              label={`Homem`}
              onClick={(cmen)}
              {...register("sexoHomem")}
            />
          </Col>
          <Col>
            <Form.Check
              type="radio"
              id={`sexo-mulher`}
              name="sexo"
              label={`Mulher`}
              onClick={(cwmen)}
              {...register("sexoMulher")}
            />
          </Col>
        </Row>
        <Row>
          <Col md className="mx-auto">
            <h3>Identificação profissional</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Label htmlFor="cargo">Cargo</Form.Label>
            <Form.Control
              placeholder="Assistente"
              id="cargo"
              {...register("cargo")}
            />
          </Col>
          <Col>
            <Form.Label htmlFor="tipo_cargo">Tipo do Cargo</Form.Label>
            <Form.Control
              placeholder="Assistente"
              id="tipo_cargo"
              {...register("tipoCargo")}
            />
          </Col>
        </Row>
        <Row>
          <Col md className="mx-auto">
            <h3>Religião</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Label htmlFor="signo">Signo</Form.Label>
            <Form.Control
              placeholder="Assistente"
              id="signo"
              {...register("signo")}
            />
          </Col>
        </Row>
        <Row>
          <Col className="text-end mt-3">
            <Button type="submit">Salvar</Button>
          </Col>
        </Row>
      </Form>
      <div id="alerttoasts"></div>
    </Container>
  );
}

export default ClientEdit;
