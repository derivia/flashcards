import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Layout = () => {
	return (
		<div className="flex min-h-screen">
			<Sidebar />
			<main className="flex-1 p-8">
				<Outlet />
			</main>
		</div>
	);
};

export default Layout;
