/* eslint-disable @next/next/no-img-element */
'use client'
import MovieInfo from '@/components/MovieInfo'
import SearchForm from '@/components/SearchForm'
import { api } from '@/lib/axios'
import { useState, useCallback, useEffect } from 'react'

export interface MoviesProps {
  Title: string
  Released: string
  Director: string
  Poster: string
  Runtime: string
}

const user = process.env.OMDB

export default function Home() {
  const [movies, setMovies] = useState<MoviesProps[]>([])

  const loadMovies = useCallback(async (query = '') => {
    const response = await api.get(`?t=${query}&apikey=${user}`)

    setMovies([response.data])
  }, [])

  useEffect(() => {
    loadMovies()
  }, [loadMovies])

  return (
    <div className="flex flex-col items-center justify-center gap-8 py-6">
      <h1 className="text-4xl text-white">Movie Search</h1>
      <SearchForm loadMovies={loadMovies} />
      <div className="w-[1100px] border-t-2 border-error-500" />

      {movies.map((movie) => (
        <div key={movie.Title} className="flex flex-row">
          <MovieInfo info={movie.Poster} header="Poster" />
          <MovieInfo info={movie.Title} header="Título" />
          <MovieInfo info={movie.Director} header="Diretor" />
          <MovieInfo info={movie.Released} header="Lançamento" />
          <MovieInfo info={movie.Runtime} header="Duração" />
        </div>
      ))}
    </div>
  )
}
