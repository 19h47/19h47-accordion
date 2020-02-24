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

    <div
    	class="js-accordion-panel"
    	data-accordion-open="true"
    	data-accordion-deselect="true"
    >

    	<button
    		class="js-accordion-header"
    		type="button"
    		aria-expanded="true"
    		aria-controls="lorem"
    	>
    		Toggle
    	</button>


    	<div
    		id="lorem"
    		class="js-accordion-body"
			role="region"
    	>
    		<div class="js-accordion-inner">
    			Sit amet, consectetur adipisicing elit. Omnis ex inventore tempore. Quam voluptas quibusdam excepturi accusantium voluptatum facere. Nemo vero iste recusandae, at magnam tenetur maxime ad optio veniam!<br>
    			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque, molestias excepturi molestiae nesciunt alias. Nobis aut praesentium, commodi minus laborum ullam at quod soluta qui tempore sit eveniet dicta esse.
    		</div>
    	</div>
    </div>
</div>

```
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

## Example

An example is located right [here](https://19h47.github.io/19h47-accordion/), see [sources](/docs/index.html).

## Acknowledgments

- [Accessible toggle tabs and accordion](https://gomakethings.com/accessible-toggle-tabs-and-accordions/)
- [Accordion](https://www.w3.org/TR/wai-aria-practices-1.1/examples/accordion/accordion.html)
