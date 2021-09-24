import useSWR from 'swr'
import axiosApi from './axiosApi'

const fetcher = (url) => axiosApi.get(url).then((res) => res.data)

const useApiCostumers = () => {
  const { data, error } = useSWR(`/costumers`, fetcher)

  return {
    costumers: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export const useApiCostumerByCpf = (cpf) => {
  const { data, error } = useSWR(`/costumers/${cpf}`, fetcher)

  return {
    costumer: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export default useApiCostumers
