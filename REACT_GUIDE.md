# Complete React Guide for Beginners

## Table of Contents
1. [What is React?](#what-is-react)
2. [Why React?](#why-react)
3. [Core Concepts](#core-concepts)
4. [JSX Syntax](#jsx-syntax)
5. [Components](#components)
6. [Props](#props)
7. [State](#state)
8. [Hooks](#hooks)
9. [Events](#events)
10. [Conditional Rendering](#conditional-rendering)
11. [Lists and Keys](#lists-and-keys)
12. [Forms](#forms)
13. [Styling](#styling)
14. [TypeScript with React](#typescript-with-react)
15. [Common Patterns](#common-patterns)
16. [Best Practices](#best-practices)
17. [Resources](#resources)

---

## What is React?

**React** is a JavaScript library created by Facebook for building user interfaces (UIs).

### Simple Explanation

Think of React like **LEGO blocks**:
- Each block is a **component** (a reusable piece)
- You combine blocks to build a **page**
- When data changes, React automatically updates the blocks

### Real-World Analogy

**Traditional Website (HTML):**
```
You build a house. To change a room, you rebuild the entire house.
```

**React Website:**
```
You build a house with modular rooms. To change a room, you only update that room.
```

---

## Why React?

### Benefits

1. **Reusable Components**
   - Write once, use everywhere
   - Like functions in programming

2. **Fast Updates**
   - Only updates what changed
   - No full page reloads

3. **Component-Based**
   - Break UI into small pieces
   - Easy to maintain

4. **Large Ecosystem**
   - Many libraries and tools
   - Strong community support

---

## Core Concepts

### 1. Components

A **component** is a piece of UI that you can reuse.

**Think of it like:**
- A button
- A navigation bar
- A product card
- A form

**Example:**
```tsx
// This is a component
function Button() {
    return <button>Click Me</button>;
}
```

### 2. JSX

**JSX** looks like HTML but it's actually JavaScript.

**HTML:**
```html
<div class="container">
    <h1>Hello</h1>
</div>
```

**JSX:**
```tsx
<div className="container">
    <h1>Hello</h1>
</div>
```

**Key Differences:**
- `class` → `className` (because `class` is a reserved word in JavaScript)
- `onclick` → `onClick` (camelCase)
- Can use JavaScript inside: `{variable}`

### 3. Virtual DOM

React creates a **virtual** copy of your page in memory.

**Why?**
- Fast to update
- Only changes what's different
- Efficient rendering

**Analogy:**
- Like a blueprint before building
- Make changes to blueprint first
- Then update the real building

---

## JSX Syntax

### Basic JSX

```tsx
// Simple element
<div>Hello World</div>

// With attributes
<div className="container" id="main">
    <h1>Title</h1>
</div>

// Self-closing tags
<img src="image.jpg" alt="Description" />
<br />
<input type="text" />
```

### JavaScript in JSX

Use `{}` to insert JavaScript:

```tsx
const name = "John";

// Display variable
<div>Hello, {name}</div>

// Calculations
<div>Total: {10 + 5}</div>

// Functions
<div>{name.toUpperCase()}</div>

// Ternary operator
<div>{age >= 18 ? "Adult" : "Minor"}</div>
```

### Multiple Elements

**Must wrap in a parent element:**

```tsx
// ❌ Wrong - multiple root elements
<div>First</div>
<div>Second</div>

// ✅ Correct - single parent
<div>
    <div>First</div>
    <div>Second</div>
</div>

// ✅ Or use Fragment (invisible wrapper)
<>
    <div>First</div>
    <div>Second</div>
</>
```

### Comments in JSX

```tsx
<div>
    {/* This is a comment */}
    <h1>Title</h1>
    {/* 
        Multi-line
        comment
    */}
</div>
```

---

## Components

### Function Components

**Simple Component:**
```tsx
function Welcome() {
    return <h1>Welcome!</h1>;
}
```

**Component with Content:**
```tsx
function Card() {
    return (
        <div className="card">
            <h2>Card Title</h2>
            <p>Card content goes here</p>
        </div>
    );
}
```

**Using a Component:**
```tsx
function App() {
    return (
        <div>
            <Welcome />
            <Card />
            <Card />  {/* Can use multiple times */}
        </div>
    );
}
```

### Export/Import

**Export (create component):**
```tsx
// components/Button.tsx
export function Button() {
    return <button>Click</button>;
}
```

**Import (use component):**
```tsx
// pages/Shop.tsx
import { Button } from '@/components/Button';

function Shop() {
    return (
        <div>
            <Button />
        </div>
    );
}
```

**Default Export:**
```tsx
// components/Button.tsx
export default function Button() {
    return <button>Click</button>;
}

// Import (no curly braces)
import Button from '@/components/Button';
```

---

## Props

**Props** are like function parameters - they pass data to components.

### Basic Props

```tsx
// Component that receives props
function Greeting({ name }) {
    return <h1>Hello, {name}!</h1>;
}

// Using the component
<Greeting name="John" />
<Greeting name="Jane" />
```

### Multiple Props

```tsx
function Product({ name, price, image }) {
    return (
        <div>
            <img src={image} alt={name} />
            <h3>{name}</h3>
            <p>${price}</p>
        </div>
    );
}

// Usage
<Product 
    name="Apple" 
    price={10} 
    image="/apple.jpg" 
/>
```

### Props with TypeScript

```tsx
// Define prop types
interface ProductProps {
    name: string;
    price: number;
    image: string;
    inStock?: boolean;  // Optional prop
}

function Product({ name, price, image, inStock = true }: ProductProps) {
    return (
        <div>
            <h3>{name}</h3>
            <p>${price}</p>
            {inStock ? <span>In Stock</span> : <span>Out of Stock</span>}
        </div>
    );
}
```

### Children Prop

**Special prop for nested content:**

```tsx
function Card({ children }) {
    return (
        <div className="card">
            {children}
        </div>
    );
}

// Usage
<Card>
    <h2>Title</h2>
    <p>Content</p>
</Card>
```

---

## State

**State** is data that can change. When state changes, React re-renders the component.

### useState Hook

```tsx
import { useState } from 'react';

function Counter() {
    // Create state: [value, setter function]
    const [count, setCount] = useState(0);

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>
                Increment
            </button>
            <button onClick={() => setCount(count - 1)}>
                Decrement
            </button>
        </div>
    );
}
```

### Multiple State Variables

```tsx
function Form() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState(0);

    return (
        <form>
            <input 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
            />
            <input 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
            />
            <input 
                type="number"
                value={age} 
                onChange={(e) => setAge(Number(e.target.value))} 
            />
        </form>
    );
}
```

### State with Objects

```tsx
function UserProfile() {
    const [user, setUser] = useState({
        name: '',
        email: '',
        age: 0
    });

    return (
        <div>
            <input 
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
            {/* ... */}
        </div>
    );
}
```

**Important:** Always spread the object (`...user`) when updating!

---

## Hooks

**Hooks** are special functions that let you "hook into" React features.

### Common Hooks

#### 1. useState
```tsx
const [value, setValue] = useState(initialValue);
```

#### 2. useEffect
**Runs code after render:**

```tsx
import { useEffect } from 'react';

function MyComponent() {
    useEffect(() => {
        // Runs after component renders
        console.log('Component rendered');
    });

    return <div>Content</div>;
}
```

**Run once on mount:**
```tsx
useEffect(() => {
    // Runs only once when component first renders
    fetchData();
}, []);  // Empty array = run once
```

**Run when dependency changes:**
```tsx
const [count, setCount] = useState(0);

useEffect(() => {
    // Runs when count changes
    console.log('Count changed:', count);
}, [count]);  // Dependency array
```

**Cleanup (like removing event listeners):**
```tsx
useEffect(() => {
    const timer = setInterval(() => {
        console.log('Tick');
    }, 1000);

    // Cleanup function
    return () => {
        clearInterval(timer);
    };
}, []);
```

#### 3. useRef
**Access DOM elements:**

```tsx
import { useRef } from 'react';

function InputFocus() {
    const inputRef = useRef<HTMLInputElement>(null);

    const focusInput = () => {
        inputRef.current?.focus();
    };

    return (
        <div>
            <input ref={inputRef} type="text" />
            <button onClick={focusInput}>Focus Input</button>
        </div>
    );
}
```

---

## Events

### Event Handlers

```tsx
function Button() {
    const handleClick = () => {
        alert('Button clicked!');
    };

    return <button onClick={handleClick}>Click Me</button>;
}
```

### Inline Handlers

```tsx
<button onClick={() => alert('Clicked!')}>
    Click Me
</button>
```

### Event Object

```tsx
function Input() {
    const handleChange = (event) => {
        console.log('Value:', event.target.value);
    };

    return <input onChange={handleChange} />;
}
```

### Common Events

```tsx
// Click
<button onClick={handleClick}>Click</button>

// Change (inputs, selects)
<input onChange={handleChange} />

// Submit (forms)
<form onSubmit={handleSubmit}>...</form>

// Focus/Blur
<input onFocus={handleFocus} onBlur={handleBlur} />

// Mouse events
<div onMouseEnter={handleEnter} onMouseLeave={handleLeave} />
```

### Preventing Default

```tsx
function Form() {
    const handleSubmit = (e) => {
        e.preventDefault();  // Prevents form submission
        // Your code here
    };

    return <form onSubmit={handleSubmit}>...</form>;
}
```

---

## Conditional Rendering

### if/else

```tsx
function Greeting({ isLoggedIn }) {
    if (isLoggedIn) {
        return <h1>Welcome back!</h1>;
    } else {
        return <h1>Please log in</h1>;
    }
}
```

### Ternary Operator

```tsx
function Message({ isError }) {
    return (
        <div>
            {isError ? (
                <p className="error">Error occurred!</p>
            ) : (
                <p className="success">Success!</p>
            )}
        </div>
    );
}
```

### Logical AND (&&)

```tsx
function UserMenu({ user }) {
    return (
        <div>
            {user && <p>Welcome, {user.name}</p>}
            {user && <button>Logout</button>}
        </div>
    );
}
```

### Multiple Conditions

```tsx
function Status({ status }) {
    if (status === 'loading') {
        return <div>Loading...</div>;
    } else if (status === 'error') {
        return <div>Error occurred</div>;
    } else {
        return <div>Success!</div>;
    }
}
```

---

## Lists and Keys

### Rendering Lists

```tsx
function ProductList() {
    const products = ['Apple', 'Banana', 'Orange'];

    return (
        <ul>
            {products.map((product, index) => (
                <li key={index}>{product}</li>
            ))}
        </ul>
    );
}
```

### Using Keys

**Always use unique keys:**

```tsx
function ProductList({ products }) {
    return (
        <div>
            {products.map((product) => (
                <div key={product.id}>
                    <h3>{product.name}</h3>
                    <p>${product.price}</p>
                </div>
            ))}
        </div>
    );
}
```

**Why keys?**
- Help React identify which items changed
- Improve performance
- Prevent bugs

### Filtering Lists

```tsx
function ProductList({ products }) {
    const expensiveProducts = products.filter(
        product => product.price > 100
    );

    return (
        <div>
            {expensiveProducts.map(product => (
                <div key={product.id}>{product.name}</div>
            ))}
        </div>
    );
}
```

---

## Forms

### Controlled Components

```tsx
function ContactForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Name:', name);
        console.log('Email:', email);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
            />
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <button type="submit">Submit</button>
        </form>
    );
}
```

### Multiple Inputs (Better Approach)

```tsx
function Form() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <form>
            <input
                name="name"
                value={formData.name}
                onChange={handleChange}
            />
            <input
                name="email"
                value={formData.email}
                onChange={handleChange}
            />
            <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
            />
        </form>
    );
}
```

### Select Dropdown

```tsx
function SelectCountry() {
    const [country, setCountry] = useState('');

    return (
        <select value={country} onChange={(e) => setCountry(e.target.value)}>
            <option value="">Select a country</option>
            <option value="usa">USA</option>
            <option value="uk">UK</option>
            <option value="canada">Canada</option>
        </select>
    );
}
```

### Checkbox

```tsx
function CheckboxExample() {
    const [isChecked, setIsChecked] = useState(false);

    return (
        <label>
            <input
                type="checkbox"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
            />
            I agree to terms
        </label>
    );
}
```

---

## Styling

### Inline Styles

```tsx
function StyledDiv() {
    return (
        <div style={{
            color: 'red',
            fontSize: '20px',
            padding: '10px'
        }}>
            Styled content
        </div>
    );
}
```

### CSS Classes

```tsx
// In component
<div className="container">
    <h1 className="title">Hello</h1>
</div>

// In CSS file
.container {
    max-width: 1200px;
    margin: 0 auto;
}

.title {
    color: blue;
    font-size: 24px;
}
```

### Conditional Classes

```tsx
function Button({ isActive }) {
    return (
        <button className={isActive ? 'active' : 'inactive'}>
            Click Me
        </button>
    );
}
```

### Using Libraries (clsx, tailwind-merge)

```tsx
import { clsx } from 'clsx';

function Button({ isActive, disabled }) {
    return (
        <button className={clsx(
            'btn',
            isActive && 'btn-active',
            disabled && 'btn-disabled'
        )}>
            Click
        </button>
    );
}
```

---

## TypeScript with React

### Component Props Types

```tsx
interface ButtonProps {
    text: string;
    onClick: () => void;
    disabled?: boolean;
    variant?: 'primary' | 'secondary';
}

function Button({ text, onClick, disabled = false, variant = 'primary' }: ButtonProps) {
    return (
        <button 
            onClick={onClick}
            disabled={disabled}
            className={`btn btn-${variant}`}
        >
            {text}
        </button>
    );
}
```

### useState with Types

```tsx
// String
const [name, setName] = useState<string>('');

// Number
const [count, setCount] = useState<number>(0);

// Boolean
const [isActive, setIsActive] = useState<boolean>(false);

// Object
interface User {
    name: string;
    email: string;
}
const [user, setUser] = useState<User | null>(null);

// Array
const [items, setItems] = useState<string[]>([]);
```

### Event Types

```tsx
function Input() {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        console.log('Clicked');
    };

    return (
        <div>
            <input onChange={handleChange} />
            <button onClick={handleClick}>Click</button>
        </div>
    );
}
```

---

## Common Patterns

### 1. Loading State

```tsx
function DataDisplay() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/data')
            .then(res => res.json())
            .then(data => {
                setData(data);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (!data) return <div>No data</div>;

    return <div>{data}</div>;
}
```

### 2. Error Handling

```tsx
function DataDisplay() {
    const [data, setData] = useState(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch('/api/data')
            .then(res => res.json())
            .then(data => setData(data))
            .catch(err => setError(err.message));
    }, []);

    if (error) return <div>Error: {error}</div>;
    return <div>{data}</div>;
}
```

### 3. Toggle State

```tsx
function ToggleButton() {
    const [isOn, setIsOn] = useState(false);

    return (
        <button onClick={() => setIsOn(!isOn)}>
            {isOn ? 'ON' : 'OFF'}
        </button>
    );
}
```

### 4. Counter

```tsx
function Counter() {
    const [count, setCount] = useState(0);

    const increment = () => setCount(count + 1);
    const decrement = () => setCount(count - 1);
    const reset = () => setCount(0);

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={increment}>+</button>
            <button onClick={decrement}>-</button>
            <button onClick={reset}>Reset</button>
        </div>
    );
}
```

---

## Best Practices

### 1. Component Organization

```
components/
  ├── ui/           # Basic UI components
  ├── forms/        # Form components
  └── layout/       # Layout components
```

### 2. Naming Conventions

- **Components:** PascalCase (`UserProfile.tsx`)
- **Files:** Match component name
- **Props:** camelCase (`userName`, `isActive`)
- **Functions:** camelCase (`handleClick`, `fetchData`)

### 3. Keep Components Small

```tsx
// ❌ Too large
function Page() {
    // 500 lines of code
}

// ✅ Better - break into smaller components
function Page() {
    return (
        <div>
            <Header />
            <Navigation />
            <Content />
            <Footer />
        </div>
    );
}
```

### 4. Extract Logic

```tsx
// Custom hook
function useCounter(initialValue = 0) {
    const [count, setCount] = useState(initialValue);
    const increment = () => setCount(count + 1);
    const decrement = () => setCount(count - 1);
    return { count, increment, decrement };
}

// Use in component
function Counter() {
    const { count, increment, decrement } = useCounter();
    return (
        <div>
            <p>{count}</p>
            <button onClick={increment}>+</button>
            <button onClick={decrement}>-</button>
        </div>
    );
}
```

### 5. Use Meaningful Names

```tsx
// ❌ Bad
const [x, setX] = useState(0);
const [data, setData] = useState(null);

// ✅ Good
const [count, setCount] = useState(0);
const [user, setUser] = useState(null);
```

---

## Resources

### Official Documentation
- **React Docs:** https://react.dev
- **TypeScript Docs:** https://www.typescriptlang.org/docs
- **Inertia.js Docs:** https://inertiajs.com

### Learning Resources
- **React Tutorial:** https://react.dev/learn
- **FreeCodeCamp React Course:** https://www.freecodecamp.org
- **React TypeScript Cheatsheet:** https://react-typescript-cheatsheet.netlify.app

### Practice
- **CodeSandbox:** https://codesandbox.io (Online React playground)
- **React Challenges:** https://github.com/alexgurr/react-coding-challenges

### Tools
- **React DevTools:** Browser extension for debugging
- **VS Code Extensions:** ES7+ React/Redux/React-Native snippets

---

## Quick Reference

### Component Template

```tsx
import { useState } from 'react';

interface ComponentProps {
    // Define props here
}

export default function ComponentName({ }: ComponentProps) {
    // State
    const [state, setState] = useState(initialValue);

    // Effects
    useEffect(() => {
        // Side effects
    }, []);

    // Handlers
    const handleClick = () => {
        // Handle click
    };

    // Render
    return (
        <div>
            {/* JSX content */}
        </div>
    );
}
```

### Common Patterns Cheat Sheet

```tsx
// State
const [value, setValue] = useState(initial);

// Effect (run once)
useEffect(() => { }, []);

// Effect (run on change)
useEffect(() => { }, [dependency]);

// Event handler
const handleClick = () => { };

// Conditional render
{condition && <Component />}
{condition ? <A /> : <B />}

// List render
{items.map(item => <Item key={item.id} />)}
```

---

## Summary

**Key Takeaways:**

1. **Components** = Reusable UI pieces
2. **Props** = Data passed to components
3. **State** = Data that can change
4. **Hooks** = Special functions for React features
5. **JSX** = HTML-like syntax in JavaScript
6. **TypeScript** = Adds types to JavaScript

**Remember:**
- React updates only what changes
- Components are like functions
- State triggers re-renders
- Always use keys in lists
- Keep components small and focused

Happy coding! 🚀



