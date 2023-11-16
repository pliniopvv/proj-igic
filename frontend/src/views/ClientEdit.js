import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { faker } from "@faker-js/faker";
import { useState } from "react";
import { Col, Row, Container, Form, InputGroup, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";

const API = `https://localhost:7009/api/Person`;

function ClientEdit() {
  let { personId } = useParams();
  const { register, handleSubmit, setValue } = useForm();

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
    let dia = n.getDay() + 1;
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
    let dia = n.getDay() + 1;
    let data =
      ano +
      "-" +
      (mes <= 9 ? "0" + mes : mes) +
      "-" +
      (dia <= 9 ? "0" + dia : dia);
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
    /**
     * O react-hook-form não possui o componente radio na documentação.
     * Resolvi salvando, apenas, a informação de que se é homem ou não.
     */
    if (person.sexoHomem == "on") {
      person.sexoMulher = undefined;
      person.sexoHomem = true;
    } else {
      person.sexoMulher = undefined;
      person.sexoHomem = false;
    }

    fetch(API+"/"+person.id, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    })
      .then((r) => {
        console.log("ok", r);
      })
      .catch((e) => {
        console.error("error", e);
      });

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
            <Form.Check // prettier-ignore
              type="radio"
              id={`sexo-homem`}
              name="sexo"
              label={`Homem`}
              {...register("sexoHomem")}
            />
          </Col>
          <Col>
            <Form.Check // prettier-ignore
              type="radio"
              id={`sexo-mulher`}
              name="sexo"
              label={`Mulher`}
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
            <Button type="submit">Criar</Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default ClientEdit;