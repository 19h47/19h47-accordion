/**
 * Inactive element
 *
 * @param {HTMLElement} element HTML element
 * @access static
 * @return void
 */
export const setInactive = (element: HTMLElement): void => element.classList.remove('is-active');

/**
 * Active element
 *
 * @param {HTMLElement} element HTML element
 * @access static
 * @return void
 */
export const setActive = (element: HTMLElement): void => element.classList.add('is-active');

/**
 * Dispatch event
 *
 * @param {HTMLElement} target
 * @param {object} details
 * @param {string} name
 */
export const dispatchEvent = (target: HTMLElement, details: object = {}, name: string = ''): boolean => {
	const event = new CustomEvent(`Panel.${name}`, {
		bubbles: false,
		cancelable: true,
		detail: details,
	});

	// Dispatch the event on target.
	return target.dispatchEvent(event);
};

/**
 * Get URL hash
 *
 * @return string
 */
export const getURLHash = (): string => document.location.hash.replace(/^#\//, '');
