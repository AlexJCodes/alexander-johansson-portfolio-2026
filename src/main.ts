import "./styles/main.scss";

import { initHeaderScroll } from "./scripts/header-scroll";
import { initMobileNavigation } from "./scripts/mobile-navigation";
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
