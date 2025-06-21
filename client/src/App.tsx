import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import AllDecks from "./pages/AllDecks";
import DeckView from "./pages/DeckView";
import Review from "./pages/Review";

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<Dashboard />} />
				<Route path="decks" element={<AllDecks />} />
				<Route path="decks/:deckId" element={<DeckView />} />
				<Route path="review" element={<Review />} />
				<Route path="*" element={<NotFound />} />
			</Route>
		</Routes>
	);
};

export default App;
