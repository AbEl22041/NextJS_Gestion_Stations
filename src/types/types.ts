export interface Station {
    id?: number;
    libelle: string;
    location: string;
    responsables: Array<any>;
    is_active: boolean;
    Nmbr_cuves: number;
    Nmbr_pompes: number;
    Nmbr_pompistes: number;
}

export interface Cuve {
    id: number;
    Nb_pmp_alimente: number;
    charge: string;
    stocke: string;
    Qt_min: string;
    is_active: boolean;
    id_station: number;
  }
  

 