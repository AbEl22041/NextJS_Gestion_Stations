import React from 'react'
import { Container } from 'react-bootstrap'


export default function Footer() {
  return (
    <footer className="footer border-top px-sm-2 py-2">
      <Container fluid className="align-items-center flex-column flex-md-row d-flex justify-content-between">
        <div>
          
          <a className="text-decoration-none" href="http://www.supnum.mr/">
          SupNum
          </a>
          {' '}
          © 2023-2024
          tous droits réservés.
        </div>
        <div className="ms-md-auto">
        Fièrement développé par&nbsp;
          <a
            className="text-decoration-none"
            href="../developers"
          >
            ACK
          </a>
        </div>
      </Container>
    </footer>
  )
}
