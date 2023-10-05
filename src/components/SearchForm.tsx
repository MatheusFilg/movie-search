import { Search } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

interface SearchInputProps {
  loadMovies: (query?: string) => Promise<void>
}

const searchForMoviesSchema = z.object({
  query: z.string(),
})

type SearchFormInput = z.infer<typeof searchForMoviesSchema>

export default function SearchForm({ loadMovies }: SearchInputProps) {
  const { register, handleSubmit, reset } = useForm<SearchFormInput>({
    resolver: zodResolver(searchForMoviesSchema),
  })

  async function handleSearchMovies(data: SearchFormInput) {
    await loadMovies(data.query)

    reset()
  }

  return (
    <form
      onSubmit={handleSubmit(handleSearchMovies)}
      className="flex flex-row gap-4"
    >
      <input
        className="h-[40px] w-[500px] rounded-md border border-zinc-700 bg-zinc-800 px-3 text-lg text-white shadow-md outline-none placeholder:text-zinc-400 focus-within:border-red-600 focus-within:ring-2 focus-within:ring-red-400"
        type="text"
        id=""
        placeholder="Digite o nome do filme que deseja..."
        {...register('query')}
      />
      <button className="flex flex-row items-center justify-center gap-2 rounded-md bg-error-600 p-2 align-middle font-semibold text-zinc-900 outline-none delay-100 focus-within:border-red-600 focus-within:ring-2 focus-within:ring-red-400 hover:bg-error-500">
        <Search className="h-5 w-5 text-zinc-900" />
        Buscar
      </button>
    </form>
  )
}
