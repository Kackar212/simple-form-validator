export default {
  required: () => 'To pole jest wymagane!',
  minLength: (min) => `To pole musi mieć conajmniej ${min} znaków!`,
  maxLength: max => `To pole może mieć maksymalnie ${max} znaków!`,
  isEmail: () => 'To pole musi być poprawnym adresem email',
}