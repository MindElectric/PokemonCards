import type { Type } from "./pokemon";

export interface PokemonCardData {
    readonly pokemonName: string,
    readonly nickname?: string,
    readonly nature: String,
    readonly ability: String,
    readonly moves: String[],
    readonly nationalDex: Number,
    readonly hp: Number,
    readonly pokeTypes: Type[],
    readonly art: string
}