import { Search } from "lucide-react";
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

interface SearchInputProps {
  loadMovies: (query?: string) => Promise<void>
}

const searchForMoviesSchema = z.object({
  query: z.string()
})

type SearchFormInput = z.infer<typeof searchForMoviesSchema>

export default function SearchForm({loadMovies}: SearchInputProps) {
  const { register, handleSubmit, reset } = useForm<SearchFormInput>({
    resolver: zodResolver(searchForMoviesSchema)
  })

  async function handleSearchMovies(data: SearchFormInput) {
    await loadMovies(data.query)

    reset()
  }

  return (
    <form onSubmit={handleSubmit(handleSearchMovies)} className="flex flex-row gap-4">
    <input className="bg-zinc-800 shadow-md px-3 rounded-md outline-none border border-zinc-700 text-white text-lg placeholder:text-zinc-400 w-[500px] h-[40px] focus-within:border-red-600 focus-within:ring-2 focus-within:ring-red-400" 
      type="text" 
      id="" 
      placeholder="Digite o nome do filme que deseja..." 
      {...register('query')}
    /> 
    <button className="flex flex-row items-center justify-center align-middle gap-2 text-zinc-900 font-semibold bg-error-600 hover:bg-error-500 delay-100 p-2 rounded-md outline-none focus-within:border-red-600 focus-within:ring-2 focus-within:ring-red-400">
      <Search className="w-5 h-5 text-zinc-900" />
      Buscar
    </button>
  </form>
  )
}