---
title: "FlutterにおけるState Management比較：Riverpod vs BLoC"
description: "FlutterアプリでのState Management手法を比較。Riverpod と BLoC のメリット・デメリットを実際のプロジェクト経験をもとに解説します。"
pubDate: 2026-02-10
tags: ["Flutter", "Dart", "State Management"]
category: "モバイル開発"
draft: false
---

## はじめに

Flutterアプリ開発において、State Management（状態管理）は最も重要なアーキテクチャ上の決定のひとつです。本記事では、実際のプロジェクトで使用した **Riverpod** と **BLoC** を比較します。

## Riverpod の特徴

Riverpod は Provider パッケージの作者である Remi Rousselet が開発した、次世代の状態管理ソリューションです。

### メリット

- **型安全**: コンパイル時にエラーを検出できる
- **テスタビリティ**: ProviderScope を使った簡単なテスト
- **柔軟性**: グローバル・ローカル両方の状態管理が可能

### コード例

```dart
final counterProvider = StateNotifierProvider<CounterNotifier, int>((ref) {
  return CounterNotifier();
});

class CounterNotifier extends StateNotifier<int> {
  CounterNotifier() : super(0);

  void increment() => state++;
  void decrement() => state--;
}
```

## BLoC パターン

BLoC（Business Logic Component）は、Google が推奨するアーキテクチャパターンです。

### メリット

- **関心の分離**: UIとビジネスロジックを明確に分離
- **再利用性**: BLoC はプラットフォームに依存しない
- **Stream ベース**: リアクティブプログラミングとの親和性

### コード例

```dart
class CounterBloc extends Bloc<CounterEvent, int> {
  CounterBloc() : super(0) {
    on<Increment>((event, emit) => emit(state + 1));
    on<Decrement>((event, emit) => emit(state - 1));
  }
}
```

## 比較表

| 特徴 | Riverpod | BLoC |
|------|----------|------|
| 学習コスト | 中 | 高 |
| ボイラープレート | 少 | 多 |
| テスタビリティ | 高 | 高 |
| スケーラビリティ | 高 | 非常に高 |

## まとめ

小〜中規模のアプリには **Riverpod** が、大規模で複雑なビジネスロジックを持つアプリには **BLoC** がそれぞれ適しています。プロジェクトの規模とチームの経験に応じて、適切な選択をしましょう。
