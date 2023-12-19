import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Station {
  libelle: string;
  location: string;
  responsables: Array<any>;
  is_active: boolean;
  Nmbr_cuves: number;
  Nmbr_pompes: number;
  Nmbr_pompistes: number;
}

interface EditStationProps {
  stationId: number;
  onClose: () => void;
}

const EditStation: React.FC<EditStationProps> = ({ stationId, onClose }) => {
  const [stationData, setStationData] = useState<Station>({
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
        const response = await axios.get<Station>(`http://127.0.0.1:8000/api/stations/${stationId}`);
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
    try {
      await axios.put(`http://127.0.0.1:8000/api/stations/${stationId}`, stationData);
      onClose();
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la station:', error);
    }
  };

  if (!stationData) return <div>Chargement...</div>;

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="libelle"
        value={stationData.libelle}
        onChange={handleChange}
        aria-label="Libellé"
        placeholder="Libellé"
      />
      <input
        type="text"
        name="location"
        value={stationData.location}
        onChange={handleChange}
        aria-label="Localisation"
        placeholder="Localisation"
      />
      <input
        type="checkbox"
        name="is_active"
        checked={stationData.is_active}
        onChange={handleChange}
        aria-label="Active"
      />
      <input
        type="number"
        name="Nmbr_cuves"
        value={stationData.Nmbr_cuves}
        onChange={handleChange}
        aria-label="Nombre de Cuves"
        placeholder="Nombre de Cuves"
      />
      <input
        type="number"
        name="Nmbr_pompes"
        value={stationData.Nmbr_pompes}
        onChange={handleChange}
        aria-label="Nombre de Pompes"
        placeholder="Nombre de Pompes"
      />
      <input
        type="number"
        name="Nmbr_pompistes"
        value={stationData.Nmbr_pompistes}
        onChange={handleChange}
        aria-label="Nombre de Pompistes"
        placeholder="Nombre de Pompistes"
      />
      <button type="submit">Enregistrer les modifications</button>
    </form>
  );
};

export default EditStation;
