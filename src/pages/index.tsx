import type { NextPage } from 'next';
import React, { useState ,useEffect } from 'react';
import { fetchStations } from  '../services/api';
import axios from 'axios';
import EditStation from '../components/editStation'; 
import StationsList from '../components/stationsList';
import {Station} from "../types/types";
import styles from '../styles/Home.module.css';
import bgPompiste from './worker_white.png'
import bgPump from './gas_pump.png';
import bgStation from './gas_station.png';
import bgCuve from './cuve.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
  faArrowUp,
  faDownload,
  faEllipsisVertical,
  faLocationDot,
  faInfoCircle,
  faGasPump,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons'

import {
  Button, ButtonGroup, Card, Dropdown, ProgressBar,
} from 'react-bootstrap'

import { Bar, Line } from 'react-chartjs-2'

import {
  BarElement,
  CategoryScale,
  Chart,
  Filler,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from 'chart.js'

import { AdminLayout } from '@layout'

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Filler)

const random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min)



const Home: NextPage = () => {
  const [stations, setStations] = useState<Station[]>([]); 
  const [showStations, setShowStations] = useState(false);
  const [editingStationId, setEditingStationId] = useState<number | null>(null);

  const handleViewDetails = async () => {
    const stationsData = await fetchStations();
    setStations(stationsData);
    setShowStations(true);
  };
  const handleEditStation = (stationId: number) => {
  
    setEditingStationId(stationId);
    setShowStations(false)
   
  };

 
  const handleCloseEdit = () => {
    setEditingStationId(null);
  
  };

  useEffect(() => {
    if (!showStations) {
      fetchStations().then(data => setStations(data));
    }
  }, [showStations]);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      window.location.href = '/login';
    }
  }, []);

  const updateStationsList = (updatedStationData: Station) => {
    const updatedStations = stations.map((station) => {
      if (station.id === updatedStationData.id) {
        return updatedStationData;
      }
      return station;
    });
    setStations(updatedStations);
  };

  const onUpdateStationsList = async (stationId: number, isActive: boolean) => {
    try {
      await axios.put(`http://127.0.0.1:8000/api/stations/${stationId}/`, { is_active: !isActive });
      const updatedStations = stations.map(station => 
        station.id === stationId ? { ...station, is_active: !isActive } : station
      );
      setStations(updatedStations);
    } catch (error) {
      console.error('Error updating station:', error);
    }
  };
  


  return (
  
  <AdminLayout>
    <div className="row" >
      <div className="col-sm-6 col-lg-3">
        <Card bg="primary" text="white" className="mb-4" >
          <Card.Body className="pb-0 d-flex justify-content-between align-items-start" >
            <div>
              <div className="fs-4 fw-semibold " >
                34
                <span className="fs-6 ms-2 fw-normal">
                  (30 pompistes
                    <FontAwesomeIcon  style = {{margin:'0 4px'}}icon={faGasPump} />
                  )
                </span>
              </div>
              <div>Utilisateurs</div>
            </div>
            <Dropdown align="end">
              <Dropdown.Toggle
                as="button"
                bsPrefix="btn"
                className="btn-link rounded-0 text-white shadow-none p-0"
                id="dropdown-chart1"
              >
                <FontAwesomeIcon fixedWidth icon={faEllipsisVertical} />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Card.Body>
          <div className="mt-3 mx-3" style={{ 
          height: '70px',
          position: 'relative', 
        }}>
          <img
            src={bgPompiste.src}
            alt="Background Image"
            style={{
              position: 'absolute',
              bottom: 0, 
              right: -10, 
              maxWidth: '45%', 
              height: 'auto', 
            }}
          />
           <button className={styles.DetailsButton}
        style={{
          cursor: 'pointer',
          backgroundColor: 'transparent',
          border: '1px solid #fff', 
          position: 'absolute',
          bottom: 50, 
          right: 120,
          left : 1.2, 
          padding: '3px 6px',
          color : 'white',
          fontSize:'12px',
          borderRadius : '5px',
         
        }}
      >
        <FontAwesomeIcon icon={faInfoCircle} /> Voir Détails
      </button>
  
          
          </div>
        </Card>
      </div>

      <div className="col-sm-6 col-lg-3">
        <Card bg="info" text="white" className="mb-4">
          <Card.Body className="pb-0 d-flex justify-content-between align-items-start">
            <div>
              <div className="fs-4 fw-semibold">
                6.200 MRU
                <span className="fs-6 ms-2 fw-normal">
                  (40.9%
                  <FontAwesomeIcon icon={faArrowUp} fixedWidth />
                  )
                </span>
              </div>
              <div>Ventes et Revenus</div>
            </div>
            <Dropdown align="end">
              <Dropdown.Toggle
                as="button"
                bsPrefix="btn"
                className="btn-link rounded-0 text-white shadow-none p-0"
                id="dropdown-chart2"
              >
                <FontAwesomeIcon fixedWidth icon={faEllipsisVertical} />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Card.Body>
          <div className="mt-3 mx-3" style={{ 
          height: '70px',
          position: 'relative', 
        }}>
          <img
            src={bgPump.src}
            alt="Background Image"
            style={{
              position: 'absolute',
              bottom: -31, 
              right: -30, 
              maxWidth: '74%', 
              height: 'auto', 
            }}
          />
           <button className={styles.DetailsButton}
        style={{
          cursor: 'pointer',
          backgroundColor: 'transparent',
          border: '1px solid #fff', 
          position: 'absolute',
          bottom: 50, 
          right: 120,
          left : 1.2, 
          padding: '3px 6px',
          color : 'white',
          fontSize:'12px',
          borderRadius : '5px',
         
        }}
      >
        <FontAwesomeIcon icon={faInfoCircle} /> Voir Détails
      </button>
          
          </div>
        </Card>
      </div>

      <div className="col-sm-6 col-lg-3">
        <Card bg="warning" text="white" className="mb-4">
          <Card.Body className="pb-0 d-flex justify-content-between align-items-start">
            <div>
              <div className="fs-4 fw-semibold">
                5
                <span className="fs-6 ms-2 fw-normal">
                  (NKC , NDB
                    <FontAwesomeIcon style = {{ margin : '0 4px'}}icon={faLocationDot} />
                  )
                </span>
              </div>
              <div>Liste des stations</div>
            </div>
            <Dropdown align="end">
              <Dropdown.Toggle
                as="button"
                bsPrefix="btn"
                className="btn-link rounded-0 text-white shadow-none p-0"
                id="dropdown-chart3"
              >
                <FontAwesomeIcon fixedWidth icon={faEllipsisVertical} />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Card.Body>
          <div className="mt-3 mx-3" style={{ 
          height: '70px',
          position: 'relative',
         
        }}>
          <img
            src={bgStation.src}
            alt="station Image"
            style={{
              position: 'absolute',
              bottom: -50, 
              right: -45, 
              maxWidth: '85%', 
              height: 'auto', 
            }}
            
          />
          <button className={styles.DetailsButton} onClick={handleViewDetails}
        style={{
          cursor: 'pointer',
          backgroundColor: 'transparent',
          border: '1px solid #fff', 
          position: 'absolute',
          bottom: 50, 
          right: 120,
          left : 1.2, 
          padding: '3px 6px',
          color : 'white',
          fontSize:'12px',
          borderRadius : '5px',
         
        }}
      >
        <FontAwesomeIcon icon={faInfoCircle} /> Voir Détails
      </button>
            
          </div>
        </Card>
      </div>

      <div className="col-sm-6 col-lg-3">
        <Card bg="danger" text="white" className="mb-4">
          <Card.Body className="pb-0 d-flex justify-content-between align-items-start">
            <div>
              <div className="fs-4 fw-semibold">
                5400 L
                <span className="fs-6 ms-2 fw-normal">
                  (Stock critique
                  
                  <FontAwesomeIcon style = {{margin : '0 2.5px'}}icon={faTriangleExclamation} />
                  )
                </span>
              </div>
              <div>Stock de cuves</div>
            </div>
            <Dropdown align="end">
              <Dropdown.Toggle
                as="button"
                bsPrefix="btn"
                className="btn-link rounded-0 text-white shadow-none p-0"
                id="dropdown-chart4"
              >
                <FontAwesomeIcon fixedWidth icon={faEllipsisVertical} />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Card.Body>
          <div className="mt-3 mx-3" style={{ 
          height: '70px',
          position: 'relative', 
        }}>
          <img
            src={bgCuve.src}
            alt="Cuve Image"
            style={{
              position: 'absolute',
              bottom: -19, 
              right: -44, 
              maxWidth: '57%', 
              height: 'auto', 
            }}
          />
           <button className={styles.DetailsButton}
        style={{
          cursor: 'pointer',
          backgroundColor: 'transparent',
          border: '1px solid #fff', 
          position: 'absolute',
          bottom: 50, 
          right: 120,
          left : 1.2, 
          padding: '3px 6px',
          color : 'white',
          fontSize:'12px',
          borderRadius : '5px',
         
        }}
      >
        <FontAwesomeIcon icon={faInfoCircle} /> Voir Détails
      </button>
          
          </div>
        </Card>
      </div>
    </div>

    <Card className="mb-4">
    <Card.Body>
    {showStations && (
    <StationsList stations={stations} onEdit={handleEditStation}
    onUpdateStationsList={onUpdateStationsList}
    
    />
  )}
  {editingStationId != null && (
    <EditStation
      stationId={editingStationId}
      onClose={handleCloseEdit}
      setShowStations={setShowStations}
      updateStationsList={updateStationsList}
    />
  )}
  {!showStations && editingStationId == null && (
    <>
      <div className="d-flex justify-content-between">
        <div>
          <h4 className="mb-0">Ventes et Revenus</h4>
          <div className="small text-black-50">Janvier - Juillet 2023</div>
        </div>
        <div className="d-none d-md-block">
          <ButtonGroup aria-label="Toolbar with buttons" className="mx-3">
            <input
              className="btn-check"
              id="option1"
              type="radio"
              name="options"
              autoComplete="off"
            />
            <label className="btn btn-outline-secondary" htmlFor="option1">Jour</label>
            <input
              className="btn-check"
              id="option2"
              type="radio"
              name="options"
              autoComplete="off"
              defaultChecked
            />
            <label
              className="btn btn-outline-secondary active"
              htmlFor="option2"
            >
              Mois
            </label>
            <input
              className="btn-check"
              id="option3"
              type="radio"
              name="options"
              autoComplete="off"
            />
            <label className="btn btn-outline-secondary" htmlFor="option3">Année</label>
          </ButtonGroup>
          <Button variant="primary">
            <FontAwesomeIcon icon={faDownload} fixedWidth />
          </Button>
        </div>
      </div>
      <div
        style={{
          height: '300px',
          marginTop: '40px',
        }}
      >
        <Line
          data={{
            labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet'],
            datasets: [{
              label: 'Mon premier jeu de données',
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              borderColor: 'rgba(13, 202, 240, 1)',
              pointHoverBackgroundColor: '#fff',
              borderWidth: 2,
              data: [
                random(50, 200),
                random(50, 200),
                random(50, 200),
                random(50, 200),
                random(50, 200),
                random(50, 200),
                random(50, 200),
              ],
              fill: true,
            }, {
              label: 'Mon deuxieme jeu de données',
              borderColor: 'rgba(25, 135, 84, 1)',
              pointHoverBackgroundColor: '#fff',
              borderWidth: 2,
              data: [
                random(50, 200),
                random(50, 200),
                random(50, 200),
                random(50, 200),
                random(50, 200),
                random(50, 200),
                random(50, 200),
              ],
            }, {
              label: 'Mon 3eme jeu de données',
              borderColor: 'rgba(220, 53, 69, 1)',
              pointHoverBackgroundColor: '#fff',
              borderWidth: 1,
              borderDash: [8, 5],
              data: [65, 65, 65, 65, 65, 65, 65],
            }],
          }}
          options={{
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
              },
            },
            scales: {
              x: {
                grid: {
                  drawOnChartArea: false,
                },
              },
              y: {
                beginAtZero: true,
                max: 250,
                ticks: {
                  maxTicksLimit: 5,
                  stepSize: Math.ceil(250 / 5),
                },
              },
            },
            elements: {
              line: {
                tension: 0.4,
              },
              point: {
                radius: 0,
                hitRadius: 10,
                hoverRadius: 4,
                hoverBorderWidth: 3,
              },
            },
          }}
        />
      </div>
    </>
  )}
</Card.Body>

      <Card.Footer>
        <div className="row row-cols-1 row-cols-md-5 text-center">
          <div className="col mb-sm-2 mb-0">
            <div className="text-black-50">Chiffre d'Affaires et Revenus</div>
            <div className="fw-semibold">6.200 MRU (40.9%)</div>
            <ProgressBar
              className="progress-thin mt-2"
              variant="success"
              now={40}
            />
          </div>
          <div className="col mb-sm-2 mb-0">
            <div className="text-black-50">Liste de stations</div>
            <div className="fw-semibold">22 (20%)</div>
            <ProgressBar
              className="progress-thin mt-2"
              variant="info"
              now={20}
            />
          </div>
          <div className="col mb-sm-2 mb-0">
            <div className="text-black-50">stock de cuves </div>
            <div className="fw-semibold">78.706 L (60%)</div>
            <ProgressBar
              className="progress-thin mt-2"
              variant="warning"
              now={60}
            />
          </div>
          <div className="col mb-sm-2 mb-0">
            <div className="text-black-50">Utilisateurs (pompistes et responsables)</div>
            <div className="fw-semibold">22.123 Users (80%)</div>
            <ProgressBar
              className="progress-thin mt-2"
              variant="danger"
              now={80}
            />
          </div>
          <div className="col mb-sm-2 mb-0">
            <div className="text-black-50">Taux de Rebond</div>
            <div className="fw-semibold">40.15%</div>
            <ProgressBar
              className="progress-thin mt-2"
              variant="primary"
              now={40}
            />
          </div>
        </div>
      </Card.Footer>
    </Card>


    <div className="row">
      <div className="col-sm-6 col-lg-4">
      
      </div>
      <div className="col-sm-6 col-lg-4">
       
      </div>

      <div className="col-sm-6 col-lg-4">
      
      </div>

    </div>

    <div className="row">
      <div className="col-md-12">
       
      </div>
    </div>
  </AdminLayout>
  )
          }

export default Home
