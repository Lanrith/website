# Landing page: content and motion

Reviewed 20 October 2026.

The page introduces a project in development. Its job is to help a homelab owner understand what Lanrith is, why its design matters, and where to follow the work.

## What needed strengthening

The first version preserved the identity well, but its copy gave too much space to general reassurance. The immutable OS appeared late in the page, and the protection afforded by a read-only, integrity-checked system was barely explained.

| Earlier emphasis | Problem | Revised emphasis |
| --- | --- | --- |
| “Get the foundations right” | Could describe almost any router. | Explain the read-only root and filesystem integrity checking. |
| “Keep your network your own” | Ownership had no visible mechanism. | Name the owner's Git repository, image and signing keys. |
| “Confidence that carries on” | Reassurance replaced an explanation of recovery. | Show inactive-slot staging, boot checks and the retained accepted image. |
| Routing, DNS and IPv6 | Useful benefits, but weak as the only distinction. | Explain the homelab integration around the immutable system. |
| A static network illustration | Established the category without inviting exploration. | Use a short packet journey and a separate, visitor-controlled system-flow illustration. |

These are editorial findings from reviewing the page and project sources, not results from customer interviews or conversion testing.

## Positioning

Lead with an immutable homelab router: a read-only system, integrity checking, configuration in Git, owner-controlled signing, and a deliberate update path. Then explain the everyday benefit: networking components designed together, chosen discovery boundaries, mixed IPv4/IPv6 service paths, and a local console for investigation.

The distinction is this combination for homelabs. Image-based upgrades and rollback already exist elsewhere; automatic outbound NAT is also established. Avoid suggesting that every other router requires manual NAT or lacks recovery.

Keep the promise proportional to the evidence. The [project](https://github.com/Lanrith/lanrith), [trust model](https://github.com/Lanrith/lanrith/blob/main/docs/build-and-trust.md), and [operations documentation](https://github.com/Lanrith/lanrith/blob/main/docs/operations.md) describe the architecture and its qualification boundaries.

- Explain how the read-only image and dm-verity protect system integrity. Do not imply immunity from compromise.
- Distinguish the OS image from writable service state.
- Distinguish boot fallback from a deliberate signed rollback.
- Keep the console observational for router configuration.
- Keep development status visible. Compatibility and production readiness require qualified releases.
- Avoid security certifications, performance numbers, universal compatibility, and release dates without supporting evidence.

## Voice

Put concrete features in headings. Use supporting copy to explain what they do for the owner. A little familiarity with homelab life gives the page character: a new service to try and a household whose devices still need to work.

Keep the established “Your homelab’s first hop” line. Avoid filling every section with variations on “dependable,” “foundation,” or “confidence.” Each section should add something the visitor has not already learned.

## Visual direction

Keep the original wordmark, network geometry, typography, charcoal default theme, warm paper alternate, fine dividers and open layout.

The reference review suggested three useful patterns:

- [Linear](https://linear.app/) puts product illustrations beside the claims they explain and uses a clear type hierarchy.
- [Tailscale](https://tailscale.com/) pairs selectable feature stories with explanatory visuals.
- [Talos](https://www.siderolabs.com/talos-linux) makes its operating-system architecture prominent in its pitch.

Apply those presentation principles within Lanrith's identity. Do not copy their assets, prose, palettes, product claims, customer evidence or layouts.

## Motion

Movement should explain a connection or change. Keep the initial packet journey brief, let the visitor replay it, and make the system-flow scenes explicitly selectable. Do not rotate explanatory content automatically.

All core text must be available immediately. Motion cannot be a prerequisite for reading the page. Preserve useful static diagrams and explanations without JavaScript.

Respect reduced-motion preferences on load and when they change. Stop activity when hidden or offscreen, avoid overlapping replay callbacks, and keep selected scenes understandable without animation. Use short transform/opacity transitions where practical.

Guidance: [W3C pause, stop and hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html), [animation from interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html), and [web.dev animation performance](https://web.dev/articles/animations-guide).

## Verification

Reviewed in Chromium at 1440, 768, 390 and 320 CSS pixels, in both themes. The design run passed 114 browser assertions covering layout, scene selection, keyboard operation, theme storage, reduced motion, replay cleanup, and progressive enhancement. The final website package was then checked separately under its GitHub Pages subpath, including versioned asset URLs and the documentation link.

All three explanations remain readable without JavaScript. Scene changes retain keyboard focus and reserve their height. Reduced-motion changes cancel active effects, and scrolling the hero out of view stops its animation.

These checks used browser emulation, not physical devices, Safari, Firefox or a screen reader. Background-tab lifecycle handlers were exercised with controlled events because headless Chromium did not reproduce native visibility changes. The illustrations explain the architecture; these checks do not establish router release readiness.
