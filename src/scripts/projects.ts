import { featuredProjects, type Project } from "../data/projects";

const createProjectCard = (project: Project) => {
	const projectItem = document.createElement("li");
	const projectCard = document.createElement("article");
	const projectMedia = document.createElement("div");
	const projectOverlay = document.createElement("div");
	const projectTechnologies = document.createElement("ul");
	const projectTitle = document.createElement("h3");
	const projectSubtitle = document.createElement("p");
	const projectFooter = document.createElement("div");
	const projectDescription = document.createElement("p");

	projectItem.className = "projects__item";
	projectCard.className = "project-card";
	projectMedia.className = "project-card__media";
	projectOverlay.className = "project-card__overlay";
	projectTechnologies.className = "project-card__technologies";
	projectTitle.className = "project-card__title";
	projectSubtitle.className = "project-card__subtitle";
	projectFooter.className = "project-card__footer";
	projectDescription.className = "project-card__description";

	projectCard.dataset.project = project.id;

	// Project cover
	if (project.image && project.imageAlt) {
		const projectImage = document.createElement("img");

		projectImage.className = "project-card__image";
		projectImage.src = project.image;
		projectImage.alt = project.imageAlt;
		projectImage.width = 1200;
		projectImage.height = 900;
		projectImage.loading = "lazy";

		projectMedia.append(projectImage);
	} else {
		projectMedia.classList.add("project-card__media--placeholder");
	}

	// Technologies
	for (const technology of project.technologies) {
		const technologyItem = document.createElement("li");

		technologyItem.className = "project-card__technology";
		technologyItem.textContent = technology;

		projectTechnologies.append(technologyItem);
	}

	// Project content
	projectTitle.textContent = project.title;
	projectSubtitle.textContent = project.subtitle;
	projectDescription.textContent = project.description;

	projectOverlay.append(projectTechnologies, projectTitle, projectSubtitle);

	projectMedia.append(projectOverlay);

	// Project link
	const projectUrl = project.liveUrl ?? project.githubUrl;

	if (projectUrl) {
		const projectLink = document.createElement("a");
		const projectArrow = document.createElement("span");

		projectLink.className = "project-card__link";
		projectLink.href = projectUrl;
		projectLink.target = "_blank";
		projectLink.rel = "noopener";

		projectArrow.textContent = "→";
		projectArrow.setAttribute("aria-hidden", "true");

		projectLink.append("Se projekt", projectArrow);

		projectFooter.append(projectDescription, projectLink);
	} else {
		projectFooter.append(projectDescription);
	}

	projectCard.append(projectMedia, projectFooter);
	projectItem.append(projectCard);

	return projectItem;
};

export const initProjects = () => {
	const projectTrack =
		document.querySelector<HTMLUListElement>(".projects__track");

	if (!projectTrack) return;

	const projectCards = featuredProjects.map(createProjectCard);

	projectTrack.append(...projectCards);
};
