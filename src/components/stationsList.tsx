import React from 'react';
import axios from 'axios';
import { Table, Modal , Button } from 'react-bootstrap';
import {Station} from "../types/types";
import styles from '../styles/Home.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';


interface StationsListProps {
  stations: Station[];
  onEdit: (stationId: number, onlyUpdateActive?: boolean) => void;
  onUpdateStationsList: (stationId: number, isActive: boolean) => void; 
}

const StationsList: React.FC<StationsListProps> = ({ stations, onEdit, onUpdateStationsList }) => {
  const [showConfirmation, setShowConfirmation] = React.useState(false);
  const [selectedStation, setSelectedStation] = React.useState<Station | null>(null);
  const [showAddStation, setShowAddStation] = React.useState(false);

  const toggleActiveStatus = async (station: Station) => {
 
    setSelectedStation(station);
    setShowConfirmation(true);
  };

  const handleToggleActive = (stationId: number) => {
    onEdit(stationId, true);  
  };

  const handleConfirmation = async () => {
    if (!selectedStation || selectedStation.id === undefined) {
        return;
    }

    try {
        const updatedStation = { ...selectedStation, is_active: !selectedStation.is_active };
        const response = await axios.put(`http://127.0.0.1:8000/api/stations/${selectedStation.id}/`, updatedStation);

        if (response.status === 200 || response.status === 204) {
            onUpdateStationsList(selectedStation.id, updatedStation.is_active);
        }
    } catch (error) {
        console.error('Error updating station 222 (stationList):', error);
    }
    setShowConfirmation(false);
    setSelectedStation(null);
};


  return (
    <>
    <button type="button" onClick={() => setShowAddStation(true)}>
        Ajouter
    </button>
    <Table striped  hover  className={styles.borderedTable}>
      <thead>
        <tr>
          <th>Libellé</th>
          <th>Localisation</th>
          <th>Nombres de Responsables</th>
          <th>Active</th>
          <th>Nombres de Cuves</th>
          <th>Nombres de Pompes</th>
          <th>Nombres de Pompistes</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {stations.map(station => (
          <tr key={station.libelle}>
            <td>{station.libelle} </td>
            <td>
            <a 
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(station.libelle + ' ' + station.location)}`}
              target="_blank" 
              rel="noopener noreferrer"
              style={{ textDecoration: 'none' ,  }} 
              
            >
              <FontAwesomeIcon icon={faMapMarkerAlt} /> {station.location}
            </a>

              
              </td>
            <td>{station.responsables.length}</td>
            <td>{station.is_active ? 'Eheh' : 'bde'}</td>
            <td>{station.Nmbr_cuves}</td>
            <td>{station.Nmbr_pompes}</td>
            <td>{station.Nmbr_pompistes}</td>

            <td className="d-flex justify-content-center">
            
            <button 
              className="btn btn-primary btn-sm mx-1"
              type="button"
              aria-label="Modifier"
              style={{ fontSize: '12px', padding: '2px 5px', color: '#fff'}}
              onClick={() => {
                if (typeof station.id === 'number') {
                  onEdit(station.id);
                }
              }}
            >
              <FontAwesomeIcon icon={faEdit} />
            </button>

            <button 
                className="btn btn-secondary btn-sm ml-1" 
                type="button" 
                aria-label="Activer/Désactiver"
                style={{ fontSize: '12px', padding: '2px 5px' }}
                onClick={() => {
                    if (station.id !== undefined) {
                        toggleActiveStatus(station);
                    }
                }}
            >
                <FontAwesomeIcon icon={faPowerOff} />
            </button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>

      <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)}>
          <Modal.Header closeButton>
              <Modal.Title>Confirmer l'action</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              {`Voulez-vous ${selectedStation?.is_active ? 'désactiver' : 'activer'} cette station (${selectedStation?.libelle}, ${selectedStation?.location}) ?`}
          </Modal.Body>
          <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowConfirmation(false)}>
                  Annuler
              </Button>
              <Button variant="primary" onClick={handleConfirmation}>
                  Confirmer
              </Button>
          </Modal.Footer>
      </Modal>

</>
  );
};

export default StationsList;
