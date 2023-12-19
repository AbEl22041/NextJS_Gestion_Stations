import React from 'react';
import { Table } from 'react-bootstrap';

interface Cuve {
  id: number;
  Nb_pmp_alimente: number;
  charge: string;
  stocke: string;
  Qt_min: string;
  is_active: boolean;
  id_station: number;
}

interface CuvesListProps {
  cuves: Cuve[];
}

const CuvesList: React.FC<CuvesListProps> = ({ cuves }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Numéro</th>
          <th>Nb Pmp Alimenté</th>
          <th>Charge</th>
          <th>Stocke</th>
          <th>Quqntité Min</th>
          <th>Active</th>
          <th>Station</th>
        </tr>
      </thead>
      <tbody>
        {cuves.map(cuve => (
          <tr key={cuve.id}>
            <td>{cuve.id}</td>
            <td>{cuve.Nb_pmp_alimente}</td>
            <td>{cuve.charge}</td>
            <td>{cuve.stocke}</td>
            <td>{cuve.Qt_min}</td>
            <td>{cuve.is_active ? 'Eheh' : 'bde'}</td>
            <td>{cuve.id_station}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CuvesList;
