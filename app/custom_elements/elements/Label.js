const Element = {}
import { Label } from "@nativescript/core";
import { init, update } from "./Common";
import elements_data from "./element_data.json";

const label = elements_data["label"]

Element.tagName = label["tag"]
Element.propNames = label["props"];
Element.events = label["events"];

Element.asElement = (UIElement, { CustomEvent }) =>
  class LabelElement extends UIElement {
    static get observedAttributes() {
      return Element.propNames
    }
    init() {
      this.object = new Label();
    }
    initAttrs() {
      init(this.object, this.props);
    }
    render() {
      requestAnimationFrame(() => {
        const index = (Array.from(this.parentElement.children).indexOf(this))
        this.parentElement.object.insertChild(this.object, index);
      })
    }
    update(attr, newValue) {
      console.log(Element.tagName, "update")
      update(this.object, attr, newValue);
    }
    dispose() {
      this.object.destroyNode()
      console.log(Element.tagName, "disposed")
    }
  }

export default Element
