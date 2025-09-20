export interface Game {
    id: number;
    name: string;
    minPlayers: number;
    maxPlayers: number;
    playedTimes: number|null; 
    imgUrl?: string;
    description: string;
    category: string;
}