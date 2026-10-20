# Landing page: positioning, composition and motion

Reviewed 20 October 2026.

The page introduces a project in development. It should help a homelab owner understand what Lanrith is, why its architecture matters, and where to follow the work.

## Positioning

Lead with an immutable homelab router: a read-only system, integrity checking, configuration in Git, owner-controlled signing, and a deliberate update path. Follow with the everyday benefit: networking components designed together, chosen discovery boundaries, mixed IPv4/IPv6 service paths, and a local console for investigation.

The distinction is this combination for homelabs. Image-based upgrades and rollback already exist elsewhere; automatic outbound NAT is established too. Explain Lanrith directly without claiming these individual mechanisms are exclusive inventions.

Keep the promise proportional to the evidence in the [project](https://github.com/Lanrith/lanrith), [trust model](https://github.com/Lanrith/lanrith/blob/main/docs/build-and-trust.md), and [operations documentation](https://github.com/Lanrith/lanrith/blob/main/docs/operations.md).

- Explain read-only storage and dm-verity integrity checks without implying immunity from compromise.
- Distinguish the OS/configuration image from writable service state.
- Distinguish boot fallback from a deliberate signed rollback.
- Keep the console observational for router configuration; changes start in Git.
- Keep development status visible. Compatibility and production readiness require qualified releases.
- Describe existing features in the present tense. The project-status notice covers overall maturity; feature paragraphs explain what the router does.
- Avoid unsupported certifications, performance numbers, universal compatibility and release dates.

Visitor-facing GitHub links invite people to follow development. The landing page does not send visitors to internal design reviews, planning files or operations documents.

## What the layout review found

The earlier copy revision made the architecture more explicit, but retained too many repeated sections. The benefit strip, feature columns and late interactive panel explained much of the same material. Repeated dividers and equally weighted text blocks made the page harder to skim.

At a 390 × 844 viewport, that version was 6,051 CSS pixels tall. Its interactive architecture section began at y4,307, and the first GitHub follow link appeared at y5,744. Desktop content stacked into a long mobile sequence, while the tablet layout retained narrow text columns. These were measurements and editorial observations, not customer research or conversion results.

The revised progression is:

1. **Introduction:** category, read-only value, development status, network illustration and an early follow action.
2. **Architecture:** each core claim sits beside its visual explanation. Ownership and recovery support the protected-system story without another duplicate summary.
3. **Everyday networking:** integrated services, selected discovery, mixed protocols and the local console, each adding distinct information.
4. **Development:** current status and the closing follow action.

Keep the established “Your homelab’s first hop” line. Use functional supporting headings so the architecture and benefits survive a quick skim.

## Desktop and mobile composition

Preserve the outlined wordmark, local Manrope and Plex Mono, charcoal default, warm-paper alternate and rounded network junctions.

Desktop uses its width to pair claims with a system illustration and compare the accepted and candidate images. Mobile uses a compact three-branch gateway drawing, interleaves claims with their evidence, presents the ownership sequence vertically, and puts update controls beside compact slot rows.

On phones, open diagram groups and whitespace reduce nested panels and repeated dividers. The read-only image remains a deliberate visual emphasis. Keep labels at readable sizes and recompose at enlarged text settings. Essential information remains visible without operating an illustration.

The reference review drew on [Linear](https://linear.app/) for type hierarchy and adjacent product illustrations, [Tailscale](https://tailscale.com/) for selectable explanations, and [Talos](https://www.siderolabs.com/talos-linux) for making the operating-system architecture prominent. These are presentation references; their assets, claims and layouts are not copied.

## Motion

Movement explains a connection or a state change:

- The introductory packet journey connects Home, Devices and Lab through Lanrith to the Internet. Desktop and mobile use their respective geometries.
- Replay is an explicit request to see that journey again.
- The update illustration traces staging or fallback while retaining the accepted image in place. The state explanation changes immediately.

Keep automatic sequences brief and bounded. Do not rotate explanatory content automatically or hide text until an animation completes. User actions must not create overlapping animation work. Stop effects offscreen, when hidden, on relevant layout changes, and when reduced motion is requested. Preserve useful static diagrams and explanations without JavaScript.

Guidance: [W3C pause, stop and hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html), [animation from interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html), and [web.dev animation performance](https://web.dev/articles/animations-guide).

## Verification

Review actual desktop, tablet and phone screenshots in both themes, alongside browser assertions. Check the first viewport, heading-only skim, grouping and how closely controls sit to their feedback. Passing an overflow check does not establish that a page is easy to understand.

Exercise normal motion as well as reduced motion, initial playback and replay, pointer/touch and keyboard use, breakpoint changes, enlarged text, JavaScript-disabled content, theme persistence and blocked storage. Verify project-relative assets under the GitHub Pages `/website/` path and ensure visitor GitHub links point to the organisation.

The 20 October layout revision, before the subsequent copy review, was rendered at 1440, 1280, 768, 390 and 320px. Both themes were checked on desktop and phones. At 390px, that revision is 3,741px tall, with the architecture section starting at y746 and the first follow action at y397. The previous values were 6,051, y4,307 and y5,744 respectively.

Actual packet movement, replay, staging and fallback were checked on desktop and mobile. Additional checks covered reduced motion, preserved state across resizing, 200% text at 320/390px, no-JavaScript content, local assets and valid links. Screenshot inspection caught a writable-state label wrapping awkwardly at enlarged text; the label now moves onto its own line when needed. No horizontal page overflow, failed assets or browser errors were recorded.

Browser emulation does not replace physical-device, Safari, Firefox or screen-reader testing. The illustrations explain the architecture; website checks do not establish router release readiness.
