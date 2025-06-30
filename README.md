# 株式会社FAとち ホームページ

エアコンクリーニング専門会社のホームページとお問い合わせシステム

## 🚀 データ保存方法の選択肢

### 1. 簡単な方法（推奨初心者向け）

#### A. Netlify Forms（無料・最も簡単）✅ **設定完了**
- **メリット**: 設定不要、無料、スパム対策付き
- **デメリット**: 月100件まで、カスタマイズ制限
- **設定**: HTMLフォームに`data-netlify="true"`を追加するだけ
- **現在の状態**: 設定済み、送信後は`thanks.html`にリダイレクト

#### B. Google Forms連携 ❌ **削除済み**
- **状態**: 中途半端な設定を整理・削除しました
- **理由**: Netlify Formsの方が簡単で確実なため

### 2. 本格的なシステム（推奨本格運用向け）

#### Node.js + Express + SQLite
- **メリット**: 完全カスタマイズ可能、管理画面付き
- **デメリット**: サーバー管理が必要
- **機能**: 
  - データベース保存
  - 自動メール送信
  - 管理画面
  - ステータス管理

## 📋 セットアップ手順

### 簡単な方法（Netlify）

1. **Netlifyにデプロイ**
   ```bash
   # GitHubにプッシュ後、Netlifyで連携
   ```

2. **フォーム確認**
   - フォーム送信後、Netlify管理画面で確認可能

### 本格的なシステム

1. **依存関係のインストール**
   ```bash
   npm install
   ```

2. **環境変数の設定**
   ```bash
   # env-example.txtを.envにコピーして編集
   cp env-example.txt .env
   ```

3. **メール設定**
   - Gmailの場合：アプリパスワードを取得
   - `EMAIL_USER`と`EMAIL_PASS`を設定

4. **サーバー起動**
   ```bash
   # 開発環境
   npm run dev
   
   # 本番環境
   npm start
   ```

5. **管理画面アクセス**
   ```
   http://localhost:3000/admin
   ```

## 📊 機能一覧

### フロントエンド
- ✅ レスポンシブデザイン
- ✅ フォームバリデーション
- ✅ ローディング状態
- ✅ 成功メッセージ
- ✅ エラーハンドリング

### バックエンド
- ✅ SQLiteデータベース
- ✅ 自動メール送信
- ✅ 管理画面
- ✅ ステータス管理
- ✅ ページネーション

## 🔧 カスタマイズ

### メールテンプレート
`server.js`の`adminMailOptions`と`customerMailOptions`を編集

### データベーススキーマ
`server.js`のテーブル作成部分を編集

### 管理画面デザイン
`server.js`の管理画面HTML部分を編集

## 🚀 デプロイ方法

### Heroku
```bash
# Herokuアプリ作成
heroku create fa-tochi-homepage

# 環境変数設定
heroku config:set EMAIL_USER=your-email@gmail.com
heroku config:set EMAIL_PASS=your-app-password

# デプロイ
git push heroku main
```

### VPS/レンタルサーバー
```bash
# PM2でプロセス管理
npm install -g pm2
pm2 start server.js --name fa-tochi
pm2 startup
pm2 save
```

## 📝 お問い合わせデータ項目

- ID（自動採番）
- 姓・名
- メールアドレス
- 電話番号
- 希望サービス
- 住所
- エアコン台数
- 希望日時
- お問い合わせ内容
- 作成日時
- ステータス（新規/対応中/完了）

## 🔒 セキュリティ

- SQLインジェクション対策
- XSS対策
- CSRF対策
- スパム対策（Honeypot）
- 入力値検証

## 📞 サポート

技術的な質問やカスタマイズのご相談は、開発者までお問い合わせください。 