# Changelog

All notable changes to this project will be documented in this file. See [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) for commit guidelines.

## [0.8.0](https://github.com/antoniopezzella/marsh-design-system/compare/v0.7.0...v0.8.0) (2026-10-08)

### Features

* **components:** add the marsh-dashboard block, and make the registry installable ([4343b98](https://github.com/antoniopezzella/marsh-design-system/commit/4343b9832ebd5284982fda5c185235f7df6c790e))
* **components:** build the Client Pivot View tab ([57f262d](https://github.com/antoniopezzella/marsh-design-system/commit/57f262d3d261a2ae4840fff5fb11fa763d0335e4))
* **components:** sortable headers on the Client Pivot assignments table ([5bb5f2c](https://github.com/antoniopezzella/marsh-design-system/commit/5bb5f2cff6abbba813d397e6656c79f065ed908e))
* **governance:** enforce no-raw-hex in components/ui, keep it advisory elsewhere ([5da7844](https://github.com/antoniopezzella/marsh-design-system/commit/5da78447c01e6e242ae34edae584569e18dcb21d))
* **governance:** refuse commits to main with a pre-commit hook ([3981716](https://github.com/antoniopezzella/marsh-design-system/commit/39817169946fd525b5a536f11ac03b8c05a871b2))
* **governance:** rubric v3 — score the three goals, not just tidiness ([62347d3](https://github.com/antoniopezzella/marsh-design-system/commit/62347d33906acc6ed7f55fc42646303aed2319dd))
* **governance:** self-test the a11y gate, and check the registry against disk ([cecadfd](https://github.com/antoniopezzella/marsh-design-system/commit/cecadfd179ad71c23ff6928c73b11849bbc348b1))
* **governance:** self-test the ds:score metrics, and fix expression_reach (GOV-2) ([74656af](https://github.com/antoniopezzella/marsh-design-system/commit/74656af7b7eebcf17bc2a5b568f1fe43bc193ded))
* **governance:** self-test the static gates, proving they can fail ([565e6a9](https://github.com/antoniopezzella/marsh-design-system/commit/565e6a93f9a0d40859caeecd2337fa84e94ce3d0))
* **repo:** four propose-only agents to work the readiness backlog ([2253bf6](https://github.com/antoniopezzella/marsh-design-system/commit/2253bf6f80630f299dcfd4a9ac813a53eaed8583))
* **roles:** add text.placeholder, promoting an unreachable semantic ([8dd66fe](https://github.com/antoniopezzella/marsh-design-system/commit/8dd66fe53adb0f09d0b5d5169b1c05c36ff20d8c))
* **storybook:** emit the component manifest, and make docgen resolve @/ (AGENT-2) ([bbd22d6](https://github.com/antoniopezzella/marsh-design-system/commit/bbd22d6370f22fb3f38f6ed50cc8e4288e487223))
* **theme:** add CONTROL_RADIUS and move controls from 6px to 4px ([1aa1012](https://github.com/antoniopezzella/marsh-design-system/commit/1aa101225695b8bd56aa6aa35615c2dbb7e90470))
* **theme:** ship both typography expressions as explicit utilities (GLOBAL-1) ([67166a7](https://github.com/antoniopezzella/marsh-design-system/commit/67166a74e4375ef235b0bb5d76a2f6f4dd7f5577))

### Bug Fixes

* **components:** correct the four defects Run 5 found in the day's own work ([9f4b64d](https://github.com/antoniopezzella/marsh-design-system/commit/9f4b64d87b5e2c060bc9c5377f1da17ff360fd6d))
* **components:** empty button from AttachmentAction's iconOnly default ([04b0bfa](https://github.com/antoniopezzella/marsh-design-system/commit/04b0bfa832ce0e628844313936f332ed91398891))
* **components:** hero banner dark background used a button-fill role ([6556508](https://github.com/antoniopezzella/marsh-design-system/commit/65565089ef0c9b53a0c3a03576e10292cfd31ae3))
* **components:** move App.tsx Modal off the legacy size spelling ([0180439](https://github.com/antoniopezzella/marsh-design-system/commit/01804395f2e20e3d388125d4762008a859c0d828))
* **components:** size the Vimeo iframe to the source's ratio, not a hardcoded one ([3840fc2](https://github.com/antoniopezzella/marsh-design-system/commit/3840fc2508da7425b0d4c8a971133442d00a45b2))
* **governance:** ds:score read token counts from the rules file too ([82ebab6](https://github.com/antoniopezzella/marsh-design-system/commit/82ebab61a9c5eb70f3b1eb1925ab68e4db38a2e7))
* **governance:** make the role-usage gate see all 55 roles, and run it ([85f038d](https://github.com/antoniopezzella/marsh-design-system/commit/85f038d093771e330d3a0b66d7786b6d4490025b))
* **governance:** prop_docs counted docblocks attached to nothing ([77e3ec1](https://github.com/antoniopezzella/marsh-design-system/commit/77e3ec1925d34dc2760c545e0c37951b30a3ae55))
* **package:** check the registry dependency graph, not just the index ([6ae5d37](https://github.com/antoniopezzella/marsh-design-system/commit/6ae5d37eb39438a8ad671df187c58f3839a4788e))
* **package:** ship custom utilities to the package and make them variant-capable ([02b636d](https://github.com/antoniopezzella/marsh-design-system/commit/02b636d1c0ae4cddb0d99e0dcb043221d99fef9d))
* **storybook:** repair two broken image paths ([2159f2a](https://github.com/antoniopezzella/marsh-design-system/commit/2159f2a1324a7b2f17a6d911e1a8e076873aa4cc))
* **theme:** make the type scale rem, closing WCAG 1.4.4 ([d343370](https://github.com/antoniopezzella/marsh-design-system/commit/d343370035a0328b7ab1465dcca6194709200e81))
* **tokens:** neutralise surfaceAccent in dark, guard brand surfaces ([fed4382](https://github.com/antoniopezzella/marsh-design-system/commit/fed43823a2e80fd8bea4ca50de6efd6d7816a079))
* **tokens:** restore brand navy to surfaceHero in dark mode ([0c53b86](https://github.com/antoniopezzella/marsh-design-system/commit/0c53b868817f9375cefdd7de6a753993c424ca6d))[ceecff/#95caff](https://github.com/antoniopezzella/marsh-design-system/issues/95caff)

### Refactoring

* **components:** delete four MUI components, port their tests to ui/ ([df2bd6e](https://github.com/antoniopezzella/marsh-design-system/commit/df2bd6e45637f1ffc6a23342c8f0b92ed597a293))
* **components:** name hero text colours for what they are ([2d0de9e](https://github.com/antoniopezzella/marsh-design-system/commit/2d0de9e22b249060cd36ed2925cdf2287bbc1c51))
* **components:** repoint four Code Connect mappings to ui/ components ([15fd156](https://github.com/antoniopezzella/marsh-design-system/commit/15fd1569456284d4752556462278fcc3f9675ba6))
* **components:** take the shipped surface off the typography scope ([719e7d1](https://github.com/antoniopezzella/marsh-design-system/commit/719e7d10695e21c18a670aac9efdd72ced79f6a4))
* **theme:** rename to text-h1 / text-serif-h1, and fix a class collision ([621e07f](https://github.com/antoniopezzella/marsh-design-system/commit/621e07f727b2cd457b1bd979bf8eefbf6fc66cf5))

### Documentation

* **components:** document props on 31 modules (DEV-1, partial) ([4e1d87a](https://github.com/antoniopezzella/marsh-design-system/commit/4e1d87a2eb2dc47dda0fb2c8cc244ca50c7dcfe3))
* correct the Run-4 status note, which contradicted Run 5 ([c1dab9d](https://github.com/antoniopezzella/marsh-design-system/commit/c1dab9dcbc0be40982f435d03b0aed67a0f3f655))
* correct two docs that described the four deleted MUI components ([c288772](https://github.com/antoniopezzella/marsh-design-system/commit/c288772fe5e62817edc15a66b4dd3b597ab45fac))
* **guides:** correct the Vimeo cover's aspect-ratio claim ([b65466f](https://github.com/antoniopezzella/marsh-design-system/commit/b65466f7b9af7d9ef0353eb5629f5df31354e460))
* **guides:** record the responsive Vimeo cover requirement ([c8f40a0](https://github.com/antoniopezzella/marsh-design-system/commit/c8f40a0244663243ea0798ed9a28d0ca6790632d))
* map every open item to four goals, against the expressions target ([d06b80b](https://github.com/antoniopezzella/marsh-design-system/commit/d06b80b9da69945965589ad7eba11552feccd45d))
* **repo:** add the Atlas token comparison, as data plus a pointer ([53c9e1e](https://github.com/antoniopezzella/marsh-design-system/commit/53c9e1e6b31b9b811423e52bad393bce44d92d0d))
* **repo:** split CLAUDE.md into a 166-line core plus path-scoped rules ([3c5ef72](https://github.com/antoniopezzella/marsh-design-system/commit/3c5ef7225801b944c6dc1560db874e98e9c0c575))
* run 5 audit — verify the day's six commits instead of trusting them ([5a645a6](https://github.com/antoniopezzella/marsh-design-system/commit/5a645a6a56a683e27e68a08d423c5f32f35f0a6c))
* **storybook:** give the h1-h6 difference actual numbers ([8848105](https://github.com/antoniopezzella/marsh-design-system/commit/884810593e0c725f64b24d2111e33c0185d51f37))
* **storybook:** make CardWebsite stories render the approved carousel card ([1f0f6bd](https://github.com/antoniopezzella/marsh-design-system/commit/1f0f6bd4bba8f77d66ab81ff3f31739439a4700e))
* **storybook:** rewrite Foundations Typography, and document the self-tests ([53b6efd](https://github.com/antoniopezzella/marsh-design-system/commit/53b6efd4d4096a1bf31586e935d9f9b30ef64443))
* **tasks:** cut the dashboard role set from fifteen to four ([45aded5](https://github.com/antoniopezzella/marsh-design-system/commit/45aded5a9ccb93b11bd9a24d96ec5cd7bfcc3ed7))
* **tasks:** nine metric-bound readiness tasks, with requirements ([7b8a739](https://github.com/antoniopezzella/marsh-design-system/commit/7b8a73933371586bd5ab9c33774f03af761a3895))
* **tasks:** propose a generated typography system ([a2b618a](https://github.com/antoniopezzella/marsh-design-system/commit/a2b618ac05e9c08568a864d8e57e722e9e657531))
* **tasks:** record the first loop run, and add DEV-4 and GOV-2 ([3890b34](https://github.com/antoniopezzella/marsh-design-system/commit/3890b3452c868f0d5dcf5e2fff006a4fec8d90b7))
* **tasks:** rewrite the typography proposal — tokens in [@theme](https://github.com/theme), pairings as [@utility](https://github.com/utility) ([5c69e5c](https://github.com/antoniopezzella/marsh-design-system/commit/5c69e5c65abad6543254bb6696c5237f95c0733c))
* **tasks:** scope the typography proposal to dashboard product ([6b65dd0](https://github.com/antoniopezzella/marsh-design-system/commit/6b65dd0cb98275712154b44786a7aabe969a4fca))

### Continuous Integration

* **repo:** publish Code Connect from CI, and gate it on a real parse check ([82a4340](https://github.com/antoniopezzella/marsh-design-system/commit/82a4340140249577c594b6dee0340de7d1ba37c5))

### Tests

* **governance:** add a dark-mode story pass and measure the backlog ([d5255f5](https://github.com/antoniopezzella/marsh-design-system/commit/d5255f591f42f15788605b6e2b658602368f9b51))

### Chores

* **repo:** add 'tasks' to the commitlint scope enum ([54c04f3](https://github.com/antoniopezzella/marsh-design-system/commit/54c04f3c4d883e5b71b3c59144c0e38b59bee721))
* **repo:** delete 11 dead demo and debug pages ([c3cd29c](https://github.com/antoniopezzella/marsh-design-system/commit/c3cd29c6a0effeec98eaadc6084a576440a8332a))
* **storybook:** hide the legacy MUI groups and sort Components first ([9d3ee6b](https://github.com/antoniopezzella/marsh-design-system/commit/9d3ee6be74df709a6beb0b6984deca1af0d93049))

## [0.7.0](https://github.com/antoniopezzella/marsh-design-system/compare/v0.6.0...v0.7.0) (2026-10-01)

### Features

* **components:** add a header slot and collapse-to-icons to SideNavigation ([8354f22](https://github.com/antoniopezzella/marsh-design-system/commit/8354f22161fdee2c567195ed5dfb9f3697f15b03))
* **components:** add bulk actions — the operation half of selection ([6cd3f71](https://github.com/antoniopezzella/marsh-design-system/commit/6cd3f71f8b66de00d684051d37da2b9fbc6cd38c))
* **components:** add data formatting, closing the dashboard's largest gap ([81c95b0](https://github.com/antoniopezzella/marsh-design-system/commit/81c95b0ea122c677a96eda91148642ec5c6ac8b8))
* **components:** add FilterBar, and fix two contrast/landmark bugs it exposed ([e014d4e](https://github.com/antoniopezzella/marsh-design-system/commit/e014d4e93e2dbc8e3a1139739f1630ebbcde8fe0))
* **components:** add FilterChip, and stop Chip rendering fake buttons ([058e7df](https://github.com/antoniopezzella/marsh-design-system/commit/058e7df615695174eaaf3bf98bc1709f1d76aa3b))
* **components:** add number-range and boolean filters, and fix a portal bug they exposed ([68ec984](https://github.com/antoniopezzella/marsh-design-system/commit/68ec98444a1a95e6bc3c9ea61bb05e16459e1628))
* **components:** add row actions, closing §3.03 ([a1a3a7e](https://github.com/antoniopezzella/marsh-design-system/commit/a1a3a7e62e26a3348bc38365b194edd9ae5c6732))
* **components:** add the advanced builder with nested groups ([d56c7be](https://github.com/antoniopezzella/marsh-design-system/commit/d56c7bef6d7d5f7aef3be63efed15d09a6b1f5a8))
* **components:** add the canonical filter query model, operators and utilities ([b297618](https://github.com/antoniopezzella/marsh-design-system/commit/b297618c543beda906605bf2fb83ce5f9cd67752))
* **components:** add the Colleague Profile manage-team screen ([b28a429](https://github.com/antoniopezzella/marsh-design-system/commit/b28a429660f95a21b4ec43a0ca312b74f8db36b2))
* **components:** add the filter schema — one definition, many renderers ([b035768](https://github.com/antoniopezzella/marsh-design-system/commit/b0357682671bc49ef18ef7f89388ece40ccc2919))
* **components:** add the four-state data contract, closing P0-2 ([1ff69c0](https://github.com/antoniopezzella/marsh-design-system/commit/1ff69c070b670e7a65e2a85eb234bf2a35d3aaed))
* **components:** add the table markup primitives, and put the grid on them ([c908caf](https://github.com/antoniopezzella/marsh-design-system/commit/c908caf8f63e50fa0704d1b0364a1dfcfa1a54ed))
* **components:** adopt formatters in StatCard and derive delta direction ([6ef9d2f](https://github.com/antoniopezzella/marsh-design-system/commit/6ef9d2fac8b3ec67a9c55082406053ab97427339))
* **components:** build the add-team-members dialog ([74ec2b1](https://github.com/antoniopezzella/marsh-design-system/commit/74ec2b13b34148c7cb17348401c91d0e31564d6b))
* **components:** build the filter query system with segmented conditions ([8b8d87f](https://github.com/antoniopezzella/marsh-design-system/commit/8b8d87fcfc2462545be2c1995ad2fbec89458702))
* **components:** build the two-outcome remove-member dialog ([8423318](https://github.com/antoniopezzella/marsh-design-system/commit/84233183629bbef9004d025318048e6ecf27a70c))
* **components:** default Badge to an outline treatment ([be118b4](https://github.com/antoniopezzella/marsh-design-system/commit/be118b44836cd76d0093c940dae4e18607443eca))
* **components:** deprecate Table, and add the one capability it had that the grid lacked ([55d78dd](https://github.com/antoniopezzella/marsh-design-system/commit/55d78dd4558c3c1a9ad7c40372430fd937336083))
* **components:** drive grid filters from the schema ([a965c8d](https://github.com/antoniopezzella/marsh-design-system/commit/a965c8de80ebb825da77c0b58b0508a5d6f9cb0a))
* **components:** export the table primitives, and hold off deleting the legacy Table ([2361c0d](https://github.com/antoniopezzella/marsh-design-system/commit/2361c0d1c59591366fdbb6411ea4c1e98a297943))
* **components:** finish the data-state retrofit across Table, Chart and List ([f5d38b2](https://github.com/antoniopezzella/marsh-design-system/commit/f5d38b2d5fa4f3d1f1bb4f8a8d28337a34e796b6))
* **components:** give the menu chip a real menu, and adopt it in FilterBar ([75e1cf6](https://github.com/antoniopezzella/marsh-design-system/commit/75e1cf65b0bf61be651c757fbfd9bdd70b9abb15))
* **components:** let DataTable take a caller-owned table instance ([05d5d5c](https://github.com/antoniopezzella/marsh-design-system/commit/05d5d5c428abb8f0f2f526feb5fa4e4e9e621b80))
* **components:** make a filtered view shareable as a URL ([fd99570](https://github.com/antoniopezzella/marsh-design-system/commit/fd995707e8f30c5172c57e460a7b00b463819e3f))
* **components:** make the rail's role switcher gate what the screens offer ([c0bd8cb](https://github.com/antoniopezzella/marsh-design-system/commit/c0bd8cbe4426a06087a195f7fff6918eba651b56))
* **components:** make the team card itself the link ([a8d1940](https://github.com/antoniopezzella/marsh-design-system/commit/a8d194013436ccb3426e53d50d7733f7665c4834))
* **components:** match Card's radius to the data-grid shell ([209e1e8](https://github.com/antoniopezzella/marsh-design-system/commit/209e1e828dfe59bdd790f8905f1c740d21370285))
* **components:** put the query system in the gallery and make its copy reach ([eeab06b](https://github.com/antoniopezzella/marsh-design-system/commit/eeab06b23869f3e2edf5f29834929df73b68911d))
* **components:** rebuild dashboard-demo on PageShell, FilterBar and the data states ([5e190ec](https://github.com/antoniopezzella/marsh-design-system/commit/5e190ecb04340e047e22fbe443cf61ebc5ff39f5))
* **components:** rebuild on TanStack v9 with a composable API ([3b8d25f](https://github.com/antoniopezzella/marsh-design-system/commit/3b8d25f5ab2ff81a732e81ecc07bc176d6a8d13e))
* **components:** rebuild the Colleague Profile My Teams screen on the DS ([24fc237](https://github.com/antoniopezzella/marsh-design-system/commit/24fc23773af46516da9b58ae97e33b5c1ce044ed))
* **components:** right-align numbers automatically ([bae8d4d](https://github.com/antoniopezzella/marsh-design-system/commit/bae8d4dc465a8c686de06a6f003e0dfc37953239))
* **components:** wire the new grid into exports and the taxonomy ([d15a282](https://github.com/antoniopezzella/marsh-design-system/commit/d15a28208c6c564bb12f5ebdf8c84d3cf61f54dc))
* **components:** wire the query system into the grid toolbar ([a8e6b9d](https://github.com/antoniopezzella/marsh-design-system/commit/a8e6b9d17e41fbbf481e29a0b60921ff090338c7))
* **governance:** score design-system health on a frozen, comparable rubric ([6ec3482](https://github.com/antoniopezzella/marsh-design-system/commit/6ec34820092701c601172cd10a4284076b4699ea))
* **storybook:** document the dashboard components in the live showcase ([9dcc73a](https://github.com/antoniopezzella/marsh-design-system/commit/9dcc73ac2218aef05367a8cc0fe28a524c1b8e1d))
* **tokens:** add border.subtle and surface.raised roles ([691ec2f](https://github.com/antoniopezzella/marsh-design-system/commit/691ec2fcc1aa2c98639fbfd9ec840150fe7a407e))

### Bug Fixes

* **a11y:** repair seven filter defects axe cannot see ([e5963d7](https://github.com/antoniopezzella/marsh-design-system/commit/e5963d735a10283902ee70649f416f7917222c43))
* **a11y:** stop screen readers narrating skeleton rows as empty table cells ([6e79599](https://github.com/antoniopezzella/marsh-design-system/commit/6e79599d38dff22b0d0cbe19be0c07bf9eaf6173))
* **components:** close four P0/P1s — z-index, token drift, a11y claims, coverage ([0abfdb7](https://github.com/antoniopezzella/marsh-design-system/commit/0abfdb7df379c6429d7858b66143d5ca9c1aee3d))
* **components:** close seven correctness gaps found by the review ([4f18620](https://github.com/antoniopezzella/marsh-design-system/commit/4f186201552df5bbb5aafd74e50b4a232bc65753))
* **components:** correct four filter operators that returned wrong rows ([b09b865](https://github.com/antoniopezzella/marsh-design-system/commit/b09b865983e884d87968271adf7dcf7d62b8f4c1))
* **components:** correct ten foreground/background pairings ([a2d3274](https://github.com/antoniopezzella/marsh-design-system/commit/a2d32743d45c09ee7c84f931c324dfa308cc4f7d))
* **components:** drop Cancel from the remove-member dialog ([6f711a4](https://github.com/antoniopezzella/marsh-design-system/commit/6f711a4d1b67fe326c614bce68349b1529f4cf52))
* **components:** emit font-family, add box-sizing, make Button role-driven ([d3ac317](https://github.com/antoniopezzella/marsh-design-system/commit/d3ac317ca627589369aa7142062c84b8568ab68d))
* **components:** make select-all scope explicit, and name checkboxes after records ([04e6125](https://github.com/antoniopezzella/marsh-design-system/commit/04e612511bddbc6c6154b197826be6edbbfc4736))
* **components:** put every stacking value on the z-index scale ([49baf69](https://github.com/antoniopezzella/marsh-design-system/commit/49baf69ff18fe564a4423cb63257841d0d235252))
* **components:** replace bare `rounded` and hardcoded radius values ([d3a9847](https://github.com/antoniopezzella/marsh-design-system/commit/d3a9847fc96516caa1db200dd82985546dc1c747))
* **components:** row action buttons rendered empty, and tsc was checking nothing ([dc757a9](https://github.com/antoniopezzella/marsh-design-system/commit/dc757a948879abd6ee660b0be904498af014f395))
* **components:** stop shared filter links losing or inventing filters ([95525e0](https://github.com/antoniopezzella/marsh-design-system/commit/95525e04f6f2672260d2783fe294a7d5b3b46b61))
* **components:** two accessibility defects in FilterChip ([07f6d3f](https://github.com/antoniopezzella/marsh-design-system/commit/07f6d3f9c15f2f161671ae7c93b9b6d43c8c9d25))
* **components:** wire select-all scope into DataTable, and fix a contrast regression it exposed ([9fd3590](https://github.com/antoniopezzella/marsh-design-system/commit/9fd3590fe9d7f3d7dd6c895da5dc94617d5d129f))
* **governance:** make the radius and stacking gates walk subdirectories ([5064722](https://github.com/antoniopezzella/marsh-design-system/commit/5064722669b7fa80b5095cbc2a1a136b2835f215))
* **governance:** stop scoring documentation and tracked debt as colour drift ([fdef339](https://github.com/antoniopezzella/marsh-design-system/commit/fdef339250a74b8f64c049ab25a2a9615d9ac03e))
* **package:** define role and typography vars in the shipped stylesheet ([32c272e](https://github.com/antoniopezzella/marsh-design-system/commit/32c272e5d480f0e199bf45f924663857a1d6f1fd))
* **release:** strip false issue links from closes/fixes/resolves too ([e340b64](https://github.com/antoniopezzella/marsh-design-system/commit/e340b645cfed1b5461bf08b27d2f8993755c8645)), references [#hex](https://github.com/antoniopezzella/marsh-design-system/issues/hex)
* **repo:** repair 8 broken Figma bindings and typecheck them from now on ([d1ffac7](https://github.com/antoniopezzella/marsh-design-system/commit/d1ffac77511705b528d9206db6205f770558aaee))
* **theme:** make ThemeModeContext safe under SSR ([f960814](https://github.com/antoniopezzella/marsh-design-system/commit/f96081434479d22e9b3e1b8a18b90332553244d6))
* **tokens:** align roles to Figma anchors; add disabled, onPrimary, Crimson ([6364c6b](https://github.com/antoniopezzella/marsh-design-system/commit/6364c6ba034d5c0ea1d2cd6d959b499b1cb7ef62))

### Refactoring

* **components:** extract useDataGridTable so composition stops costing more ([43d22a9](https://github.com/antoniopezzella/marsh-design-system/commit/43d22a99ac25067668ee140829b0064be12c4b37))
* **components:** make the filter extension points real or remove them ([4c0c7e5](https://github.com/antoniopezzella/marsh-design-system/commit/4c0c7e5ecac560fc1f6fc833d7d0a4c20731698a))
* **components:** move every Table consumer to DataTable ([2931875](https://github.com/antoniopezzella/marsh-design-system/commit/2931875fa18b616606b9fd49c7e1c4c2bf6e15e7))
* **theme:** move radius onto Tailwind's stock scale ([d04ba7f](https://github.com/antoniopezzella/marsh-design-system/commit/d04ba7f6dccacdff603f8b464f64b91f681fd0ac))

### Styling

* **components:** switch the Colleague Profile rail to the light variant ([003d86e](https://github.com/antoniopezzella/marsh-design-system/commit/003d86ec3070b61d16d2197b5b04bb26ebc0af39))

### Documentation

* assess filters against reui — the gap is a schema, not a component ([e188c1f](https://github.com/antoniopezzella/marsh-design-system/commit/e188c1f43b5e21c7cc91abfbfb9aa781625095c7))
* audit DataTable/DataGrid against the Experience Specification ([66c89d5](https://github.com/antoniopezzella/marsh-design-system/commit/66c89d5676e571edc7b65abba2d8806608bc2de2))
* correct overstated accessibility claims and refresh guidance ([947232b](https://github.com/antoniopezzella/marsh-design-system/commit/947232b4c4faa6ce0940a8b089f32d3991d85129))
* **governance:** write the deprecation window the code already promised ([3851dd6](https://github.com/antoniopezzella/marsh-design-system/commit/3851dd64b63b31244effb1763cfdaea9815afefc))
* **storybook:** explain which table to use, and why two of them look alike ([d15b378](https://github.com/antoniopezzella/marsh-design-system/commit/d15b3787503e970b0066ab13185a5f7e27de780b))

### Continuous Integration

* **build:** gate the publish workflow ([313d2e0](https://github.com/antoniopezzella/marsh-design-system/commit/313d2e0f500f85718abe9b61c600b37768306bf8))

### Tests

* **components:** cover the filter internals nobody could see ([5a0bbc5](https://github.com/antoniopezzella/marsh-design-system/commit/5a0bbc5762fbd272c3821b417387a9f51608a214))
* **components:** test the toast queue, and open the menus the stories never opened ([ff705f9](https://github.com/antoniopezzella/marsh-design-system/commit/ff705f933286ddb067925c677f6c4fc63a500fcc))

### Chores

* **components:** remove the legacy MUI Checkbox ([ccb9f04](https://github.com/antoniopezzella/marsh-design-system/commit/ccb9f045508f05737cca2f3d7999404371da64e9))
* **governance:** add package-type, z-index and visual-baseline gates ([e32fcb5](https://github.com/antoniopezzella/marsh-design-system/commit/e32fcb57d88b2230bb80f21b07b0d6410952f276))
* **repo:** add verification agent, story audit, and consumer docs ([666269d](https://github.com/antoniopezzella/marsh-design-system/commit/666269d5ddb2adf398e7f5dcdd5611e2054f27cf))
* **tokens:** regenerate the intermediate token build output ([b449d06](https://github.com/antoniopezzella/marsh-design-system/commit/b449d06cda07a7efda0c33228d76d464a2639915))

## [0.6.0](https://github.com/antoniopezzella/marsh-design-system/compare/v0.5.0...v0.6.0) (2026-09-24)

### ⚠ BREAKING CHANGES

* **build:** migrate to Tailwind CSS v4
* **repo:** rename shadcn-dashboard to dashboard-demo
* **components:** unify the size and tone vocabularies

### Features

* **build:** migrate to Tailwind CSS v4 ([24c7aa5](https://github.com/antoniopezzella/marsh-design-system/commit/24c7aa560cbecd77e68f513179bc5bed1fd7b303))
* **components:** add layout primitives, page template and taxonomy ([08c985e](https://github.com/antoniopezzella/marsh-design-system/commit/08c985e02acbf3216914d4250e8b17d240093db5))
* **components:** unify control sizes across buttons and form fields ([203d9f7](https://github.com/antoniopezzella/marsh-design-system/commit/203d9f770ea81ea03bd97caae7c8ced707406dea))
* **components:** unify the size and tone vocabularies ([0e49174](https://github.com/antoniopezzella/marsh-design-system/commit/0e4917473df218d8c3a7efa2fb64b68b23f04407)), references [#4](https://github.com/antoniopezzella/marsh-design-system/issues/4)
* **package:** ship compiled CSS and make the bundle tree-shakeable ([50c305a](https://github.com/antoniopezzella/marsh-design-system/commit/50c305aec4bc5c6fd4851a89adb22aa21ff704ff))
* **repo:** add a Tailwind specialist skill, and retract a stale audit finding ([76937af](https://github.com/antoniopezzella/marsh-design-system/commit/76937afbd9df5edf0eb28fe7882f04f57bcd3752))

### Bug Fixes

* **a11y:** un-exclude the accessibility suite, and fix the keyboard bug it found ([528c406](https://github.com/antoniopezzella/marsh-design-system/commit/528c4069ce343ae9264254e8549feb177bbff11e))
* **build:** stop the SPA rewrite swallowing missing assets, and make token builds reproducible ([847ceec](https://github.com/antoniopezzella/marsh-design-system/commit/847ceec2ee6e3ed65473a0a2c0bc0681b711efdd))
* **components:** adopt Tailwind v4's stock radius scale and fix bubble width ([8ca2804](https://github.com/antoniopezzella/marsh-design-system/commit/8ca2804d5cff1a480893675e66a1856dd096cf31))
* **components:** delineate the dark-mode header and fix the drawer's font ([6299005](https://github.com/antoniopezzella/marsh-design-system/commit/62990054fbce7a61ff4d712af09f98e442acb6d8))* **components:** keep `error` on form fields — it is not the same axis as `danger` ([e5bf30b](https://github.com/antoniopezzella/marsh-design-system/commit/e5bf30be169c4ae552e6203afe6dd01145b819bd))
* **components:** make the control-size cascade actually reach every child ([1481270](https://github.com/antoniopezzella/marsh-design-system/commit/14812707949ea0cdae8436bdc9eda982f4ba0210))
* **components:** set form field rhythm to 20px, resolving the gap-7 exception ([05f7b63](https://github.com/antoniopezzella/marsh-design-system/commit/05f7b636faeec58bad77d43da603a7ec094afb68))
* **package:** correct runtime deps and ship the production JSX transform ([ef6836a](https://github.com/antoniopezzella/marsh-design-system/commit/ef6836a44f22ccbf185c65fe527fb26d2185d67e))
* **package:** correct the consumer-facing contract before org migration ([f0903d8](https://github.com/antoniopezzella/marsh-design-system/commit/f0903d8c7f2ef5242c5dc2e904b87033c129bd95))
* **package:** mark client components so Next.js App Router consumers work ([05c308c](https://github.com/antoniopezzella/marsh-design-system/commit/05c308c9ce3a760ecf3f00acb1ae803b5d688bbd))
* **package:** restore spacing utilities missing from published stylesheet ([4c3d77d](https://github.com/antoniopezzella/marsh-design-system/commit/4c3d77d25927d305e0dc50274394e2d6cba91b53))
* **security:** the AI endpoint was an open, unmetered OpenAI proxy ([73d83f6](https://github.com/antoniopezzella/marsh-design-system/commit/73d83f6f40b8fb889a49b4889dba58beddf53aca))
* **theme:** apply the dashboard typography context to ShadcnDashboard ([86854be](https://github.com/antoniopezzella/marsh-design-system/commit/86854be6b4c489587e7d7972e7705891d51f2d15))
* **theme:** repair dark-mode accent surfaces and the drawer's filter chip ([db74ad3](https://github.com/antoniopezzella/marsh-design-system/commit/db74ad3404f53e557d0ce851407d87d0383ca791))* **tokens:** app chrome goes neutral in dark mode instead of staying navy ([9916b87](https://github.com/antoniopezzella/marsh-design-system/commit/9916b8719432511de9f03a5e264c8f17b29af739))### Refactoring

* **repo:** rename shadcn-dashboard to dashboard-demo ([c98ecf3](https://github.com/antoniopezzella/marsh-design-system/commit/c98ecf39c263be972c295d9e1b14b94ef01036bc))

### Documentation

* benchmark the design system against Carbon and Material Design ([12ac94a](https://github.com/antoniopezzella/marsh-design-system/commit/12ac94aed6a42a543167009cb2448fff265e6ca3))
* **governance:** add branch governance as the fourth system ([d7a2fb4](https://github.com/antoniopezzella/marsh-design-system/commit/d7a2fb43416cfa2b7ff6c49cd581019846f99df5))
* **ops:** add a runbook, and correct a deployment guide that was wrong ([6c031e8](https://github.com/antoniopezzella/marsh-design-system/commit/6c031e8005b0f9fd39cd3b2c01bc93f9ad6b2564))
* **ops:** document how to rotate a credential, and fix .env.example ([8bf9c03](https://github.com/antoniopezzella/marsh-design-system/commit/8bf9c0323dece7b68acd0e97766948c677e8d500))
* production-readiness audit for adoption review ([caff040](https://github.com/antoniopezzella/marsh-design-system/commit/caff0403e75c640fd538469ef2759d87caedd2eb))
* **repo:** add composition skill and wire the knowledge base together ([b772f99](https://github.com/antoniopezzella/marsh-design-system/commit/b772f991b3e7be0bb33e3b26688adff12ef17d60))
* **repo:** audit run 2 — 2.1/3, and correct an overstated run-1 finding ([7754821](https://github.com/antoniopezzella/marsh-design-system/commit/77548218c8c8674c46a17763efff40ce8a0c60aa))
* **repo:** correct the Tailwind skill's v4 upgrade assessment ([bbb99fd](https://github.com/antoniopezzella/marsh-design-system/commit/bbb99fd907fc242ace7ffd4bc6607d604d12b250))
* **repo:** rewrite the Tailwind skill for v4 and document spacing/radius ([949b33f](https://github.com/antoniopezzella/marsh-design-system/commit/949b33f91e48cfc6781a2ee00a53a79cdfcaff22))
* **tokens:** cover the whole spacing family, and the px/rem split between tracks ([77a480f](https://github.com/antoniopezzella/marsh-design-system/commit/77a480f0fed4579d8ba16394938b6d230730b03c))
* **tokens:** document both spacing tracks, not just the MUI one ([5630955](https://github.com/antoniopezzella/marsh-design-system/commit/5630955f49592bf7f45c699fa77ba5451d8321c1))

### Tests

* **components:** recover four more tests from the stale copilot branch ([83ce698](https://github.com/antoniopezzella/marsh-design-system/commit/83ce6988155456538bee868146b192f5ce6f3e24))
* run every test in src/, and recover three from a stale branch ([9fde944](https://github.com/antoniopezzella/marsh-design-system/commit/9fde94419d89cfdb2bb0036719200783f16e993f))

### Chores

* **deps:** install Tailwind v4 toolchain ([c5ebf50](https://github.com/antoniopezzella/marsh-design-system/commit/c5ebf50e1ff46e7e14443a65f8c828f7ea4a16e4))
* **governance:** allow 'package' as a commit scope ([0cbc130](https://github.com/antoniopezzella/marsh-design-system/commit/0cbc130e9ef3723ca662dd15bd5c26d728147267))
* **repo:** declare the proprietary internal license ([3d5e103](https://github.com/antoniopezzella/marsh-design-system/commit/3d5e103f743ee8039f4ce93ba3bce1d9a4b43528))
* **tokens:** regenerate dist/tokens.json for the dark-mode surface changes ([8a912eb](https://github.com/antoniopezzella/marsh-design-system/commit/8a912ebbcb69770aea4c34ce7a3bfec6b1d159c3))[1a2759/#333f6b](https://github.com/antoniopezzella/marsh-design-system/issues/333f6b)

## [0.5.0](https://github.com/antoniopezzella/marsh-design-system/compare/v0.4.1...v0.5.0) (2026-09-22)

### Features

* **components:** add ButtonGroup ([36e7b7f](https://github.com/antoniopezzella/marsh-design-system/commit/36e7b7f4881f615ac651fdce08ef0c02e412806d))

### Bug Fixes

* **a11y:** --destructive was a Tailwind default, not the MDS danger token ([94453fe](https://github.com/antoniopezzella/marsh-design-system/commit/94453fe60109ba4459f0efde8e3b45b37121f241))* **a11y:** animations now honour prefers-reduced-motion — and that was the contrast bug ([271e502](https://github.com/antoniopezzella/marsh-design-system/commit/271e502d1f4f6d48a1d50741faa0cc82b7c8f396))* **a11y:** checkbox indeterminate state lied, and labels never reached the input ([ce6e1d3](https://github.com/antoniopezzella/marsh-design-system/commit/ce6e1d31385aa9c6d7e71ae2fd31a356d74c9e90))
* **a11y:** clear scrollable-region and invalid-ARIA violations ([db21a2a](https://github.com/antoniopezzella/marsh-design-system/commit/db21a2acc356d02246dfbde2af3bf32eaec3cc49))
* **a11y:** clear the last violations — suite should now be green ([41db961](https://github.com/antoniopezzella/marsh-design-system/commit/41db961fe323e4f98a0a4dd12fa90b5da2f4e9ca))* **a11y:** clear the remaining structural violations ([2edeb03](https://github.com/antoniopezzella/marsh-design-system/commit/2edeb03c23141c8887c480a25896f97c431b91bd))
* **a11y:** heading hierarchy, progress-bar names, decorative image role ([2de8b9c](https://github.com/antoniopezzella/marsh-design-system/commit/2de8b9c1a6c1697032925a499a8cd6df5d28c168))
* **a11y:** heading order in the sections InsuranceDashboard — CI now green ([c4d19a2](https://github.com/antoniopezzella/marsh-design-system/commit/c4d19a28440dec615c004d87b36e41b0327b46c6))
* **a11y:** make the accessibility gate real, and start clearing the backlog ([5453d72](https://github.com/antoniopezzella/marsh-design-system/commit/5453d7238d55a2e162c22d0a08df21ac60ad8e09))
* **a11y:** naming, landmarks, and a hidden side-navigation contrast bug ([3bf717e](https://github.com/antoniopezzella/marsh-design-system/commit/3bf717e0877efcd11510fa97ab4ddc4a24ef268c))* **a11y:** remove nested interactive controls from chip and list ([955fde6](https://github.com/antoniopezzella/marsh-design-system/commit/955fde6490e434b997de3ed64b73116d000f717f))
* **a11y:** stat-card was the single largest source of contrast failures ([01810f1](https://github.com/antoniopezzella/marsh-design-system/commit/01810f1a1df7fdcf5cc2d6ae98e0b7d29d0d6ddd))
* **a11y:** valid ARIA on Header profile trigger, SideNavigation list, Divider story ([db7a71a](https://github.com/antoniopezzella/marsh-design-system/commit/db7a71ac9141764ae57c3bba276eea5fc0e58048))
* **a11y:** warning surfaces and the MUI theme's warning/info palette ([39cc9e7](https://github.com/antoniopezzella/marsh-design-system/commit/39cc9e7fa961b01772d8d1432309fab503612fac))* **a11y:** WireframeSlide text, and the shared --border nobody could see ([1557bdb](https://github.com/antoniopezzella/marsh-design-system/commit/1557bdb484430e0df8a8d1990bb4ac116eefa7d0))* **build:** emit types for the theming providers and drop a dead registry entry ([d928cce](https://github.com/antoniopezzella/marsh-design-system/commit/d928cced635432b4962536801486da84e47ecaee))
* **build:** gitignore negations for tracked dist artifacts never worked ([cb95f6e](https://github.com/antoniopezzella/marsh-design-system/commit/cb95f6e1a631def89d1b84dc800ea511ec9abcb3))
* **build:** stop the build deleting tracked token artifacts, untrack generated output ([e056f98](https://github.com/antoniopezzella/marsh-design-system/commit/e056f98004a8c8ae703c7c7e54de96b1addd9a90))
* **build:** Vercel builds generated the knowledge base after typechecking it ([4513f83](https://github.com/antoniopezzella/marsh-design-system/commit/4513f830a653ad2da3709f08ac3bf82a5d5f848f))
* close the remaining developer-readiness gaps ([40481dd](https://github.com/antoniopezzella/marsh-design-system/commit/40481dd03b354e0e01db679b6760b66df59110cd))
* **roles:** three --role-* CSS vars resolved to nothing, plus a gate ([921a668](https://github.com/antoniopezzella/marsh-design-system/commit/921a668b9a721a080447e01ced2e137f962fbd01))* **security:** take production vulnerabilities to zero ([ae8d668](https://github.com/antoniopezzella/marsh-design-system/commit/ae8d66863672463df9c7135bf4ed0083e55a182e))
* **tokens:** correct the stale version stamped into dist/tokens.json ([b2f714f](https://github.com/antoniopezzella/marsh-design-system/commit/b2f714fb10c544a6d72626c58420ad6e8fe456a0))
* **tokens:** eliminate the Style Dictionary collision warning on every build ([2630251](https://github.com/antoniopezzella/marsh-design-system/commit/2630251d3f10e399fb8882cd19a3a82ee8fe7208))
* **tokens:** resolve the warning-contrast defect using an existing role ([0ecb795](https://github.com/antoniopezzella/marsh-design-system/commit/0ecb795ab79889fdb565f4195335c90272abc82a))* **tokens:** stop dist/tokens.json churning on every commit ([7372094](https://github.com/antoniopezzella/marsh-design-system/commit/73720944b3daef6c5fd536a71d37b22d92f8367b))

### Refactoring

* **components:** separate legacy MUI from canonical in Storybook ([3b6b49b](https://github.com/antoniopezzella/marsh-design-system/commit/3b6b49b476ee7d4faee6ed9dd5a9ac9359686773))

### Documentation

* add MDS design system health report (2026-08-28) ([813286e](https://github.com/antoniopezzella/marsh-design-system/commit/813286e29e34796d2e6836c27235adac661b1ebf))
* **components:** show ButtonGroup at each size ([2e30182](https://github.com/antoniopezzella/marsh-design-system/commit/2e30182d1c8d6478f8ad897ebf5f664233cb41c0))
* fix 8 broken internal links in the onboarding path ([5049df9](https://github.com/antoniopezzella/marsh-design-system/commit/5049df92dfd74698fccd8b3185f341278921b2fe))
* **governance:** record the 2026-09-22 health run ([2b76e48](https://github.com/antoniopezzella/marsh-design-system/commit/2b76e48d7b9f328e4dc4b74740bbd733ddae40e0))

### Build System

* **release:** nest types inside the preset so the changelog stops dropping commits ([0605e22](https://github.com/antoniopezzella/marsh-design-system/commit/0605e22211b4930ede3d2fd3c4f80da035cf683e))
* **release:** regenerate the token artifact during the release commit ([07866b9](https://github.com/antoniopezzella/marsh-design-system/commit/07866b93dbb2c4a64350f0a7782bf9ed3b3f32a3))
* **release:** stage dist/tokens.json with the release commit ([cee66f1](https://github.com/antoniopezzella/marsh-design-system/commit/cee66f115fc3bb2648df7eb570a4dc87658e121b))
* **release:** strip hex colours misparsed as issue links from the changelog ([78b563e](https://github.com/antoniopezzella/marsh-design-system/commit/78b563e0a1cfe36f534fd5ff1c1b307e2496583c)), closes  ### Tests

* **components:** cover the primitives that had no test and no story ([6e196d1](https://github.com/antoniopezzella/marsh-design-system/commit/6e196d13c8e0c48ed594c007c8d8e3ee7a52c76b))

### Chores

* **deps:** remove five unused dependencies ([04c01c2](https://github.com/antoniopezzella/marsh-design-system/commit/04c01c290523c2e26cb6ff0794591f834efd2601))
* prepare the repo for concurrent contributors ([9fb20d8](https://github.com/antoniopezzella/marsh-design-system/commit/9fb20d87dbae5f36911141120da4e855757ad880))

## [0.4.1](https://github.com/antoniopezzella/marsh-design-system/compare/v0.4.0...v0.4.1) (2026-09-18)

### Bug Fixes

* **build:** close the package's consumability gaps and repair Lighthouse ([bd680b0](https://github.com/antoniopezzella/marsh-design-system/commit/bd680b001ed8382cbab6a3eb5d7ec440c432eba5))
* **build:** repair the release, commit-hook and governance tooling ([ee1e562](https://github.com/antoniopezzella/marsh-design-system/commit/ee1e562ab021f5a998509168d2561403e366b391))

### Performance Improvements

* **build:** split the entry chunk and stop shipping a dev script to production ([955de8f](https://github.com/antoniopezzella/marsh-design-system/commit/955de8fa516d1f825d8c49d1749f24ec89095704))

## [0.4.0](https://github.com/antoniopezzella/marsh-design-system/compare/v0.3.0...v0.4.0) (2026-09-18)


### Features

* **components:** add a column header menu to DataTable and right-cluster its footer ([84ebd85](https://github.com/antoniopezzella/marsh-design-system/commit/84ebd8510566240506134d02d1f8df554ead172e))
* **components:** add faceted filters and a sort list to DataTable's toolbar ([de6a015](https://github.com/antoniopezzella/marsh-design-system/commit/de6a015e5850cd61c04d3bc924f79ac270aad28e))
* **components:** add opt-in inline cell editing to DataTable ([98c62cc](https://github.com/antoniopezzella/marsh-design-system/commit/98c62cc1b040cbd99ede44185af18f20e4b1170a))
* **components:** icon-only export and an in-field search clear ([7eaffb3](https://github.com/antoniopezzella/marsh-design-system/commit/7eaffb35442cfc10750283a1151a8570f06e05ee))
* **components:** simplify DataTable's footer to the tablecn shape ([944bbff](https://github.com/antoniopezzella/marsh-design-system/commit/944bbff8cfb9308ab9102f1238257bf477ef53e6))


### Bug Fixes

* **components:** don't raise the toolbar Reset for the search filter ([57ed0d7](https://github.com/antoniopezzella/marsh-design-system/commit/57ed0d706b4207c952d72bbeda14d05ab41a2674))
* **components:** use the DS Button for DataTable's remaining controls ([c450ba5](https://github.com/antoniopezzella/marsh-design-system/commit/c450ba5b2f4a9468dde2a6ee841d84735e28c5a5))
* **components:** use the DS Button in story demos instead of raw buttons ([3f18b47](https://github.com/antoniopezzella/marsh-design-system/commit/3f18b47f627364f6b1742cc76780ebd4eb6b99c2))


### Documentation

* **storybook:** drop stale shadcn/ui labelling from component stories ([1afd730](https://github.com/antoniopezzella/marsh-design-system/commit/1afd730a72cf62d6c72a6293c92c98b1cb18690d))


### Styling

* **components:** match DataTable's header to the tablecn reference ([f48beb8](https://github.com/antoniopezzella/marsh-design-system/commit/f48beb83cb3a038ad2a373471a2f8818b731e709))

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
