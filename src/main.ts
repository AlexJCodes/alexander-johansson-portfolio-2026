import "./styles/main.scss";

import { initHeaderScroll } from "./scripts/header-scroll";
import { initMobileNavigation } from "./scripts/mobile-navigation";
import { initPadelChallengeForm } from "./scripts/padel-challenge-form";
import { initPadelGame } from "./scripts/padel-game";
import { initPersonalCards } from "./scripts/personal-cards";
import { initProjectCarousel } from "./scripts/project-carousel";
import { initProjects } from "./scripts/projects";
import { initTheme } from "./scripts/theme";

initHeaderScroll();
initMobileNavigation();
initProjects();
initProjectCarousel();
initTheme();
initPersonalCards();
initPadelGame();
initPadelChallengeForm();
