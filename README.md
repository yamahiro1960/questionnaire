# 勉強会申込HP (静的サイト + Supabase版)

このフォルダは、HTML/CSS/JSの静的サイトとして公開し、
送信内容をSupabaseへ保存する実装です。

## 1. 構成

- Index.html: 案内ページ表示と申込フォーム
- styles.css: ページスタイル
- app.js: フォーム送信処理
- config.js: Supabase接続設定
- supabase-schema.sql: テーブル/権限/RLSポリシー定義

## 2. 事前準備

1. Supabaseで [supabase-schema.sql](supabase-schema.sql) を実行
2. [config.js](config.js) に以下を設定
   - supabaseUrl: 例 https://xxxxx.supabase.co
   - supabaseAnonKey: Supabaseの anon public key
   - supabaseTable: event_applications

補足:
- 静的サイトでは service_role key を使わないでください。
- anon key は公開前提のキーです（RLSポリシーで制御します）。

## 3. デプロイ手順

1. [Index.html](Index.html)、[styles.css](styles.css)、[app.js](app.js)、[config.js](config.js) を同じ階層で公開
2. 公開先は GitHub Pages / Netlify / Vercel / 既存サーバー いずれでも可
3. 公開URLを取得

## 4. 動作確認

1. 公開URLをブラウザで開く
2. フォーム入力して送信
3. Supabase の event_applications テーブルに1件追加されることを確認

## 5. 運用メモ

- 入力バリデーションはサーバー側にも実装済みです。
- 主催者連絡先（電話/メール）は Index.html の文言を編集して追記してください。
