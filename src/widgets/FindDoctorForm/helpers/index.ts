import { City, Doctor, Speciality, Values } from '../types';

export const dataNormalizer = (array: Doctor[] | Speciality[] | City[]) => {
  return array.map((data) => {
    if ('surname' in data) {
      return { ...data, value: data.id, label: `${data.name} ${data.surname}` };
    }
    return { ...data, value: data.id, label: data.name };
  });
};
export const calculateAge = (birthday: Date) => {
  const ageDifMs = Date.now() - birthday.getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

export const isAllowedValue = (
  arr: Doctor[] | Speciality[],
  fieldId: string
) => {
  return arr.findIndex((el) => el.id === fieldId);
};

export const changeLists = (
  values: Values,
  doctors: Doctor[],
  speciality: Speciality[]
) => {
  let newDoctors = doctors;
  let newSpecialities = speciality;

  if (values.city || values.speciality) {
    newDoctors = newDoctors.filter((doctor) => {
      if (values.city && values.speciality) {
        return (
          values.city === doctor.cityId &&
          values.speciality === doctor.specialityId
        );
      }

      if (values.city) {
        return values.city === doctor.cityId;
      }

      if (values.speciality) {
        return values.speciality === doctor.specialityId;
      }

      return true;
    });
  }

  if (values.birthdayDate) {
    const userAge = calculateAge(new Date(values.birthdayDate));

    if (userAge <= 16) {
      newDoctors = newDoctors.filter((doctor) => doctor.isPediatrician);
    }

    newSpecialities = newSpecialities.filter((spec) => {
      if (spec?.params?.minAge) {
        return userAge >= spec.params.minAge;
      }
      if (spec?.params?.maxAge) {
        return userAge <= spec.params.maxAge;
      }
      return spec;
    });
  }

  if (values.sex) {
    newSpecialities = newSpecialities.filter((spec) => {
      if (spec?.params?.gender) {
        return spec.params.gender === values.sex;
      }
      return spec;
    });
  }

  return {
    newDoctors,
    newSpecialities,
  };
};
