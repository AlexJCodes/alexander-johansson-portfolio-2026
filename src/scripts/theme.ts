type Theme = "light" | "dark";

const THEME_STORAGE_KEY = "theme";

export const initTheme = () => {
	const themeToggle =
		document.querySelector<HTMLButtonElement>(".theme-toggle");

	if (!themeToggle) return;

	const systemThemePreference = window.matchMedia(
		"(prefers-color-scheme: dark)",
	);

	const getCurrentTheme = (): Theme => {
		return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
	};

	const updateThemeToggleLabel = () => {
		const currentTheme = getCurrentTheme();

		themeToggle.setAttribute(
			"aria-label",
			currentTheme === "dark" ? "Byt till ljust tema" : "Byt till mörkt tema",
		);
	};

	const setTheme = (theme: Theme) => {
		if (theme === "dark") {
			document.documentElement.dataset.theme = "dark";
		} else {
			delete document.documentElement.dataset.theme;
		}

		updateThemeToggleLabel();
	};

	const toggleTheme = () => {
		const nextTheme: Theme = getCurrentTheme() === "dark" ? "light" : "dark";

		setTheme(nextTheme);
		localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
	};

	const updateThemeFromSystemPreference = (event: MediaQueryListEvent) => {
		const hasSavedTheme = localStorage.getItem(THEME_STORAGE_KEY) !== null;

		if (hasSavedTheme) return;

		setTheme(event.matches ? "dark" : "light");
	};

	themeToggle.addEventListener("click", toggleTheme);

	systemThemePreference.addEventListener(
		"change",
		updateThemeFromSystemPreference,
	);

	updateThemeToggleLabel();
};
