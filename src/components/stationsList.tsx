import React from 'react';
import { Table } from 'react-bootstrap';
import styles from '../styles/Home.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';


interface Station {
  id : number;
  libelle: string;
  location: string;
  responsables: Array<any>;
  is_active: boolean;
  Nmbr_cuves: number;
  Nmbr_pompes: number;
  Nmbr_pompistes: number;
}

interface StationsListProps {
  stations: Station[];
  onEdit: (stationId: number) => void; 
}

const StationsList: React.FC<StationsListProps> = ({ stations , onEdit }) => {
  return (
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
                style={{ fontSize: '12px', padding: '2px 5px'  ,color : '#fff'}}
              >
                <FontAwesomeIcon icon={faEdit}  />
              </button>
              <button 
                className="btn btn-secondary btn-sm ml-1" 
                type="button" 
                aria-label="Activer/Désactiver"
                style={{ fontSize: '12px', padding: '2px 5px' }}
                disabled={station.is_active}
                onClick={() => onEdit(station.id)} 
              >
                <FontAwesomeIcon icon={faPowerOff} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default StationsList;
