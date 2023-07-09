import { Pokemon, PokemonClient } from 'pokenode-ts'
import Image from 'next/image'
import Link from 'next/link'

const getPokemonList = () => {
  return new Promise<Pokemon[]>(async (resolve, reject) => {
    const api = new PokemonClient()
    const result = await api.listPokemons(undefined, 50)
    const pokemonList: Pokemon[] = await Promise.all(
      result.results.map(async (res) => {
        const api = new PokemonClient()
        return await api.getPokemonByName(res.name)
      })
    )
    resolve(pokemonList)
  })
}

export default async function Home() {
  const pokemonList = await getPokemonList()

  return (
    <div className="flex flex-col items-center w-full min-h-screen py-2">
      <main className=" flex flex-wrap gap-3 w-3/4">
        {pokemonList.map((pokemon, index) => (
          <div
            key={`poke_${index}`}
            className="bg-white rounded shadow-md p-5"
          >
            <Link
              href={`/${pokemon.name}/`}
              className="flex flex-col items-center rounded transition-all duration-400 hover:opacity-70"
            >
              <Image
                src={pokemon.sprites.front_default!}
                alt={pokemon.name}
                width={180}
                height={180}
              />
              <span className="text-gray-900 text-center">{pokemon.name}</span>
            </Link>
          </div>
        ))}
      </main>
    </div>
  )
}
