export const initPersonalCards = () => {
	const supportsHover = window.matchMedia(
		"(hover: hover) and (pointer: fine)",
	).matches;

	const prefersReducedMotion = window.matchMedia(
		"(prefers-reduced-motion: reduce)",
	).matches;

	if (!supportsHover || prefersReducedMotion) return;

	const videos = document.querySelectorAll<HTMLVideoElement>(
		".personal-card__video",
	);

	for (const video of videos) {
		const card = video.closest<HTMLElement>(".personal-card");

		if (!card) continue;

		card.addEventListener("pointerenter", () => {
			void video.play();
		});

		card.addEventListener("pointerleave", () => {
			video.pause();
			video.currentTime = 0;
		});
	}
};
