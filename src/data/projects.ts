import calippoShotsCover from "../assets/images/projects/calippo-shots-project.webp";
import donutShopCover from "../assets/images/projects/donut-shop-project.webp";
import moneyMoodCover from "../assets/images/projects/moneymood-project.webp";
import sirVectorCover from "../assets/images/projects/sir-vector-project.webp";
import templeOfFiveCover from "../assets/images/projects/temple-of-five-project.webp";

export type Project = {
	id: string;
	title: string;
	subtitle: string;
	description: string;
	technologies: string[];
	image?: string;
	imageAlt?: string;
	liveUrl?: string;
	githubUrl?: string;
};

export const featuredProjects: Project[] = [
	{
		id: "temple-of-five",
		title: "The Temple of Five",
		description:
			"En digital escape room-upplevelse byggd i team med fokus på användarflöden, tillgänglighet och interaktivitet.",
		technologies: ["TypeScript", "Vite", "SCSS", "Biome"],
		image: templeOfFiveCover,
		githubUrl: "https://github.com/AlexJCodes/escape-room-game",
		liveUrl: "https://alexjcodes.github.io/escape-room-game/",
		imageAlt: "Omslagsbild för The Temple of Five",
		subtitle: "Digital escape room-upplevelse",
	},
	{
		id: "money-mood",
		title: "MoneyMood",
		subtitle: "Budgetapp med användaren i fokus",
		description:
			"En budgetapp för inkomster, utgifter och sparmål med dynamiskt gränssnitt och lokal datalagring.",
		technologies: ["TypeScript", "Vite", "SCSS", "LocalStorage"],
		image: moneyMoodCover,
		imageAlt: "Omslagsbild för budgetappen MoneyMood",
		githubUrl: "https://github.com/AlexJCodes/money-mood-budget-app",
		liveUrl: "https://alexjcodes.github.io/money-mood-budget-app/",
	},
	{
		id: "donut-shop",
		title: "G's Donut Shop",
		subtitle: "E-handel från produktval till checkout",
		description:
			"En lekfull webbshop med filtrering, sortering, varukorg och ett komplett checkout-flöde.",
		technologies: ["HTML", "SCSS", "JavaScript", "Vite"],
		image: donutShopCover,
		imageAlt: "Omslagsbild för G's Donut Shop",
		githubUrl: "https://github.com/AlexJCodes/donut-shop-ui",
		liveUrl: "https://alexjcodes.github.io/donut-shop-ui/",
	},
	{
		id: "sir-vector",
		title: "Sir Vector",
		description:
			"Ett visuellt frontendprojekt med spelinspirerad identitet med fokus på animation, grafisk form och interaktiva detaljer.",
		technologies: ["HTML", "CSS", "JavaScript", "GSAP"],
		image: sirVectorCover,
		githubUrl:
			"https://github.com/Medieinstitutet/fed25d-grafiska-verktyg-bleed-trim",
		liveUrl:
			"https://medieinstitutet.github.io/fed25d-grafiska-verktyg-bleed-trim/",
		imageAlt: "Omslagsbild för Sir Vector",
		subtitle: "Visuellt frontendprojekt",
	},
	{
		id: "calippo-shots",
		title: "Calippo Shots",
		subtitle: "Från Figma-design till färdig frontend",
		description:
			"Ett skolprojekt där vi fick en annan grupps Figma-design och kravspecifikation och ansvarade för att bygga den responsiva frontend-lösningen.",
		technologies: ["HTML", "SCSS", "JavaScript", "Figma"],
		image: calippoShotsCover,
		imageAlt: "Omslagsbild för frontendprojektet Calippo Shots",
		githubUrl:
			"https://github.com/Medieinstitutet/fed25d-grafiska-verktyg-bleed-trim",
		liveUrl:
			"https://medieinstitutet.github.io/fed25d-grafiska-verktyg-bleed-trim/",
	},
];
