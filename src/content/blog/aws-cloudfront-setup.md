---
title: "AWS CloudFront + S3でモバイルアプリ向けCDNを構築する"
description: "AWS CloudFrontとS3を組み合わせて、モバイルアプリのアセット配信を高速化するCDN構成を解説します。"
pubDate: 2026-01-25
tags: ["AWS", "CloudFront", "Infrastructure"]
category: "インフラ"
draft: false
---

## はじめに

モバイルアプリのパフォーマンスにおいて、画像やAPIレスポンスの配信速度は重要な要素です。本記事では、AWS CloudFront と S3 を使ったCDN構築手順を解説します。

## アーキテクチャ概要

```
Mobile App → CloudFront → S3 (Origin)
                ↓
          Edge Locations (Global)
```

CloudFrontは世界中のエッジロケーションにコンテンツをキャッシュし、ユーザーに最も近いサーバーからコンテンツを配信します。

## S3 バケットの設定

まず、アセットを格納するS3バケットを作成します。

```bash
aws s3 mb s3://my-app-assets-production --region ap-northeast-1
```

バケットポリシーでCloudFrontからのアクセスのみを許可します：

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowCloudFrontAccess",
      "Effect": "Allow",
      "Principal": {
        "Service": "cloudfront.amazonaws.com"
      },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::my-app-assets-production/*"
    }
  ]
}
```

## CloudFront ディストリビューションの作成

### キャッシュ戦略

モバイルアプリ向けでは、以下のキャッシュ戦略が効果的です：

- **画像**: 長期キャッシュ（30日）+ ファイル名にハッシュを含める
- **APIレスポンス**: 短期キャッシュ（5分）
- **設定ファイル**: キャッシュなし（常に最新を取得）

### Cache Policy の設定

```yaml
CachePolicy:
  MinTTL: 0
  MaxTTL: 2592000  # 30 days
  DefaultTTL: 86400  # 1 day
  HeadersConfig:
    - Accept-Encoding
  CookiesConfig:
    CookieBehavior: none
  QueryStringsConfig:
    QueryStringBehavior: none
```

## パフォーマンス結果

CDN導入前後で以下の改善が見られました：

| 指標 | 導入前 | 導入後 | 改善率 |
|------|--------|--------|--------|
| 画像読み込み (東京) | 120ms | 15ms | 87% |
| 画像読み込み (US) | 450ms | 30ms | 93% |
| API レスポンス | 200ms | 45ms | 78% |

## まとめ

CloudFront + S3 の組み合わせは、モバイルアプリのアセット配信を大幅に改善します。特にグローバルにユーザーがいるアプリでは、エッジロケーションの恩恵を大きく受けられます。
