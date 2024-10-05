# Tan Compose

`Tan Compose` is a lightweight library that turns DDL (Declarative Definition Language) into reusable web components. It allows you to create fully customizable and extendable web components with built-in support for theming, event emission, and encapsulation using the Shadow DOM.

## Features

- **Declarative Component Definition**: Easily describe web components using a JSON-like structure.
- **Theming and Styling**: Apply styles through CSS variables and inline styles.
- **Shadow DOM Encapsulation**: Prevent style leakage and ensure component encapsulation.
- **Event Emitters**: Communicate between child and parent components via custom events.
- **Recursive Component Building**: Nest and compose components in a declarative way.

## Installation

Install the package via npm:

```bash
npm install tan-compose
```

## Usage

### Basic Component Example

Create a simple button component using Tan Compose.

```javascript
import { describe, build } from "tan-compose";

const formBtn = describe({
  tag: "button",
  action: (event) => console.log(event),
  className: "my-button",
  styles: { margin: "10px", padding: "5px" },
  parent: "body",
});

build("tan-btn", formBtn);
```

Use it in HTML

```html
<tan-btn>Click Here</tan-btn>
```

### Nested Components Example (Form with Inputs)

Let's build a form with multiple nested components: labels, inputs, buttons, and a textarea.

```javascript
import { describe, build } from 'tan-compose';

// Form structure with themed styles and event emitters
const form = describe({
    tag: 'form',
    theme: {
        primaryColor: 'blue',
        secondaryColor: 'gray',
        buttonPadding: '10px'
    },
    styles: { padding: "20px", border: "1px solid #ccc", width: "300px" },
    emit: [
        {
            name: 'formSubmitted',
            handler: (e) => { console.log("Form submitted:", e.detail); }
        },
        {
            name: 'formCancelled',
            handler: (e) => { console.log("Form cancelled:", e.detail); }
        }
    ],
    children: [
        describe({
            tag: 'label',
            styles: { display: "block", marginBottom: "10px" },
            children: [
                { tag: 'span', innerHTML: 'Full Name: ' },
                describe({
                    tag: 'input',
                    attributes: { name: 'fullName', placeholder: 'Enter Full Name' }
                })
            ]
        }),
        describe({
            tag: 'label',
            styles: { display: "block", marginBottom: "10px" },
            children: [
                { tag: 'span', innerHTML: 'Email: ' },
                describe({
                    tag: 'input',
                    attributes: { name: 'email', type: 'email', placeholder: 'Enter Email' }
                })
            ]
        }),
        describe({
            tag: 'label',
            styles: { display: "block", marginBottom: "10px" },
            children: [
                { tag: 'span', innerHTML: 'Bio: ' },
                describe({
                    tag: 'textarea',
                    attributes: { name: 'bio', placeholder: 'Enter your bio' }
                })
            ]
        }),
        describe({
            tag: 'div',
            styles: { marginTop: "20px", display: "flex", justifyContent: "space-between" },
            children: [
                describe({
                    tag: 'button',
                    attributes: { type: 'submit' },
                    action: (event) => {
                        event.preventDefault();
                        event.target.emitEvent('formSubmitted', { message: "Form Submitted Successfully!" });
                    },
                    styles: { backgroundColor: 'var(--primaryColor)', padding: 'var(--buttonPadding)', color: 'white' },
                    innerHTML: 'Submit'
                }),
                describe({
                    tag: 'button',
                    attributes: { type: 'button' },
                    action: (event) => {
                        event.preventDefault();
                        event.target.emitEvent('formCancelled', { message: "Form Submission Cancelled" });
                    },
                    styles: { backgroundColor: 'var(--secondaryColor)', padding: 'var(--buttonPadding)', color: 'white' },
                    innerHTML: 'Cancel'
                })
            ]
        })
    ]
});

// Build the form component with shadow DOM and event emission
build("tan-form", form);
```

Use it in HTML

```html
<tan-form></tan-form>
```

### Theming Example

You can easily apply theming using CSS variables:

```javascript
const button = describe({
    tag: 'button',
    theme: {
        primaryColor: 'red'
    },
    styles: { backgroundColor: 'var(--primaryColor)' },
    innerHTML: 'Themed Button'
});

build('themed-btn', button);
```

Use it in HTML

```html
<themed-btn></themed-btn>
```

### API

`describe(component)`
Creates a component description object.

- tag: HTML tag to create (default: div).
- theme: Object of CSS variables for theming.
- styles: Object of inline styles.
- className: CSS class names.
- attributes: HTML attributes to set.
- children: Array of child components.
- action: Event handler for actions like click.
- emit: Array of event