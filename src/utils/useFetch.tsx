import {useState, useEffect} from "react"

export const UseFetch = <T extends any>(url: string) => {
  const [status, setStatus] = useState<
    "initial" | "loading" | "success" | "error"
    >("initial")
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<"string" | null>(null)

  useEffect(() => {
    setStatus("loading");
    setError(null);

    fetch(url)
      .then<T>((res) => res.json())
      .then((data) => {
        setData(data);
        setStatus("success");
      })
      .catch((err) => {
        setError(err.message);
        setStatus("error");
      })
  }, [url])

  return { status, data, error }
}
