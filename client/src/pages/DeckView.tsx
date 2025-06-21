import { useParams, Link } from "react-router-dom";
import { useAtom } from "jotai";
import { decksAtom } from "../state/atoms";
import { useState } from "react";
import type { Card } from "../types";

const DeckView = () => {
	const { deckId } = useParams<{ deckId: string }>();
	const [decks, setDecks] = useAtom(decksAtom);
	const [front, setFront] = useState("");
	const [back, setBack] = useState("");

	const deck = decks.find((d) => d.id === deckId);

	const handleAddCard = (e: React.FormEvent) => {
		e.preventDefault();
		if (!deck || !front || !back) return;

		const newCard: Card = {
			id: `card-${Date.now()}`,
			deckId: deck.id,
			front,
			back,
			interval: 1,
			easeFactor: 2.5,
			nextReview: Date.now(),
		};

		const updatedDecks = decks.map((d) =>
			d.id === deck.id ? { ...d, cards: [...d.cards, newCard] } : d,
		);
		setDecks(updatedDecks);
		setFront("");
		setBack("");
	};

	const handleDeleteCard = (cardId: string) => {
		if (!deck) return;
		if (window.confirm("Are you sure you want to delete this card?")) {
			const updatedDecks = decks.map((d) => {
				if (d.id === deck.id) {
					return { ...d, cards: d.cards.filter((c) => c.id !== cardId) };
				}
				return d;
			});
			setDecks(updatedDecks);
		}
	};

	if (!deck) {
		return (
			<div className="text-center">
				<h2 className="text-2xl font-bold">Deck not found</h2>
				<Link to="/" className="text-blue-500">
					Go back to safety
				</Link>
			</div>
		);
	}

	return (
		<div>
			<h2 className="text-3xl font-bold mb-2">{deck.name}</h2>
			<p className="text-gray-500 mb-6">{deck.description}</p>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				<div>
					<h3 className="text-xl font-bold mb-4">Add New Card</h3>
					<form
						onSubmit={handleAddCard}
						className="bg-white p-6 rounded-lg shadow-sm space-y-4"
					>
						<div>
							<label
								htmlFor="front"
								className="block text-sm font-medium text-gray-700"
							>
								Front
							</label>
							<textarea
								id="front"
								value={front}
								onChange={(e) => setFront(e.target.value)}
								rows={3}
								className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
								required
							></textarea>
						</div>
						<div>
							<label
								htmlFor="back"
								className="block text-sm font-medium text-gray-700"
							>
								Back
							</label>
							<textarea
								id="back"
								value={back}
								onChange={(e) => setBack(e.target.value)}
								rows={3}
								className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
								required
							></textarea>
						</div>
						<button
							type="submit"
							className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
						>
							Add Card
						</button>
					</form>
				</div>

				<div>
					<h3 className="text-xl font-bold mb-4">Cards in this Deck</h3>
					<div className="bg-white rounded-lg shadow-sm">
						<ul className="divide-y divide-gray-200">
							{deck.cards.map((card) => (
								<li
									key={card.id}
									className="p-4 flex justify-between items-start"
								>
									<div>
										<p className="font-semibold">{card.front}</p>
										<p className="text-sm text-gray-600">{card.back}</p>
									</div>
									<button
										onClick={() => handleDeleteCard(card.id)}
										className="text-red-500 hover:text-red-700 text-sm font-semibold ml-2"
									>
										Delete
									</button>
								</li>
							))}
							{deck.cards.length === 0 && (
								<li className="p-4 text-center text-gray-500">No cards yet.</li>
							)}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DeckView;
