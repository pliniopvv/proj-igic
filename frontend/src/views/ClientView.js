import { Accordion, Container } from "react-bootstrap";
import PersonAccordeon from "../components/PersonAccordion";
import { useEffect, useState } from "react";
import Constants from "../constants";

const API = `${Constants.BASE_API}/api/Person`;

function ClientView() {

    const [persons, setPersons] = useState([]);

    useEffect(() => {
        fetch(API,{
            method: "GET"
        })
        .then(res => res.json())
        .then(_persons => {
            setPersons(_persons);
        }).catch(e => {
            console.error("error", e);
        });
    }, [setPersons]);

    return (
        <Container className="mt-2">
            <Accordion defaultActiveKey="0">
                {[...persons].map((person, i) => <PersonAccordeon person={person} accordeonId={i} />)}
            </Accordion>
        </Container>
    )
}

export default ClientView;