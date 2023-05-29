import { FC, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import moment from 'moment';

import {
  Button,
  DateInput,
  Field,
  List,
  SelectInput,
  Title,
} from '../../shared';
import { changeLists, dataNormalizer, isAllowedValue } from './helpers';
import { fetchCities, fetchDoctors, fetchSpeciality } from './api';
import { City, Doctor, Speciality } from './types';
import { validationSchema } from './constants';

const FindDoctorForm: FC = () => {
  const [cities, setCities] = useState([] as City[]);
  const [speciality, setSpeciality] = useState([] as Speciality[]);
  const [doctors, setDoctors] = useState([] as Doctor[]);
  const [filteredSpecialities, setFilteredSpecialities] = useState(
    [] as Speciality[]
  );
  const [filteredDoctors, setFilteredDoctors] = useState([] as Doctor[]);

  const getData = async () => {
    try {
      const city = await fetchCities();
      const speciality = await fetchSpeciality();
      const doctor = await fetchDoctors();
      setDoctors(doctor);
      setFilteredDoctors(doctor);
      setCities(city);
      setSpeciality(speciality);
      setFilteredSpecialities(speciality);
    } catch (err) {
      console.log('error', err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const { handleSubmit, errors, touched, handleChange, values } = useFormik({
    initialValues: {
      name: '',
      birthdayDate: '',
      sex: '',
      city: '',
      speciality: '',
      doctor: '',
      email: '',
      phone: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const newValues = {
        ...values,
        birthdayDate: moment(values.birthdayDate).format('DD/MM/YYYY'),
      };
      alert(JSON.stringify(newValues, null, 2));
    },
  });

  useEffect(() => {
    if (values.doctor && (!values.city || !values.speciality)) {
      const selectedDoctor = doctors.find(({ id }) => id === values.doctor);
      if (selectedDoctor) {
        const { specialityId, cityId } = selectedDoctor;
        values.city = cityId;
        values.speciality = specialityId;
      }
    }

    const { newDoctors, newSpecialities } = changeLists(
      values,
      doctors,
      speciality
    );
    setFilteredDoctors(newDoctors);
    setFilteredSpecialities(newSpecialities);

    if (values.doctor) {
      const doctor = isAllowedValue(newDoctors, values.doctor);
      if (doctor === -1) {
        values.doctor = '';
      }
    }
    if (values.speciality) {
      const speciality = isAllowedValue(newSpecialities, values.speciality);
      if (speciality === -1) {
        values.speciality = '';
      }
    }
  }, [
    values.birthdayDate,
    values.sex,
    values.city,
    values.speciality,
    values.doctor,
    values,
    doctors,
    speciality,
  ]);

  return (
    <>
      <Title text='React test task' />

      <form onSubmit={handleSubmit}>
        <Field
          name='name'
          label='Name'
          onChange={handleChange}
          value={values.name}
          error={errors.name}
          touched={touched.name}
        />
        <DateInput
          name='birthdayDate'
          label='Birthday Date'
          onChange={handleChange}
          value={values.birthdayDate}
          error={errors.birthdayDate}
          touched={touched.birthdayDate}
        />

        <SelectInput
          name='sex'
          label='Sex'
          onChange={handleChange}
          value={values.sex}
          error={errors.sex}
          touched={touched.sex}
          options={[
            { value: 'Male', label: 'Male' },
            { value: 'Female', label: 'Female' },
          ]}
        />

        <SelectInput
          name='city'
          label='City'
          value={values.city}
          error={errors.city}
          touched={touched.city}
          onChange={handleChange}
          options={dataNormalizer(cities)}
        />

        <List
          data={dataNormalizer(filteredSpecialities)}
          label='Speciality'
          name='speciality'
          value={values.speciality}
          error={errors.speciality}
          touched={touched.speciality}
          onChange={handleChange}
        />
        <List
          data={dataNormalizer(filteredDoctors)}
          label='Doctor'
          name='doctor'
          error={errors.doctor}
          value={values.doctor}
          touched={touched.doctor}
          onChange={handleChange}
        />
        <Field
          name='email'
          label='Email'
          onChange={handleChange}
          value={values.email}
          error={errors.email}
          touched={touched.email}
        />
        <Field
          name='phone'
          label='Phone number'
          onChange={handleChange}
          value={values.phone}
          error={errors.phone}
          touched={touched.phone}
        />
        <Button label='Submit' type='submit' />
      </form>
    </>
  );
};

export default FindDoctorForm;
