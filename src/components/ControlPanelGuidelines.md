# Control Panel Guidelines

## MCP Pattern Checklist

### Model
- [ ] State is defined at the component level
- [ ] State variables use appropriate types
- [ ] Initial values are properly set

### Controller
- [ ] State update functions are defined
- [ ] Event handlers are properly typed
- [ ] Complex state updates are handled through controller functions

### Presenter
- [ ] Uses `PlaygroundControls` and `PlaygroundControl` components
- [ ] Controls are defined using the standard config format
- [ ] Styled components are used for inputs (`StyledInput`, `StyledSelect`, `StyledCheckbox`)
- [ ] Components in preview section are wrapped with `PreviewWrapper` for consistent centering

## Alignment & Styling
- [ ] All controls are left-aligned
- [ ] Labels are left-aligned and use the standard font weight (500)
- [ ] Proper spacing is maintained (gap: 20px between controls, gap: 6px between label and input)
- [ ] Full width is utilized for controls
- [ ] Consistent padding is applied (32px 24px)
- [ ] Preview components are centered using `PreviewWrapper`

## Preview Section Guidelines
- [ ] Always wrap preview content with `PreviewWrapper`
- [ ] Components should be centered horizontally and vertically
- [ ] Maintain consistent padding (20px) around components
- [ ] Ensure responsive behavior for different screen sizes
- [ ] Use appropriate width constraints for components (min-width: 200px)

## Conditional Controls (Best Practice)
- [ ] **Always use conditional logic to show/hide controls based on relevant state.**
- [ ] For example, only show a "Loading Text" input if the "Loading" checkbox is checked.
- [ ] This keeps the playground UI clean and contextually relevant.
- [ ] All new and existing playgrounds should follow this pattern.

## Control Config Format
```typescript
{
  type: 'input' | 'checkbox' | 'select',
  label: string,
  value?: string | boolean,
  onChange: (value: any) => void,
  options?: string[], // for select
  checked?: boolean, // for checkbox
  disabled?: boolean,
  inputType?: string, // for input
}
```

## Example Usage
```typescript
controls=[
  {
    type: 'input',
    label: 'Label',
    value: label,
    onChange: setLabel,
  },
  {
    type: 'checkbox',
    label: 'Disabled',
    checked: disabled,
    onChange: setDisabled,
  },
  {
    type: 'select',
    label: 'Size',
    options: SIZES,
    value: size,
    onChange: setSize,
  },
  // Conditional control example:
  ...(loading ? [{
    type: 'input' as const,
    label: 'Loading Text',
    value: loadingText,
    onChange: setLoadingText,
  }] : []),
]
```

## Common Mistakes to Avoid
1. Center-aligning control content (controls should be left-aligned)
2. Not using the standard control config format
3. Not wrapping controls in `PlaygroundControl`
4. Not wrapping preview components in `PreviewWrapper`
5. Inconsistent spacing or padding
6. Not using provided styled components
7. Not maintaining proper width and alignment
8. **Not using conditional logic for controls**

## Best Practices
1. Always use the MCP pattern
2. Keep state management at the component level
3. Use TypeScript for better type safety
4. Follow the established styling patterns
5. Maintain consistent spacing and alignment
6. Use semantic naming for state variables and handlers
7. Document any deviations from the standard pattern
8. Center preview components using `PreviewWrapper`
9. Ensure responsive design in both controls and preview
10. **Use conditional logic for controls wherever relevant**

## Code Review/PR Checklist
- [ ] Are all controls using conditional logic where appropriate?
- [ ] Are controls grouped and ordered logically?
- [ ] Is the MCP pattern followed throughout? 