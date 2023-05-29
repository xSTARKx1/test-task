export interface Doctor {
  value?: string;
  label?: string;
  id: string;
  name: string;
  surname: string;
  specialityId: string;
  isPediatrician: boolean;
  cityId: string;
}

export interface Speciality {
  id: string;
  name: string;
  value?: string;
  label?: string;
  params?: {
    gender?: string;
    maxAge?: number;
    minAge?: number;
  };
}

export interface City {
  id: string;
  name: string;
  value?: string;
  label?: string;
}

export interface Values {
  name: string;
  birthdayDate: string;
  sex: string;
  city: string;
  speciality: string;
  doctor: string;
  email: string;
  phone: string;
}
