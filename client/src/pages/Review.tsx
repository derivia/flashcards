import { useAtom } from "jotai";
import { decksAtom } from "../state/atoms";
import { useState, useMemo } from "react";
import type { Card } from "../types";
import { Link, useNavigate } from "react-router-dom";

const calculateNextReview = (
	card: Card,
	rating: "again" | "hard" | "good" | "easy",
): Card => {
	let { interval, easeFactor } = card;

	if (rating === "again") {
		interval = 1;
	} else {
		if (rating === "good") {
			interval = Math.round(interval * easeFactor);
		} else if (rating === "hard") {
			interval = Math.round(interval * 1.2);
			easeFactor = Math.max(1.3, easeFactor - 0.15);
		} else if (rating === "easy") {
			interval = Math.round(interval * easeFactor * 1.3);
			easeFactor = easeFactor + 0.15;
		}
	}

	const nextReview = Date.now() + interval * 24 * 60 * 60 * 1000;
	return { ...card, interval, easeFactor, nextReview };
};

const Review = () => {
	const [decks, setDecks] = useAtom(decksAtom);
	const navigate = useNavigate();

	const dueCards = useMemo(() => {
		const now = Date.now();
		return decks.flatMap((d) => d.cards).filter((c) => c.nextReview <= now);
	}, [decks]);

	const [currentIndex, setCurrentIndex] = useState(0);
	const [isFlipped, setIsFlipped] = useState(false);

	const [sessionStats, setSessionStats] = useState({ reviewed: 0, correct: 0 });

	if (dueCards.length === 0) {
		return (
			<div className="text-center">
				<h2 className="text-2xl font-bold">No cards due for review!</h2>
				<p className="text-gray-500">Great job! Come back tomorrow.</p>
				<Link to="/" className="text-blue-500 mt-4 inline-block">
					Go to Dashboard
				</Link>
			</div>
		);
	}

	const currentCard = dueCards[currentIndex];

	const handleRating = (rating: "again" | "hard" | "good" | "easy") => {
		const updatedCard = calculateNextReview(currentCard, rating);

		setDecks((prevDecks) =>
			prevDecks.map((deck) =>
				deck.id === updatedCard.deckId
					? {
							...deck,
							cards: deck.cards.map((c) =>
								c.id === updatedCard.id ? updatedCard : c,
							),
						}
					: deck,
			),
		);

		setSessionStats((prev) => ({
			reviewed: prev.reviewed + 1,
			correct: prev.correct + (rating !== "again" ? 1 : 0),
		}));

		if (currentIndex + 1 < dueCards.length) {
			setCurrentIndex(currentIndex + 1);
			setIsFlipped(false);
		} else {
			alert("Review session complete!");
			navigate("/");
		}
	};

	const remaining = dueCards.length - currentIndex;
	const accuracy =
		sessionStats.reviewed > 0
			? ((sessionStats.correct / sessionStats.reviewed) * 100).toFixed(0)
			: 100;

	return (
		<div className="max-w-3xl mx-auto">
			<div className="bg-white rounded-lg shadow-lg p-8 min-h-[20rem] flex flex-col justify-center items-center text-center">
				{isFlipped ? (
					<p className="text-2xl">{currentCard.back}</p>
				) : (
					<p className="text-3xl font-semibold">{currentCard.front}</p>
				)}
			</div>

			<div className="mt-8 text-center">
				{isFlipped ? (
					<div className="grid grid-cols-4 gap-4">
						<button
							onClick={() => handleRating("again")}
							className="p-3 bg-red-100 text-red-700 rounded-md hover:bg-red-200"
						>
							Again
						</button>
						<button
							onClick={() => handleRating("hard")}
							className="p-3 bg-orange-100 text-orange-700 rounded-md hover:bg-orange-200"
						>
							Hard
						</button>
						<button
							onClick={() => handleRating("good")}
							className="p-3 bg-green-100 text-green-700 rounded-md hover:bg-green-200"
						>
							Good
						</button>
						<button
							onClick={() => handleRating("easy")}
							className="p-3 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200"
						>
							Easy
						</button>
					</div>
				) : (
					<button
						onClick={() => setIsFlipped(true)}
						className="bg-blue-500 text-white font-bold py-3 px-6 rounded-md"
					>
						Show Answer
					</button>
				)}
			</div>

			<div className="mt-8 flex justify-around text-center">
				<div>
					<p className="text-2xl font-bold">{remaining}</p>
					<p className="text-gray-500">Remaining</p>
				</div>
				<div>
					<p className="text-2xl font-bold">{sessionStats.reviewed}</p>
					<p className="text-gray-500">Reviewed</p>
				</div>
				<div>
					<p className="text-2xl font-bold">{accuracy}%</p>
					<p className="text-gray-500">Accuracy</p>
				</div>
			</div>
		</div>
	);
};

export default Review;
