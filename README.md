[![](https://img.shields.io/npm/v/@19h47/accordion)](https://www.npmjs.com/package/@19h47/accordion)
[![](https://img.shields.io/npm/dm/@19h47/accordion)](https://www.npmjs.com/package/@19h47/accordion)
[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/19h47/19h47-accordion)

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
			aria-controls="lorem-body"
			id="lorem-header"
		>
			Toggle
		</button>

		<div id="lorem-body" role="region" aria-labelledby="lorem-header">
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

| Role   | Attribute               | Element | Usage                                                                           |
| ------ | ----------------------- | ------- | ------------------------------------------------------------------------------- |
|        | aria-controls="ID"      | button  | oints to the ID of the panel which the header controls.                         |
| region |                         |         | Creates a landmark region that contains the currently expanded accordion panel. |
|        | aria-labelledby="IDREF" | div     | <ul><li>Defines the accessible name for the region element.</li><li>References the accordion header button that expands and collapses the region.</li><li>region elements are required to have an accessible name to be identified as a landmark.</li></ul> |

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
	panel.el.addEventListener('Panel.open', ({ detail }) => {
		console.log({ detail });
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
	panel.el.addEventListener('Panel.close', ({ detail }) => {
		console.log({ detail });
	});
});
```

## Build Setup

```bash

# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn serve

# build for production
$ yarn build

```

## Example

An example is located right [here](https://19h47.github.io/19h47-accordion/), see [sources](/docs/index.html).

## Acknowledgments

-   [Accessible toggle tabs and accordion](https://gomakethings.com/accessible-toggle-tabs-and-accordions/)
-   [Accordion](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/examples/accordion/)
