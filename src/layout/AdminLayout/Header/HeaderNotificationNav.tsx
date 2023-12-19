import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './styles.module.css';
import cuveImage from './cuve.png'; 
import { faBell, faEnvelope, IconDefinition } from '@fortawesome/free-regular-svg-icons'
import {
  faBasketShopping,
  faChartBar,
  faGaugeHigh,
  faExpand,
  faList,
  faUserMinus,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons'
import {
  Badge, Dropdown, Nav, NavItem, NavLink, ProgressBar,
} from 'react-bootstrap'
import Link from 'next/link'
import React, {  useState , useEffect , PropsWithChildren } from 'react'
import Image from 'next/image'

type ItemWithIconProps = {
  icon: IconDefinition;
} & PropsWithChildren


const ItemWithIcon = (props: ItemWithIconProps) => {
  const { icon, children } = props

  return (
    <>
      <FontAwesomeIcon className="me-2" icon={icon} fixedWidth />
      {children}
    </>
  )
};



function requestFullScreen() {
  const element = document.documentElement;

  if (element.requestFullscreen) {
    element.requestFullscreen();
  }
}


export default function HeaderNotificationNav() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsDropdownOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscapeKey);

    return () => {
      window.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <Nav>
   <Nav.Item>
        <Dropdown>
          <Dropdown.Toggle as={NavLink} bsPrefix="hide-caret" id="dropdown-fullscreen">
            <FontAwesomeIcon icon={faExpand} size="lg" />
          </Dropdown.Toggle>
          <Dropdown.Menu className="pt-0" align="end">
            <Dropdown.Item onClick={requestFullScreen}>
              <ItemWithIcon icon={faExpand}>
              Plein écran
              </ItemWithIcon>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Nav.Item>






      <Nav.Item>
        <Dropdown>
          <Dropdown.Toggle as={NavLink} bsPrefix="hide-caret" id="dropdown-notification">
            <FontAwesomeIcon icon={faBell} size="lg" />
            <Badge pill bg="warning" className="position-absolute top-0 right-0">
              5
            </Badge>
          </Dropdown.Toggle>
          <Dropdown.Menu className="pt-0" align="end">
            <Dropdown.Header className="bg-light fw-bold rounded-top">Vous avez 5 notifications</Dropdown.Header>
            <Link href="#" passHref legacyBehavior>
              <Dropdown.Item>
                <ItemWithIcon icon={faUserPlus}>
                Nouvel demande d'activation
                </ItemWithIcon>
              </Dropdown.Item>
            </Link>
            <Link href="#" passHref legacyBehavior>
              <Dropdown.Item>
                <ItemWithIcon icon={faUserMinus}>
                  Utilisateurs desactivés
                </ItemWithIcon>
              </Dropdown.Item>
            </Link>
            <Link href="#" passHref legacyBehavior>
              <Dropdown.Item>
                <ItemWithIcon icon={faChartBar}>
                  Liste des utilisateurs
                </ItemWithIcon>
              </Dropdown.Item>
            </Link>
           

            <Dropdown.Header className="bg-light fw-bold">Stock et ventes</Dropdown.Header>

            <Link href="#" passHref legacyBehavior>
              <Dropdown.Item>
                <small><div className="text-uppercase"><b>Niveau de carburant</b></div></small>
                <ProgressBar
                  className="progress-thin mt-2"
                  variant="primary"
                  now={25}
                />
                <small>
                  <div className="text-muted">12000 litres.</div>
                </small>
              </Dropdown.Item>
            </Link>
            <Link href="#" passHref legacyBehavior>
              <Dropdown.Item>
                <small><div className="text-uppercase"><b>Ventes Quotidiennes</b></div></small>
                <ProgressBar
                  className="progress-thin mt-2"
                  variant="warning"
                  now={75}
                />
                <small>
                  <div className="text-muted">500 / 1000 L vendues</div>
                </small>
              </Dropdown.Item>
            </Link>
           
          </Dropdown.Menu>
        </Dropdown>
      </Nav.Item>

     
      <Nav.Item>
        <Dropdown>
          <Dropdown.Toggle as={NavLink} bsPrefix="hide-caret" id="dropdown-task">
          <img src={cuveImage.src} alt="Task" className={styles.imageIcon} />

          <Badge pill bg="danger" className="position-absolute top-0 right-0" >
            !
          </Badge>
          </Dropdown.Toggle>
          <Dropdown.Menu className="pt-0" align="end">
          
            <Dropdown.Header className="bg-light fw-bold rounded-top">Niveau de Cuves</Dropdown.Header>

            <Link href="#" passHref legacyBehavior>
              <Dropdown.Item>
                <small className="d-flex">
                  <div>Cuve 1</div>
                  <div className="ms-auto">500 L</div>
                </small>
                <ProgressBar
                  className="progress-thin mt-2"
                  variant="primary"
                  now={0}
                />
              </Dropdown.Item>
            </Link>
            <Link href="#" passHref legacyBehavior>
              <Dropdown.Item>
                <small className="d-flex">
                  <div>Cuve 2</div>
                  <div className="ms-auto">3000 L</div>
                </small>
                <ProgressBar
                  className="progress-thin mt-2"
                  variant="danger"
                  now={25}
                />
              </Dropdown.Item>
            </Link>
            <Link href="#" passHref legacyBehavior>
              <Dropdown.Item>
                <small className="d-flex">
                  <div>Cuve 3</div>
                  <div className="ms-auto">6000 L</div>
                </small>
                <ProgressBar
                  className="progress-thin mt-2"
                  variant="warning"
                  now={50}
                />
              </Dropdown.Item>
            </Link>
            <Link href="#" passHref legacyBehavior>
              <Dropdown.Item>
                <small className="d-flex">
                  <div>Cuve 4</div>
                  <div className="ms-auto">8000 L</div>
                </small>
                <ProgressBar
                  className="progress-thin mt-2"
                  variant="primary"
                  now={75}
                />
              </Dropdown.Item>
            </Link>
            <Link href="#" passHref legacyBehavior>
              <Dropdown.Item>
                <small className="d-flex">
                  <div>Cuve 5</div>
                  <div className="ms-auto">11500 L</div>
                </small>
                <ProgressBar
                  className="progress-thin mt-2"
                  variant="success"
                  now={100}
                />
              </Dropdown.Item>
            </Link>

            <Dropdown.Divider />

            <Link href="#" passHref legacyBehavior>
              <Dropdown.Item className="text-center fw-bold">Voir les details</Dropdown.Item>
            </Link>

          </Dropdown.Menu>
        </Dropdown>
      </Nav.Item>
      <Nav.Item>
      
      </Nav.Item>
    </Nav>
  )
}
