# Documentation Quick Reference

**Location:** Storybook > Docs > Components
**Access:** http://localhost:6006

---

## What We Created

### 13 Component Usage Guides

| Component | Lines | Key Examples | Insurance Focus |
|-----------|-------|--------------|-----------------|
| Breadcrumbs | 162 | Navigation paths, hierarchy | Policy/claim navigation |
| Menu | 176 | Actions, dividers, tones | Policy/claim actions |
| Tooltip | 205 | Help text, placements | Form hints, status info |
| Chip | 234 | Tags, filters, selection | Status, claims filters |
| Accordion | 221 | Collapsible sections | Policy details, claims |
| Stepper | 340 | Multi-step workflows | Claim filing, renewals |
| Badge | 232 | Status indicators | Policy/claim status |
| Avatar | 280 | User profiles | Team members, claims |
| Divider | 232 | Visual separators | Section dividers |
| List | 270 | Item grouping, selection | Policy/claims lists |
| Paper | 307 | Surface containers | Card layouts |
| Pagination | 275 | Large datasets | Claims, policies |
| Playbook | 500+ | 5 complete patterns | Real workflows |

**Total: 3,400+ lines of documentation**

---

## Common Questions Answered

### Q1: "How do I use the Stepper component?"
**A:** See [Stepper-Usage.mdx](./Components/Stepper-Usage.mdx)
- When to use: Multi-step workflows (claim filing, policy renewal)
- Props: steps, activeStep, orientation, onStepClick
- Example: 8 complete examples including state management
- Insurance patterns: Claim filing, underwriting, approval chains

### Q2: "What's the difference between Chip and Badge?"
**A:** See [Chip-Usage.mdx](./Components/Chip-Usage.mdx) vs [Badge-Usage.mdx](./Components/Badge-Usage.mdx)
- **Badge:** Status indicator, small, read-only (count/status)
- **Chip:** Removable tag, interactive, user can delete/select

### Q3: "How do I handle user selection in a List?"
**A:** See [List-Usage.mdx](./Components/List-Usage.mdx)
- Props: items, selectedItems, onItemClick, multiSelect
- Example: Policy selection with multiple items
- Note: You'll need to manage state with useState

### Q4: "Can I make an Accordion expand multiple sections?"
**A:** Yes! See [Accordion-Usage.mdx](./Components/Accordion-Usage.mdx)
- Set `allowMultiple={true}`
- Track open sections with state
- Use `onExpandChange` callback

### Q5: "How do I show 'Active', 'Pending', 'Expired' status?"
**A:** See [Badge-Usage.mdx](./Components/Badge-Usage.mdx) or [Chip-Usage.mdx](./Components/Chip-Usage.mdx)
- Badge: Use tone="success" | "warning" | "danger"
- Chip: Use for removable tags with status
- Paper example: Show in policy cards

### Q6: "What about accessibility?"
**A:** Every component has an "Accessibility" section with:
- Keyboard navigation (Tab, Arrow keys, Enter)
- Screen reader announcements (aria-label, aria-describedby)
- Color contrast info
- Mobile considerations

### Q7: "How do I paginate a long claims list?"
**A:** See [Pagination-Usage.mdx](./Components/Pagination-Usage.mdx)
- Props: count (total pages), page (current), onChange
- Example: Claims list with 156 items paginated
- You need to handle data fetching on page change

---

## Finding the Right Component

### For Status/Indicators
- **Badge** - Small count or status label (unread: 5, "Active")
- **Chip** - Larger removable tag (policy type, claim priority)
- **Avatar with status** - User online/away status

### For User Choices
- **List** - Single or multiple selection (policy picker)
- **Chip** - Tag-based selection/filtering
- **Accordion** - Group related options
- **Stepper** - Sequential choices (step-by-step)

### For Navigation
- **Breadcrumbs** - Show current location in hierarchy
- **Menu** - Dropdown actions or options
- **Pagination** - Navigate through pages of data

### For Content Organization
- **Accordion** - Collapse/expand sections
- **Paper** - Card containers with elevation
- **Divider** - Separate visual sections
- **List** - Group related items

### For Forms/Input Context
- **Tooltip** - Help text on hover
- **Menu** - Dropdown options
- **Chip** - Selected input tags

---

## Insurance Use Case Map

### Claim Filing Workflow
Components: Stepper, TextField, Button, List, Paper, Avatar
Doc: See [Insurance-Domain-Playbook.mdx](./Insurance-Domain-Playbook.mdx) - Pattern 1

### Policy Management Dashboard
Components: List, Badge, Chip, Avatar, Paper, Menu
Doc: See [Insurance-Domain-Playbook.mdx](./Insurance-Domain-Playbook.mdx) - Pattern 1

### Claims Filtering Interface
Components: Chip, List, Pagination, Paper
Doc: See [Insurance-Domain-Playbook.mdx](./Insurance-Domain-Playbook.mdx) - Pattern 3

### Coverage Selection
Components: Accordion, Chip, Paper, List
Doc: See [Insurance-Domain-Playbook.mdx](./Insurance-Domain-Playbook.mdx) - Pattern 4

### Team Assignment
Components: Avatar, Chip, Menu, Badge, Paper
Doc: See [Insurance-Domain-Playbook.mdx](./Insurance-Domain-Playbook.mdx) - Pattern 5

---

## Code Example Patterns

### Simple Component (No State)
```tsx
// Badge (read-only status)
<Badge label="Active" tone="success" />
```

### User Selection (With State)
```tsx
// List (manage selected items)
const [selected, setSelected] = useState([]);
<List
  items={claims}
  selectedItems={selected}
  onItemClick={(id) => toggleSelection(id)}
  multiSelect={true}
/>
```

### Multi-Step Workflow (With Navigation)
```tsx
// Stepper (manage current step)
const [step, setStep] = useState(0);
<Stepper steps={steps} activeStep={step} onStepClick={setStep} />
<Button onClick={() => setStep(step + 1)}>Next</Button>
```

### Pagination (With Data Loading)
```tsx
// Pagination (fetch data on page change)
const [page, setPage] = useState(1);
useEffect(() => {
  loadClaimsData((page - 1) * 10, page * 10);
}, [page]);
<Pagination count={totalPages} page={page} onChange={(e, p) => setPage(p)} />
```

---

## Best Practices Quick Checklist

### Before Using a Component
- [ ] Read "When to Use" section
- [ ] Review insurance examples
- [ ] Check accessibility requirements
- [ ] Look at "Do / Don't" guidelines
- [ ] Review related components (should I use something else?)

### When Implementing
- [ ] Copy-paste example code
- [ ] Add your own data (replace placeholder)
- [ ] Handle required props (marked with "-" in table)
- [ ] Add event handlers (onItemClick, onChange, etc.)
- [ ] Test keyboard navigation
- [ ] Test with screen reader (if interactive)

### Before Merging
- [ ] Component renders without errors
- [ ] Props passed correctly
- [ ] Event handlers work (click, change, select)
- [ ] Accessibility requirements met
- [ ] Responsive on mobile
- [ ] Error states handled

---

## Known Limitations & Gaps

### Not Yet Interactive
These need Storybook stories to see in action:
- Stepper (step navigation)
- Accordion (expand/collapse)
- Chip (selection, deletion)
- List (selection)
- Pagination (page changes)

### Examples Need State Management
These examples are pseudo-code and need useState added:
- All interactive components above
- Avatar (status changes)
- Badge (dynamic counts)

### Mobile Behavior Not Detailed
Need to document:
- Touch interactions
- Mobile-specific layouts
- Responsive breakpoints
- Scroll behavior on small screens

### Edge Cases Not Covered
Need documentation on:
- Loading states (skeleton, spinner)
- Empty states (no items)
- Error states (validation failed)
- Disabled states (why would component be disabled?)

---

## Documentation Files Structure

```
src/docs/
├── Components/              # 12 Usage Guides
│   ├── Breadcrumbs-Usage.mdx
│   ├── Menu-Usage.mdx
│   ├── Tooltip-Usage.mdx
│   ├── Chip-Usage.mdx
│   ├── Accordion-Usage.mdx
│   ├── Stepper-Usage.mdx
│   ├── Badge-Usage.mdx
│   ├── Avatar-Usage.mdx
│   ├── Divider-Usage.mdx
│   ├── List-Usage.mdx
│   ├── Paper-Usage.mdx
│   └── Pagination-Usage.mdx
│
├── Insurance-Domain-Playbook.mdx  # 5 Complete Patterns
│
├── DESIGN_SYSTEM_DOCUMENTATION_BEST_PRACTICES.md
│   └─ How to write great component docs
│
├── COMPONENT_DOCUMENTATION_AUDIT.md
│   └─ Detailed assessment & improvement roadmap
│
├── COMPONENT_DOCUMENTATION_ALIGNMENT.md
│   └─ How docs compare to actual components
│
└── DOCUMENTATION_STATUS_SUMMARY.md
   └─ This summary & what's complete
```

---

## Getting Help

### I need to know how to...

**...show user status?**
→ Avatar-Usage.mdx → Insurance Examples → Team member status

**...let users select multiple items?**
→ Chip-Usage.mdx OR List-Usage.mdx → Props → multiSelect: true

**...create a multi-step form?**
→ Stepper-Usage.mdx → Insurance Patterns → Claim Filing

**...show policy status?**
→ Badge-Usage.mdx → Insurance Examples → Policy Status

**...paginate a long list?**
→ Pagination-Usage.mdx → Props → Example usage

**...make a collapsible section?**
→ Accordion-Usage.mdx → When to use → Example code

**...make a menu dropdown?**
→ Menu-Usage.mdx → Key Variants → Dropdown actions

**...style a card container?**
→ Paper-Usage.mdx → Props → elevation options

---

## Next Steps

### For Developers
1. Find your component in Storybook
2. Review "When to Use" and "Insurance Examples"
3. Copy example code
4. Add your data and event handlers
5. Test accessibility (Tab key, screen reader)

### For Design System Team
1. Create Storybook stories for interactive components (4-6h)
2. Add state management examples (6-8h)
3. Document edge cases (error, loading, empty) (3-4h)
4. Test all examples are copy-paste ready (2h)
5. Review with insurance domain experts (2-3h)

---

## Questions?

Refer to:
- [DESIGN_SYSTEM_DOCUMENTATION_BEST_PRACTICES.md](./DESIGN_SYSTEM_DOCUMENTATION_BEST_PRACTICES.md) - How we do documentation
- [COMPONENT_DOCUMENTATION_AUDIT.md](./COMPONENT_DOCUMENTATION_AUDIT.md) - What needs work
- [COMPONENT_DOCUMENTATION_ALIGNMENT.md](./COMPONENT_DOCUMENTATION_ALIGNMENT.md) - How components compare to docs
- [Insurance-Domain-Playbook.mdx](./Insurance-Domain-Playbook.mdx) - Real workflow examples

---

**Version:** 1.0
**Last Updated:** December 23, 2025
**Status:** Complete & Ready for Review
