import { setInactive, setActive } from './utils';

const EXPANDED = 'aria-expanded';

/**
 * Panel
 *
 * @class Panel
 *
 * @author Jérémy Levron <jeremylevron@19h47.fr> (https://19h47.fr)
 */
export default class Panel {
	el: HTMLElement;
	$body: HTMLElement | null = null;
	$button: HTMLElement | null = null;
	$inner: HTMLElement | null = null;
	isDeselect: boolean = false;
	isOpen: boolean = false;
	height: number = 0;
	openEvent: Event;
	closeEvent: Event;

	/**
	 * Constructor
	 *
	 * @param {HTMLElement} el
	 */
	constructor(el: HTMLElement) {
		this.el = el;

		const options = {
			bubbles: false,
			cancelable: true,
			detail: { current: this.el },
		}

		this.openEvent = new CustomEvent(`Panel.open`, options);
		this.closeEvent = new CustomEvent(`Panel.close`, options);
	}

	/**
	 * Init
	 *
	 * @return {void}
	 */
	init(): void {
		this.$button = this.el.querySelector('.js-accordion-header');

		const control = this.$button!.getAttribute('aria-controls')?.trim().split(' ')[0] || '';

		this.$body = document.getElementById(control);
		this.$inner = this.$body!.querySelector('.js-accordion-inner');

		this.isDeselect = JSON.parse(this.el.getAttribute('data-accordion-deselect') as string);
		this.isOpen = JSON.parse(this.el.getAttribute('data-accordion-open') as string);

		this.$body!.style.setProperty('max-height', this.height.toString());
		this.$body!.style.setProperty('overflow', 'hidden');
		this.$body!.setAttribute('aria-labelledby', `${this.$button!.id}`);

		this.handleResize();
		this.initEvents();

		if (true === this.isOpen) {
			this.open();
		} /* else {
			this.close();
		} */
	}

	/**
	 * Init events
	 *
	 * @return {void}
	 */
	initEvents(): void {
		this.$button!.addEventListener('click', this.handleClick, { passive: true });
		window.addEventListener('resize', this.handleResize, { passive: true });
	}

	/*
	 * Handle click
	 *
	 * @return {boolean|void}
	 */
	handleClick = (): boolean | void => {
		if (false === this.isDeselect && true === this.isOpen) {
			return false;
		}

		if (true === this.isOpen) {
			this.el.dispatchEvent(this.closeEvent);

			return this.close();
		}

		if (false === this.isOpen) {
			this.el.dispatchEvent(this.openEvent);

			return this.open();
		}

		return true;
	};

	/**
	 * Handle resize
	 *
	 * @return {void}
	 */
	handleResize = (): void => {
		// console.info('Panel.resize');

		this.height = this.$inner?.offsetHeight || 0;

		if (this.isOpen) {
			this.$body!.style.setProperty('max-height', `${this.height}px`);
		}
	};

	/**
	 * Close
	 *
	 * @return {void}
	 */
	close(): void {
		// console.info('Panel.close', this.isOpen);

		this.el.setAttribute('data-accordion-open', 'false');
		this.$button!.setAttribute(EXPANDED, 'false');

		this.$body!.style.setProperty('max-height', '0');
		// this.$body!.setAttribute('hidden', '');

		setInactive(this.el);

		this.isOpen = false;
	}

	/**
	 * Open
	 *
	 * @return {void}
	 */
	open(): void {
		this.el.setAttribute('data-accordion-open', 'true');
		this.$button!.setAttribute(EXPANDED, 'true');

		// this.$body!.removeAttribute('hidden');
		this.$body!.style.setProperty('max-height', `${this.height}px`);

		setActive(this.el);

		this.isOpen = true;
	}

	/**
	 * Destroy
	 *
	 * @return {void}
	 */
	destroy(): void {
		// console.info('Panel.destroy');

		this.$button!.removeEventListener('click', this.handleClick);
		window.removeEventListener('resize', this.handleResize);

		this.$body!.style.removeProperty('max-height');
		this.$body!.style.removeProperty('overflow');
		// this.$body!.removeAttribute('hidden');

		setInactive(this.el);
	}
}
