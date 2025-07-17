import React from "react";
import TinderCard from "react-tinder-card";
import { useMatchStore } from "../store/useMatchStore";
import { RotateCcw } from "lucide-react";

const MAX_VISIBLE_CARDS = 10;

const SwipeArea = () => {
	const { userProfiles, swipeRight, swipeLeft, getUserProfiles, isLoadingUserProfiles } = useMatchStore();

	const handleSwipe = (dir, user) => {
		if (dir === "right") swipeRight(user);
		else if (dir === "left") swipeLeft(user);
	};

	const visibleProfiles = userProfiles.slice(0, MAX_VISIBLE_CARDS);

	return (
		<div className="relative w-full max-w-sm h-[28rem] flex flex-col items-center">
			<button
				onClick={getUserProfiles}
				disabled={isLoadingUserProfiles}
				className="mb-3 flex items-center gap-2 px-5 py-2 rounded-full border-2 border-[var(--color-accent)] bg-white text-[var(--color-accent)] font-bold shadow-lg hover:bg-[var(--color-accent)] hover:text-white transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
				aria-label="Refresh Profiles"
			>
				<RotateCcw className={isLoadingUserProfiles ? 'animate-spin' : ''} size={20} />
				<span>Refresh</span>
			</button>
			<div className="relative w-full h-full">
				{visibleProfiles.map((user, idx) => (
					<TinderCard
						className="absolute shadow-lg"
						key={user._id}
						onSwipe={(dir) => handleSwipe(dir, user)}
						swipeRequirementType="position"
						swipeThreshold={100}
						preventSwipe={["up", "down"]}
						style={{ zIndex: MAX_VISIBLE_CARDS - idx }}
					>
						<div
							className="card w-96 h-[28rem] select-none rounded-2xl overflow-hidden border-2 border-[var(--color-accent)] bg-white/95 flex flex-col transition-shadow duration-200"
						>
							<figure className="px-4 pt-4 h-3/4 flex items-center justify-center bg-gradient-to-br from-[var(--color-accent)]/10 to-[var(--color-secondary)]/10">
								<img
									src={`https://cataas.com/cat?width=150&height=150&unique=${user._id || 'default'}`}
									alt={user.name}
									className="rounded-xl object-cover h-full w-full pointer-events-none border-2 border-[var(--color-accent)]/30"
									loading="lazy"
								/>
							</figure>
							<div className="flex-1 flex flex-col justify-center bg-gradient-to-b from-white to-[var(--color-accent)]/10 p-6">
								<h2 className="text-2xl font-bold text-[var(--color-slate)] mb-1 flex items-center gap-2">
									{user.name}
									<span className="text-lg font-medium text-[var(--color-accent)] bg-[var(--color-highlight)] px-2 py-0.5 rounded-full ml-2">{user.age}</span>
								</h2>
								<p className="text-[var(--color-slate)]/80 text-base mt-1 mb-2 line-clamp-3">{user.bio}</p>
							</div>
						</div>
					</TinderCard>
				))}
			</div>
		</div>
	);
};

export default SwipeArea;