import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import type { Deck } from "../types";
import { SAMPLE_DECKS } from "../lib/sampleData";

export const decksAtom = atomWithStorage<Deck[]>(
	"flashcards:decks",
	SAMPLE_DECKS,
);

export const activeDeckAtom = atom<Deck | null>(null);
