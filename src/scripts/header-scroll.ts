export const initHeaderScroll = () => {
	const siteHeader = document.querySelector<HTMLElement>(".site-header");

	if (!siteHeader) return;

	const updateHeaderScrollState = () => {
		siteHeader.toggleAttribute("data-scrolled", window.scrollY > 24);
	};

	updateHeaderScrollState();

	window.addEventListener("scroll", updateHeaderScrollState, {
		passive: true,
	});
};
