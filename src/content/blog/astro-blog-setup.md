---
title: "Astro + Cloudflare Pagesで技術ブログを構築した話"
description: "Astroフレームワークを使い、Cloudflare Pagesにデプロイする技術ブログの構築手順と、選定理由をまとめます。"
pubDate: 2026-02-20
tags: ["Astro", "Cloudflare", "Web開発"]
category: "Web開発"
draft: false
---

## なぜ Astro を選んだのか

技術ブログを構築するにあたり、いくつかのフレームワークを検討しました。

### 候補

1. **Next.js** — React ベース、SSR/SSG 対応
2. **Gatsby** — React ベース、GraphQL データレイヤー
3. **Hugo** — Go ベース、超高速ビルド
4. **Astro** — コンテンツファースト、マルチフレームワーク対応

### Astro の決め手

- **ゼロ JavaScript**: デフォルトでクライアントJSを出力しない
- **Content Collections**: Markdownの型安全な管理
- **Island Architecture**: 必要な箇所だけインタラクティブに
- **パフォーマンス**: Lighthouse スコアがほぼ満点

## プロジェクト構成

```
src/
├── content/          # Markdown コンテンツ
│   ├── blog/
│   └── projects/
├── components/       # UI コンポーネント
├── layouts/          # ページレイアウト
└── pages/            # ルーティング
```

## Content Collections の活用

Astro の Content Collections は、Markdown コンテンツを型安全に管理する仕組みです。

```typescript
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()),
  }),
});
```

frontmatter のバリデーションが自動で行われるため、タイプミスや欠落フィールドをビルド時に検出できます。

## Cloudflare Pages へのデプロイ

### 設定

1. GitHub リポジトリを Cloudflare Pages に接続
2. ビルド設定：
   - ビルドコマンド: `npm run build`
   - 出力ディレクトリ: `dist`
   - Node.js バージョン: 20

### メリット

- **無料枠が充実**: 月500回のビルド、無制限の帯域幅
- **グローバルCDN**: Cloudflareのエッジネットワークで高速配信
- **自動デプロイ**: git push で自動ビルド＆デプロイ
- **プレビューURL**: ブランチごとにプレビュー環境が作成される

## パフォーマンス

Lighthouse スコア：

- **Performance**: 100
- **Accessibility**: 100
- **Best Practices**: 100
- **SEO**: 100

Astro のゼロ JavaScript アプローチにより、ほぼ満点のスコアを達成しています。

## まとめ

Astro + Cloudflare Pages の組み合わせは、技術ブログの構築に最適な選択肢です。コンテンツファーストのアプローチと、優れたデプロイ体験を両立できます。
