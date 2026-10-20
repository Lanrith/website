# Landing-page copy review

Reviewed 20 October 2026 with the AI Writing Proofreader skill.

## AI-Writing Risk Summary

Verdict: Low overall signal, with a few passages that read over-smoothed.

Main issue: abstract terms and repeated development wording obscured existing features.

Best fix: use concrete networking terms and present-tense descriptions, with one visible project-status notice.

The audience is a homelab owner evaluating an immutable router. The next action is to understand the architecture and follow the project. The owner confirmed that the features exist; this review does not treat them as future plans.

## Findings

| Severity | Pattern | Evidence | Fix |
|---|---|---|---|
| Medium | Abstract wording | “Network intent lives in your Git repository.” | Say “Your network configuration lives in Git.” |
| Medium | Repeated development caveats and passive voice | Discovery, translation and console paragraphs all described features as being developed or built. | Describe their current behaviour. Keep project maturity in the introductory status line. |
| Medium | A slogan repeats the theme instead of explaining the benefit | “The integration work belongs in the project.” | Describe services working together with defaults configured as one system. |
| Medium | An abstract heading hides a concrete capability | “A path between protocols.” | Name IPv4 and IPv6 in the heading and NAT64/NAT46 in the explanation. |
| Low | Insider terminology in a skim heading | “Stage the new. Keep the accepted.” | Use “Updates with a boot fallback.” Keep precise accepted/candidate labels in the diagram. |
| Low | A generic progress statement delays the next action | “Lanrith is taking shape.” | Invite readers to explore the code and follow project updates. |

## Suggested Rewrite

Applied in `index.html` and reflected in `index.md`:

> Routing, firewall, DNS, DHCP, IPv4 and IPv6 work together out of the box, with their defaults configured as one system.

> Share mDNS/DNS-SD service discovery across the networks you choose, alongside firewall rules that control access.

> NAT64/NAT46 connects supported IPv4 and IPv6 services across your network.

> The local console explains devices, connections and policy decisions. Router configuration stays in Git.

## Notes

The review covered the title, descriptions, headings, body paragraphs, illustration labels and state messages, navigation, buttons, accessible descriptions and footer. “Your homelab’s first hop” and the established brand voice remain. Short paired headings serve the visual identity; their presence alone is not a reason to rewrite them.

The read-only/writable distinction, owner-controlled signing, boot checks and deliberate rollback remain explicit. The wording does not add a hardware-support promise, security guarantee, release date, benchmark or certification.

Metadata names the product category for search and sharing. Structured data and the text overview describe the same product as the visible page. No keyword-only paragraphs or hidden promotional claims were added.
