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
 * Get URL hash
 *
 * @access static
 * @return {string} URL hash
 */
export const getURLHash = (): string => document.location.hash.replace(/^#\//, '');
