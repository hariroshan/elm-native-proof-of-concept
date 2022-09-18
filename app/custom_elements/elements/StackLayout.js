const Element = {}
import { StackLayout } from "@nativescript/core";
import { init, update } from "./Common";
import elements_data from "./element_data.json";

const stackLayout = elements_data["stackLayout"]

Element.tagName = stackLayout["tag"]
Element.propNames = stackLayout["props"];
Element.events = stackLayout["events"];

Element.asElement = (UIElement, { CustomEvent }) =>
  class StackLayoutElement extends UIElement {
    static get observedAttributes() {
      return Element.propNames
    }

    init() {
      this.object = new StackLayout();
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
      requestAnimationFrame(() => {
        if (this.parentElement.object.insertChild) {
          const index = (Array.from(this.parentElement.children).indexOf(this))
          this.parentElement.object.insertChild(this.object, index);
        }
      })
    }
  }

export default Element
