import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { Header } from "../components/Header";
import { useMatchStore } from "../store/useMatchStore";
import { Frown } from "lucide-react";

import SwipeArea from "../components/SwipeArea";
import SwipeFeedback from "../components/SwipeFeedBack";
import { useAuthStore } from "../store/useAuthStore";

const HomePage = () => {
	const { isLoadingUserProfiles, getUserProfiles, userProfiles, subscribeToNewMatches, unsubscribeFromNewMatches } =
		useMatchStore();

	const { authUser } = useAuthStore();

	useEffect(() => {
		getUserProfiles();
	}, [getUserProfiles]);

	useEffect(() => {
		authUser && subscribeToNewMatches();

		return () => {
			unsubscribeFromNewMatches();
		};
	}, [subscribeToNewMatches, unsubscribeFromNewMatches, authUser]);

	return (
		<div
			className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-cyan-100 via-white to-purple-200 overflow-hidden"
		>
			<Sidebar />
			<div className="flex-grow flex flex-col overflow-hidden">
				<Header />
				<main className="flex-grow flex flex-col gap-10 justify-center items-center p-6 sm:p-10 relative overflow-hidden">
					<div className="w-full max-w-2xl flex flex-col items-center">
						{userProfiles.length > 0 && !isLoadingUserProfiles && (
							<>
								<SwipeArea />
								<SwipeFeedback />
							</>
						)}

						{userProfiles.length === 0 && !isLoadingUserProfiles && <NoMoreProfiles />}

						{isLoadingUserProfiles && <LoadingUI />}
					</div>
				</main>
			</div>
		</div>
	);
};
export default HomePage;

const NoMoreProfiles = () => (
	<div className="flex flex-col items-center justify-center h-full text-center p-8 animate-fade-in">
		<Frown className="text-cyan-400 mb-6 drop-shadow-lg" size={80} />
		<h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-2 tracking-tight">Woah there, speedy fingers!</h2>
		<p className="text-lg sm:text-xl text-gray-500 mb-6 max-w-md">Looks like you&apos;ve reached the end of the profiles. Take a break and come back later for more connections!</p>
		<span className="inline-block px-4 py-2 bg-cyan-100 text-cyan-700 rounded-full shadow-sm text-sm font-medium mt-2">No more profiles to show</span>
	</div>
);

const LoadingUI = () => {
	return (
		<div className="relative w-full max-w-sm h-[28rem] animate-pulse">
			<div className="bg-white/80 backdrop-blur-md w-96 h-[28rem] rounded-2xl overflow-hidden border border-gray-200 shadow-xl flex flex-col">
				<div className="px-4 pt-6 h-3/4 flex items-center justify-center bg-gradient-to-br from-cyan-50 to-purple-50">
					<div className="w-40 h-40 bg-gray-200 rounded-full" />
				</div>
				<div className="flex-1 flex flex-col justify-center items-center bg-gradient-to-b from-white to-cyan-50 p-6">
					<div className="space-y-3 w-full">
						<div className="h-6 bg-gray-200 rounded w-3/4 mx-auto" />
						<div className="h-4 bg-gray-200 rounded w-1/2 mx-auto" />
					</div>
				</div>
			</div>
		</div>
	);
};

// Tailwind animation utility (add to your global CSS if not present):
// .animate-fade-in { animation: fadeIn 0.7s ease-in; }
// @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: none; } }