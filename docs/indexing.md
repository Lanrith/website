# Search and AI indexing

Reviewed 20 October 2026.

The intended canonical address is `https://lanrith.com/`. The domain is awaiting configuration. Canonical URLs, social-image URLs, structured-data identifiers and the sitemap deliberately use that address. GitHub Pages remains the working preview at `https://lanrith.github.io/website/`.

## Site files

| File or markup | Purpose |
|---|---|
| HTML title and description | Name Lanrith and its router/edge OS category in search and sharing. |
| Canonical link | Identify the HTTPS apex domain as the preferred page. |
| Open Graph and Twitter metadata | Provide a title, description and the existing 1200 × 630 social image. |
| JSON-LD | Connect the Lanrith organization, website, page and public source project using stable identifiers. |
| `robots.txt` | Allow all crawlers and identify the sitemap. This includes search and AI crawlers; it does not change content or brand licences. |
| `sitemap.xml` | List the canonical homepage and its actual content-modification date. |
| `index.md` | Provide the page's product information as Markdown, including the meaning of the diagrams. |
| `llms.txt` | Point compatible AI tools to that overview and the public project. |

All essential product text is in the initial HTML response. JavaScript handles theme selection and illustration controls; it is not required to read the features. The Markdown alternate is linked from the HTML head, and `llms.txt` is linked using `rel="describedby"`, following the [llms.txt proposal](https://llmstxt.org/).

The structured data contains established project facts. It does not invent reviews, prices, release versions, company addresses or support contacts. Organization identity and its public profile follow [Google's organization guidance](https://developers.google.com/search/docs/appearance/structured-data/organization); the source-project node uses [Schema.org SoftwareSourceCode](https://schema.org/SoftwareSourceCode).

## Crawler policy

`User-agent: *` with `Allow: /` leaves the public content and assets available to compliant crawlers. The site also permits indexing and full text/image previews in its robots meta tag.

AI search crawling and model-training crawling are separate uses. OpenAI documents OAI-SearchBot for search and GPTBot for potential training; Anthropic distinguishes Claude-SearchBot, Claude-User and ClaudeBot. The current broad allowance includes both uses. See the [OpenAI crawler documentation](https://developers.openai.com/api/docs/bots) and [Anthropic crawler documentation](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler).

Perplexity also recommends allowing its search crawler. If a proxy or firewall is introduced later, check its bot challenges and published crawler IP guidance; a permissive robots file does not bypass a network block. See [Perplexity's crawler guidance](https://docs.perplexity.ai/docs/resources/perplexity-crawlers).

`llms.txt` is an optional aid for tools that use it. It is not a ranking mechanism or an indexing guarantee. Google says its Search systems, including generative AI features, do not use it; ordinary crawlability and useful content remain the basis of discovery. See [Google's AI search guidance](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide).

## When the domain is connected

1. Complete the GitHub Pages custom-domain and HTTPS setup described in the README.
2. Confirm `https://lanrith.com/`, `/robots.txt`, `/sitemap.xml`, `/index.md`, `/llms.txt` and the social image return HTTP 200 without a login or bot challenge.
3. Check that HTTP and `www` redirect to the chosen HTTPS apex address, and that the GitHub Pages URL redirects to the custom domain.
4. Verify ownership in Google Search Console and Bing Webmaster Tools. Use the real verification record/file supplied by each service; this repository contains no placeholder verification tokens.
5. Submit `https://lanrith.com/sitemap.xml` in both services and inspect the homepage. Monitor crawl errors, selected canonical URL and indexing after launch.

These account-verification and submission steps have not been completed. They require the connected domain and the owner's search-console accounts.

Robots rules are read from the origin root. `/website/robots.txt` on the temporary GitHub Pages URL is not the policy for `lanrith.github.io`; the file takes its intended place at `/robots.txt` when the custom domain is connected. See [Google's robots placement guidance](https://developers.google.com/crawling/docs/robots-txt/create-robots-txt).

Sitemaps help discovery but do not guarantee indexing. [Google's sitemap guide](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap) and [Bing's webmaster guidelines](https://www.bing.com/webmasters/help/bing-webmaster-guidelines-30fba23a) describe submission and monitoring. Avoid anonymous sitemap-ping endpoints or submissions of the unconfigured domain.

## Keeping it accurate

Update visible copy, `index.md`, `llms.txt` and relevant structured data in the same change. Check the title and descriptions too. Change the sitemap's `lastmod` only when the page content changes, not on every deployment. Add sitemap entries when real public pages are added; page fragments are not separate URLs.

Validate JSON-LD and XML syntax, unique IDs, heading order, links and the HTML without JavaScript. Recheck mobile wrapping after copy edits. Preserve the local assets and bounded motion; SEO additions do not require a larger client bundle.

## Verification of this revision

The JSON-LD and sitemap parse successfully, and every structured-data type and property exists in the published Schema.org vocabulary. Core paragraphs and headings match the Markdown overview. Eleven search/AI user-agent names pass the robots policy checks for the homepage, text files, scripts and social image.

Local HTTP checks pass at both the domain root and `/website/` paths. Browser checks cover 1440, 1280, 768, 390 and 320px, both themes on desktop and phones, 200% text on phones, no-JavaScript content, and the existing motion interactions. No horizontal page overflow, broken assets or browser errors were recorded. These checks establish the files' behaviour; domain activation and search-account verification remain the launch steps above.
