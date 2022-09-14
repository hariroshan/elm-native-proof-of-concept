const baseElement = (BaseElement) =>
  class extends BaseElement {
    constructor() {
      /**
       * Create section, add code here to configure element
       * before insertion into document or attributes are received.
      */

      super()
      console.log(`${this.constructor.name} created`)
    }
    static get observedAttributes() {
      return []
    }

    getAttributes() {
      const getAttrs = (attrs, attrName) => {
        const attr = this.getAttribute(attrName) || (attrName !== 'style' ? this[attrName] : null)

        if (attr != null) {
          Object.assign(attrs, {
            [attrName]: attr
          })
        }

        return attrs
      }

      return this.constructor.observedAttributes.reduce(getAttrs, {})
    }

    getProps() {
      const attrs = this.getAttributes()
      return this.attrsToProps ? this.attrsToProps(attrs) : attrs
    }

    attributeChangedCallback() {
      this.props = this.getProps()

      /**
       * Pre-Connect section, add code here to receive
       * initial attributes before connect.
      */

      if (!this.isConnected) {
        // this.init(this.props)
        console.log(`${this.constructor.name} init`)
      }

      /**
       * Update section, add code here to manage updating
       * with new attributes after connect.
      */

      if (this.isConnected) {
        // this.update(this.props, this.view)
        console.log(`${this.constructor.name} update`)
      }
    }

    connectedCallback() {
      /**
       * Connect section, add code here to configure initial render
       * and context for children.
      */

      if (this.isConnected) {
        // this.props = this.getProps()
        // this.view = this.render(this.props, {
        //   contentView: this.parentNode.view
        // })


        console.log(`${this.constructor.name} connected`)
      }
    }

    disconnectedCallback() {
      // this.view.dispose()
      console.log(`${this.constructor.name} disconnected`)
    }
  }

const genericBuilder = (tagName) => ({
  tagName,
  asElement: (UIElment) => class extends UIElement {
    static get observedAttributes() {
      return []
    }
    init() {
      console.log(tagName, "init")
    }
    update() {
      console.log(tagName, "updated")
    }
    render() {
      console.log(tagName, "render")
    }
  }
})

const Frame = genericBuilder("x-frame")

const Page = genericBuilder("x-page")

const Label = genericBuilder("x-label")


export default function (window) {
  const { HTMLElement, customElements } = window
  const UIElement = baseElement(HTMLElement);

  customElements.define(Frame.tagName, Frame.asElement(UIElement));
  customElements.define(Page.tagName, Page.asElement(UIElement));
  customElements.define(Label.tagName, Label.asElement(UIElement));

}
