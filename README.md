# Tan Compose

`Tan Compose` is a lightweight, production-ready library that turns DDL
(Declarative Definition Language) into reusable web components. It allows you to
create fully customizable and extendable web components with built-in support
for theming, event emission, reactivity, and encapsulation using the Shadow DOM.

## Features

- **Declarative Component Definition**: Easily describe web components using a
  JSON-like structure
- **Component Registry**: Prevents duplicate registrations and allows component
  reusability
- **Theming and Styling**: Apply styles through CSS variables and inline styles
  with proper Shadow DOM encapsulation
- **Shadow DOM Encapsulation**: Prevent style leakage and ensure component
  isolation
- **Event Emitters**: Communicate between child and parent components via custom
  events
- **Reactive Attributes**: Components automatically update when attributes
  change
- **State Management**: Built-in state management with `setState` and `getState`
  methods
- **Lifecycle Hooks**: `beforeMount` and `afterMount` hooks for component
  lifecycle management
- **Memory Leak Prevention**: Automatic cleanup of event listeners and resources
- **Recursive Component Building**: Nest and compose components in a declarative
  way
- **Template Support**: Use HTML templates for component content

## Installation

With Deno (JSR):

```bash
deno add jsr:@ra9/tan-compose
```

With npm/Node bundlers (via JSR):

```bash
npx jsr add @ra9/tan-compose
```

Or import directly from a URL with Deno:

```typescript
import { build, describe } from "https://deno.land/x/tan_compose/mod.ts";
```

## Usage

### Basic Component Example

Create a simple button component using Tan Compose.

```javascript
import { build, describe } from "tan-compose";

const formBtn = describe({
  tag: "button",
  action: (event) => console.log("Button clicked!", event),
  className: "my-button",
  styles: { margin: "10px", padding: "5px" },
});

build("tan-btn", formBtn);
```

Use it in HTML:

```html
<tan-btn>Click Here</tan-btn>
```

### Using Templates

Create components with HTML templates:

```javascript
const card = describe({
  tag: "div",
  className: "card",
  template: `
    <h2>Card Title</h2>
    <p>This is a card component with template support.</p>
  `,
  styles: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
});

build("tan-card", card);
```

```html
<tan-card></tan-card>
```

### Nested Components Example

Build complex UIs by nesting components:

```javascript
import { build, describe } from "tan-compose";

const formComponent = describe({
  tag: "form",
  theme: {
    primaryColor: "#007bff",
    secondaryColor: "#6c757d",
    spacing: "10px",
  },
  styles: {
    padding: "20px",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    maxWidth: "400px",
    backgroundColor: "#fff",
  },
  children: [
    describe({
      tag: "div",
      className: "form-group",
      styles: { marginBottom: "var(--spacing)" },
      children: [
        describe({
          tag: "label",
          template: "Full Name:",
          styles: { display: "block", marginBottom: "5px", fontWeight: "bold" },
        }),
        describe({
          tag: "input",
          attributes: {
            name: "fullName",
            placeholder: "Enter your full name",
            type: "text",
          },
          styles: {
            width: "100%",
            padding: "8px",
            border: "1px solid #ddd",
            borderRadius: "4px",
          },
        }),
      ],
    }),
    describe({
      tag: "div",
      className: "form-group",
      styles: { marginBottom: "var(--spacing)" },
      children: [
        describe({
          tag: "label",
          template: "Email:",
          styles: { display: "block", marginBottom: "5px", fontWeight: "bold" },
        }),
        describe({
          tag: "input",
          attributes: {
            name: "email",
            type: "email",
            placeholder: "Enter your email",
          },
          styles: {
            width: "100%",
            padding: "8px",
            border: "1px solid #ddd",
            borderRadius: "4px",
          },
        }),
      ],
    }),
    describe({
      tag: "button",
      attributes: { type: "submit" },
      template: "Submit",
      action: (event) => {
        event.preventDefault();
        console.log("Form submitted!");
      },
      styles: {
        backgroundColor: "var(--primaryColor)",
        color: "white",
        padding: "10px 20px",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
      },
    }),
  ],
});

build("tan-form", formComponent);
```

```html
<tan-form></tan-form>
```

### Lifecycle Hooks

Use `beforeMount` and `afterMount` hooks:

```javascript
const component = describe({
  tag: "div",
  template: "<p>Component with lifecycle hooks</p>",
  beforeMount: () => {
    console.log("Component is about to mount");
  },
  afterMount: () => {
    console.log("Component has mounted");
  },
});

build("lifecycle-component", component);
```

### Custom Event Emission

Create components that emit custom events:

```javascript
const counterBtn = describe({
  tag: "button",
  template: "Increment Counter",
  emit: [
    {
      name: "counterChanged",
      handler: (e) => {
        console.log("Counter value:", e.detail.count);
      },
    },
  ],
  action: function (event) {
    // Emit custom event
    this.emitEvent("counterChanged", { count: Math.random() });
  },
});

build("counter-btn", counterBtn);
```

```html
<counter-btn></counter-btn>
```

### Theming with CSS Variables

Apply consistent theming across components:

```javascript
const themedButton = describe({
  tag: "button",
  theme: {
    primaryColor: "#ff6b6b",
    hoverColor: "#ff5252",
    textColor: "#ffffff",
  },
  template: "Themed Button",
  styles: {
    backgroundColor: "var(--primaryColor)",
    color: "var(--textColor)",
    padding: "12px 24px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
});

build("themed-btn", themedButton);
```

```html
<themed-btn></themed-btn>
```

### Reactive Attributes

Declare which attributes should trigger re-renders via `observedAttributes`:

```javascript
const dynamicText = describe({
  tag: "div",
  observedAttributes: ["data-text"],
  attributes: { "data-text": "Initial text" },
  template: "Check the DOM on attribute change",
});

build("dynamic-text", dynamicText);
```

> **Breaking change in 0.2.0:** Reactivity is now opt-in. In 0.1.x, every key of
> `attributes` was implicitly observed; you must now list them explicitly in
> `observedAttributes`.

```html
<dynamic-text data-text="Initial"></dynamic-text>

<script>
  // Change attribute dynamically
  const el = document.querySelector("dynamic-text");
  setTimeout(() => {
    el.setAttribute("data-text", "Updated text");
  }, 2000);
</script>
```

### State Management

Use built-in state management:

```javascript
const statefulComponent = describe({
  tag: "div",
  template: "<button>Click to update state</button>",
  afterMount: function () {
    this.setState("count", 0);

    this.querySelector("button").addEventListener("click", () => {
      const count = this.getState("count") + 1;
      this.setState("count", count);
      console.log("Current count:", count);
    });
  },
});

build("stateful-component", statefulComponent);
```

## API Reference

### `build(tagName: string, description: DescribeOptions): void`

Registers a new custom element with the given tag name.

**Parameters:**

- `tagName`: The custom element tag name (must contain a hyphen)
- `description`: Component description object

### `describe(options: DescribeOptions): DescribeOptions`

Creates a component description object.

**Options:**

- `tag?: string` - HTML tag to create (default: 'div')
- `theme?: Record<string, string>` - CSS variables for theming
- `styles?: Record<string, string>` - Inline styles
- `className?: string` - CSS class names
- `attributes?: Record<string, string>` - HTML attributes
- `template?: string` - HTML template content
- `children?: DescribeOptions[]` - Array of child components
- `action?: (event: Event) => void` - Click event handler
- `emit?: EventEmitter[]` - Custom event emitters
- `observedAttributes?: string[]` - Attribute names that trigger re-renders
- `beforeMount?: () => void` - Hook called before first render
- `afterMount?: () => void` - Hook called after the element is connected
- `unmount?: () => void` - Hook called when the element is disconnected

### Component Methods

Custom components have these methods available:

- `emitEvent(eventName: string, data: any)` - Emit a custom event
- `setState(key: string, value: any)` - Set a state value (triggers re-render if
  the value changed)
- `getState<T>(key: string): T | undefined` - Get a state value
- `render()` - Manually trigger a re-render

### Helper Functions

- `isComponentRegistered(tagName: string): boolean` - Check if component is
  registered
- `getRegisteredComponents(): string[]` - Get all registered component names

## Advanced Features

### Preventing Duplicate Registration

The library automatically prevents duplicate component registrations:

```javascript
build("my-component", describe({ tag: "div" }));
build("my-component", describe({ tag: "div" })); // Warning logged, skips re-registration
```

### Memory Management

All event listeners are automatically cleaned up when components are removed
from the DOM, preventing memory leaks.

## Examples

See the `/examples` folder for complete working examples:

- Basic Button Component
- Form with Validation
- Themed Dashboard
- Interactive Card Component
- State Management Example

## Browser Support

Works in all modern browsers that support:

- Custom Elements v1
- Shadow DOM v1
- ES6 Classes

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Links

- [GitHub Repository](https://github.com/ra9/tan-compose)
- [Documentation](https://ra9.github.io/tan-compose)
- [Issue Tracker](https://github.com/ra9/tan-compose/issues)
