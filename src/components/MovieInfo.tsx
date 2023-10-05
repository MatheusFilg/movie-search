/* eslint-disable @next/next/no-img-element */

interface MovieInfoProps {
  header: string
  info: string
}

export default function MovieInfo({ header, info }: MovieInfoProps) {
  return (
    <div className="flex flex-col items-center justify-start gap-4">
      <h1 className="flex w-[250px] justify-center bg-zinc-800 p-4 text-xl font-bold text-zinc-100">
        {header}
      </h1>
      {header === 'Poster' ? (
        <img src={info} alt="" className="h-[250px] w-[175px]" />
      ) : (
        <span className="max-w-[250px] text-lg font-medium text-zinc-300">
          {info}
        </span>
      )}
    </div>
  )
}
