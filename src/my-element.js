import { LitElement, html, css } from "lit";

class CustomInspector extends LitElement {
  constructor() {
    super();

    this.tagName = '';
    this.element = document;
    this.element.addEventListener('mouseover', this.handlerEvent);
    this.element.addEventListener('mouseout', this.handlerEvent);
  }

  
  static get properties() {
    return {
      tagName: { type: String },
    }
  }

  static get styles() {
    return css`
      .info {
        position: absolute;
        font-size: 200px;
        width: max-content;
        display: inline-block;
        border: 1px solid black;
        padding: 10px;
        background: white;
        transition: 0.6s all;
        opacity: 1;
        position: absolute;
        bottom: 20px;
        left: 10px;
        z-index: 3;
        color: black;
      }
    `
  }

  // update(changedProperties) {
  //   changedProperties.forEach((oldValue, propName) => {
  //     console.log(`${propName} changed. oldValue: ${oldValue}`);
  //   });
  // }

  handlerEvent(event) {
    function str(el) {
      if (!el) {
        return "null"
      }

      if ((el.tagName).toLowerCase() !== 'body' && (el.tagName).toLowerCase() !== 'html') {
        return el.className || el.tagName;
      }
    }

    this.tagName = str(event.target);

    if (this.tagName !== undefined) {
      if (event.type === 'mouseover') {
        event.target.style.background = 'rgb(170,200,250,0.3)';
        event.target.style.outline = '1px solid blue';
        event.target.title = this.tagName;
        console.log(event.clientX + ' ' + event.clientY)
      }

      if (event.type === 'mouseout') {
        event.target.style.background = '';
        event.target.style.outline = 'none';
      }
    }
  }

  // positionOfCoursor(event) {

  // }

  render() {
    return html`
      <div class="info">
        ${this.tagName}
           Tag name is
      </div>`;
  }
}

customElements.define('custom-inspector', CustomInspector);