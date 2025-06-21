export interface Card {
	id: string;
	front: string;
	back: string;
	deckId: string;
	interval: number;
	easeFactor: number;
	nextReview: number;
}

export interface Deck {
	id: string;
	name: string;
	description: string;
	cards: Card[];
}
