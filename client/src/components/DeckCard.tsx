import { Link } from "react-router-dom";
import { useMemo } from "react";
import type { Deck } from "../types";

interface DeckCardProps {
	deck: Deck;
}

const DeckCard = ({ deck }: DeckCardProps) => {
	const masteryProgress = useMemo(() => {
		if (deck.cards.length === 0) {
			return 0;
		}
		const totalMastery = deck.cards.reduce((acc, card) => {
			const MATURE_INTERVAL = 21;
			const cardMastery = Math.min(
				100,
				(card.interval / MATURE_INTERVAL) * 100,
			);
			return acc + cardMastery;
		}, 0);
		return Math.round(totalMastery / deck.cards.length);
	}, [deck.cards]);

	return (
		<Link to={`/decks/${deck.id}`} className="block">
			<div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow h-full">
				<h3 className="font-bold text-lg mb-2">{deck.name}</h3>
				<p className="text-sm text-gray-600 mb-4">{deck.description}</p>
				<div className="flex justify-between items-center text-sm text-gray-500">
					<span>{deck.cards.length} cards</span>
					<span>{masteryProgress}%</span>
				</div>
				<div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
					<div
						className="bg-blue-500 h-1.5 rounded-full"
						style={{ width: `${masteryProgress}%` }}
					></div>
				</div>
			</div>
		</Link>
	);
};
export default DeckCard;
