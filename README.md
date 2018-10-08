# Accordion style

> Sur un petit air d'accordéon Léon

![Accordion style](accordion-style.png)

## Installation

```
npm install accordion-style
```

## Usage

```javascript

import AccordionStyle from 'accordion-style';

const element = document.querySelector('.js-accordion');
const accordion = new AccordionStyle(element);
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
    		style="overflow: hidden; max-height: 0;"
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

An example is located right [here](https://19h47.github.io/accordion-style/), see [sources](/example/index.html).
