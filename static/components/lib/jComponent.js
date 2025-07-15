import camel from "./camel.js"

export class JComponent extends HTMLElement {
    static templateURL = null
    static styleURL = null
    static observed = []

    constructor() {
        super()
        this.attachShadow({mode : 'open'})
        this.#attachStyles().then(() => this.#attachTemplate()).then(() => this.ready?.())
    }

    static get observedAttributes(){
        return this.observed
    }
    attributeChangedCallback(name, _, newVal){
        const prop = camel(name)
        if(this[prop] !== undefined){
            this[prop] = newVal !== null ? newVal : false
        }
    }

    emit(
        type, 
        detail = {}, 
        opts = {}
    ){
        this.dispatchEvent(
            new CustomEvent(
                type, {
                    bubbles:true,
                    composed: true,
                    detail,
                    ...opts
                }
            )
        )
    }

    async #attachStyles() {
        const url = this.constructor.styleURL
        if (!url) return

        if ('adoptedStyleSheets' in Document.prototype && CSSStyleSheet.prototype.replaceSync){
            const text = await fetch(
                new URL(
                    url, 
                    import.meta.url
                )
            ).then((res) => res.text())
            const sheet = new CSSStyleSheet()
            sheet.replaceSync(text)
            this.shadowRoot.adoptedStyleSheets = [sheet]
        } else {
            const link = document.createElement('link')
            link.setAttribute('rel', 'stylesheet')
            link.setAttribute('href', new URL(url, import.meta.url))
            this.shadowRoot.append(link)
        }
    }

    async #attachTemplate() {
        const url = this.constructor.templateURL
        if (!url) return
        const html = await fetch(new URL(url,import.meta.url)).then((res) => res.text())
        const t = document.createElement('template')
        t.innerHTML = html
        this.shadowRoot.append(t.content.cloneNode(true))
    }
}

/**
 * Get path of file from components folder relative to JComponent file
 * @param {string} str 
 * @returns 
 */
export function fromComponents(str){
    return `../${str}`
}