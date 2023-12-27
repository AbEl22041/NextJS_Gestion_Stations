import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Station, Cuve } from '../../../types/types'
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
  Badge, Dropdown, Nav, NavLink, ProgressBar,
} from 'react-bootstrap'
import Link from 'next/link'
import React, { useState, useEffect, PropsWithChildren } from 'react'
import Image from 'next/image'
import { fetchStations, fetchCuves } from '../../../services/api';
import styles from './styles.module.css';
import cuveImage from './cuve.png';

type ItemWithIconProps = {
  icon: IconDefinition;
} & PropsWithChildren;

const ItemWithIcon = (props: ItemWithIconProps) => {
  const { icon, children } = props;

  return (
    <>
      <FontAwesomeIcon className="me-2" icon={icon} fixedWidth />
      {children}
    </>
  );
};

function requestFullScreen() {
  const element = document.documentElement;

  if (element.requestFullscreen) {
    element.requestFullscreen();
  }
}

export default function HeaderNotificationNav() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [stations, setStations] = useState<Station[]>([]);
  const [cuves, setCuves] = useState<Cuve[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const stationsData = await fetchStations();
      const cuvesData: Cuve[] = await fetchCuves();

      const stationsWithTotal = stationsData.map((station: Station) => {
        const totalStock = cuvesData
          .filter(cuve => cuve.id_station === station.id)
          .reduce((acc, cuve) => acc + parseFloat(cuve.stocke || '0'), 0);

        return { ...station, totalStock };
      });

      setStations(stationsWithTotal);
      setCuves(cuvesData);
    };

    fetchData();

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
              <ItemWithIcon icon={faExpand}>Plein écran</ItemWithIcon>
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
                <ItemWithIcon icon={faUserPlus}>Nouvelle demande d'activation</ItemWithIcon>
              </Dropdown.Item>
            </Link>
            <Link href="#" passHref legacyBehavior>
              <Dropdown.Item>
                <ItemWithIcon icon={faUserMinus}>Utilisateurs désactivés</ItemWithIcon>
              </Dropdown.Item>
            </Link>
            <Link href="#" passHref legacyBehavior>
              <Dropdown.Item>
                <ItemWithIcon icon={faChartBar}>Liste des utilisateurs</ItemWithIcon>
              </Dropdown.Item>
            </Link>

            <Dropdown.Header className="bg-light fw-bold">Stock et ventes</Dropdown.Header>

            {stations.map((station) => (
              <Link key={station.id} href="#" passHref legacyBehavior>
                <Dropdown.Item>
                  <small>
                    <div className="text-uppercase"><b>{`Station ${station.libelle}`}</b></div>
                  </small>
                  <ProgressBar
                    className="progress-thin mt-2"
                    variant="primary"
                    now={station.totalStock}
                  />
                  <small>
                    <div className="text-muted">{`${station.totalStock} litres.`}</div>
                  </small>
                </Dropdown.Item>
              </Link>
            ))}

            <Link href="#" passHref legacyBehavior>
              <Dropdown.Item>
                <small>
                  <div className="text-uppercase"><b>Ventes Quotidiennes</b></div>
                </small>
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
      <Badge pill bg="danger" className="position-absolute top-0 right-0">
        !
      </Badge>
    </Dropdown.Toggle>
    <Dropdown.Menu className="pt-0" align="end">
      <Dropdown.Header className="bg-light fw-bold rounded-top">Niveau de Cuves</Dropdown.Header>
      {cuves.map((cuve) => {
        const stockValue = parseFloat(cuve.stocke || '0');
        let variant = 'primary';

        if (stockValue < 1500) {
          variant = 'danger';
        } else if (stockValue >= 1500 && stockValue <= 9000) {
          variant = 'warning';
        } else {
          variant = 'success';
        }

        const associatedStation = stations.find((station) => station.id === cuve.id_station);

        return (
          <Dropdown.Item key={cuve.id}>
            <small className="d-flex">
              <div>{`Cuve ${cuve.id} (${associatedStation?.libelle})  `}</div>
              <div className="ms-auto">{`${cuve.stocke} L`}</div>
            </small>
            <ProgressBar
              className="progress-thin mt-2"
              variant={variant}
              now={stockValue}
              max={12000}
            />
          </Dropdown.Item>
        );
      })}
      <Dropdown.Divider />
      <Link href="#" passHref legacyBehavior>
        <Dropdown.Item className="text-center fw-bold">Voir les détails</Dropdown.Item>
      </Link>
    </Dropdown.Menu>
  </Dropdown>
</Nav.Item>




    </Nav>
  );
}
