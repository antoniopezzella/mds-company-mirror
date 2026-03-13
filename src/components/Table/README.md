# Table Component - Comprehensive Guide

## Overview

The MDS Table component provides a flexible, accessible, and performant solution for displaying tabular data with extensive customization options and scroll enhancements.

## ✨ Features

### Core Features
- ✅ **Sorting** - Click column headers to sort data
- ✅ **Pagination** - Built-in pagination support
- ✅ **Selection** - Checkbox-based row selection
- ✅ **Variants** - Multiple visual styles (default, striped, bordered, compact)
- ✅ **Sizes** - Three size options (sm, md, lg)
- ✅ **Loading States** - Skeleton/spinner loading indicators
- ✅ **Empty States** - Customizable empty message
- ✅ **Custom Renderers** - Per-column render functions

### 🎯 NEW: Scroll Enhancements (Phase 1)
- ✅ **Scroll Shadows** - Visual indicators when content is scrollable
- ✅ **Scroll to Focus** - Auto-scroll to keep focused cells visible
- ✅ **Sticky First Column** - Pin identifier column while scrolling
- ✅ **Scroll Progress** - Visual progress bar for vertical scrolling
- ✅ **Keyboard Navigation** - Tab navigation with auto-scroll

## Basic Usage

```tsx
import { Table } from '@mds/components';

const columns = [
  { key: 'id', header: 'ID', sortable: true },
  { key: 'name', header: 'Name', sortable: true },
  { 
    key: 'status', 
    header: 'Status',
    render: (value) => <Badge>{value}</Badge>
  },
];

const data = [
  { id: '001', name: 'Policy A', status: 'Active' },
  { id: '002', name: 'Policy B', status: 'Pending' },
];

<Table 
  columns={columns} 
  data={data} 
  variant="striped"
  sortable
  hoverable
/>
```

## Scroll Enhancement Props

### `scrollShadows` (default: `true`)

Shows visual shadow indicators when content overflows horizontally or vertically.

```tsx
<Table
  columns={columns}
  data={data}
  scrollShadows={true}  // Enable scroll shadows
/>
```

**When to use:**
- Wide tables that overflow horizontally
- Tall tables with vertical scrolling
- Any table where users might not realize there's more content

**Visual Effect:**
- Left shadow: Appears when scrolled right
- Right shadow: Appears when scrollable content exists on right
- Top/bottom shadows: Appear with vertical scroll

### `stickyFirstColumn` (default: `false`)

Pins the first column (typically an identifier) while scrolling horizontally.

```tsx
<Table
  columns={columns}
  data={data}
  stickyFirstColumn={true}
/>
```

**When to use:**
- Wide tables with many columns
- When the first column is a critical identifier (ID, name, etc.)
- Dashboards where users need constant reference point

**Best Practices:**
- First column should be narrow (140-200px)
- First column should be an identifier or primary key
- Works best with `scrollShadows` enabled

### `showScrollProgress` (default: `false`)

Displays a colored progress bar showing vertical scroll position.

```tsx
<Table
  columns={columns}
  data={data}
  maxHeight="500px"
  showScrollProgress={true}
/>
```

**When to use:**
- Long tables with many rows
- When users need to gauge how much content remains
- Combined with `maxHeight` for fixed-height tables

**Visual Effect:**
- 3px colored bar at the very top
- Grows from 0% to 100% as you scroll
- Uses brand primary color

### `scrollToFocus` (default: `true`)

Automatically scrolls to keep focused cells visible during keyboard navigation.

```tsx
<Table
  columns={columns}
  data={data}
  scrollToFocus={true}  // Enabled by default
/>
```

**When to use:**
- Always (it's enabled by default)
- Improves accessibility
- Essential for keyboard users

**Behavior:**
- Triggers on Tab/Shift+Tab navigation
- Uses smooth scrolling animation
- Scrolls to `nearest` position (minimal movement)

## Complete Example: Wide Data Table

```tsx
import { Table } from '@mds/components';

const insurancePolicyColumns = [
  { key: 'policyNumber', header: 'Policy #', sortable: true, width: '140px' },
  { key: 'client', header: 'Client Name', sortable: true, width: '200px' },
  { key: 'type', header: 'Policy Type', sortable: true, width: '160px' },
  { 
    key: 'premium', 
    header: 'Premium', 
    sortable: true, 
    align: 'right',
    render: (value) => `$${value.toLocaleString()}`
  },
  { 
    key: 'status', 
    header: 'Status',
    render: (value) => <StatusBadge status={value} />
  },
  { key: 'renewalDate', header: 'Renewal Date', sortable: true },
  { key: 'broker', header: 'Broker', sortable: true },
  { key: 'underwriter', header: 'Underwriter', sortable: true },
  { key: 'region', header: 'Region', sortable: true },
];

<Table
  columns={insurancePolicyColumns}
  data={policies}
  
  // Visual style
  variant="striped"
  size="md"
  hoverable
  
  // Core features
  sortable
  stickyHeader
  
  // Scroll enhancements
  stickyFirstColumn
  scrollShadows
  showScrollProgress
  scrollToFocus
  
  // Container
  maxHeight="600px"
  
  // Pagination
  pagination={{
    enabled: true,
    pageSize: 25,
    pageSizeOptions: [10, 25, 50, 100],
    variant: 'advanced',
    showItemsRange: true,
    showTotalItems: true,
  }}
  
  // Accessibility
  caption="Insurance policies listing with 156 total policies"
/>
```

## Recommended Configurations

### 1. Small Data Table (< 20 rows)

```tsx
<Table
  columns={columns}
  data={data}
  variant="default"
  size="md"
  hoverable
  sortable
  scrollShadows={false}  // Not needed for small tables
/>
```

### 2. Medium Data Table (20-100 rows)

```tsx
<Table
  columns={columns}
  data={data}
  variant="striped"
  size="md"
  hoverable
  sortable
  stickyHeader
  scrollShadows
  pagination={{
    enabled: true,
    pageSize: 25,
  }}
/>
```

### 3. Large Wide Table (100+ rows, 8+ columns)

```tsx
<Table
  columns={columns}
  data={data}
  variant="striped"
  size="md"
  hoverable
  sortable
  stickyHeader
  stickyFirstColumn  // ⭐ Keep first column visible
  scrollShadows
  showScrollProgress  // ⭐ Show scroll progress
  maxHeight="600px"
  pagination={{
    enabled: true,
    pageSize: 50,
    pageSizeOptions: [25, 50, 100],
    variant: 'advanced',
  }}
/>
```

### 4. Dashboard Widget Table

```tsx
<Table
  columns={columns}
  data={data}
  variant="compact"
  size="sm"
  hoverable
  maxHeight="300px"
  scrollShadows
  pagination={{ enabled: false }}  // Show all in widget
/>
```

## Performance Considerations

### Current Implementation
- ✅ **< 100 rows**: Excellent performance
- ✅ **100-1000 rows**: Good with pagination
- ⚠️ **> 1000 rows**: Use pagination, virtualization coming in Phase 2

### Optimization Tips

1. **Use Pagination**
   ```tsx
   pagination={{ enabled: true, pageSize: 50 }}
   ```

2. **Memoize Custom Renderers**
   ```tsx
   const StatusCell = React.memo(({ status }) => <Badge>{status}</Badge>);
   
   {
     key: 'status',
     header: 'Status',
     render: (value) => <StatusCell status={value} />
   }
   ```

3. **Lazy Load Images**
   ```tsx
   {
     key: 'avatar',
     header: 'Avatar',
     render: (value) => <img src={value} loading="lazy" />
   }
   ```

4. **Limit Column Count**
   - Hide less important columns on mobile
   - Use expandable rows for detailed info
   - Keep visible columns < 10 for best UX

## Accessibility

### Keyboard Navigation

| Key | Action |
|-----|--------|
| <kbd>Tab</kbd> | Navigate to next cell |
| <kbd>Shift+Tab</kbd> | Navigate to previous cell |
| <kbd>Enter</kbd> | Sort column (on header) |
| <kbd>Space</kbd> | Select row (on checkbox) |

### Screen Readers

The table provides proper ARIA labels and semantic HTML:

```tsx
<Table
  caption="Insurance policies with 156 total items"  // Announces table purpose
  columns={columns}
  data={data}
/>
```

**Screen reader announcements:**
- "Insurance policies with 156 total items, table with 8 columns and 25 rows"
- "Policy number column, sortable, currently sorted ascending"
- "Select all rows, checkbox, not checked"

### High Contrast Mode

The table automatically adapts to high contrast mode with:
- Clear focus indicators (3px outlines)
- Sufficient color contrast (WCAG AA)
- No color-only status indicators (uses icons/badges)

## Mobile Responsiveness

### Current Behavior
- Horizontal scroll with touch support
- Reduced padding on mobile
- Font size adjustments

### Phase 3 (Coming Soon)
- **Card View**: Convert rows to cards on mobile
- **Column Hiding**: Auto-hide less important columns
- **Touch Optimizations**: Larger touch targets

## Comparison with Other Design Systems

| Feature | MDS (Now) | Material UI | Ant Design | Carbon |
|---------|-----------|-------------|------------|--------|
| Scroll Shadows | ✅ | ✅ | ✅ | ✅ |
| Sticky First Column | ✅ | ✅ | ✅ | ❌ |
| Scroll Progress | ✅ | ❌ | ❌ | ❌ |
| Scroll to Focus | ✅ | ✅ | ✅ | ✅ |
| Virtualization | Phase 2 | ✅ | ✅ | ✅ |
| Resizable Columns | Phase 5 | ✅ | ✅ | ✅ |

## Troubleshooting

### Scroll Shadows Not Showing

**Problem:** Shadow indicators don't appear when scrolling.

**Solutions:**
1. Ensure `scrollShadows={true}` (enabled by default)
2. Table must have overflow (set `maxHeight` or wide columns)
3. Check browser console for CSS errors

### Sticky Column Background Issues

**Problem:** Sticky column has wrong background color.

**Solution:** The component handles this automatically for striped tables. If custom styling is applied, ensure:
```css
.mds-table--striped .mds-table__row:nth-child(odd) .mds-table__cell--sticky-left {
  background-color: inherit;
}
```

### Keyboard Navigation Not Working

**Problem:** Tab doesn't navigate through cells.

**Solution:**
1. Ensure `scrollToFocus={true}` (enabled by default)
2. Check that cells have `tabIndex={0}` (handled automatically)
3. Verify no conflicting keyboard event handlers

### Performance Issues with Large Tables

**Problem:** Table is slow with 1000+ rows.

**Solutions:**
1. Enable pagination: `pagination={{ enabled: true, pageSize: 50 }}`
2. Reduce visible rows
3. Wait for Phase 2 virtualization
4. Memoize custom renderers
5. Avoid complex calculations in render functions

## API Reference

See [Storybook documentation](http://localhost:6006/?path=/docs/components-table--docs) for complete API reference and interactive examples.

## Changelog

### v2.1.0 (Current)
- ✨ Added scroll shadows for overflow indication
- ✨ Added sticky first column support
- ✨ Added scroll progress indicator
- ✨ Added auto-scroll to focused cells
- ✨ Enhanced keyboard navigation
- 🎨 Improved focus indicators for accessibility
- 📚 Added comprehensive documentation

### v2.0.0
- Initial release with sorting, pagination, and selection

## Coming Soon

### Phase 2: Performance (Q1 2026)
- Virtual scrolling for 10,000+ rows
- Lazy loading with infinite scroll
- Performance monitoring dashboard

### Phase 3: Mobile (Q1 2026)
- Mobile card view
- Responsive column hiding
- Touch gesture optimizations

### Phase 4: Accessibility (Q2 2026)
- Enhanced screen reader support
- Arrow key navigation
- Reduced motion support improvements

### Phase 5: Advanced Features (Q2 2026)
- Column resizing
- Column reordering (drag & drop)
- Expandable rows
- Inline editing
- Column filters
- Export to CSV/PDF

## Support

- 📖 [Full Documentation](./TABLE_UX_IMPROVEMENTS.md)
- 🎨 [Storybook Examples](http://localhost:6006/?path=/story/components-table--scroll-shadows)
- 🐛 [Report Issues](https://github.com/antoniopezzella/Marsh-Design-System/issues)
- 💬 [Discuss on Slack](#design-system)
