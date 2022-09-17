const Element = {}
import { Frame } from "@nativescript/core";
import { init } from "./Common";
import elements_data from "./element_data.json";

const frame = elements_data["frame"]

Element.tagName = frame["tag"]
Element.propNames = frame["props"];
Element.events = frame["events"];

Element.asElement = (UIElement, { CustomEvent }) =>
  class FrameElement extends UIElement {
    static get observedAttributes() {
      return Element.propNames
    }

    init() {
      this.object = new Frame();
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
      const child = this.children[0];
      this.object.navigate({
        create() {
          // Frame should have one child which is page
          return child.object
        }
      })
    }
  }

export default Element
