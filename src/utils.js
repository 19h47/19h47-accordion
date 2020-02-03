/**
 * Inactive element
 *
 * @param	obj		element		DOM element
 * @access	static
 * @return	void
 */
export const setInactive = element => element.classList.remove('is-active');


/**
 * Active element
 *
 * @param	obj		element		DOM element
 * @access	static
 * @return 	void
 */
export const setActive = element => element.classList.add('is-active');
