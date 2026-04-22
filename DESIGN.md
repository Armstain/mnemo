---
name: Mnemo
colors:
  # Light mode (default)
  bg: "#F5F0EB"
  fg: "#3D3A36"
  fg-muted: "#6D6963"
  accent: "#7A8F6A"
  accent-tint: "#8B9E7E"
  accent-warm: "#B2765A"
  accent-warm-tint: "#C4856A"
  surface: "#FFFFFF"
  surface-warm: "#EDE8E2"
  border: "#E2DDD6"
  error: "#C17A6A"
  placeholder: "#9E9890"
  tab-icon-default: "#9E9890"
  # Dark mode overrides
  bg-dark: "#2A2826"
  fg-dark: "#E8E4DF"
  fg-muted-dark: "#A8A49F"
  accent-dark: "#A3B896"
  accent-warm-dark: "#D48E74"
  surface-dark: "#3E3B38"
  surface-warm-dark: "#33302D"
  border-dark: "#3E3B38"
  tab-icon-default-dark: "#6B6660"
  # Navigation theme (React Navigation)
  nav-primary-light: "#8B9E7E"
  nav-background-light: "#F5F0EB"
  nav-card-light: "#F5F0EB"
  nav-text-light: "#3D3A36"
  nav-border-light: "#DDD6CD"
  nav-notification-light: "#C4856A"
  nav-primary-dark: "#A3B896"
  nav-background-dark: "#2A2826"
  nav-card-dark: "#2A2826"
  nav-text-dark: "#E8E4DF"
  nav-border-dark: "#3E3B38"
  nav-notification-dark: "#C4856A"
typography:
  display:
    fontFamily: Lora
    fontSize: 48px
    fontWeight: "700"
    lineHeight: 56px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Lora
    fontSize: 36px
    fontWeight: "700"
    lineHeight: 44px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Lora
    fontSize: 30px
    fontWeight: "700"
    lineHeight: 38px
  title-lg:
    fontFamily: Lora
    fontSize: 22px
    fontWeight: "700"
    lineHeight: 30px
  title-md:
    fontFamily: Lora
    fontSize: 18px
    fontWeight: "700"
    lineHeight: 26px
  title-sm:
    fontFamily: Lora
    fontSize: 15px
    fontWeight: "700"
    lineHeight: 22px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: "400"
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: "400"
    lineHeight: 26px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: "400"
    lineHeight: 22px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: "600"
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: "600"
    lineHeight: 18px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 10px
    fontWeight: "600"
    lineHeight: 16px
    letterSpacing: 0.05em
    textTransform: uppercase
  caption:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: "400"
    lineHeight: 16px
  overline:
    fontFamily: Inter
    fontSize: 10px
    fontWeight: "500"
    lineHeight: 14px
    letterSpacing: 0.08em
    textTransform: uppercase
  tab-label:
    fontFamily: Inter
    fontSize: 10px
    fontWeight: "600"
    lineHeight: 14px
    letterSpacing: 0.05em
    textTransform: uppercase
rounded:
  sm: 0.625rem
  DEFAULT: 1rem
  md: 1.125rem
  lg: 1.25rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
  container-px: 20px
  card-p: 24px
  card-p-compact: 16px
  section-gap: 24px
  item-gap: 12px
elevation:
  none: "0px 0px 0px rgba(61,58,54,0)"
  soft-sm: "0px 4px 16px rgba(61,58,54,0.03)"
  soft: "0px 8px 30px rgba(61,58,54,0.04)"
  soft-lg: "0px 12px 48px rgba(61,58,54,0.06)"
motion:
  duration-fast: 400ms
  duration-base: 500ms
  duration-slow: 600ms
  duration-pulse: 900ms
  duration-breathe: 2200ms
  easing-timing: cubic-bezier(0.4, 0, 0.2, 1)
  spring-damping: 15
  stagger-item: 40ms
  stagger-feature: 150ms
  entry-y: 12px
  entry-scale: 0.98
  press-opacity: 0.80
  press-scale: 0.97
components:
  card-surface:
    backgroundColor: "{colors.surface}"
    borderColor: "rgba(226,221,214,0.40)"
    borderWidth: 1px
    rounded: "{rounded.md}"
    padding: "{spacing.card-p}"
    shadow: "{elevation.soft}"
  card-warm:
    backgroundColor: "{colors.surface-warm}"
    borderColor: "rgba(226,221,214,0.40)"
    borderWidth: 1px
    rounded: "{rounded.md}"
    padding: "{spacing.card-p}"
    shadow: "{elevation.soft}"
  card-accent:
    backgroundColor: "rgba(122,143,106,0.10)"
    borderColor: "rgba(226,221,214,0.40)"
    borderWidth: 1px
    rounded: "{rounded.md}"
    padding: "{spacing.card-p}"
    shadow: "{elevation.soft}"
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "#FFFFFF"
    typography: "{typography.label-lg}"
    rounded: "{rounded.DEFAULT}"
    paddingHorizontal: 24px
    paddingVertical: 16px
    minHeight: 52px
  button-primary-sm:
    backgroundColor: "{colors.accent}"
    textColor: "#FFFFFF"
    typography: "{typography.label-md}"
    rounded: "{rounded.DEFAULT}"
    paddingHorizontal: 16px
    paddingVertical: 10px
    minHeight: 40px
  button-primary-lg:
    backgroundColor: "{colors.accent}"
    textColor: "#FFFFFF"
    typography: "{typography.label-lg}"
    rounded: "{rounded.DEFAULT}"
    paddingHorizontal: 32px
    paddingVertical: 20px
    minHeight: 64px
  button-secondary:
    backgroundColor: "{colors.surface-warm}"
    textColor: "{colors.fg}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.DEFAULT}"
    paddingHorizontal: 24px
    paddingVertical: 16px
    minHeight: 52px
  button-outline:
    backgroundColor: transparent
    borderColor: "{colors.border}"
    borderWidth: 1px
    textColor: "{colors.fg}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.DEFAULT}"
    paddingHorizontal: 24px
    paddingVertical: 16px
    minHeight: 52px
  button-ghost:
    backgroundColor: transparent
    textColor: "{colors.fg}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.DEFAULT}"
    paddingHorizontal: 24px
    paddingVertical: 16px
    minHeight: 52px
  button-danger:
    backgroundColor: "{colors.error}"
    textColor: "#FFFFFF"
    typography: "{typography.label-lg}"
    rounded: "{rounded.DEFAULT}"
    paddingHorizontal: 24px
    paddingVertical: 16px
    minHeight: 52px
  button-disabled:
    opacity: 0.40
  button-pressed:
    opacity: 0.90
    scale: 0.97
  search-bar:
    backgroundColor: "rgba(237,232,226,0.50)"
    borderColor: "rgba(226,221,214,0.60)"
    borderWidth: 1px
    rounded: "{rounded.xl}"
    paddingHorizontal: 16px
    paddingVertical: 10px
    iconColor: "{colors.fg-muted}"
    iconSize: 18px
    textTypography: "{typography.body-md}"
    textColor: "{colors.fg}"
    placeholderColor: "{colors.placeholder}"
    selectionColor: "{colors.accent}"
  note-list-item:
    backgroundColor: "{colors.surface}"
    borderColor: "rgba(226,221,214,0.30)"
    borderWidth: 1px
    rounded: 20px
    padding: 20px
    shadow: "{elevation.soft-sm}"
  note-list-item-pressed:
    backgroundColor: "rgba(237,232,226,0.50)"
    scale: 0.98
  icon-badge:
    width: 40px
    height: 40px
    rounded: "{rounded.full}"
    backgroundColor: "rgba(122,143,106,0.05)"
    borderColor: "rgba(122,143,106,0.10)"
    borderWidth: 1px
  icon-badge-pending:
    width: 40px
    height: 40px
    rounded: "{rounded.full}"
    accentColor: "{colors.accent-warm}"
  fab-primary:
    width: 64px
    height: 64px
    rounded: "{rounded.full}"
    backgroundColor: "{colors.accent}"
    shadow: "{elevation.soft-lg}"
    iconColor: "#FFFFFF"
    iconSize: 28px
  fab-secondary:
    rounded: "{rounded.full}"
    backgroundColor: "{colors.surface}"
    borderColor: "{colors.border}"
    borderWidth: 1px
    paddingHorizontal: 16px
    paddingVertical: 12px
    shadow: "{elevation.soft-lg}"
  quick-prompt-chip:
    backgroundColor: "rgba(122,143,106,0.05)"
    borderColor: "rgba(122,143,106,0.10)"
    borderWidth: 1px
    rounded: "{rounded.full}"
    paddingHorizontal: 12px
    paddingVertical: 6px
    textColor: "{colors.accent}"
    iconSize: 14px
  nav-bar-button:
    width: 44px
    height: 44px
    rounded: "{rounded.full}"
    backgroundColor: "{colors.surface}"
    borderColor: "rgba(226,221,214,0.50)"
    borderWidth: 1px
  nav-bar-button-accent:
    width: 44px
    height: 44px
    rounded: "{rounded.full}"
    backgroundColor: "{colors.accent}"
  status-badge:
    rounded: "{rounded.full}"
    paddingHorizontal: 12px
    paddingVertical: 6px
    textTypography: "{typography.label-sm}"
  status-badge-success:
    backgroundColor: "rgba(122,143,106,0.15)"
    textColor: "{colors.accent}"
  status-badge-error:
    backgroundColor: "rgba(193,122,106,0.10)"
    textColor: "{colors.error}"
  pending-banner:
    backgroundColor: "rgba(178,118,90,0.10)"
    borderColor: "rgba(178,118,90,0.30)"
    borderWidth: 1px
    rounded: 12px
    padding: 16px
  empty-state:
    backgroundColor: "rgba(237,232,226,0.30)"
    borderColor: "{colors.border}"
    borderWidth: 1px
    borderStyle: dashed
    rounded: "{rounded.xl}"
    paddingVertical: 48px
    paddingHorizontal: 40px
  mic-circle:
    width: 176px
    height: 176px
    rounded: "{rounded.full}"
    shadow: "{elevation.soft-lg}"
    borderColor: "rgba(226,221,214,0.30)"
    borderWidth: 1px
  mic-circle-idle:
    backgroundColor: "#FFFFFF"
    iconColor: "{colors.accent-tint}"
  mic-circle-recording:
    backgroundColor: "{colors.accent-tint}"
    iconColor: "#FFFFFF"
  tab-bar:
    backgroundColor: "{colors.bg}"
    height: 80px
    paddingBottom: 20px
    paddingTop: 12px
    elevation: 0
    shadowOpacity: 0
    activeColor: "{colors.nav-primary-light}"
    inactiveColor: "rgba(61,58,54,0.50)"
---

## Brand & Style

Mnemo is a **cognitive calm** note-taking app named after Mnemosyne, the Greek goddess of memory. The visual language is built on a single guiding principle: the interface should feel like a warm, sun-lit notebook — a place that is quiet enough to think clearly but alive enough to feel inviting.

The chosen aesthetic is **Zen Minimalism with Organic Warmth**. It deliberately rejects the cold whitespace of typical productivity tools, instead wrapping every surface in soft parchment and earth tones. The emotional goal is to lower cognitive friction: when you open Mnemo between deep work sessions, the interface should not startle or demand attention. It should feel like putting down a pen on a wooden desk.

The brand mascot/emoji is 🍃 — a single leaf — which appears on the onboarding screen, empty states, and any moment the app needs to signal calm, readiness, or a fresh start.

## Colors

The palette is rooted in nature: warm stone, sage, and terracotta. Every colour has a purpose:

- **Background (`#F5F0EB` light / `#2A2826` dark):** The base canvas. Warm parchment in light mode; dark charcoal in dark mode. Never pure white or pure black.
- **Foreground (`#3D3A36` / `#E8E4DF`):** Primary text. Reads as deep warm brown in light mode, soft cream in dark mode. The warmth removes the harsh contrast of #000-on-#FFF.
- **Foreground Muted (`#6D6963` / `#A8A49F`):** Secondary and tertiary text — timestamps, labels, hints. Stays legible while visually receding.
- **Accent / Sage Green (`#7A8F6A` light, `#8B9E7E` tint / `#A3B896` dark):** The brand's primary action colour. Used for all interactive affordances — primary buttons, active states, selection cursors, and icon highlights. Sage connotes growth, focus, and calm alertness.
- **Accent Warm / Terracotta (`#B2765A` / `#C4856A` tint / `#D48E74` dark):** A secondary accent used sparingly for "pending" and "offline" states. The warm clay signals "something needs your attention" without the alarm of red.
- **Surface (`#FFFFFF` / `#3E3B38`):** Card and sheet backgrounds — slightly elevated above the base canvas.
- **Surface Warm (`#EDE8E2` / `#33302D`):** A slightly tinted surface used for notes body sections, warm empty states, and loading placeholders. It's the visual equivalent of aged paper.
- **Border (`#E2DDD6` / `#3E3B38`):** Hairline dividers. Almost always used at 30–60% opacity to feel organic rather than clinical.
- **Error (`#C17A6A`):** A muted terracotta-red for destructive actions and error states. It is intentionally desaturated so it does not shock the user — errors in Mnemo are handled gracefully.

**Colour usage rules:**
- Accent green at full opacity = interactive CTA (buttons, FAB, active icons).
- Accent green at 5–15% opacity = backgrounds for icon badges and status chips.
- Accent warm at 10–30% opacity = pending/offline banners.
- Border at 30–60% opacity on surfaces; full opacity only for large dividers.
- Shadows use `rgba(61, 58, 54, …)` — the foreground hue — so they are warm rather than grey.

## Typography

Two typefaces carry the entire hierarchy:

1. **Lora (700 Bold)** — the serif. Used for all display, headline, and title roles: the app name, page titles, card titles, note titles, section headings, and the AI summary quotation. Lora's moderate ink-trap curves add warmth and literary character that reinforces the "written notes" metaphor.

2. **Inter (400 Regular / 500 Medium / 600 SemiBold)** — the humanist sans. Used for all body copy, labels, button text, timestamps, and captions. The three weights cover: Regular for reading passages and placeholder text; Medium for secondary labels and metadata; SemiBold for interactive controls, section overlines, and any label that must be unmissable.

The type scale is deliberately compressed — the display size (≈48 px) is used only on the onboarding hero. Day-to-day UI lives in the 10–30 px range to keep information density high without feeling cluttered.

**Key typographic patterns:**
- Overlines and section labels are always uppercase Inter SemiBold in the smallest size (10–12 px) with wide tracking (0.05–0.08 em).
- Note titles use Lora in the 18–30 px range depending on context.
- AI-generated quotations are displayed in Lora Italic within a warm card to signal provenance.
- All button labels are Inter SemiBold in sentence case (not all-caps), except the tab bar which is all-caps 10 px to fit the compact strip.

## Spacing & Layout

The base unit is **4 px**. All spacing is a multiple of this grid: 4, 8, 12, 16, 20, 24, 32, 48, 64 px.

- **Container padding:** 20 px horizontal (slightly tighter than 24 px to leave breathing room on small phones without wasting space on larger ones).
- **Card padding:** 24 px default, 16 px compact. The reduction is used when multiple cards stack tightly in a feed.
- **Section gap:** 24 px between major scroll sections.
- **List item gap:** 12 px between note cards in the feed.
- **Safe area:** All screens respect device safe area insets. The bottom FAB area uses `insets.bottom + 24 px` so it never overlaps system home indicators.

## Elevation & Shadows

Elevation is expressed exclusively through **diffused warm shadows** — there are no hard drop shadows or `elevation` values that cause platform-specific artifacts.

| Token | Value | Use |
|---|---|---|
| `soft-sm` | `0 4px 16px rgba(61,58,54,0.03)` | List item cards, subtle lift |
| `soft` | `0 8px 30px rgba(61,58,54,0.04)` | Standard cards, sheets |
| `soft-lg` | `0 12px 48px rgba(61,58,54,0.06)` | FAB buttons, mic circle |

The shadows are intentionally near-invisible. Their job is to create micro-separation between layers, not to project drama.

## Radius & Shape

Mnemo uses generously rounded shapes throughout:

- **12 px** — small chips, pending banners, inner step containers.
- **16 px** (DEFAULT) — standard cards, input area, settings panels.
- **18–20 px** — note list items in the feed (slightly rounder to feel "card-like").
- **Full / 9999 px** — pill buttons, FAB circles, icon badges, tab chips, status badges.

There are no sharp corners anywhere in the product. The rounding reinforces the soft, organic brand feel and prevents the interface from feeling aggressive.

## Iconography

Icons are sourced from **Lucide React Native** exclusively. Usage rules:

- **Size:** 12–14 px for inline/metadata icons; 15–18 px for card row icons; 20–22 px for navigation buttons; 28 px for the FAB microphone; 56 px for the full-screen recording circle.
- **Stroke width:** 1.5–2.5 px. Thinner strokes (1.5–1.6) are used on large hero icons (mic, feature bullets). Standard controls use 1.8–2.0. Bold affordances use 2.5.
- **Colour:** Icons inside cards default to the accent sage (`#8B9E7E`). Muted / secondary icons use `#9E9890`. Destructive icons (trash) use `#C17A6A`.
- Icons are never filled — stroke-only maintains the lightweight, hand-drawn aesthetic.

## Motion & Animation

All motion is delivered through **Moti** (React Native Reanimated 2 wrapper). The animation philosophy is "content slides in gently from below and fades in" — never flashy, always purposeful.

**Entry animations:**
- Fade + `translateY: 12 px → 0` over 400–600 ms (timing).
- Scale `0.98 → 1` over 500 ms for elements that "grow into place" (search bar, FAB).
- Stagger: sequential items in a list delay by 40 ms per item; feature bullets on onboarding delay by 150 ms per item.

**FAB appearance:**
- Spring animation with `damping: 15` so the FAB bounces lightly into view — adding a tiny moment of delight without being distracting.

**Recording screen — mic breathing:**
- Two concentric pulse rings animate `scale: 1 → 1.6/2.0` and `opacity: 0.3 → 0` over 2200 ms in a continuous loop.
- The second ring is offset by 500 ms to create a ripple effect.
- The mic circle background transitions from white to sage green and back with a 400 ms timing transition.

**Loading pulse:**
- A single element animates `opacity: 0.4 → 1` over 900–1200 ms in an infinite timing loop. Used for "Reflecting on your thoughts…" and the ✨ emoji during AI generation.

**Press feedback:**
- Active presses: `opacity: 0.80` + `scale: 0.97–0.98`. This is purely CSS/class-based, not animated, to keep interactions instant.

**Screen transitions:**
- Default: platform default (iOS slide, Android fade-from-bottom).
- Tab switch: `fade` transition.
- Modal: `slide_from_bottom` with `presentation: modal`.
- Full-screen gesture swipe enabled on all screens.

## Component Patterns

### ZenCard
The primary content container. Comes in three variants:
- **Surface** (default): white/dark card, soft border, standard shadow.
- **Warm**: surface-warm background — used for the AI "where you left off" quotation card and the notes body container.
- **Accent**: 10% accent-green background — used for highlighted or featured content.

Cards animate in on mount (fade + translateY, configurable delay for stagger). Tappable cards suppress shadow and scale down slightly on press.

### ZenButton
Five variants: `primary` (sage green fill), `secondary` (warm surface fill), `outline` (border only), `ghost` (no border), `danger` (error terracotta fill). Three sizes: `sm` (40 px min-height), `md` (52 px), `lg` (64 px). All variants use Inter SemiBold labels, full-opacity icon support, and haptic feedback (light/medium/heavy via `expo-haptics`). Disabled state renders at 40% opacity.

### SearchBar
Pill-shaped input on a warm surface tinted background. Search icon (18 px, muted) on the left; clear (×) button appears only when text is present. Selection colour is accent green. The component never shows a visible focus ring — focus is implied by the cursor colour alone.

### Floating Action Buttons (FAB)
Two layered FABs anchored to the bottom-right, appearing above the tab bar via absolute positioning:
1. **Voice FAB** (primary): 64×64 full circle, sage green fill, white mic icon (28 px). This is the primary affordance — the biggest interactive target on the main screen.
2. **Write FAB** (secondary): pill shape, white surface with border, sage zap icon + "Write note" label. Secondary option, displayed above the primary.

Both appear via spring animation on load, disappear during search (to avoid cluttering search results).

### Note List Items
Cards with a 40×40 icon badge on the left (accent/10 bg, accent/10 border), title in Lora, timestamp top-right in 10 px overline style, excerpt below in Inter Regular. An AI summary teaser (sparkle icon + italic text) appears as a bottom section separated by a hairline border when a summary exists. Pending notes show a clock icon in accent-warm instead of the zap icon.

### Pending Banner
A full-width warm banner (`accent-warm/10` bg, `accent-warm/30` border) that appears at the top of a note detail when the note is queued for AI processing. Includes a small retry button (circular, 36×36, `accent-warm/20` bg).

### Empty States
Dashed-border rounded containers with a centred emoji (🍃, 🪷, 🌫️), a Lora headline, Inter body text, and an optional action button. The dashed border visually signals "nothing here yet" without feeling broken.

### Tab Bar
Borderless, shadow-free, 80 px tall. Active tab uses sage green; inactive uses foreground at 50% opacity. Labels are uppercase Inter SemiBold 10 px with 0.5 px letter spacing. Tab icons are 22 px Lucide with 1.8 stroke weight.

## Voice Capture Screen

The voice capture screen is the emotional centrepiece of the app. The full-screen layout centres an oversized mic circle (176×176 px) as the sole focal point, with all other UI elements receding to the edges. The design communicates: *this space is for you to speak*.

When recording:
- The mic circle transitions from white → sage green.
- Two concentric pulse rings emanate outward in a slow, breath-like loop.
- A blinking recording indicator (warm terracotta dot) appears in the header.
- The label changes from "Ready to listen" to "Listening..." (Lora, centred).

When idle, the screen is completely still — no movement until the user taps.

## Onboarding

A single long-scroll screen with generous padding (32 px horizontal, 64 px top). The hero leads with the 🍃 emoji at 48 px, followed by the app name in Lora Display. Three feature bullets each animate in with a left-slide + fade (staggered by 150 ms). A full-width primary CTA anchors the bottom. The screen is deliberately linear — no carousels, no skippable flows.

## Dark Mode

Every colour has a named dark-mode counterpart. The dark palette inverts the warmth: parchment becomes charcoal (`#2A2826`), cream becomes soft white (`#E8E4DF`), and sage green brightens slightly (`#A3B896`) to maintain the same perceptual weight against the darker background. Shadows remain the same warm-tinted formula but are invisible against dark surfaces — the layer separation is achieved through surface-colour steps instead (`#2A2826` → `#3E3B38` → `#33302D`). The `userInterfaceStyle: "automatic"` setting means the system controls the switch; there is no in-app toggle.
