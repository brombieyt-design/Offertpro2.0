# Offert Pro — Instagram Videos (Remotion)

Three Instagram Reels (1080×1920, 9:16) built with [Remotion](https://remotion.dev).

## Videos

| ID | Desc | Duration |
|----|------|----------|
| `HeroVideo` | App intro — problem/solution hook | 10s |
| `FeaturesVideo` | 5 key features showcase | 15s |
| `CTAVideo` | Pricing + free signup CTA | 9s |

## Quick start

```bash
cd videos
npm install

# Preview in Remotion Studio (browser)
npm run studio

# Render individual videos
npm run render:hero       # → out/hero.mp4
npm run render:features   # → out/features.mp4
npm run render:cta        # → out/cta.mp4

# Render all three
npm run render:all
```

Remotion will auto-download ffmpeg on first render. Output files go to `videos/out/`.
