# @19h47/accordion

> Sur un petit air d'accordéon Léon

## Installation

```
yarn add @19h47/accordion
```

## Usage

```javascript
import Accordion from '@19h47/accordion';

const $element = document.querySelector('.js-accordion');
const accordion = new Accordion($element);
accordion.init();
```

```html
<div class="js-accordion">
	<div class="js-accordion-panel" data-accordion-open="true" data-accordion-deselect="true">
		<button
			class="js-accordion-header"
			type="button"
			aria-expanded="true"
			aria-controls="lorem"
		>
			Toggle
		</button>

		<div id="lorem" class="js-accordion-body" role="region">
			<div class="js-accordion-inner">
				Sit amet, consectetur adipisicing elit. Omnis ex inventore tempore. Quam voluptas
				quibusdam excepturi accusantium voluptatum facere. Nemo vero iste recusandae, at
				magnam tenetur maxime ad optio veniam!<br />
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque, molestias
				excepturi molestiae nesciunt alias. Nobis aut praesentium, commodi minus laborum
				ullam at quod soluta qui tempore sit eveniet dicta esse.
			</div>
		</div>
	</div>
</div>
```

## Keyboard Support

| Key                | Function                                                                                                                                                                                     |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _Space_ or _Enter_ | When focus is on the accordion header of a collapsed section, expands the section.                                                                                                           |
| _Tab_              | <ul><li>Moves focus to the next focusable element.</li><li>All focusable elements in the accordion are included in the page `Tab` sequence.</li></ul>                                        |
| _Shift + Tab_      | <ul><li>Moves focus to the previous focusable element.</li><li>All focusable elements in the accordion are included in the page `Tab` sequence.</li></ul>                                    |
| _Down Arrow_       | <ul><li>When focus is on an accordion header, moves focus to the next accordion header.</li><li>When focus is on last accordion header, moves focus to first accordion header.</li></ul>     |
| _Up Arrow_         | <ul><li>When focus is on an accordion header, moves focus to the previous accordion header.</li><li>When focus is on first accordion header, moves focus to last accordion header.</li></ul> |
| _Home_             | When focus is on an accordion header, moves focus to the first accordion header.                                                                                                             |
| _End_              | When focus is on an accordion header, moves focus to the last accordion header.                                                                                                              |

## Role, Property, State, and Tabindex Attributes

| Role   | Attribute | Element | Usage                                                                           |
| ------ | --------- | ------- | ------------------------------------------------------------------------------- |
| region |           | div     | Creates a landmark region that contains the currently expanded accordion panel. |

## Option

Options can be set as `data-attribute`.

### Open

Is the panel open or not.

```html
<button data-accordion-open="true">Button</button>
```

### Deselect

Can the panel be deselected or not.

```html
<button data-accordion-deselect="true">Button</button>
```

## Event

### Open

```javascript
import Accordion from '@19h47/accordion';

const $element = document.querySelector('.js-accordion');
const accordion = new Accordion($element);

accordion.init();

accordion.panels.forEach(panel => {
	panel.rootElement.addEventListener('Panel.open', ({ type, detail }) => {
		console.log({ type, detail });
	});
});
```

### Close

```javascript
import Accordion from '@19h47/accordion';

const $element = document.querySelector('.js-accordion');
const accordion = new Accordion($element);

accordion.init();

accordion.panels.forEach(panel => {
	panel.rootElement.addEventListener('Panel.close', ({ type, detail }) => {
		console.log({ type, detail });
	});
});
```

## Build Setup

```bash

# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn start

# build for production
$ yarn prod

```

## Example

An example is located right [here](https://19h47.github.io/19h47-accordion/), see [sources](/docs/index.html).

## Acknowledgments

-   [Accessible toggle tabs and accordion](https://gomakethings.com/accessible-toggle-tabs-and-accordions/)
-   [Accordion](https://www.w3.org/TR/wai-aria-practices-1.1/examples/accordion/accordion.html)
