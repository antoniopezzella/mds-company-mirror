# MDS-Platform Custom Agents & Skills

AI-assisted design system workflows using specialized agents and skills.

---

## 🎯 Overview

This project uses **Custom Agents** for complex multi-stage tasks and **Skills** for focused workflows. Both reference core rules documents (CLAUDE.md, DESIGN.md) to maintain design system integrity.

**Architecture:**
```
Core Rules (CLAUDE.md, DESIGN.md)
       ↓ referenced by
Workflow Skills (/figma-to-code, /code-to-design)
       ↓ invoked by
Specialized Agents (@Figma Documentation Builder, @MDS Component Author)
       ↓ used by
User (@workspace [slash command or @agent])
```

---

## 📚 Core Documentation

Before using any agent or skill, read:

- **[CLAUDE.md](../CLAUDE.md)** — Figma-to-code rules (design system integration, token system, component patterns)
- **[DESIGN.md](../DESIGN.md)** — Code-to-Figma rules (design creation, Figma MCP tools, token binding)
- **[AGENT_SKILLS_RESEARCH.md](../AGENT_SKILLS_RESEARCH.md)** — Research findings on bidirectional workflows

---

## 🛠️ Skills

Skills are **on-demand workflows** for specific tasks. Invoke with **slash commands** (`/skill-name`).

### /figma-to-code

**Purpose:** Translate Figma designs into MDS-compliant React code

**Use When:**
- Implementing a Figma design
- Building component from design URL
- Generating code from wireframe
- Converting design specs to React

**Trigger Phrases:** "Figma to code", "implement this design", "build from Figma", "translate design"

**Workflow:**
1. Loads CLAUDE.md rules
2. Fetches design context and screenshot
3. Maps Figma variants → React props
4. Generates component with role tokens
5. Creates Storybook story
6. Creates Code Connect mapping
7. Validates governance rules

**Example:**
```
@workspace /figma-to-code https://figma.com/design/abc123?node-id=123-456
```

**Output:**
- `src/components/[Name]/[Name].tsx` (React component)
- `src/components/[Name]/[Name].stories.tsx` (Storybook story)
- `src/figma/[Name].figma.tsx` (Code Connect mapping)
- Validation results (roles check, contrast, tests)

**File:** `.github/skills/figma-to-code/SKILL.md`

---

### /code-to-design

**Purpose:** Create Figma designs from code specifications or wireframes

**Use When:**
- Creating Figma component from code
- Building mockup from description
- Syncing code changes to Figma
- Generating design from component spec

**Trigger Phrases:** "code to Figma", "create in Figma", "build design", "generate Figma component"

**Workflow:**
1. Loads DESIGN.md rules
2. Searches MDS library for existing components
3. Imports components OR creates from scratch
4. Applies design tokens (Figma variables)
5. Configures Auto Layout
6. Organizes variants
7. Adds comprehensive documentation

**Example:**
```
@workspace /code-to-design Create a Button component with Primary, Secondary, 
and Outline variants in small, medium, and large sizes.
```

**Output:**
- Figma component in library (file: `uWlcofRor5Dik8LBnJbIjo`)
- Component properties (Type, Size, State)
- Organized variants (purple dashed layout)
- Documentation (description, usage, tokens)

**File:** `.github/skills/code-to-design/SKILL.md`

---

## 🤖 Custom Agents

Agents are **multi-stage workflows** with context isolation. Invoke with **@agent-name**.

### @Figma Documentation Builder

**Purpose:** Create comprehensive component documentation IN Figma

**Use When:**
- Building component documentation pages
- Creating design system docs
- Documenting variants and usage
- Writing developer handoff specs

**Trigger Phrases:** "Figma documentation", "document in Figma", "create docs", "component specs"

**Capabilities:**
- Researches component specifications
- Creates documentation frames in Figma
- Builds property tables
- Generates usage guidelines
- Adds visual examples
- Links code examples

**Example:**
```
@Figma Documentation Builder Document the Button component with all variants 
and accessibility guidelines
```

**Output:**
- Figma page: "Button Documentation"
- Sections: Overview, Visual Examples, Properties, Tokens, Accessibility, Code
- Screenshots of variants
- Typography hierarchy (48px → 32px → 16px → 12px)

**File:** `.github/agents/figma-documentation.agent.md`

---

### @MDS Component Author

**Purpose:** Complete component lifecycle (design → code → documentation)

**Use When:**
- Creating new design system component
- Building section/layout from wireframe
- Implementing Figma URL end-to-end
- Full component authoring workflow

**Trigger Phrases:** "create component", "add component", "implement design", "Figma to code", "new section"

**Capabilities:**
- Analyzes Figma designs OR wireframes
- Generates MDS-compliant React code
- Creates Storybook stories
- Runs governance checks
- Publishes Code Connect mappings
- Updates documentation

**Example:**
```
@MDS Component Author Create a WireframeSlide section from this Figma URL: 
https://figma.com/design/abc123?node-id=123-456
```

**Output:**
- Complete component implementation
- Storybook with all variants
- Code Connect published to Figma
- Governance validation passed
- Documentation updated

**File:** `.github/agents/mds-component-author.agent.md`

---

### @MDS Animation Specialist

**Purpose:** GSAP animations and interactive experiences with MDS components

**Use When:**
- Adding GSAP animations
- Creating scroll-triggered effects
- Building interactive experiences
- Implementing parallax or motion design

**Trigger Phrases:** "GSAP", "animation", "ScrollTrigger", "timeline", "parallax", "motion design"

**Capabilities:**
- Creates GSAP timelines
- Implements ScrollTrigger animations
- Builds smooth scroll experiences
- Adds entrance/reveal effects
- Optimizes performance

**Example:**
```
@MDS Animation Specialist Add scroll-triggered card reveals with stagger effect 
on the homepage
```

**Output:**
- GSAP animation code
- ScrollTrigger configuration
- Performance optimizations
- Accessibility considerations (prefers-reduced-motion)

**File:** `.github/agents/mds-animation-specialist.agent.md`

---

## 📊 Skill vs. Agent Decision Matrix

| Use Case | Use | Rationale |
|----------|-----|-----------|
| Translate single Figma design → code | **Skill** (`/figma-to-code`) | Single workflow, deterministic steps |
| Create single Figma design from code | **Skill** (`/code-to-design`) | Focused task, bundled rules (DESIGN.md) |
| Build component docs IN Figma | **Agent** (`@Figma Documentation Builder`) | Multi-stage, context isolation needed |
| Complete component lifecycle | **Agent** (`@MDS Component Author`) | Complex, different tools per stage |
| Add animations to components | **Agent** (`@MDS Animation Specialist`) | Specialized domain, GSAP expertise |

**General Rule:**
- **Skills**: Single-purpose, repeatable workflows with bundled assets (**do this exact thing**)
- **Agents**: Multi-stage, complex tasks requiring different tool restrictions (**orchestrate this process**)

---

## 🔄 Bidirectional Workflows

### Design → Code → Design (Validation Loop)

1. **Start:** Figma design URL
2. **Generate Code:** `/figma-to-code` → React component with role tokens
3. **Reverse Generate:** `/code-to-design` → Recreate Figma design from code
4. **Compare:** Original Figma vs. Generated Figma = 1:1 match? ✅
5. **Iterate:** Fix discrepancies, update cross-reference tables

### Code → Design → Code (Sync Check)

1. **Start:** React component code
2. **Generate Design:** `/code-to-design` → Figma component
3. **Reverse Generate:** `/figma-to-code` → React code from Figma
4. **Compare:** Original code vs. Generated code = equivalent? ✅
5. **Validate:** Token usage, spacing, typography match

**Cross-Reference Validation** (see AGENT_SKILLS_RESEARCH.md):
- Token names (blue1000 ↔ Blue.1000)
- Component names (DSButton ↔ Button)
- Variant properties (Type ↔ variant)
- Spacing scale (spacing(3) ↔ 16px)
- Typography (var(--typo-h1) ↔ h1 text style)

---

## 📖 Usage Examples

### Example 1: Implement New Component from Figma

```
@workspace /figma-to-code https://figma.com/design/uWlcofRor5Dik8LBnJbIjo?node-id=7579-138

→ Skill loads CLAUDE.md
→ Fetches Button component design context
→ Maps Figma "Type" property → variant prop
→ Generates DSButton.tsx with getRoleColor()
→ Creates Button.stories.tsx with all variants
→ Creates Button.figma.tsx Code Connect mapping
→ Validates: npm run roles:check ✅
            npm run tokens:contrast:all ✅
→ Output: src/components/Button/
```

### Example 2: Create Figma Component from Code Spec

```
@workspace /code-to-design Create a Card component with:
- Auto Layout (vertical stack)
- Image at top (full width)
- Title (h4, text.primary)
- Body (body1, text.secondary)
- Button at bottom (primary variant)
- Spacing: 24px padding, 16px gap

→ Skill loads DESIGN.md
→ Searches library for Card (found?)
→ If not: Creates component with Auto Layout
→ Binds colors to Figma variables (text.primary, surface.default)
→ Sets spacing using spacing variables
→ Adds component description
→ Output: Figma Component Set "Card" in library
```

### Example 3: Build Documentation in Figma

```
@Figma Documentation Builder Document the TextField component with:
- All variants (Outlined, Filled)
- All sizes (Small, Medium)
- All states (Default, Hover, Focus, Error, Disabled)
- Accessibility requirements (ARIA labels, focus management)
- Code examples with getRoleColor()

→ Agent researches TextField spec
→ Creates Figma Section "TextField Documentation"
→ Builds frames: Overview, Examples, Properties, Tokens, A11y, Code
→ Imports TextField instances for visual examples
→ Creates property table (Name, Type, Default, Description)
→ Adds code snippets with monospace font
→ Takes screenshot of final layout
→ Output: Comprehensive Figma docs page
```

### Example 4: Complete Component Lifecycle

```
@MDS Component Author Create a Stepper component from this wireframe:
[image attachment or description]
- Horizontal steps with connector line
- Step states: Complete, Active, Upcoming
- Step content: Icon, Label, Optional description
- Variants: Numbered, Icon-only
- Sizes: Compact, Default

→ Agent analyzes wireframe
→ Searches MDS library (not found)
→ Creates Figma component with Auto Layout
→ Generates React component with role tokens
→ Creates Storybook with all variants
→ Runs governance checks
→ Publishes Code Connect
→ Updates component library docs
→ Output: Complete component (Figma + Code + Docs)
```

---

## 🔧 Development Workflow

### Setting Up Skills Locally

Skills are automatically discovered from:
- `.github/skills/[skill-name]/SKILL.md`
- `.agents/skills/[skill-name]/SKILL.md`

**Creating a New Skill:**

1. Create directory: `.github/skills/[skill-name]/`
2. Create `SKILL.md` with YAML frontmatter:
   ```yaml
   ---
   name: skill-name
   description: "Use when: [trigger phrases]. DO NOT USE FOR: [anti-patterns]"
   ---
   
   # Skill Body
   ```
3. Add bundled assets (templates, scripts, docs)
4. Test with: `@workspace /skill-name [arguments]`

**Critical:** `description` field must contain trigger keywords for AI to discover skill.

### Updating Agents

Agents are defined in `.github/agents/[agent-name].agent.md`:

```yaml
---
name: Agent Name
description: "Use when: [trigger phrases]"
tools: [read, write, search, execute]  # Tool restrictions
model: "Claude Sonnet 4.5"
user-invocable: true
argument-hint: "Describe what to build"
---

# Agent Instructions
```

Update agent by editing `.agent.md` file.

---

## 📏 Governance & Validation

All skills and agents enforce design system governance:

### Pre-Generation Checks
- [ ] CLAUDE.md or DESIGN.md loaded
- [ ] Token definitions current (`npm run tokens:build`)
- [ ] MDS library searched (no duplication)

### Post-Generation Checks
- [ ] Colors use `getRoleColor()` (no hardcoded hex)
- [ ] Spacing uses `theme.spacing(n)` (no inline pixels)
- [ ] Typography uses CSS variables or MUI variants
- [ ] Component props match Figma properties
- [ ] Auto Layout applied (Figma)
- [ ] Variables bound (not hardcoded colors in Figma)

### Automated Validation
```bash
npm run roles:check        # Detects direct token usage ❌
npm run tokens:contrast:all # WCAG AA validation ✅
npm test                   # Unit tests ✅
npm run build              # TypeScript compilation ✅
```

---

## 🎯 Best Practices

### Using Skills

✅ **DO:**
- Read core rules (CLAUDE.md, DESIGN.md) first
- Provide clear, specific inputs (Figma URL, component spec)
- Validate outputs with governance scripts
- Review generated code before committing

❌ **DON'T:**
- Skip validation steps
- Modify generated code without understanding patterns
- Bypass design system rules
- Create components without searching library first

### Using Agents

✅ **DO:**
- Use for complex, multi-stage tasks
- Provide comprehensive context (wireframes, specs, examples)
- Let agent orchestrate sub-tasks
- Review intermediate outputs

❌ **DON'T:**
- Use for simple, single-step tasks (use skills instead)
- Interrupt mid-workflow
- Skip agent recommendations
- Bypass governance checks

---

## 📊 Metrics & Impact

**Time Savings** (per component):
- Manual Figma → Code: 2-4 hours
- With `/figma-to-code` skill: 15-30 minutes
- **Savings: 1.5-3.5 hours**

**Quality Improvements:**
- 100% role token usage (automated enforcement)
- WCAG AA compliance (automated checks)
- Component parity (bidirectional validation)
- Design system governance (CI-integrated)

**Coverage Goals:**
- Components with Code Connect: 30+ → **40+ (target)**
- Figma Variables → Code Tokens: ~90% → **100% (target)**
- Auto Layout Usage: ~80% → **100% (target)**
- Documentation Coverage: 60% → **90% (target)**

---

## 🚀 Next Steps

1. **Test Skills in Production**
   - Generate 5 components with `/figma-to-code`
   - Create 5 Figma designs with `/code-to-design`
   - Measure time savings vs. manual workflow

2. **Enhance Documentation**
   - Add visual diagrams to CLAUDE.md and DESIGN.md
   - Create video tutorials for skills
   - Document edge cases

3. **Automation**
   - CI validation (Figma ↔ React consistency)
   - Token sync script (Figma → code)
   - Design system health dashboard

4. **Team Training**
   - Workshop: "Bidirectional Workflows"
   - Skill usage best practices
   - Agent orchestration patterns

---

## 📚 Reference

| Resource | Path | Purpose |
|----------|------|---------|
| **CLAUDE.md** | `/CLAUDE.md` | Figma-to-code rules |
| **DESIGN.md** | `/DESIGN.md` | Code-to-Figma rules |
| **AGENT_SKILLS_RESEARCH.md** | `/AGENT_SKILLS_RESEARCH.md` | Research findings |
| **figma-to-code skill** | `.github/skills/figma-to-code/` | Design-to-code workflow |
| **code-to-design skill** | `.github/skills/code-to-design/` | Code-to-design workflow |
| **Figma Documentation Builder** | `.github/agents/figma-documentation.agent.md` | Documentation in Figma |
| **MDS Component Author** | `.github/agents/mds-component-author.agent.md` | Complete component lifecycle |
| **MDS Animation Specialist** | `.github/agents/mds-animation-specialist.agent.md` | GSAP animations |

---

**For questions or improvements**, see [CONTRIBUTING.md](../CONTRIBUTING.md) or contact `#design-system` Slack.
