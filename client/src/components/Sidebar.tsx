import { NavLink } from "react-router-dom";
import { useAtomValue } from "jotai";
import { decksAtom } from "../state/atoms";

const Sidebar = () => {
	const decks = useAtomValue(decksAtom);

	const linkClass = "block p-2 rounded-md hover:bg-gray-200 transition-colors";
	const activeLinkClass = "bg-blue-500 text-white hover:bg-blue-600";

	return (
		<aside className="w-64 bg-white p-6 border-r border-gray-200">
			<h1 className="text-2xl font-bold mb-8">Flashcards</h1>

			<nav className="space-y-4">
				<div>
					<h2 className="text-sm font-semibold text-gray-500 mb-2">STUDY</h2>
					<NavLink
						to="/"
						className={({ isActive }) =>
							`${linkClass} ${isActive ? activeLinkClass : ""}`
						}
					>
						Today's Review
					</NavLink>
					<NavLink
						to="/decks"
						className={({ isActive }) =>
							`${linkClass} ${isActive ? activeLinkClass : ""}`
						}
					>
						All Decks
					</NavLink>
				</div>
				<div>
					<h2 className="text-sm font-semibold text-gray-500 mb-2">DECKS</h2>
					<div className="space-y-1">
						{decks.map((deck) => (
							<NavLink
								key={deck.id}
								to={`/decks/${deck.id}`}
								className={({ isActive }) =>
									`flex justify-between items-center text-sm p-2 rounded-md hover:bg-gray-100 ${
										isActive ? "font-bold text-blue-600" : ""
									}`
								}
							>
								<span>{deck.name}</span>
								<span className="text-xs text-gray-400">
									{deck.cards.length}
								</span>
							</NavLink>
						))}
					</div>
				</div>
			</nav>
		</aside>
	);
};

export default Sidebar;
