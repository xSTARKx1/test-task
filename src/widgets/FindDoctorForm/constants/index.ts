import * as Yup from 'yup';

const phonePattern = /^[+]{0,1}380([0-9]{9})$/;
export const validationSchema = Yup.object({
  name: Yup.string()
    .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for this field ')
    .required('Required'),
  birthdayDate: Yup.date()
    .required('Required')
    .max(new Date(), 'Birth Date cannot be in the future'),
  sex: Yup.string().required('Required'),
  city: Yup.string().required('Required'),
  speciality: Yup.string(),
  doctor: Yup.string().required('Required'),
}).shape(
  {
    email: Yup.string().when('phone', {
      is: (phone: string) => !phone || phone.length === 0,
      then: Yup.string()
        .email('Must be a valid email')
        .required('One of these fields are required!'),
    }),
    phone: Yup.string().when('email', {
      is: (email: string) => !email || email.length === 0,
      then: Yup.string()
        .matches(
          phonePattern,
          'Number should start with code of Ukraine +380 and contain 13 symbols'
        )
        .min(13, 'Phone must contain 13 characters')
        .max(13, 'Phone must contain 13 characters')
        .required('One of these fields are required!'),
    }),
  },
  [['email', 'phone']]
);
