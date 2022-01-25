import { LitElement, html, css } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';

class MyElement extends LitElement {
  static get properties() {
    return {
      classes: {},
      styles: {},
      nameOfTag: { type: String },
      positionX: { type: Number },
      positionY: { type: Number },
    };
  };

  static styles = css`
  .someclass { border: 1px solid black; display: flex; justify-content: center; align-items: center; width: fit-content; height: 20px}
  .anotherclass { background-color: white; }`;

  constructor() {
    super();
    this.nameOfTag = '';
    this.position = 0;

    window.addEventListener('show-tagname', this.showTagname.bind(this));
    window.addEventListener('set-position', this.setPosition.bind(this));

    this.classes = { someclass: true, anotherclass: true };
    this.styles = { color: 'black', fontFamily: 'Arial, sans-serif', fontSize: '10px', fontWeight: 'normal' };
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('mouseover', this._handlere);
    document.addEventListener('mousemove', this._getPosition)
    document.addEventListener('mouseout', this._handlere);
    console.log('Component did mount');
  }

  disconnectedCallback() {
    document.removeEventListener('mouseover', this._handlere);
    document.removeEventListener('mouseout', this._handlere);
    document.removeEventListener('mouseomove', this._getPosition);
    console.log('Component did unmount');
    super.disconnectedCallback();
  }

  _getPosition(e) {
    this.positionX = e.pageX;
    this.positionY = e.pageY;

    this.dispatchEvent(new CustomEvent('set-position', {
      bubbles: true,
      cancelable: false,
      composed: true,
      detail: {
        positionX: this.positionX,
        positionY: this.positionY
      }
    }));
  }

  setPosition(e) {
    this.positionY = e.detail.positionY;
    this.positionX = e.detail.positionX;
  }

  showTagname(e) {
    this.nameOfTag = e.detail.nameOfTag;
  }

  _handlere(e) {
    let name;

    function str(el) {
      if (!el) {
        return "null"
      }

      if ((el.tagName).toLowerCase() !== 'body' && (el.tagName).toLowerCase() !== 'html') {
        return el.tagName;
      }
    }

    name = str(e.target);

    if (name !== undefined) {
      if (e.type === 'mouseover') {
        e.target.style.background = 'rgb(170,200,250,0.3)';
        e.target.style.outline = '1px solid blue';

        this.dispatchEvent(new CustomEvent('show-tagname', {
          bubbles: true,
          cancelable: false,
          composed: true,
          detail: {
            nameOfTag: name
          }
        }))
      }

      if (e.type === 'mouseout') {
        e.target.style.background = '';
        e.target.style.outline = 'none';
        this.dispatchEvent(new CustomEvent('show-tagname', {
          bubbles: true,
          cancelable: false,
          composed: true,
          detail: {
            nameOfTag: ''
          }
        }))
      }
    }
  }

  render() {
    return html`
    <style>
      :host {
        position:absolute;
        z-index:9999;
        top: calc(${this.positionY}px + 18px);
        left: calc(${this.positionX}px - 50px);
      </style>
      <div class=${classMap(this.classes)} style=${styleMap(this.styles), this.nameOfTag
        ? 'border: 1px solid black; opacity: 1;'
        : 'border: none; opacity: 0;'
      }>
        ${this.nameOfTag}<p>
      </div>
    `;
  }
}

customElements.define('custom-inspector', MyElement);
