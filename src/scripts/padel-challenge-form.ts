const formEndpoint = "https://formspree.io/f/xgawpjrv";

export const initPadelChallengeForm = () => {
	const form = document.querySelector<HTMLFormElement>("#padel-challenge-form");

	if (!form) return;

	const submitButton = form.querySelector<HTMLButtonElement>(
		"[data-fs-submit-btn]",
	);

	const successMessage =
		document.querySelector<HTMLElement>("[data-fs-success]");

	const errorMessage = document.querySelector<HTMLElement>("[data-fs-error]");

	form.addEventListener("submit", async (event) => {
		event.preventDefault();

		if (!form.checkValidity()) {
			form.reportValidity();
			return;
		}

		submitButton?.setAttribute("disabled", "");

		if (errorMessage) {
			errorMessage.hidden = true;
		}

		try {
			const response = await fetch(formEndpoint, {
				method: "POST",
				body: new FormData(form),
				headers: {
					Accept: "application/json",
				},
			});

			if (!response.ok) {
				throw new Error("Formuläret kunde inte skickas.");
			}

			form.reset();

			if (successMessage) {
				successMessage.hidden = false;
			}

			form.hidden = true;
		} catch (error) {
			console.error(error);

			if (errorMessage) {
				errorMessage.textContent = "Något gick fel. Försök igen om en stund.";

				errorMessage.hidden = false;
			}
		} finally {
			submitButton?.removeAttribute("disabled");
		}
	});
};
