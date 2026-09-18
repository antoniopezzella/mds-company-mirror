# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [0.3.0](https://github.com/antoniopezzella/marsh-design-system/compare/v0.2.0...v0.3.0) (2026-09-18)


### Features

* add Marsh1DER, marsh-one SolutionsGrid, and resg page work ([265b876](https://github.com/antoniopezzella/marsh-design-system/commit/265b87675e2d80434715e5a4eda156c403396d91))
* **components:** add a size prop to Badge instead of overriding it downstream ([fe5cb95](https://github.com/antoniopezzella/marsh-design-system/commit/fe5cb950acc59b2b8f154812621befdd6ccaf50c))
* **components:** add date-picker Storybook stories ([58d7d93](https://github.com/antoniopezzella/marsh-design-system/commit/58d7d9362b98dfadd374c74c4b83f1262fd97eb3))
* **components:** add rich MessageScroller demos matching shadcn's own docs ([f8ebbf9](https://github.com/antoniopezzella/marsh-design-system/commit/f8ebbf99cc25834f21143bd6539fb5aba7c6e167))
* **components:** bring DataTable to MUI DataGrid parity with a connected footer ([e4ac7a9](https://github.com/antoniopezzella/marsh-design-system/commit/e4ac7a9a3022e9520746e41d85b0ecc15c6470e9))
* **components:** continue shadcn-ui migration ([c3482ca](https://github.com/antoniopezzella/marsh-design-system/commit/c3482ca76f4c7e8a7e4328f50254ad34e508d460))
* **components:** rebuild Stepper against reui's variant set and a11y model ([1d5dede](https://github.com/antoniopezzella/marsh-design-system/commit/1d5dede72a2dc0ad8a8c4daa27784e909566f672))
* **components:** render DataTable's empty state with the Empty component ([7af5409](https://github.com/antoniopezzella/marsh-design-system/commit/7af540943a1e1ef4a85500dd66abc97aad60b917))
* **design-system:** add /design-system component showcase ([77ac05c](https://github.com/antoniopezzella/marsh-design-system/commit/77ac05c0ae8db7b31fa9d5b46d9200879331bfe5))
* **design-system:** add Navigation, Data display, and Messaging categories ([10b420c](https://github.com/antoniopezzella/marsh-design-system/commit/10b420c02e56d412977256918a229f0a3746222b))
* **gateway:** update RAG answer composition and index wiring ([d3b7d75](https://github.com/antoniopezzella/marsh-design-system/commit/d3b7d7524b9d413aef0f5717bd4561d14b4ae1d3))
* **governance:** tighten role/contrast tooling and Foundations docs ([7b43cd9](https://github.com/antoniopezzella/marsh-design-system/commit/7b43cd9bb993a84ab2fa469cd1da368076144498))
* **governance:** wire jsx-a11y into eslint, fix all 37 violations found ([158d947](https://github.com/antoniopezzella/marsh-design-system/commit/158d9473e84d78603e3e8fef12d6413bb6369b10))
* **gsap:** add reusable scroll-effect hooks and wire into Marsh1DER ([8c04777](https://github.com/antoniopezzella/marsh-design-system/commit/8c047779579e93236d726f8a91a7314901da5e5b))
* **registry:** add pilot shadcn GitHub registry (8 items) ([d346063](https://github.com/antoniopezzella/marsh-design-system/commit/d346063f60a5d55ba53baa53445609d7b1e15ad6))
* **registry:** expand to all 71 components (76 items total) ([bff389e](https://github.com/antoniopezzella/marsh-design-system/commit/bff389e2dbb291288772b383a3b6ec530b2473eb))
* **storybook:** add Foundations/Governance page with theme-aware flow diagrams ([4758d6b](https://github.com/antoniopezzella/marsh-design-system/commit/4758d6beda1da821c13d9476ba89b93c188aefbe))
* **storybook:** custom MDS-breakpoint viewport presets for HeroBanner/CarouselSection ([d85e28c](https://github.com/antoniopezzella/marsh-design-system/commit/d85e28cb8f3595009781c4f7ea75a6ae729cba72))
* **storybook:** hide remaining MUI component stories from sidebar ([6e534bf](https://github.com/antoniopezzella/marsh-design-system/commit/6e534bf10c50c430f4b7f966f0abd71cccdd01b5))
* **tokens:** add DTCG role tier, Figma sync tooling, style-dictionary pipeline ([bf0119f](https://github.com/antoniopezzella/marsh-design-system/commit/bf0119f148e9bdf097f750a9953e6ceac3446123))
* **tokens:** add figma-variable-map.json, seeded with live-verified entries only ([90e6928](https://github.com/antoniopezzella/marsh-design-system/commit/90e6928aefff9fcee898e15700d82bc2229903e3))
* **tokens:** add surface.hover/surface.selected and use them for DataTable rows ([57b4cc3](https://github.com/antoniopezzella/marsh-design-system/commit/57b4cc36cee287bdc0cbb8683b03497371819231))
* **tokens:** emit dist/tokens.dtcg.json as a permanent DTCG artifact ([1d07e03](https://github.com/antoniopezzella/marsh-design-system/commit/1d07e03cebe3bb211ca24076b2c860ed38f3f7b6))
* **tokens:** real Figma drift-check tooling, replacing the lost-history problem ([ad7f6dd](https://github.com/antoniopezzella/marsh-design-system/commit/ad7f6dd61763dc2bca85e64d1fe155ba386f1bdf))
* **tokens:** sync Figma tokens, DTCG export, Playwright tests, doc governance ([5c6eb53](https://github.com/antoniopezzella/marsh-design-system/commit/5c6eb532ded1662aa149b098e7a2b9a1073d9fca))


### Bug Fixes

* **build:** commit build-knowledge-base.js — kb:build was calling a ghost file ([dfa5edb](https://github.com/antoniopezzella/marsh-design-system/commit/dfa5edb1ae9d379b3a2fa9a722f7087843dc3b17))
* **build:** commit missing api/_lib dependency breaking chat-stream deploy ([c65402d](https://github.com/antoniopezzella/marsh-design-system/commit/c65402d81d170a5dad8dd91d94e82729f1dbdaac))
* **build:** exclude .env from Vercel uploads ([f4001bf](https://github.com/antoniopezzella/marsh-design-system/commit/f4001bf09ca7fe86c5b4ee4353332de34550edd8))
* **build:** remove unnecessary any from Figma Code Connect example callbacks ([ed6be91](https://github.com/antoniopezzella/marsh-design-system/commit/ed6be91c3daf7b28c2f209b0f6413d4552791bdf))
* **build:** resolve all 164 pre-existing lint errors, fix token-artifact build-order bug ([73ba966](https://github.com/antoniopezzella/marsh-design-system/commit/73ba9665ccf5b1c8c0992c45b19a6e087a7a1797))
* **build:** resolve no-console/exhaustive-deps/misc lint warnings ([5a0005a](https://github.com/antoniopezzella/marsh-design-system/commit/5a0005a4eafab8dcd1625d27ac50f69a20ae9883))
* **build:** resolve the final 9 no-explicit-any warnings ([5e97d1b](https://github.com/antoniopezzella/marsh-design-system/commit/5e97d1beee4b88e39769413f27b61389892c056c))
* **build:** type Button.stories/TypographyTable instead of casting to any ([ea7cd4f](https://github.com/antoniopezzella/marsh-design-system/commit/ea7cd4fbe757ae4cfec3fe969fe6e52111a53e23))
* **build:** type remaining component/page any usages via real MUI/gsap types ([649942e](https://github.com/antoniopezzella/marsh-design-system/commit/649942e799212bc3945ad62bda24015b98b98fbf))
* **build:** type StoryUIPanel's manifest/orphan-story JSON handling ([dbf8c27](https://github.com/antoniopezzella/marsh-design-system/commit/dbf8c27d6774ddcac36a364d871d5e736f2ffa7d))
* **build:** type the Story UI window globals and Web Speech API usage ([5846b1a](https://github.com/antoniopezzella/marsh-design-system/commit/5846b1ad823aa30e5b77f8d9ae0dc3a57920bb72))
* **build:** type the token/role test files instead of casting to any ([018a196](https://github.com/antoniopezzella/marsh-design-system/commit/018a196cc24fd4efb14ec2dbbf806adc8b016af4))
* **build:** type-check api/ and clear Vercel's function build errors ([0a9bb33](https://github.com/antoniopezzella/marsh-design-system/commit/0a9bb33710e4e0b242f0c50e9b3afb91015a5e9a))
* **build:** wire kb:build into Vercel's buildCommand, add missing assets ([e6b0ab3](https://github.com/antoniopezzella/marsh-design-system/commit/e6b0ab3ce1160ee2db684c119e8d5b9dcdd1636f))
* **components:** correct SideNavigation CTA button contrast on dark rail ([700f2d9](https://github.com/antoniopezzella/marsh-design-system/commit/700f2d99dcc7b5a1e5b66a5701672755d28dd6a6))
* **components:** make a resizable DataTable fill its container ([833f970](https://github.com/antoniopezzella/marsh-design-system/commit/833f970508b03e60ab152cb76dd6b38716c96170))
* **components:** namespace the legacy Bootstrap-style grid system ([84b160a](https://github.com/antoniopezzella/marsh-design-system/commit/84b160aacaceb17cb943f094015973c9605c48bc))
* **components:** raise popover z-index above MUI's stacking scale ([4e87802](https://github.com/antoniopezzella/marsh-design-system/commit/4e87802220a538d9274b20ba43f9935090438a3e))
* **components:** resolve ambiguous Tailwind duration/ease classes ([10bfef3](https://github.com/antoniopezzella/marsh-design-system/commit/10bfef37d65d6954d39f72c47875d4e2e3f0bae1))
* **components:** resolve broken images on the live /marsh-corporate page ([f1c434e](https://github.com/antoniopezzella/marsh-design-system/commit/f1c434e3738d8cd69baf4b44b808d33be8ab8ac0))
* **components:** tooltip z-index also loses to MUI's stacking scale ([50fe426](https://github.com/antoniopezzella/marsh-design-system/commit/50fe426ad1c30eba90bc984433117378e7a7bd0d))
* **components:** use a neutral hover and reserve blue for selected rows ([9b39e05](https://github.com/antoniopezzella/marsh-design-system/commit/9b39e052cd00431c26d2b620b4e5d09d75d29294))
* **roles:** add text.onInteractive/text.onLight for dark-mode contrast ([adaa9ac](https://github.com/antoniopezzella/marsh-design-system/commit/adaa9ac82ae2cf4f22580ec7c9396f42738f0520))
* **storybook:** also drop 'autodocs' so hidden MUI components have no sidebar entry at all ([4d798a2](https://github.com/antoniopezzella/marsh-design-system/commit/4d798a25da28d936e9094580f69d713ce85f043e))
* **storybook:** move hidden MUI stories to a distinct 'Legacy MUI' namespace ([82749f1](https://github.com/antoniopezzella/marsh-design-system/commit/82749f1626a880f0dfce134f63f0b7e120cd1d17))
* **theme:** repair the border-radius scale so rounded-md is the DS 2px ([7ec4694](https://github.com/antoniopezzella/marsh-design-system/commit/7ec4694e98a4fba67cf52bb0b31604484f514800))
* **tokens:** close out pending focus-ring/danger-contrast token updates ([48a6695](https://github.com/antoniopezzella/marsh-design-system/commit/48a669526c01b9c720f21cef6bce65537e6d250d))
* **tokens:** make dist/tokens.dtcg.json actually DTCG spec-compliant ([723a308](https://github.com/antoniopezzella/marsh-design-system/commit/723a308e082fbc6e3c60dc05a280cdec7d9c4c7f))


### Refactoring

* **storybook:** rename 'shadcn-ui' sidebar group to 'Components' ([a8ce3f1](https://github.com/antoniopezzella/marsh-design-system/commit/a8ce3f159b948a389a2cb061dfb2c2178814a31e))


### Tests

* **components:** add coverage for 8 core interactive primitives ([0ea46c4](https://github.com/antoniopezzella/marsh-design-system/commit/0ea46c46e06199d8e9c6d01ab12d167af93fa009))
* **components:** add coverage for 8 more common primitives ([aacefc3](https://github.com/antoniopezzella/marsh-design-system/commit/aacefc3e45fde572a12df8272dea4beb2d5d6872))
* **storybook:** add border-contrast health-check story ([f42f78a](https://github.com/antoniopezzella/marsh-design-system/commit/f42f78ad8afb9d23cd62c1274cd77d7781005f9b))
* **tokens:** regenerate stale token and role snapshots ([4f84763](https://github.com/antoniopezzella/marsh-design-system/commit/4f84763a194c1b1713585a9bbcfe923b4b553996))


### Continuous Integration

* give feature branches real CI signal, add lint gate ([8e22015](https://github.com/antoniopezzella/marsh-design-system/commit/8e220159dca3b7d6db1131b7a3b3455a0a022e7b))


### Chores

* **build:** stop tracking generated test-coverage output ([b837359](https://github.com/antoniopezzella/marsh-design-system/commit/b8373591194acf4eaea6f8e02e459fc4607ce5b8))
* **components:** remove the WebsiteAlertBanner component ([357294d](https://github.com/antoniopezzella/marsh-design-system/commit/357294d3d38c232eefcfc2a047f53e1b3adfb25b))
* remove orphaned scratch files and pages ([d0be8fa](https://github.com/antoniopezzella/marsh-design-system/commit/d0be8fa5c3e78b359d0b06ed3c096b1ed5fe5ed8))
* **security:** stop tracking .env ([695d58c](https://github.com/antoniopezzella/marsh-design-system/commit/695d58cca71a780aa4c7d5cc8ef15cad246bbf26))
* tooling config and dependency bumps ([6e5c659](https://github.com/antoniopezzella/marsh-design-system/commit/6e5c6596cb637f08367cb73c3e7babee64f88862))


### Documentation

* add GOVERNANCE.md — visual flowcharts for all three governance systems ([6dfebb6](https://github.com/antoniopezzella/marsh-design-system/commit/6dfebb65a21402ead42fee2b006df7c1457dd1f3))
* add missing Refactoring entry to CHANGELOG.md ([ead2636](https://github.com/antoniopezzella/marsh-design-system/commit/ead2636ecfc84d5adc5fffb69677486cb1313a40))
* reorganize sprawled root-level documentation ([b44439e](https://github.com/antoniopezzella/marsh-design-system/commit/b44439ef6d15296d63dd9940b89a71b5d1ae1fcc))
* **storybook:** add a Foundations/Changelog page rendered from CHANGELOG.md ([243aee8](https://github.com/antoniopezzella/marsh-design-system/commit/243aee896f209188be3012aaaa887198ee566bd6))
* **storybook:** add Foundations/Testing, wire up story-scoped coverage ([8887711](https://github.com/antoniopezzella/marsh-design-system/commit/88877110e6d35cca4fa5b7496dc883c86ae4c16d))
* update DEVELOPERS.md registry coverage note (8 -> 76 items) ([2ca7630](https://github.com/antoniopezzella/marsh-design-system/commit/2ca76307bc85eebc52dee2d48b2eeae2c3da1bd8))
* update migration status and fix stale doc links ([e7a34e5](https://github.com/antoniopezzella/marsh-design-system/commit/e7a34e5c52b3d755e8fe4886f6da29ae312ac0ec))

## [0.2.0](https://github.com/antoniopezzella/marsh-design-system/compare/v0.0.0...v0.2.0) (2026-08-21)


### Features

* **agents:** add design-system-agent — deepagents pipeline for Figma-to-code ([197e2d0](https://github.com/antoniopezzella/marsh-design-system/commit/197e2d0a400f0bf65d098bbfb4aefdce586df1ad))
* **components:** add shadcn/ui chat-components set ([82acfef](https://github.com/antoniopezzella/marsh-design-system/commit/82acfefc96dd916ca73908e6d13ec2f8f1969a7c))
* **components:** build shadcn-dashboard live proving-ground page ([a33dcd0](https://github.com/antoniopezzella/marsh-design-system/commit/a33dcd09876378c5ef24aba5473548e3eec42312))
* **package:** configure npm library build and publish workflow ([6015eba](https://github.com/antoniopezzella/marsh-design-system/commit/6015eba87fcc474ccd4eeb313f33ee343edb7547))
* **theme:** wire dark mode across the shadcn/ui component set ([e447866](https://github.com/antoniopezzella/marsh-design-system/commit/e447866a4d5c3539566d9417f86a19591a179b0b))
* **ui:** build out shadcn/ui primitive component library ([4726f8c](https://github.com/antoniopezzella/marsh-design-system/commit/4726f8ccfd074df81a3eb99d4663073e89b0cec7))


### Bug Fixes

* **components:** add scroll-fade and scrollbar utilities used by chat components ([9d9bb37](https://github.com/antoniopezzella/marsh-design-system/commit/9d9bb373d34894d080bfbf982ac66ca4cd7315c0))
* **components:** add stories for chat components + fix Bubble color rendering ([da4d946](https://github.com/antoniopezzella/marsh-design-system/commit/da4d9469538958a9819ca82b8b686cc06ee56b69))


### Refactoring

* **components:** consolidate MUI components into shadcn/ui equivalents ([a7f78d4](https://github.com/antoniopezzella/marsh-design-system/commit/a7f78d42d4320b8e5881fe347afbdd1500ab425c))

## 0.0.0 (2025-10-12)

* chore: remove palette experiment stories and revert to pre-experiment state ([244bb82](https://github.com/antoniopezzella/Marsh-Design-System/commit/244bb82))
* chore: snapshot current design system state before further color refactors ([7928475](https://github.com/antoniopezzella/Marsh-Design-System/commit/7928475))
* chore: unify Node to 22 (workflows) + add engines and .nvmrc ([d2eb3e8](https://github.com/antoniopezzella/Marsh-Design-System/commit/d2eb3e8))
* chore(ci): add GitHub Actions workflow for lint, tokens, tests, build, storybook ([35de829](https://github.com/antoniopezzella/Marsh-Design-System/commit/35de829))
* chore(governance): add governance badge script and README integration (Step 3C) ([d39444a](https://github.com/antoniopezzella/Marsh-Design-System/commit/d39444a))
* chore(tokens): add markdown diff output and integrate into CI summary ([a047d65](https://github.com/antoniopezzella/Marsh-Design-System/commit/a047d65))
* chore(tokens): add schema + validation script and integrate into tokens:check ([1690980](https://github.com/antoniopezzella/Marsh-Design-System/commit/1690980))
* chore(tokens): commit generated tokens.json and introduce diff governance script ([6515c4c](https://github.com/antoniopezzella/Marsh-Design-System/commit/6515c4c))
* docs: add CI & quality gates section (phase 1) ([8aa4791](https://github.com/antoniopezzella/Marsh-Design-System/commit/8aa4791))
* docs(colors): surface amber palette and semantic status bg/text tokens with contrast examples ([47d26e3](https://github.com/antoniopezzella/Marsh-Design-System/commit/47d26e3))
* docs(governance): promote interactive role pairs to enforced and update contrast & roles docs (Step  ([223dab6](https://github.com/antoniopezzella/Marsh-Design-System/commit/223dab6))
* feat(a11y): add contrast validation script and adjust semantic tokens for WCAG compliance (temporary ([f5b37f6](https://github.com/antoniopezzella/Marsh-Design-System/commit/f5b37f6))
* feat(tokens): add blue800 and remap interactivePrimaryHover to blue800 (improves header hover contra ([17f19cb](https://github.com/antoniopezzella/Marsh-Design-System/commit/17f19cb))
* feat(tokens): add success/danger bg/text semantic tokens and deprecation metadata ([32a70bf](https://github.com/antoniopezzella/Marsh-Design-System/commit/32a70bf))
* feat(tokens): introduce accessible warning palette (amber scale) and semantic bg/text tokens ([7c8d9ae](https://github.com/antoniopezzella/Marsh-Design-System/commit/7c8d9ae))
* feat(tokens): introduce semantic color layer and governance tests ([de8facf](https://github.com/antoniopezzella/Marsh-Design-System/commit/de8facf))
* fix(header): use surface.accent (blue700) instead of interactive.primary for app bar background ([56505d6](https://github.com/antoniopezzella/Marsh-Design-System/commit/56505d6))
