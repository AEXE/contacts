export type Contact = {
  first: string,
  last: string,
  id?: number
  email: string,
  birthdate: string,
  notes: string,
}


let emptyContact = {
  first: "",
  last: "",
  id: -1,
  email: "",
  birthdate: "",
  notes: "",
}
export default emptyContact;
