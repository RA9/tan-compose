import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.ts';

@customElement('btn')
export class Btn extends LitElement {
  // Define properties
  @property()
  label?: string = 'Click Me';
  @property({ type: String })
  buttonClass?: string = '';

  // Optional: Allow passing the type of button (e.g., button, submit)
  @property()
   type?: string = 'button';

  // CSS styles scoped to this component (optional if using Tailwind)
  static styles = css`
    /* You can add component-specific styles here if needed */
  `;

  // Render method
  render() {
    return html`
      <button
        type="${this.type}"
        class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 ${this.buttonClass}"
        @click="${this._handleClick}"
      >
        ${this.label}
      </button>
    `;
  }

  // Handle click events and dispatch a custom event
  private _handleClick(event: Event) {
    // Dispatch a custom event that bubbles up
    this.dispatchEvent(new CustomEvent('button-click', {
      detail: { message: 'Button clicked!' },
      bubbles: true,
      composed: true
    }));
  }
}