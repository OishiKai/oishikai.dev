---
title: "ECサイトリニューアル"
description: "既存のECサイトのモバイルアプリ化プロジェクト。iOS（Swift/SwiftUI）で開発し、AWS Cognito による認証、CloudFront によるアセット配信を実装。"
techStack: ["Swift", "SwiftUI", "AWS Cognito", "CloudFront", "REST API"]
featured: true
order: 2
---

## 概要

アパレルブランドの既存ECサイトをモバイルアプリ化するプロジェクトです。iOS ネイティブで開発し、既存の REST API と連携しました。

## 主な機能

- 商品一覧・詳細表示
- カート・購入フロー
- AWS Cognito によるユーザー認証
- お気に入り・閲覧履歴
- プッシュ通知によるセール通知

## 技術的なポイント

- **SwiftUI** による宣言的UIの構築
- **Combine** フレームワークによるリアクティブデータフロー
- **AWS Cognito** でのセキュアな認証基盤
- **CloudFront** による商品画像のCDN配信（レスポンス 87%改善）
