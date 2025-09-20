import { Game } from "./games-model";
import { Place } from "./places-model";
import { Trait } from "./traits-model";

export interface User{
    id: number;
    email: string;
    name: string;
    createdAt: string;
    city?: string;
    imgUrl?: string;
    bio?: string;
    traits?: Trait[];
    favoritesGames?: Game[];
    favoritesPlaces?: Place[];
}