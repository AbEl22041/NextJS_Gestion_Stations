import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Col, Row } from 'react-bootstrap';
import {Station} from "../types/types";



interface EditStationProps {
  stationId: number;
  onClose: () => void;
  setShowStations: (show: boolean) => void;
  updateStationsList: (updatedStation: Station) => void; 
}

const EditStation: React.FC<EditStationProps> = ({ stationId, onClose, setShowStations, updateStationsList }) => {  const [stationData, setStationData] = useState<Station>({
    libelle: '',
    location: '',
    responsables: [],
    is_active: false,
    Nmbr_cuves: 0,
    Nmbr_pompes: 0,
    Nmbr_pompistes: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Station>(`http://127.0.0.1:8000/api/stations/${stationId}/`);
        console.log("API Response:", response.data); 
        setStationData(response.data);
        
      } catch (error) {
        console.error('Erreur lors de la récupération des données de la station:', error);
        
      }
    };
    

    fetchData();
  }, [stationId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    setStationData({ 
      ...stationData, 
      [name]: type === 'checkbox' ? checked : value 
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stationData) return;
  
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/stations/${stationId}/`, stationData);
      if (response.status === 200 || response.status === 204) {
        updateStationsList(stationData);
        setShowStations(true);
        onClose(); 
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (!stationData) return <div>Chargement...</div>;

  return (
    <Form onSubmit={handleSubmit} className="m-4">
      <Form.Group as={Row} className="mb-3" controlId="formLibelle">
        <Form.Label column sm="2">Libellé</Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            name="libelle"
            value={stationData.libelle}
            onChange={handleChange}
            placeholder="Libellé de la station"
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formLocation">
        <Form.Label column sm="2">Localisation</Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            name="location"
            value={stationData.location}
            onChange={handleChange}
            placeholder="Localisation de la station"
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formIsActive">
        <Col sm={{ span: 10, offset: 2 }}>
          <Form.Check
            type="checkbox"
            name="is_active"
            label="Station Active"
            checked={stationData.is_active}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>

      
      <Form.Group as={Row} className="mb-3" controlId="formNmbrCuves">
        <Form.Label column sm="2">Nombre de Cuves</Form.Label>
        <Col sm="10">
          <Form.Control
            type="number"
            name="Nmbr_cuves"
            value={stationData.Nmbr_cuves}
            onChange={handleChange}
            placeholder="Nombre de Cuves"
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formNmbrPompes">
        <Form.Label column sm="2">Nombre de Pompes</Form.Label>
        <Col sm="10">
          <Form.Control
            type="number"
            name="Nmbr_pompes"
            value={stationData.Nmbr_pompes}
            onChange={handleChange}
            placeholder="Nombre de Pompes"
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formNmbrPompistes">
        <Form.Label column sm="2">Nombre de Pompistes</Form.Label>
        <Col sm="10">
          <Form.Control
            type="number"
            name="Nmbr_pompistes"
            value={stationData.Nmbr_pompistes}
            onChange={handleChange}
            placeholder="Nombre de Pompistes"
          />
        </Col>
      </Form.Group>

      <Row className="justify-content-end">
        <Col sm={{ span: 10, offset: 2 }}>
          <Button type="submit" variant="primary">Enregistrer les modifications</Button>
        </Col>
      </Row>
    
    </Form>

    
  );
};

export default EditStation;
