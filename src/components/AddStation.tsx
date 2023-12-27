import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Station } from "../types/types";

interface AddStationProps {
  onAddStation: (station: Station) => void;
  onCancel: () => void;
}

const AddStation: React.FC<AddStationProps> = ({ onAddStation, onCancel }) => {
  const initialStationData: Station = {
    libelle: '',
    location: '',
    is_active: false,
    Nmbr_cuves: 0,
    Nmbr_pompes: 0,
    Nmbr_pompistes: 0,
    responsables: [],
    totalStock: 0, 
    initialStationDatats: [],
  };

  const [stationData, setStationData] = useState<Station>(initialStationData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

   
    if (type === 'checkbox') {
      setStationData({
        ...stationData,
        [name]: checked,
      });
    } else {
      setStationData({
        ...stationData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
     
      const response = await axios.post('http://127.0.0.1:8000/api/stations/create_station/', stationData);
      
      if (response.status === 201) {
        onAddStation(response.data);
        setStationData(initialStationData);
      }
    } catch (error) {
      console.error('Error creating station:', error);
    }
  };

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
          <Button type="submit" variant="primary">Ajouter</Button>
          <Button variant="secondary" onClick={onCancel}>Annuler</Button>
        </Col>
      </Row>
    </Form>
  );
};

export default AddStation;
