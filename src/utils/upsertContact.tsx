import {useState, useEffect} from "react"
import {Contact} from "../type";

export const UpsertContact = <T extends any>(contact: Contact, id: number, create: boolean) => {
  const [upsertStatus, setUpsertStatus] = useState<
    "initial" | "loading" | "success" | "error"
    >("initial")
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<"string" | null>(null)

  useEffect(() => {
    setUpsertStatus("loading");
    setError(null);

    fetch("http://localhost:3000/contacts/" + id, {
      method: create ? "post" : "put",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(contact)
    })
      .then<T>((res) => res.json())
      .then((data) => {
        setData(data);
        setUpsertStatus("success");
      })
      .catch((err) => {
        setError(err.message);
        setUpsertStatus("error");
      })
  }, [contact, id, create])

  return { upsertStatus, data, error }
}
