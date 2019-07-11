import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { MDBRow, MDBCol } from 'mdbreact'
import { MasterDetailLayout } from '../components/templates/Master-Detail-Layout'
import { PageTitle } from '../components/atomics/PageTitle'

export const AngebotPage = withRouter(AngebotPageComponent)

function AngebotPageComponent(props) {

    const angebotsnummer = props.match.params.angebotsnummer
    const [angebot, setAngebot] = useState({
        customer: {}
    });

    useEffect(() => {
        refetchOffers()
    }, [])

    async function refetchOffers() {
        const angebot = await getAngebot(angebotsnummer)
        const customer = await fetchCustomerById(angebot.customerId)
        angebot.customer = customer
        setAngebot(angebot)
    }

    return (
        <>
        <MasterDetailLayout
            renderTitle={() => <PageTitle titleText={`Angebot ${angebotsnummer}`} />}
            renderSubtitle={() => {return null}}
        >
            <MDBCol md="12">
                <div>
                    <label>Angebot Nr.: {angebot.id}</label>
                    <div>Kunde: {angebot.customer.name}</div>
                    <div>Projekt: {angebot.projectId}</div>
                </div>
            </MDBCol>
        </MasterDetailLayout>
        </>
    )
}

async function getAngebot(angebotsnummer) {
    const response = await fetch(`http://localhost:8080/offers/${angebotsnummer}`, {
        headers: {
            'x-my-super-token': 'abc',
        }
    })
    const angebot = await response.json()
    return angebot
}

async function fetchCustomerById(id) {
    const response = await fetch(`http://localhost:8080/customers/${id}`, {
        headers: {
            'x-my-super-token': 'abc',
        }
    })
    const customer = await response.json()
    return customer
}