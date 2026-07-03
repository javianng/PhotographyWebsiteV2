# Photography Portfolio Website

About me. For me.

## Guidelines

| Construct                | Naming Convention                | Example                         |
| ------------------------ | -------------------------------- | ------------------------------- |
| **Next.js Route Files**  | Exact reserved names (lowercase) | page.tsx, layout.tsx, route.ts  |
| **Component Files**      | kebab-case.tsx (matches shadcn)  | date-picker.tsx, nav-bar.tsx    |
| **Utility / Hook Files** | kebab-case.ts                    | use-debounce.ts, format-date.ts |
| **Component Functions**  | PascalCase                       | export function DatePicker() {} |
| **Custom Hooks**         | camelCase (starts with use)      | function useMediaQuery() {}     |
| **Utility Functions**    | camelCase                        | function calculateTotal() {}    |
| **Global Constants**     | UPPER_SNAKE_CASE                 | const MAX_UPLOAD_SIZE = 5000;   |
| **Local Constants**      | camelCase (inside functions)     | const isVisible = true;         |
| **Types & Interfaces**   | PascalCase                       | interface UserProfile {}        |
| **Component Props**      | PascalCase (Component + Props)   | interface DatePickerProps {}    |
