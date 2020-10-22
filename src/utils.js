/**
 * Inactive element
 *
 * @param {object} element DOM element
 * @access static
 * @return void
 */
export const setInactive = element => element.classList.remove('is-active');

/**
 * Active element
 *
 * @param {object} element DOM element
 * @access static
 * @return void
 */
export const setActive = element => element.classList.add('is-active');

/**
 * Dispatch event
 *
 * @param {object} target
 * @param {object} details
 * @param {string} name
 */
export const dispatchEvent = (target, details, name) => {
	const event = new CustomEvent(`Panel.${name}`, {
		bubbles: true,
		cancelable: true,
		detail: details,
	});

	// Dispatch the event on target.
	return target.dispatchEvent(event);
};
