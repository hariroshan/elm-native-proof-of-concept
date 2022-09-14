
// import { Window } from "happy-dom";

import Document from "./document";
const Node_1 = require("../../node_modules/happy-dom/lib/nodes/node/Node");
const CustomEvent_1 = require("../../node_modules/happy-dom/lib/event/events/CustomEvent");
const HTMLElement_1 = require("../../node_modules/happy-dom/lib/nodes/html-element/HTMLElement");
const CustomElementRegistry_1 = require("../../node_modules/happy-dom/lib/custom-element/CustomElementRegistry");
const EventTarget_1 = require("../../node_modules/happy-dom/lib/event/EventTarget");

export class Window extends EventTarget_1.default {
  constructor() {
    super();
    this.Node = Node_1.default;
    this.CustomEvent = CustomEvent_1.default;
    this.HTMLElement = HTMLElement_1.default;
    this.customElements = new CustomElementRegistry_1.default();
    const document =  new Document(this)
    this.document = document;
  }
}
