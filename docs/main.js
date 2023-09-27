!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.Accordion=e():t.Accordion=e()}(self,(function(){return function(){var t={942:function(t){window,t.exports=function(t){var e={};function n(i){if(e[i])return e[i].exports;var o=e[i]={i:i,l:!1,exports:{}};return t[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(i,o,function(e){return t[e]}.bind(null,o));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";n.r(e),n.d(e,"BACKSPACE",(function(){return i})),n.d(e,"TAB",(function(){return o})),n.d(e,"ENTER",(function(){return r})),n.d(e,"SHIFT",(function(){return s})),n.d(e,"ESCAPE",(function(){return h})),n.d(e,"SPACE",(function(){return c})),n.d(e,"PAGE_UP",(function(){return l})),n.d(e,"PAGE_DOWN",(function(){return a})),n.d(e,"END",(function(){return u})),n.d(e,"HOME",(function(){return d})),n.d(e,"ARROW_LEFT",(function(){return f})),n.d(e,"ARROW_UP",(function(){return p})),n.d(e,"ARROW_RIGHT",(function(){return y})),n.d(e,"ARROW_DOWN",(function(){return b})),n.d(e,"DELETE",(function(){return m}));var i=8,o=9,r=13,s=16,h=27,c=32,l=33,a=34,u=35,d=36,f=37,p=38,y=39,b=40,m=46}])}},e={};function n(i){var o=e[i];if(void 0!==o)return o.exports;var r=e[i]={exports:{}};return t[i](r,r.exports,n),r.exports}n.d=function(t,e){for(var i in e)n.o(e,i)&&!n.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var i={};return function(){"use strict";function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t(e)}n.r(i),n.d(i,{default:function(){return l}});var e=n(942);const o=t=>t.classList.remove("is-active"),r=(t,e,n)=>{const i=new CustomEvent("Panel.".concat(n),{bubbles:!1,cancelable:!0,detail:e});return t.dispatchEvent(i)},s="aria-expanded";class h{constructor(t,e){this.rootElement=t,this.options=e}init(){this.$button=this.rootElement.querySelector(".js-accordion-header"),this.$body=this.rootElement.querySelector(".js-accordion-body"),this.$inner=this.rootElement.querySelector(".js-accordion-inner"),this.isDeselect=JSON.parse(this.rootElement.getAttribute("data-accordion-deselect")),this.isOpen=JSON.parse(this.rootElement.getAttribute("data-accordion-open"))||!1,this.handleResize=this.handleResize.bind(this),this.handleClick=this.handleClick.bind(this),this.$body.style.setProperty("max-height",0),this.$body.style.setProperty("overflow","hidden"),this.handleResize(),this.initEvents(),!0===this.isOpen&&this.open()}initEvents(){this.$button.addEventListener("click",this.handleClick),window.addEventListener("resize",this.handleResize)}handleClick(){return(!1!==this.isDeselect||!0!==this.isOpen)&&(!0===this.isOpen?(r(this.rootElement,{current:this.rootElement},"close"),this.close()):!1!==this.isOpen||(r(this.rootElement,{current:this.rootElement},"open"),this.open()))}handleResize(){this.height=this.$inner.offsetHeight,this.isOpen&&this.$body.style.setProperty("max-height","".concat(this.height,"px"))}close(){this.rootElement.setAttribute("data-accordion-open",!1),this.$button.setAttribute(s,!1),this.$body.style.setProperty("max-height",0),o(this.rootElement),this.isOpen=!1}open(){this.rootElement.setAttribute("data-accordion-open",!0),this.$button.setAttribute(s,!0),this.$body.style.setProperty("max-height","".concat(this.height,"px")),this.rootElement.classList.add("is-active"),this.isOpen=!0}destroy(){this.$button.removeEventListener("click",this.handleClick),window.removeEventListener("resize",this.handleResize),this.$body.style.removeProperty("max-height"),this.$body.style.removeProperty("overflow"),o(this.rootElement)}}const c={multiselectable:!1};class l{constructor(e){let n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};var i,o,r;i=this,r=()=>this.panels.forEach((t=>t.close())),(o=function(e){var n=function(e,n){if("object"!==t(e)||null===e)return e;var i=e[Symbol.toPrimitive];if(void 0!==i){var o=i.call(e,"string");if("object"!==t(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"===t(n)?n:String(n)}(o="closeAll"))in i?Object.defineProperty(i,o,{value:r,enumerable:!0,configurable:!0,writable:!0}):i[o]=r,this.rootElement=e,this.accordions=[],this.panels=[],this.current=0,this.options={...c,...n},this.handleHashchange=this.handleHashchange.bind(this),this.handleKeydown=this.handleKeydown.bind(this)}init(){return null!==this.rootElement&&void 0!==this.rootElement&&(this.accordions=[...this.rootElement.children].filter((t=>t.classList.contains("js-accordion-panel"))),this.accordions.forEach(((t,e)=>{const n=new h(t,{hash:this.options.hash});return n.init(),this.panels.push(n),t.addEventListener("Panel.open",(()=>{this.current=e,this.options.multiselectable||this.closeAll()})),!0})),this.initEvents(),this.handleHashchange(),!0)}initEvents(){window.addEventListener("hashchange",this.handleHashchange),this.rootElement.addEventListener("keydown",this.handleKeydown)}handleHashchange(){this.panels.forEach(((t,e)=>"#".concat(t.$body.id)!==document.location.hash.replace(/^#\//,"")||(this.current=e,this.closeAll(),t.open())))}handleKeydown(t){const n=t.keyCode||t.which,{target:i}=t,o=()=>{i.classList.contains("js-accordion-header")&&(this.current=this.current+1>this.panels.length-1?0:this.current+1,this.panels[this.current].$button.focus(),t.preventDefault())},r=()=>{i.classList.contains("js-accordion-header")&&(this.current=0>this.current-1?this.panels.length-1:this.current-1,this.panels[this.current].$button.focus(),t.preventDefault())},s={[e.ARROW_UP]:r,[e.ARROW_RIGHT]:o,[e.ARROW_DOWN]:o,[e.ARROW_LEFT]:r,[e.HOME]:()=>{this.panels[0].$button.focus(),t.preventDefault()},[e.END]:()=>{this.panels[this.panels.length-1].$button.focus(),t.preventDefault()},default:()=>!1};return(s[n]||s.default)()}destroyAll(){return this.panels.forEach((t=>t.destroy())),this.panels=[],window.removeEventListener("hashchange",this.handleHashchange,!1),this.rootElement.removeEventListener("keydown",this.handleKeydown),!0}}}(),i}()}));