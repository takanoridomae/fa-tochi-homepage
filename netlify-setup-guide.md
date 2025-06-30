# Netlify設定完全ガイド

## 🚀 ステップ1: Netlifyアカウント作成

### A. アカウント作成
1. **https://netlify.com** にアクセス
2. **「Get started for free」**をクリック
3. **サインアップ方法を選択**:
   - 📝 **推奨**: 「Sign up with GitHub」
   - または Email/Password

### B. GitHubアカウント連携（推奨）
1. **「Sign up with GitHub」**をクリック
2. **GitHubログイン**
3. **Netlifyアクセス許可**を承認
   - Repository access
   - User data access

## 🔧 ステップ2: サイトのデプロイ

### A. 新しいサイトの作成
1. **ダッシュボードで「Add new site」**をクリック
2. **「Import an existing project」**を選択

### B. Git provider接続
1. **「Deploy with GitHub」**をクリック
2. **リポジトリの許可**（初回のみ）
   - 「Authorize Netlify」をクリック
   - リポジトリアクセス権限を付与

### C. リポジトリ選択
1. **「takanoridomae/fa-tochi-homepage」**を検索・選択
2. リポジトリが見つからない場合:
   - 「Configure the Netlify app on GitHub」をクリック
   - リポジトリアクセス権限を追加

### D. デプロイ設定
```
Branch to deploy: main
Build command: （空白のまま）
Publish directory: （空白のまま）
```

**📝 重要**: 静的サイトなので Build command は不要です

### E. デプロイ実行
1. **「Deploy site」**をクリック
2. **デプロイ進行状況を確認**
   - 通常2-3分で完了
   - ログで進行状況を確認可能

## 🌐 ステップ3: サイト設定

### A. サイト名の変更
1. **「Site settings」**をクリック
2. **「General」→「Site details」**
3. **「Change site name」**をクリック
4. **新しい名前を入力**:
   ```
   推奨例:
   - fa-tochi-cleaning
   - fatochi-aircon
   - fatochi-homepage
   ```
5. **「Save」**をクリック

### B. カスタムドメイン設定（オプション）
1. **「Domain management」**
2. **「Add custom domain」**
3. **独自ドメインを入力**
4. **DNS設定**（ドメイン管理会社で設定）:
   ```
   A record: @ → 75.2.60.5
   CNAME: www → your-site.netlify.app
   ```

## 📋 ステップ4: Netlify Forms設定確認

### A. フォーム自動検出
デプロイ完了後（約5分後）:
1. **「Forms」タブをクリック**
2. **「contact」フォームが表示されることを確認**
3. 表示されない場合は再デプロイ

### B. フォーム設定の詳細確認
```html
<!-- 現在の設定（確認用） -->
<form name="contact" method="POST" 
      data-netlify="true" 
      netlify-honeypot="bot-field" 
      action="/thanks.html">
```

### C. スパム対策設定
1. **「Forms」→「Settings」**
2. **「Spam filtering」を有効化**
3. **設定オプション**:
   - ✅ Enable form spam filtering
   - ✅ Enable Akismet (optional)
   - ✅ Honeypot field detection

## 🧪 ステップ5: フォームテスト

### A. 基本テスト
1. **デプロイ済みサイトにアクセス**
2. **お問い合わせフォームに入力**:
   ```
   お名前（姓）: テスト
   お名前（名）: 太郎
   メールアドレス: test@example.com
   お問い合わせ内容: テスト送信です
   個人情報の取り扱いに同意: ✅
   ```
3. **「送信する」をクリック**
4. **thanks.htmlページに遷移することを確認**

### B. データ受信確認
1. **Netlify管理画面「Forms」**で確認
2. **受信データが表示されることを確認**
3. **通知設定**（メール受信設定）

## 📧 ステップ6: 通知設定

### A. フォーム送信通知
1. **「Forms」→「Settings」**
2. **「Form notifications」**
3. **「Add notification」**:
   ```
   Type: Email notification
   Event: New form submission
   Email: your-email@example.com
   ```

### B. Slack通知（オプション）
1. **「Add notification」**
2. **「Slack」を選択**
3. **Webhook URLを設定**

## 🔒 ステップ7: セキュリティ設定

### A. HTTPS設定
- ✅ **自動設定済み**: Netlifyが自動でSSL証明書を発行
- Let's Encrypt証明書が自動更新

### B. セキュリティヘッダー
1. **「Site settings」→「Build & deploy」**
2. **「Post processing」**
3. **「Snippet injection」**で追加:
```html
<!-- セキュリティヘッダー -->
<meta http-equiv="X-Frame-Options" content="DENY">
<meta http-equiv="X-Content-Type-Options" content="nosniff">
```

## 📊 ステップ8: Analytics設定

### A. Netlify Analytics
1. **「Analytics」タブ**
2. **「Enable Analytics」**
3. **月額$9（オプション）**

### B. Google Analytics連携
1. **Google Analyticsでプロパティ作成**
2. **トラッキングコードを取得**
3. **index.htmlの`<head>`に追加**:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🚀 ステップ9: 継続的デプロイメント

### A. 自動デプロイ設定
- ✅ **既に設定済み**: GitHubプッシュで自動デプロイ
- ブランチ: main
- トリガー: git push

### B. デプロイ通知
1. **「Build & deploy」→「Deploy notifications」**
2. **通知設定**:
   ```
   Deploy started: Slack/Email
   Deploy succeeded: Email
   Deploy failed: Email + Slack
   ```

## 🛠️ ステップ10: トラブルシューティング

### A. よくある問題と解決

#### 1. フォームが表示されない
```
❌ 問題: Forms タブに contact フォームが表示されない
✅ 解決:
1. 再デプロイを実行
2. HTMLフォームの data-netlify="true" を確認
3. form name="contact" を確認
```

#### 2. 送信後にエラーページ
```
❌ 問題: 404 Not Found エラー
✅ 解決:
1. thanks.html ファイルがデプロイされているか確認
2. action="/thanks.html" パスを確認
3. ファイル名の大文字小文字を確認
```

#### 3. 日本語が文字化け
```
❌ 問題: フォームデータが文字化け
✅ 解決:
1. HTMLの charset="UTF-8" を確認
2. accept-charset="UTF-8" をフォームに追加
```

## 📈 ステップ11: 最適化とメンテナンス

### A. パフォーマンス最適化
1. **画像最適化**
2. **CSSミニファイ化**
3. **CDN活用**（Netlify CDN自動適用）

### B. 定期メンテナンス
- 月次: フォーム送信データの確認
- 月次: サイトパフォーマンスチェック
- 四半期: セキュリティアップデート確認

## ✅ 完了チェックリスト

- [ ] Netlifyアカウント作成完了
- [ ] GitHubリポジトリ連携完了
- [ ] サイトデプロイ完了
- [ ] カスタムサイト名設定完了
- [ ] Forms機能確認完了
- [ ] テスト送信完了
- [ ] 通知設定完了
- [ ] SSL証明書確認完了
- [ ] Analytics設定完了（オプション）

---

## 🎯 最終確認事項

**デプロイ後のサイトURL**: https://your-site-name.netlify.app
**管理画面URL**: https://app.netlify.com/sites/your-site-name

**📞 サポート**: 設定で困った場合は、Netlifyの[ドキュメント](https://docs.netlify.com/)を参照するか、エラーメッセージと一緒にお問い合わせください。 