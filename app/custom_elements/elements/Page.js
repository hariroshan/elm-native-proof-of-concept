const Element = {}
import { Page } from "@nativescript/core";
import { init, update } from "./Common";
import elements_data from "./element_data.json";

const page = elements_data["page"]

Element.tagName = page["tag"]
Element.propNames = page["props"];
Element.events = page["events"];

Element.asElement = (UIElement, { CustomEvent }) =>
  class PageElement extends UIElement {
    static get observedAttributes() {
      return Element.propNames
    }

    init() {
      this.object = new Page();
    }
    initAttrs() {
      init(this.object, this.props);
    }
    update(attr, newValue) {
      update(this.object, attr, newValue);
      console.log(Element.tagName, "update")
    }
    dispose() {
      this.object.destroyNode();
      console.log(Element.tagName, "disposed")
    }
    render() {
      // page should have one child which is a layout
      this.object.content = this.children[0].object
      // this.object.frame.content = this.object
    }
  }

export default Element
