import "./styles/main.scss";

// Header scroll state

const siteHeader = document.querySelector<HTMLElement>(".site-header");

const updateHeaderScrollState = () => {
	if (!siteHeader) return;

	siteHeader.toggleAttribute("data-scrolled", window.scrollY > 24);
};

updateHeaderScrollState();

window.addEventListener("scroll", updateHeaderScrollState, {
	passive: true,
});

// Mobile navigation

const menuToggle = document.querySelector<HTMLButtonElement>(".menu-toggle");
const mobileNavigation =
	document.querySelector<HTMLElement>("#mobile-navigation");
const menuToggleLabel = document.querySelector<HTMLElement>(
	".menu-toggle__label",
);

if (menuToggle && mobileNavigation && menuToggleLabel) {
	const mobileNavigationLinks =
		mobileNavigation.querySelectorAll<HTMLAnchorElement>("a");

	const openMenu = () => {
		mobileNavigation.hidden = false;
		menuToggle.setAttribute("aria-expanded", "true");
		menuToggleLabel.textContent = "Stäng meny";
		document.body.classList.add("menu-open");

		mobileNavigationLinks[0]?.focus();
	};

	const closeMenu = (restoreFocus = true) => {
		mobileNavigation.hidden = true;
		menuToggle.setAttribute("aria-expanded", "false");
		menuToggleLabel.textContent = "Öppna meny";
		document.body.classList.remove("menu-open");

		if (restoreFocus) {
			menuToggle.focus();
		}
	};

	const toggleMenu = () => {
		const isMenuOpen = menuToggle.getAttribute("aria-expanded") === "true";

		if (isMenuOpen) {
			closeMenu();
			return;
		}

		openMenu();
	};

	menuToggle.addEventListener("click", toggleMenu);

	mobileNavigationLinks.forEach((link) => {
		link.addEventListener("click", () => closeMenu(false));
	});

	document.addEventListener("keydown", (event) => {
		if (event.key === "Escape" && !mobileNavigation.hidden) {
			closeMenu();
		}
	});
}
