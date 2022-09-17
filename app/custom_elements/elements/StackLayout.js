const Element = {}
import { StackLayout } from "@nativescript/core";
import { init } from "./Common";
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
      console.log(Element.tagName, "init")
    }
    initAttrs() {
      init(this.object, this.props);
    }
    update() {
      console.log(Element.tagName, "update")
    }
    dispose() {
      this.object.destroyNode();
      console.log(Element.tagName, "disposed")
    }
    render() {
      const children = this.children;
      const childLength = children.length
      for (let index = 0; index < childLength; index++) {
        this.object.addChild(children[index].object)
      }
    }
  }

export default Element
