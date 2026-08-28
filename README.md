[![](https://img.shields.io/npm/v/@19h47/accordion)](https://www.npmjs.com/package/@19h47/accordion)
[![](https://img.shields.io/npm/dm/@19h47/accordion)](https://www.npmjs.com/package/@19h47/accordion)
[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/19h47/19h47-accordion)

# @19h47/accordion

> Sur un petit air d'accordéon Léon

Accessible accordion for the modern web. Panels are resolved through [`ariaControlsElements`](https://developer.mozilla.org/en-US/docs/Web/API/Element/ariaControlsElements) (Baseline 2025), with keyboard support aligned to the [WAI-ARIA Accordion pattern](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/).

## Requirements

- ESM-capable environment
- Browsers with [`Element.ariaControlsElements`](https://developer.mozilla.org/en-US/docs/Web/API/Element/ariaControlsElements) support

## Installation

```bash
pnpm add @19h47/accordion
```

Also works with `npm` / `yarn` / `bun`.

## Usage

```js
import Accordion from '@19h47/accordion';

const element = document.querySelector('.js-accordion');
const accordion = new Accordion(element);

accordion.init();
```

```html
<div class="js-accordion">
	<div
		class="js-accordion-panel"
		data-accordion-open="true"
		data-accordion-deselect="true"
	>
		<h3>
			<button
				class="js-accordion-header"
				type="button"
				id="lorem-header"
				aria-expanded="true"
				aria-controls="lorem-body"
			>
				Toggle
			</button>
		</h3>

		<div id="lorem-body" role="region" aria-labelledby="lorem-header">
			<div class="js-accordion-inner">
				Panel content
			</div>
		</div>
	</div>
</div>
```

The header keeps an `aria-controls` IDREF in markup. At runtime, the library resolves the panel via `ariaControlsElements`.

Wrap each header control in a heading (`<h2>` to `<h6>`, or nested deeper levels as needed). The library does not inject or enforce this. Clean document outline is up to you.

### Header: `<button>` vs `<a>`

Both work as `.js-accordion-header`. Choose based on intent:

| | `<button type="button">` | `<a href="#panel-id">` |
| --- | --- | --- |
| Role | Toggle control (APG default) | Link + deep link to the panel |
| Activation | Click, Enter, Space | Click / Enter (native link) |
| URL hash | Optional, via your own logic | Native (`href` + browser history) |
| Best for | In-page accordion only | Shareable / bookmarkable panels |

Use `<button>` when the header only expands or collapses. Use `<a href="#…">` when the panel id should also be a real document fragment.

For deep links, point `href` at the **panel root** (`.js-accordion-panel`, always in the layout), not the collapsible region. A fragment on a `hidden` / zero-height body makes the browser scroll to the wrong place.

### Markup checklist

| Selector / attribute | Role |
| --- | --- |
| `.js-accordion` | Root container |
| `.js-accordion-panel` | One panel (direct child of the root) |
| heading (`h2` to `h6`) | Wraps the header control (consumer markup, not enforced by the library) |
| `.js-accordion-header` | Toggle control (`<button>` or `<a>`), sole child of the heading |
| `aria-controls` | Points to the panel region `id` |
| `.js-accordion-inner` | Measured content used for height animation |
| `role="region"` + `aria-labelledby` | Accessible name for the panel landmark |

## Options

### Constructor

```js
const accordion = new Accordion(element, {
	multiselectable: false, // allow several panels open at once
});
```

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `multiselectable` | `boolean` | `false` | When `false`, opening a panel closes the others |

You can also set `data-accordion-multiselectable="true"` on the root in demos. Pass the parsed value into the constructor as above.

### Panel data attributes

Set these on `.js-accordion-panel`:

```html
<div
	class="js-accordion-panel"
	data-accordion-open="true"
	data-accordion-deselect="true"
>
	…
</div>
```

| Attribute | Description |
| --- | --- |
| `data-accordion-open` | Initial open state (`"true"` / `"false"`) |
| `data-accordion-deselect` | When `"true"`, an open panel can be collapsed again by its header |

## Events

```js
import Accordion from '@19h47/accordion';

const accordion = new Accordion(document.querySelector('.js-accordion'));
accordion.init();

for (const panel of accordion.panels) {
	panel.el.addEventListener('Panel.open', ({ detail }) => {
		console.log('opened', detail.current);
	});

	panel.el.addEventListener('Panel.close', ({ detail }) => {
		console.log('closed', detail.current);
	});
}
```

`detail.current` is the `.js-accordion-panel` element.

## Keyboard support

| Key | Behavior |
| --- | --- |
| <kbd>Space</kbd> / <kbd>Enter</kbd> | Expand or collapse the focused header |
| <kbd>Tab</kbd> / <kbd>Shift</kbd>+<kbd>Tab</kbd> | Move through focusable elements in page order |
| <kbd>↓</kbd> / <kbd>→</kbd> | Next header (wraps) |
| <kbd>↑</kbd> / <kbd>←</kbd> | Previous header (wraps) |
| <kbd>Home</kbd> | First header |
| <kbd>End</kbd> | Last header |

## Accessibility

| Role / attribute | Element | Notes |
| --- | --- | --- |
| `aria-controls` | header | IDREF to the panel region, reflected as `ariaControlsElements` |
| `aria-expanded` | header | Updated on open / close. Use for open-state styling |
| `aria-disabled` | header | Set to `"true"` when the panel is open and `data-accordion-deselect="false"` |
| `role="region"` | panel body | Landmark for the expandable content |
| `aria-labelledby` | panel body | References the header `id` |

Style open state from the attribute the library already maintains. No `is-active` class:

```css
.js-accordion-header[aria-expanded="true"] {
	/* … */
}
```

## Development

```bash
pnpm install
pnpm dev      # Vite playground
pnpm build    # library build → dist/
```

## Demo

Live example: [19h47.github.io/19h47-accordion](https://19h47.github.io/19h47-accordion/) · [source](./docs/index.html)

## Acknowledgments

- [WAI-ARIA Authoring Practices Guide: Accordion](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/)
- [Element.ariaControlsElements on MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/ariaControlsElements)
- [Accessible toggle tabs and accordion](https://gomakethings.com/accessible-toggle-tabs-and-accordions/)
