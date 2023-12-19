import Link from 'next/link'
import { Nav } from 'react-bootstrap'

export default function HeaderFeaturedNav() {
  return (
    <Nav>
      <Nav.Item>
        <Link href="/" passHref legacyBehavior>
          <Nav.Link className="p-2">Tableau de bord</Nav.Link>
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link href="#" passHref legacyBehavior>
          <Nav.Link className="p-2">Gestion des utilisateurs</Nav.Link>
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link href="#" passHref legacyBehavior>
          <Nav.Link className="p-2">paramètres</Nav.Link>
        </Link>
      </Nav.Item>
    </Nav>
  )
}
