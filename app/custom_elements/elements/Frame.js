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
    }
    initAttrs() {

      init(this.object, this.props);
    }
    update(attr, newValue) {
      // update(this.object, attr, newValue);
      console.log(Element.tagName, "update")
      update(this.object, attr, newValue);
    }
    dispose() {
      this.object.destroyNode();
      console.log(Element.tagName, "disposed")
    }
    pageAdded() {
      this.navigate(this.children[this.children.length - 1])
    }
    navigate(child) {
      this.object.navigate({
        create() {
          child.dispatchEvent(new CustomEvent("created", { dataEvent: "e" }))
          return child.object
        }
      })
    }
  }

export default Element
