import axios from 'axios'
import { Viacep } from 'interfaces'

export default async function (value: string): Promise<Viacep> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://viacep.com.br/ws/${value.replace(/[^0-9]/g, '')}/json/`)
      .then(({ data }: { data: Viacep }) => resolve(data))
      .catch(reject)
  })
}
