'use client'
import MovieCard from "@/components/MovieCard";
import SearchForm from "@/components/SearchForm";
import { api } from "@/lib/axios";
import { useState, useCallback, useEffect } from "react";

export interface MoviesProps {
  Title: string
  releasedAt: string
  Director: string
}

const user = process.env.OMDB

export default function Home() {
  const [movies, setMovies] = useState<MoviesProps[]>([])
  const [searchMovies, setSearchMovies] = useState('')

  const loadMovies = useCallback(async (query: string = '') => {
    const response = await api.get(`?t=${query}&apikey=${user}`)

  
    setMovies([response.data])
  }, [])

  useEffect(() => {
    loadMovies()
  }, [loadMovies])
  

  return (
   <div className="flex flex-col items-center justify-center gap-8 py-6">
      <h1 className="text-white text-4xl">Movie Search</h1>
      <SearchForm loadMovies={loadMovies} />
      <div className="border-t-2 w-[1100px] rounded-full border-error-500" />
      {movies.map((movie) => (
      <div className="flex flex-col gap-2 text-white">
        <h1>
          Titulo: {movie.Title}
          </h1>
          <h2>
            Diretor: {movie.Director}
            </h2>
            </div>
          ))}
    </div>
  )
}
