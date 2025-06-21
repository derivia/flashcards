import { Link } from "react-router-dom";
import { useAtomValue } from "jotai";
import { decksAtom } from "../state/atoms";
import DeckCard from "../components/DeckCard";
import { useMemo } from "react";

const Dashboard = () => {
	const decks = useAtomValue(decksAtom);
	const cardsDue = useMemo(() => {
		const now = Date.now();
		return decks.flatMap((d) => d.cards).filter((c) => c.nextReview <= now)
			.length;
	}, [decks]);

	return (
		<div className="space-y-12">
			<section>
				<div className="flex justify-between items-center mb-4">
					<div>
						<h2 className="text-3xl font-bold">Today's Review</h2>
						<p className="text-gray-500">
							{cardsDue} card{cardsDue !== 1 && "s"} due for review
						</p>
					</div>
					<div>
						<Link
							to="/review"
							className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
						>
							Start Review
						</Link>
					</div>
				</div>
				<div className="bg-white p-16 rounded-lg shadow-sm text-center text-gray-400">
					<p>Review session summary will appear here.</p>
				</div>
			</section>

			<section>
				<h2 className="text-2xl font-bold mb-4">Recent Decks</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{decks.map((deck) => (
						<DeckCard key={deck.id} deck={deck} />
					))}
				</div>
			</section>
		</div>
	);
};
export default Dashboard;
