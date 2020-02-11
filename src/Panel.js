import { setInactive, setActive } from '@/utils';


const EXPANDED = 'aria-expanded';
// const MULTISELECTABLE = 'aria-multiselectable';


export default class Panel {
	constructor(element, options) {
		this.rootElement = element;
		this.options = options;
	}

	init() {
		this.$button = this.rootElement.querySelector('.js-accordion-header');
		this.$body = this.rootElement.querySelector('.js-accordion-body');
		this.$inner = this.rootElement.querySelector('.js-accordion-inner');

		this.isDeselect = JSON.parse(this.rootElement.getAttribute('data-accordion-deselect'));
		this.isOpen = JSON.parse(this.rootElement.getAttribute('data-accordion-open')) || false;

		// Bind
		this.onResize = this.onResize.bind(this);
		this.toggle = this.toggle.bind(this);

		this.$body.style.setProperty('max-height', 0);
		this.$body.style.setProperty('overflow', 'hidden');

		this.onResize();
		this.initEvents();

		if (true === this.isOpen) {
			this.open();
		}
	}


	initEvents() {
		window.addEventListener('resize', this.onResize);
		this.$button.addEventListener('click', this.toggle);
	}

	toggle() {
		// console.info('Panel.toggle', this.isOpen);

		if (false === this.isDeselect && true === this.isOpen) {
			return false;
		}

		// If panel is already open
		if (true === this.isOpen) {
			// dispatchEvent close event on panel
			this.rootElement.dispatchEvent(new CustomEvent('Panel.close', {
				detail: {
					current: this.rootElement,
				},
			}));

			return this.close();
		}

		if (false === this.isOpen) {
			this.rootElement.dispatchEvent(new CustomEvent('Panel.open', {
				detail: {
					current: this.rootElement,
				},
			}));

			return this.open();
		}


		return true;
	}

	close() {
		// console.info('Panel.close', this.isOpen);

		this.rootElement.setAttribute('data-accordion-open', false);
		this.$button.setAttribute(EXPANDED, false);

		this.$body.style.setProperty('max-height', 0);

		setInactive(this.rootElement);

		if (this.options.hash) {
			window.history.pushState('', document.title, window.location.href.split('#')[0]);
		}

		this.isOpen = false;
	}

	open() {
		// console.info('Panel.open');

		this.rootElement.setAttribute('data-accordion-open', true);
		this.$button.setAttribute(EXPANDED, true);

		this.$body.style.setProperty('max-height', `${this.height}px`);

		setActive(this.rootElement);

		if (this.options.hash) {
			window.location.hash = `#${this.rootElement.id}`;
		}

		this.isOpen = true;
	}

	destroy() {
		// console.info('Panel.destroy');

		this.$button.removeEventListener('click', this.toggle);
		window.removeEventListener('resize', this.onResize);
		this.$body.style.removeProperty('max-height');
		this.$body.style.removeProperty('overflow');

		setInactive(this.rootElement);
	}

	onResize() {
		// console.info('Panel.onResize');

		this.height = this.$inner.offsetHeight;

		if (this.isOpen) {
			this.$body.style.setProperty('max-height', `${this.height}px`);
		}
	}
}
