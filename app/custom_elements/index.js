import { Application } from '@nativescript/core';

// const baseElement = (BaseElement) =>
//   class extends BaseElement {
//     constructor() {
//       /**
//        * Create section, add code here to configure element
//        * before insertion into document or attributes are received.
//       */


//       super()
//       console.log(`${this.constructor.name} created`)
//     }
//     static get observedAttributes() {
//       return ["text"]
//     }

//     getAttributes() {
//       const getAttrs = (attrs, attrName) => {
//         const attr = this.getAttribute(attrName) || (attrName !== 'style' ? this[attrName] : null)

//         if (attr != null) {
//           Object.assign(attrs, {
//             [attrName]: attr
//           })
//         }

//         return attrs
//       }

//       return this.constructor.observedAttributes.reduce(getAttrs, {})
//     }

//     getProps() {
//       const attrs = this.getAttributes()
//       return this.attrsToProps ? this.attrsToProps(attrs) : attrs
//     }

//     attributeChangedCallback() {
//       this.props = this.getProps()

//       /**
//        * Pre-Connect section, add code here to receive
//        * initial attributes before connect.
//       */

//       if (!this.isConnected) {
//         this.init(this.props)
//         console.log(`${this.constructor.name} init`)
//       }

//       /**
//        * Update section, add code here to manage updating
//        * with new attributes after connect.
//       */

//       if (this.isConnected) {
//         // this.update(this.props, this.view)
//         console.log(`${this.constructor.name} update`)
//       }
//     }

//     connectedCallback() {
//       /**
//        * Connect section, add code here to configure initial render
//        * and context for children.
//       */

//       if (this.isConnected) {
//         // this.props = this.getProps()
//         // this.view = this.render(this.props, {
//         //   contentView: this.parentNode.view
//         // })

//         console.log(`${this.constructor.name} connected`)
//       }
//     }

//     disconnectedCallback() {
//       // this.view.dispose()
//       console.log(`${this.constructor.name} disconnected`)
//     }
//   }

// const genericBuilder = (tagName) => ({
//   tagName,
//   asElement: (UIElement) => class extends UIElement {
//     static get observedAttributes() {
//       return []
//     }
//     init() {
//       console.log(tagName, "init", this.children)
//     }
//     update() {
//       console.log(tagName, "updated")
//     }
//     render() {
//       console.log(tagName, "render")
//     }
//   }
// })

// const Frame = genericBuilder("x-frame")

// const Page = genericBuilder("x-page")

// const Label = genericBuilder("x-label")

// const StackLayout = genericBuilder("x-stack-layout")

// const Button = genericBuilder("x-button")


export default function ({ window, app }) {
  const { HTMLElement, customElements } = window
  const { mixins, elements } = app
  // console.log(mixins, elements);

  const mix = (klass, mixin) => mixin(klass)
  const UIElement = mixins.reduce(mix, HTMLElement)

  elements.forEach(rawElement => {
    const name = rawElement.tagName
    // const Base = withEvent(window.CustomEvent, UIElement, rawElement.event)
    // console.log(name, Base.handlers)
    const element = rawElement.asElement(UIElement, window)
    customElements.define(name, element)
  })

  Application.run({
    create() {
      return document.body.children[0].object
    }
  })
}
