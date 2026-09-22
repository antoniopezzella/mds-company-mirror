# Table UX Improvements Plan

## 📊 Research Summary

Based on research from [Component Gallery](https://component.gallery/components/table/) analyzing 73+ design system table implementations, here are the key usability patterns identified:

### Common Best Practices Across Design Systems

#### 🎯 **Top Priority Features** (Found in 80%+ of systems)
1. **Sticky Headers** - Header stays visible during vertical scroll
2. **Horizontal Scroll** - Smooth scrolling for wide tables on small screens
3. **Scroll Shadows** - Visual indicators when content is scrollable
4. **Responsive Breakpoints** - Card/stacked view on mobile
5. **Pagination** - Reduce cognitive load for large datasets
6. **Sorting** - Interactive column sorting
7. **Row Selection** - Bulk actions support
8. **Loading States** - Skeleton loaders or spinners

#### 🚀 **Enhanced Features** (Found in 50%+ of systems)
9. **Virtualization** - Render only visible rows for performance
10. **Resizable Columns** - User-controlled column widths
11. **Column Reordering** - Drag & drop column arrangement
12. **Sticky First Column** - Keep identifier column visible
13. **Expandable Rows** - Nested/detail views
14. **Inline Editing** - Click to edit cell values
15. **Filters** - Column-level filtering
16. **Search** - Global table search
17. **Export** - CSV/PDF download

#### 🎨 **Accessibility & UX** (Critical for enterprise)
18. **Keyboard Navigation** - Arrow keys, tab navigation
19. **Focus Management** - Clear focus indicators
20. **Screen Reader Support** - Proper ARIA labels
21. **Reduced Motion** - Respect user preferences
22. **High Contrast Mode** - WCAG AA/AAA compliance
23. **Touch Targets** - Minimum 44x44px for mobile

### Current MDS Table Status

✅ **Already Implemented:**
- Sticky header (`stickyHeader` prop)
- Horizontal scroll (responsive wrapper)
- Sorting (column sorting with indicators)
- Pagination (full pagination component)
- Row selection (checkbox selection)
- Loading states
- Multiple variants (striped, bordered, compact)
- Multiple sizes (sm, md, lg)
- Custom renderers
- Status badges

⚠️ **Partially Implemented:**
- Keyboard navigation (basic, needs enhancement)
- Accessibility (basic ARIA, needs improvement)

❌ **Missing Features:**
- **Scroll shadows/indicators** ⭐ HIGH PRIORITY
- **Scroll to viewport on focus** ⭐ HIGH PRIORITY
- **Sticky first column** ⭐ HIGH PRIORITY
- **Virtualization for large datasets** ⭐ HIGH PRIORITY
- **Resizable columns**
- **Column reordering**
- **Expandable rows**
- **Inline editing**
- **Column filters**
- **Global search**
- **Export functionality**
- **Mobile card view**
- **Empty state illustrations**
- **Row actions menu**

---

## 🎯 Phase 1: Scroll UX Enhancements (This Sprint)

### 1. Scroll Shadows/Indicators

**Problem:** Users can't tell if there's more content to scroll horizontally or vertically.

**Solution:** Add visual shadows when content is scrollable.

**Examples from Industry:**
- **Material UI DataGrid**: Fade shadows on left/right edges
- **Ant Design Table**: Border shadows on scroll
- **Atlassian Dynamic Table**: Gradient overlays

**Implementation:**
```tsx
// Detect scroll position
const [scrollState, setScrollState] = useState({
  isScrolledLeft: false,
  isScrolledRight: false,
  isScrolledTop: false,
  isScrolledBottom: false
});

// Add shadow classes dynamically
className={`
  mds-table-wrapper
  ${scrollState.isScrolledLeft ? 'mds-table--shadow-left' : ''}
  ${scrollState.isScrolledRight ? 'mds-table--shadow-right' : ''}
`}
```

**CSS:**
```css
.mds-table--shadow-left::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 30px;
  height: 100%;
  background: linear-gradient(to right, rgba(0,0,0,0.1), transparent);
  pointer-events: none;
  z-index: 2;
}
```

### 2. Scroll to Viewport on Focus

**Problem:** When user tabs through table cells, focused element might be off-screen.

**Solution:** Auto-scroll to bring focused cell into view.

**Examples from Industry:**
- **Carbon Design System**: ScrollIntoView with smooth behavior
- **Salesforce Lightning**: Smart scroll with offset
- **Polaris**: Scroll with animation

**Implementation:**
```tsx
const handleCellFocus = (cellRef: HTMLElement) => {
  cellRef.scrollIntoView({
    behavior: 'smooth',
    block: 'nearest',
    inline: 'nearest'
  });
};
```

### 3. Sticky First Column

**Problem:** In wide tables, users lose context of which row they're viewing.

**Solution:** Pin the first column (usually an identifier) while scrolling horizontally.

**Examples from Industry:**
- **Ant Design**: `sticky` prop on columns
- **Material UI DataGrid**: `pinned` column feature
- **AG Grid**: Column pinning left/right

**Implementation:**
```css
.mds-table__cell--sticky-left {
  position: sticky;
  left: 0;
  z-index: 11;
  background: inherit;
  box-shadow: 2px 0 4px rgba(0,0,0,0.05);
}
```

### 4. Scroll Progress Indicator

**Problem:** Users don't know how much more data is below.

**Solution:** Add a subtle scroll progress bar.

**Implementation:**
```tsx
const scrollProgress = (scrollTop / (scrollHeight - clientHeight)) * 100;

<div 
  className="mds-table__scroll-progress"
  style={{ width: `${scrollProgress}%` }}
/>
```

---

## 🚀 Phase 2: Performance & Virtualization (Next Sprint)

### 1. Virtual Scrolling

For tables with 1000+ rows, render only visible rows.

**Libraries to Consider:**
- **react-window** (recommended - lightweight)
- **react-virtualized** (feature-rich but heavier)
- **TanStack Virtual** (modern, TypeScript-first)

**Implementation Approach:**
```tsx
import { useVirtualizer } from '@tanstack/react-virtual';

const rowVirtualizer = useVirtualizer({
  count: data.length,
  getScrollElement: () => tableRef.current,
  estimateSize: () => 48, // row height
  overscan: 5 // render 5 extra rows above/below
});
```

### 2. Lazy Loading

Load data in chunks as user scrolls.

**Implementation:**
```tsx
const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
  const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
  
  if (scrollHeight - scrollTop <= clientHeight * 1.5) {
    loadMoreData();
  }
};
```

---

## 📱 Phase 3: Responsive Enhancements

### 1. Mobile Card View

**Problem:** Tables don't work well on small screens.

**Solution:** Convert rows to cards on mobile breakpoints.

**Example:**
```tsx
<div className="mds-table-card" key={row.id}>
  <div className="mds-table-card__header">{row.title}</div>
  <div className="mds-table-card__body">
    <div><strong>Status:</strong> {row.status}</div>
    <div><strong>Date:</strong> {row.date}</div>
  </div>
</div>
```

### 2. Responsive Column Hiding

Hide less important columns on smaller screens.

**Implementation:**
```tsx
{
  key: 'description',
  header: 'Description',
  hideOn: ['mobile', 'tablet'] // Hide on these breakpoints
}
```

---

## ♿ Phase 4: Accessibility Improvements

### 1. Enhanced Keyboard Navigation

- **Arrow keys** to navigate cells
- **Home/End** to jump to first/last cell
- **Page Up/Down** for page navigation
- **Enter** to activate/edit cell
- **Escape** to cancel editing

### 2. Screen Reader Announcements

```tsx
<table aria-label="Policy data table">
  <caption>List of insurance policies with 156 total items</caption>
  <thead>
    <tr>
      <th scope="col" aria-sort="ascending">Policy Number</th>
    </tr>
  </thead>
</table>
```

### 3. Focus Indicators

```css
.mds-table__cell:focus-visible {
  outline: 3px solid var(--color-focus, #4A90E2);
  outline-offset: -3px;
  position: relative;
  z-index: 1;
}
```

---

## 🎨 Phase 5: Advanced Features

### 1. Column Resizing

```tsx
const [columnWidths, setColumnWidths] = useState<Record<string, number>>({});

const handleResize = (columnKey: string, width: number) => {
  setColumnWidths(prev => ({ ...prev, [columnKey]: width }));
};
```

### 2. Column Reordering (Drag & Drop)

Use `react-beautiful-dnd` or `dnd-kit`.

### 3. Expandable Rows

```tsx
const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

const toggleRow = (rowId: string) => {
  setExpandedRows(prev => {
    const next = new Set(prev);
    next.has(rowId) ? next.delete(rowId) : next.add(rowId);
    return next;
  });
};
```

### 4. Inline Editing

```tsx
const [editingCell, setEditingCell] = useState<{row: number, col: string} | null>(null);

<input
  value={cellValue}
  onChange={(e) => updateCellValue(row, col, e.target.value)}
  onBlur={() => setEditingCell(null)}
  autoFocus
/>
```

### 5. Column Filters

```tsx
interface ColumnFilter {
  key: string;
  type: 'text' | 'select' | 'date' | 'number';
  options?: string[];
}

const [filters, setFilters] = useState<Record<string, any>>({});
```

### 6. Export Functionality

```tsx
const exportToCSV = () => {
  const csv = [
    columns.map(c => c.header).join(','),
    ...data.map(row => columns.map(c => row[c.key]).join(','))
  ].join('\n');
  
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'table-export.csv';
  a.click();
};
```

---

## 📊 Comparison with Leading Design Systems

| Feature | MDS Current | Material UI | Ant Design | Carbon | Polaris | Priority |
|---------|-------------|-------------|------------|--------|---------|----------|
| Sticky Header | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ Done |
| Horizontal Scroll | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ Done |
| Scroll Shadows | ❌ | ✅ | ✅ | ✅ | ✅ | 🔴 P0 |
| Scroll to View | ❌ | ✅ | ✅ | ✅ | ✅ | 🔴 P0 |
| Sticky Columns | ❌ | ✅ | ✅ | ❌ | ✅ | 🟡 P1 |
| Sorting | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ Done |
| Pagination | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ Done |
| Selection | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ Done |
| Virtualization | ❌ | ✅ | ✅ | ✅ | ❌ | 🟡 P1 |
| Resizable Cols | ❌ | ✅ | ✅ | ✅ | ❌ | 🟢 P2 |
| Col Reordering | ❌ | ✅ | ✅ | ❌ | ❌ | 🟢 P2 |
| Expandable Rows | ❌ | ✅ | ✅ | ✅ | ✅ | 🟡 P1 |
| Inline Editing | ❌ | ✅ | ✅ | ✅ | ✅ | 🟢 P2 |
| Filters | ❌ | ✅ | ✅ | ✅ | ✅ | 🟡 P1 |
| Export | ❌ | ❌ | ✅ | ❌ | ❌ | 🟢 P2 |
| Mobile Cards | ❌ | ❌ | ❌ | ✅ | ✅ | 🟡 P1 |
| Keyboard Nav | ⚠️ | ✅ | ✅ | ✅ | ✅ | 🔴 P0 |

**Priority Legend:**
- 🔴 P0 = Critical (This Sprint)
- 🟡 P1 = High (Next Sprint)
- 🟢 P2 = Medium (Future)

---

## 🎯 Implementation Timeline

### Week 1-2: Scroll UX (Phase 1)
- [ ] Scroll shadows/indicators
- [ ] Scroll to viewport on focus
- [ ] Sticky first column
- [ ] Scroll progress indicator
- [ ] Enhanced keyboard navigation
- [ ] Update documentation
- [ ] Add Storybook examples

### Week 3-4: Performance (Phase 2)
- [ ] Implement virtualization
- [ ] Add lazy loading
- [ ] Performance benchmarks
- [ ] Large dataset tests

### Week 5-6: Responsive (Phase 3)
- [ ] Mobile card view
- [ ] Responsive column hiding
- [ ] Touch optimizations
- [ ] Mobile testing

### Week 7-8: Accessibility (Phase 4)
- [ ] Full keyboard navigation
- [ ] Screen reader improvements
- [ ] Focus management
- [ ] A11y audit

### Future Sprints: Advanced Features (Phase 5)
- [ ] Column resizing
- [ ] Column reordering
- [ ] Expandable rows
- [ ] Inline editing
- [ ] Column filters
- [ ] Export functionality

---

## 📝 Documentation Additions

### 1. Usage Guidelines
```markdown
## When to Use Tables

✅ **Good Use Cases:**
- Comparing multiple items across attributes
- Scanning and analyzing structured data
- Bulk operations on multiple items
- Financial/numeric data analysis

❌ **Avoid Tables For:**
- Mobile-first interfaces (use cards)
- < 3 columns of data (use list)
- Unstructured content (use cards)
- Few items (< 5 rows, use list)
```

### 2. Performance Guidelines
```markdown
## Performance Considerations

- **< 100 rows**: Use standard table
- **100-1000 rows**: Enable pagination
- **> 1000 rows**: Enable virtualization
- **Complex cells**: Memoize renderers
- **Images**: Use lazy loading
```

### 3. Accessibility Checklist
```markdown
## Table Accessibility Checklist

- [ ] Meaningful `<caption>` element
- [ ] Proper `scope` attributes
- [ ] `aria-sort` on sorted columns
- [ ] `aria-label` on interactive elements
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Screen reader tested
- [ ] High contrast mode tested
```

---

## 🔗 Reference Links

- [WCAG 2.1 Table Guidelines](https://www.w3.org/WAI/tutorials/tables/)
- [Material UI DataGrid](https://mui.com/x/react-data-grid/)
- [Ant Design Table](https://ant.design/components/table)
- [Carbon Data Table](https://carbondesignsystem.com/components/data-table/usage/)
- [Polaris Index Table](https://polaris.shopify.com/components/tables/index-table)
- [TanStack Table](https://tanstack.com/table/latest)
- [react-window](https://github.com/bvaughn/react-window)

---

## ✅ Success Metrics

- **Performance**: Handle 10,000+ rows smoothly (60fps)
- **Accessibility**: WCAG 2.1 AA compliance
- **Mobile**: Touch target minimum 44x44px
- **User Satisfaction**: 90%+ positive feedback
- **Page Load**: < 2s for 100 rows
- **Scroll FPS**: Maintain 60fps during scroll

