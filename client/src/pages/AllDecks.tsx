import { useAtom } from "jotai";
import { decksAtom } from "../state/atoms";
import { Link } from "react-router-dom";
import type { Deck } from "../types";

const AllDecks = () => {
	const [decks, setDecks] = useAtom(decksAtom);

	const handleCreateDeck = () => {
		const newDeckName = prompt("Enter the name for the new deck:");
		if (newDeckName) {
			const newDeck: Deck = {
				id: `deck-${Date.now()}`,
				name: newDeckName,
				description: "",
				cards: [],
			};
			setDecks((prev) => [...prev, newDeck]);
		}
	};

	const handleDeleteDeck = (deckId: string) => {
		if (
			window.confirm(
				"Are you sure you want to delete this deck and all its cards?",
			)
		) {
			setDecks((prev) => prev.filter((deck) => deck.id !== deckId));
		}
	};

	return (
		<div>
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-3xl font-bold">All Decks</h2>
				<button
					onClick={handleCreateDeck}
					className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
				>
					Create Deck
				</button>
			</div>
			<div className="bg-white rounded-lg shadow-sm">
				<ul className="divide-y divide-gray-200">
					{decks.map((deck) => (
						<li
							key={deck.id}
							className="p-4 hover:bg-gray-50 flex justify-between items-center"
						>
							<Link to={`/decks/${deck.id}`} className="flex-grow">
								<div>
									<p className="font-semibold">{deck.name}</p>
									<p className="text-sm text-gray-500">
										{deck.cards.length} cards
									</p>
								</div>
							</Link>
							<button
								onClick={() => handleDeleteDeck(deck.id)}
								className="text-red-500 hover:text-red-700 font-semibold ml-4"
							>
								Delete
							</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default AllDecks;
