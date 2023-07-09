import { PokemonClient } from 'pokenode-ts'
import Image from 'next/image'
import Link from 'next/link'

export default async function Page({ params }: { params: { name: string } }) {
  const api = new PokemonClient()
  const pokemon = await api.getPokemonByName(params.name)
  return (
    <div>
      <div className="flex flex-col items-center">
        <h1 className="text-5xl">{pokemon.name}</h1>
        <Image
          src={pokemon.sprites.front_default!}
          alt={pokemon.name}
          width={500}
          height={500}
        />
        <ul>
          <li>身長：{pokemon.height}</li>
          <li>体重：{pokemon.weight}</li>
        </ul>

        <Link href="/list">一覧に戻る</Link>
      </div>
    </div>
  )
}
