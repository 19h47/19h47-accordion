import { setInactive, setActive, dispatchEvent } from './utils';

const EXPANDED = 'aria-expanded';

/**
 * Panel
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

	/**
	 * Constructor
	 *
	 * @param {HTMLElement} el
	 */
	constructor(el: HTMLElement) {
		this.el = el;
	}

	init(): void {
		this.$button = this.el.querySelector('.js-accordion-header');
		this.$body = this.el.querySelector('.js-accordion-body');
		this.$inner = this.el.querySelector('.js-accordion-inner');

		this.isDeselect = JSON.parse(this.el.getAttribute('data-accordion-deselect') as string);
		this.isOpen = JSON.parse(this.el.getAttribute('data-accordion-open') as string) || false;

		// Bind
		this.handleResize = this.handleResize.bind(this);
		this.handleClick = this.handleClick.bind(this);

		this.$body?.style.setProperty('max-height', this.height.toString());
		this.$body?.style.setProperty('overflow', 'hidden');

		this.handleResize();
		this.initEvents();

		if (true === this.isOpen) {
			this.open();
		}
	}

	initEvents(): void {
		this.$button?.addEventListener('click', this.handleClick);
		window.addEventListener('resize', this.handleResize);
	}

	handleClick(): boolean | void {
		// console.info('Panel.handleClick', this.isOpen);

		if (false === this.isDeselect && true === this.isOpen) {
			return false;
		}

		if (true === this.isOpen) {
			dispatchEvent(this.el, { current: this.el }, 'close');

			return this.close();
		}

		if (false === this.isOpen) {
			dispatchEvent(this.el, { current: this.el }, 'open');

			return this.open();
		}

		return true;
	}

	handleResize(): void {
		// console.info('Panel.handleResize');

		this.height = this.$inner?.offsetHeight || 0;

		if (this.isOpen) {
			this.$body?.style.setProperty('max-height', `${this.height}px`);
		}
	}

	close(): void {
		// console.info('Panel.close', this.isOpen);

		this.el.setAttribute('data-accordion-open', 'false');
		this.$button?.setAttribute(EXPANDED, 'false');

		this.$body?.style.setProperty('max-height', '0');

		setInactive(this.el);

		this.isOpen = false;
	}

	open(): void {
		// console.info('Panel.open');

		this.el.setAttribute('data-accordion-open', 'true');
		this.$button?.setAttribute(EXPANDED, 'true');

		this.$body?.style.setProperty('max-height', `${this.height}px`);

		setActive(this.el);

		this.isOpen = true;
	}

	destroy(): void {
		// console.info('Panel.destroy');

		this.$button?.removeEventListener('click', this.handleClick);
		window.removeEventListener('resize', this.handleResize);
		this.$body?.style.removeProperty('max-height');
		this.$body?.style.removeProperty('overflow');

		setInactive(this.el);
	}
}
