import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { MDBRow, MDBCol } from 'mdbreact'
import { MasterDetailLayout } from '../components/templates/Master-Detail-Layout'
import { PageTitle } from '../components/atomics/PageTitle'

export const AngebotPage = withRouter(AngebotPageComponent)

function AngebotPageComponent(props) {

    const Angebotsnummer = props.match.params.angebotsnummer
    const [Angebot, setAngebot] = useState(null);

    console.log(Angebotsnummer)

    useEffect(() => {
        setAngebot(getAngebot(Angebotsnummer))
    }, [])

    return (
        <>
        <MasterDetailLayout
            renderTitle={() => <PageTitle titleText={`Angebot ${Angebotsnummer}`} />}
            renderSubtitle={() => {return null}}
        >
            <MDBCol md="8"></MDBCol>
            <MDBCol md="4"></MDBCol>
        </MasterDetailLayout>
        </>
    )
}

async function getAngebot(angebotsnummer) {
    const reponse = await fetch(`https://portal.ridigruppe.de/ws/TestServer/rest/api/angebotsnr/${angebotsnummer}`, {
        headers: {
            'x-my-super-token': 'abc',
            'Content-Type' : 'application/json',
            'method' : 'GET'
        }
    })
    const angebot = await response.json()
    return angebot
}