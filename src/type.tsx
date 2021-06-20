export type Contact = {
  name: {
    first: string,
    last: string,
  }
  id: number
  email: string,
  birthdate: string,
  notes: string,
  edited?: boolean
}

export type UpdatedContact = {
  name: {
    first: string,
    last: string,
  }
  email: string,
  birthdate: string,
  notes: string,
}

let emptyContact = {
  name: {
    first: "",
    last: "",
  },
  id: -1,
  email: "",
  birthdate: "",
  notes: "",
}
export default emptyContact;
