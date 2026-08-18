const getScrollBehavior = (): ScrollBehavior => {
	const prefersReducedMotion = window.matchMedia(
		"(prefers-reduced-motion: reduce)",
	).matches;

	return prefersReducedMotion ? "auto" : "smooth";
};

export const initProjectCarousel = () => {
	const projectTrack =
		document.querySelector<HTMLUListElement>(".projects__track");

	const previousButton = document.querySelector<HTMLButtonElement>(
		'[data-project-direction="previous"]',
	);

	const nextButton = document.querySelector<HTMLButtonElement>(
		'[data-project-direction="next"]',
	);

	if (!projectTrack || !previousButton || !nextButton) return;

	const getScrollDistance = () => {
		const projectItem =
			projectTrack.querySelector<HTMLElement>(".projects__item");

		if (!projectItem) return 0;

		const trackStyles = getComputedStyle(projectTrack);
		const gap = Number.parseFloat(trackStyles.columnGap) || 0;

		return projectItem.offsetWidth + gap;
	};

	const updateControls = () => {
		const maximumScroll = projectTrack.scrollWidth - projectTrack.clientWidth;

		previousButton.disabled = projectTrack.scrollLeft <= 1;

		nextButton.disabled = projectTrack.scrollLeft >= maximumScroll - 1;
	};

	previousButton.addEventListener("click", () => {
		projectTrack.scrollBy({
			left: -getScrollDistance(),
			behavior: getScrollBehavior(),
		});
	});

	nextButton.addEventListener("click", () => {
		projectTrack.scrollBy({
			left: getScrollDistance(),
			behavior: getScrollBehavior(),
		});
	});

	projectTrack.addEventListener("scroll", updateControls, {
		passive: true,
	});

	window.addEventListener("resize", updateControls);

	updateControls();
};
