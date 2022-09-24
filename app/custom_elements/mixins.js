export const withAttrs = BaseElement =>
  class extends BaseElement {
    static get observedAttributes() {
      return []
    }

    getAttributes() {
      const getAttrs = (attrs, attrName) => {
        const attr = this.getAttribute(attrName) || (attrName !== 'style' ? this[attrName] : null)
        const attrNameMap =
          attrName === "class" ? "className" : attrName

        if (attr != null) {
          Object.assign(attrs, {
            [attrNameMap]: attr
          })
        }

        return attrs
      }

      return this.constructor.observedAttributes.reduce(getAttrs, {})
    }
  }

// const getParsedProps = (props) => Object.keys(props).reduce((acc, cur) => Object.assign(acc, { [cur]: JSON.parse(props[cur]) }), {})


export const withProps = BaseElement =>
  class extends BaseElement {
    getProps() {
      const attrs = this.getAttributes()
      // console.log(attrs);
      return (attrs) //this.attrsToProps ? this.attrsToProps(attrs) : attrs
    }
  }

export const withCreate = BaseElement =>
  class extends BaseElement {
    constructor() {
      /**
       * Create section, add code here to configure element
       * before insertion into document or attributes are received.
      */

      super()
      console.log(`${this.constructor.name} created`)
      this.init()
    }
  }

export const withInitAndUpdate = BaseElement =>
  class extends BaseElement {
    attributeChangedCallback(name, old, newValue) {
      // console.log(name, old, newValue);
      this.props = this.getProps()


      /**
       * Pre-Connect section, add code here to receive
       * initial attributes before connect.
      */

      /* if (!this.isConnected) {
        this.initAttrs()
        console.log(`${this.constructor.name} init`)
      } */

      /**
       * Update section, add code here to manage updating
       * with new attributes after connect.
      */

     this.update(name, newValue)
     console.log(`${this.constructor.name} update`)
      // if (this.isConnected) {
      // }
    }
  }

export const withMountAndRender = BaseElement =>
  class extends BaseElement {
    connectedCallback() {
      /**
       * Connect section, add code here to configure initial render
       * and context for children.
      */

      if (this.isConnected) {
        // this.props = this.getProps()
        // this.view = this.render(this.props, {
        //     contentView: this.parentNode.view
        // })
        if (this.render) {
          this.render()
        }
        console.log(`${this.constructor.name} connected`)
      }
    }
  }

export const withUnmount = BaseElement =>
  class extends BaseElement {
    disconnectedCallback() {
      this.dispose()
      console.log(`${this.constructor.name} disconnected`)
    }
  }

export const withEventListener = BaseElement =>
  class extends BaseElement {
    addEventListener(event, callback) {
      super.addEventListener(event, callback);
      this.object.on(event, callback)
    }
    removeEventListener(event, callback) {
      super.removeEventListener(event, callback);
      this.object.off(event, callback);
    }
  }

// export const withEvent = (CustomEvent, BaseElement, events) => {
//     return events.reduce((klass, evt) => {
//         const key = "on" + Common.capitalize(evt)
//         klass[key] = ((e) => {
//             console.log("called", e.target)
//             klass.dispatchEvent(new CustomEvent(evt, {dataEvent: e}))
//         })//.bind(klass)
//         klass.handlers = Object.assign(klass.handlers || {}, {[key]: klass[key]} )
//         return klass
//     }, BaseElement)
// }
