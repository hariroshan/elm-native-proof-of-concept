import { Button, Frame, Label, Page, StackLayout } from "@nativescript/core"
import { Window } from "./mock/window";
import customElements from "./custom_elements";

const { runInContext } = require("vm-shim");
import Elm from '../src/Main.elm';
import * as allElements from './custom_elements/elements';
import {
  withAttrs,
  withProps,
  withCreate,
  withInitAndUpdate,
  withMountAndRender,
  withUnmount,
  withEventListener
} from "./custom_elements/mixins";


const init = () => ({
  create: () => {
    const frame = new Frame();
    frame.navigate({ create: startPage })
    return frame;
  }
})

const startPage = () => {
  const label = new Label();
  label.className = "h1 text-center";
  label.text = "Hello World, Hari";

  const button = new Button();
  button.className = "link text-center";
  button.text = "Increment";
  let counter = 0;
  button.on(Button.tapEvent, (data) => {
    counter += 1;
    label.text = `counted ` + counter;
  })

  const decButton = new Button();
  decButton.className = "link text-center";
  decButton.text = "Decrement";
  decButton.on(Button.tapEvent, (data) => {
    counter -= 1;
    label.text = `counted` + counter;
  })

  const goTo = new Button();
  goTo.className = "-primary text-center";
  goTo.text = "Details";
  goTo.on(Button.tapEvent, (data) => {
    Frame.topmost().navigate({ create: detailsPage })
  })

  const layout = new StackLayout();
  layout.addChild(label);
  layout.addChild(button);
  layout.addChild(decButton);
  layout.addChild(goTo);

  const page = new Page();
  page.content = layout;

  return page;
}

const detailsPage = () => {
  const label = new Label();
  label.className = "h1 text-center";
  label.text = "Details Page";

  const page = new Page();
  page.content = label;
  page.actionBar.title = "Details"

  return page;
}

function initElements(params) {
  customElements(params)
}


export const start = () => {
  const window = new Window();
  const document = window.document;
  /**
     * Patch `insertBefore` function to default reference node to null when passed undefined.
     * This is technically only needed for an Elm issue in version 1.0.2 of the VirtualDom
     * More context here: https://github.com/elm/virtual-dom/issues/161
     * And here: https://github.com/elm/virtual-dom/blob/1.0.2/src/Elm/Kernel/VirtualDom.js#L1409
    */

  const insertBefore = window.Node.prototype.insertBefore
  window.Node.prototype.insertBefore = function (...args) {
    const [newNode, refNode] = args
    const hasRefNode = args.length > 1
    const isRefNodeDefined = typeof refNode !== 'undefined'
    if (hasRefNode && !isRefNodeDefined)
      return insertBefore.call(this, newNode, null)
    return insertBefore.call(this, ...args)
  }


  /**
   * Build context for web scripts to with:
   * - window
   * - document
   * - all of window globals
   * - the compiled elm app
   * - the app bindings to the native ui
  */

  const app = {
    mixins: [
      withAttrs,
      withProps,
      withCreate,
      withInitAndUpdate,
      withMountAndRender,
      withUnmount,
      withEventListener
    ],
    elements: Object.values(allElements)
  }

  const context = {
    Elm,
    window,
    document,
    initElements,
    app
  }

  /**
   * Required to override for rendering.
   * Seems to be needed by parts of the boot process,
   * if not provided it seems the cordova `document` will be used.
  */

  global.document = document


  /**
   * Define our HTML and JavaScript to load in our virtual document.
  */

  const html = `
     <html>
         <head>
            <title>App</title>
         </head>
         <body>
            <div id='elm-root'>
               <!–– Content will be added here -->
            </div>
         </body>
     </html>
   `

  /**
     * `Elm` is imported as a function since we want to defer executing the
     * compiled JavaScript until it is the virtual document.
     *
     * This is provided by a custom compilation step,
     * which is defined in the `compile-elm-to-bundle` script,
     * located in the root project directory.
    */

  const defineCustomElements = `
  initElements({window, app})
  `

  const elmInitScript = `
  const el = Elm().Main.init({
    node: document.getElementById('elm-root')
  })
  console.log(el)
   `


  /**
   * Write the html template to the virtual document,
   * and then run scripts to define custom elements and start Elm app.
  */

  document.write(html)
  runInContext(defineCustomElements, context);
  runInContext(elmInitScript, context);

  // return init()
}
