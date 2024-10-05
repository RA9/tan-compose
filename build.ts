import { DescribeOptions } from './types.ts';

/**
 * 
 *  Builds a custom component with the given tag name and description options
 */ 
export function build(tagName: string, description: DescribeOptions): void {
  class CustomComponent extends HTMLElement {
      constructor() {
          super();

          // Initialize Shadow DOM for component encapsulation
          const shadow = this.attachShadow({ mode: 'open' });

          // Theme setup using CSS Variables
          if (description.theme) {
              const themeStyle = document.createElement('style');
              let cssVariables = ':host {';
              Object.entries(description.theme).forEach(([key, value]) => {
                  cssVariables += `--${key}: ${value}; `;
              });
              cssVariables += '}';
              themeStyle.textContent = cssVariables;
              shadow.appendChild(themeStyle);
          }

          // Apply styles inline
          if (description.styles) {
              const styleString = Object.entries(description.styles)
                  .map(([key, value]) => `${key}: ${value}`)
                  .join("; ");
              this.style.cssText = styleString;
          }

          // Set class if available
          if (description.className) {
              this.className = description.className;
          }

          // Set attributes if any
          if (description.attributes) {
              setAttributes(this, description.attributes);
          }

          // Create child elements recursively
          if (description.children && description.children.length > 0) {
              description.children.forEach(childDesc => {
                  const childElement = document.createElement(childDesc.tag || 'div');
                  build(childDesc.tag as string, childDesc); // Recursively build child components
                  shadow.appendChild(childElement);
              });
          }

          // Setup event emission
          if (description.emit) {
              description.emit.forEach(event => {
                  this.addEventListener(event.name, event.handler);
              });
          }
      }

      connectedCallback() {
          if (description.afterMount) {
              description.afterMount();
          }

          // Handle click or other event action if provided
          if (description.action) {
              this.addEventListener('click', description.action);
          }

          // Slot content for custom component content
          const slotContent = document.createElement('slot');
          this.shadowRoot!.appendChild(slotContent);
      }

      disconnectedCallback() {
          if (description.action) {
              this.removeEventListener('click', description.action);
          }
      }

      // Custom event emitter method
      emitEvent(eventName: string, data: any) {
          const event = new CustomEvent(eventName, {
              detail: data,
              bubbles: true,
              composed: true
          });
          this.dispatchEvent(event);
      }
  }

  // Define the custom element in the DOM
  customElements.define(tagName, CustomComponent);
}

// Helper function to set attributes on elements
function setAttributes(element: HTMLElement, attributes: Record<string, string>): void {
  Object.keys(attributes).forEach(attr => {
      element.setAttribute(attr, attributes[attr]);
  });
}
