# Tan Compose

`Tan Compose` is a tiny library for declaratively defining reusable Web
Components. One `describe()` call captures a component's tag, theme, styles,
template, lifecycle hooks, and reactive state; one `build()` call registers it
as a real custom element. No JSX, no compiler, no framework runtime — Shadow
DOM, lifecycle, and reactivity are wired up for you on top of the platform.

> **Status:** stable at **1.1**. The API is frozen; further changes will be
> additive. Pair with
> [`@ra9/tan-compose-kit`](https://jsr.io/@ra9/tan-compose-kit) for 23
> ready-made components and 6 theme presets (light, dark, Bootstrap, Tailwind,
> Material, shadcn) on top of this engine, and
> [`@ra9/tan-compose-icons`](https://jsr.io/@ra9/tan-compose-icons) for 44
> inline-SVG icons that pair with the kit.

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
- **Typed Properties**: Declarative `string` / `number` / `boolean` / `json`
  props with reactive setters and optional attribute reflection
- **Function Templates**: Templates can be functions `(ctx) => string` for
  reactive text interpolation
- **Event Delegation**: Map-based delegated event handlers
  (`"click .selector": handler`) attached once at the shadow-container level
- **Keyed List Rendering**: `for: { items, key, render }` with DOM-node reuse
  across renders for performant lists
- **Conditional Rendering**: `if: (ctx) => boolean` to omit subtrees from output
- **Reactive Attributes**: Opt-in via `observedAttributes`; changes trigger
  re-render
- **State Management**: Built-in `setState` / `getState` (setState triggers
  re-render when the value changes)
- **Lifecycle Hooks**: `beforeMount`, `afterMount`, and `unmount`
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

### Typed Properties

Declare reactive properties on the instance. Setting one triggers a re-render:

```javascript
import { build, describe } from "@ra9/tan-compose";

build(
  "user-card",
  describe({
    props: {
      name: { type: "string", default: "Anonymous" },
      age: { type: "number", default: 0 },
      isAdmin: { type: "boolean", default: false, reflect: true },
      tags: { type: "json", default: [] },
    },
    template: ({ props }) => `
      <h3>${props.name}, ${props.age}</h3>
      ${props.isAdmin ? '<span class="admin">admin</span>' : ""}
      ${(props.tags ?? []).map((t) => `<span>${t}</span>`).join(" ")}
    `,
  }),
);
```

```html
<user-card name="Carlos" age="29" tags='["dev","ops"]'></user-card>
<script type="module">
  document.querySelector("user-card").tags = ["dev", "ops", "design"];
</script>
```

### Function Templates and Event Delegation

`template` can be a function that receives the render context. Combine with
`events` to keep handlers declarative:

```javascript
build(
  "click-counter",
  describe({
    template: ({ state }) => `
      <p>Count: ${state.count ?? 0}</p>
      <button class="bump">Bump</button>
      <button class="reset">Reset</button>
    `,
    events: {
      "click .bump": (_e, ctx) =>
        ctx.setState("count", (ctx.state.count ?? 0) + 1),
      "click .reset": (_e, ctx) => ctx.setState("count", 0),
    },
  }),
);
```

### Lists and Conditionals

Render keyed lists with DOM-node reuse and short-circuit subtrees with `if`:

```javascript
build(
  "todo-list",
  describe({
    props: {
      items: { type: "json", default: [] },
      hideDone: { type: "boolean", default: false },
    },
    children: [
      describe({
        tag: "p",
        template: "All done!",
        if: ({ props }) => props.hideDone && props.items.every((i) => i.done),
      }),
      describe({
        tag: "ul",
        for: {
          items: ({ props }) =>
            props.hideDone ? props.items.filter((i) => !i.done) : props.items,
          key: (item) => item.id,
          render: (item) =>
            describe({
              tag: "li",
              template: `${item.done ? "✔" : "○"} ${item.text}`,
            }),
        },
      }),
    ],
  }),
);
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
