import { JComponent, fromComponents } from "../../lib/jComponent.js"

export class JButton extends JComponent {
  static styleURL = fromComponents(`ui/button/button.css`)
  static templateURL = fromComponents(`ui/button/button.html`)
  static observed = ["disabled", "variant"]
  
  ready() {
    this.btn = this.shadowRoot.querySelector("button")
    this.btn.addEventListener('click',  (e) => {
      if (this.disabled) return

      this.emit('button-click', {originalEvent: e})
    })
  }

  get disabled() {
    return this.hasAttribute.disabled
  }

  set disabled(v){
    if (v){
      this.setAttribute('disabled', '')
    } else {
      this.removeAttribute('disabled')
    }
  }
}

customElements.define('j-button', JButton)