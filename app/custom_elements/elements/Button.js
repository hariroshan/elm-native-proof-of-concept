const Element = {}
import { Button } from "@nativescript/core";
import { init } from "./Common";
import elements_data from "./element_data.json";

const button = elements_data["button"]

Element.tagName = button["tag"]
Element.propNames = button["props"];
Element.events = button["events"];

Element.asElement = (UIElement, { CustomEvent }) =>
  class ButtonElement extends UIElement {
    static get observedAttributes() {
      return Element.propNames
    }
    init() {
      this.object = new Button();
    }
    initAttrs() {
      init(this.object, this.props);
      console.log(this.props)
    }
    update() {
      console.log(Element.tagName, "update")
    }
    dispose() {
      this.object.destroyNode();
      console.log(Element.tagName, "disposed")
    }
  }

export default Element

/* import { Button as UIButton } from 'tabris'
import Widget from './Widget'

import Common, { attrsToProps, propNamesToAttrNames, toAttrNameMap, initHandlers, always } from './Common'
const events = ['select'].concat(Widget.event)

const Button = {}

Button.render = Common.render(UIButton)

Button.tagName = 'x-button'
Button.propNames =
    ['alignment',
        'autoCapitalize',
        'font',
        'image',
        'imageTintColor',
        'strokeColor',
        'strokeWidth',
        'style',
        'text',
        'textColor']
        .concat(Widget.propNames)

Button.attributeNames = propNamesToAttrNames(Button.propNames)
Button.attributeNameMap = toAttrNameMap(Button.attributeNames, Button.propNames)
Button.attrsToProps = attrsToProps(Button.attributeNameMap)

Button.asElement = (UIElement, { CustomEvent }) =>
    class ButtonElement extends UIElement {
        static get observedAttributes() {
            return Button.attributeNames
        }

        init = always(
            initHandlers(CustomEvent, events, this)
        )
        update = Common.update
        attrsToProps = Button.attrsToProps

        render = (props, context) => {
            return Button.render(props, context, this.handlers || {})
        }
    }

export default Button
 */
