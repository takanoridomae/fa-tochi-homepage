# GitHub設定ガイド

## 🚀 手順1: GitHubリポジトリの作成

### A. GitHub.comでの操作

1. **GitHubにログイン**
   - https://github.com にアクセス
   - ユーザー名とパスワードでログイン

2. **新しいリポジトリを作成**
   - 右上の「+」ボタンをクリック
   - 「New repository」を選択

3. **リポジトリ設定**
   ```
   Repository name: fa-tochi-homepage
   Description: 株式会社FAとち エアコンクリーニング専門会社のホームページ
   Visibility: Public（または Private）
   
   ✅ Add a README file: チェックしない（既にREADME.mdがあるため）
   ✅ Add .gitignore: チェックしない（既に作成済み）
   ✅ Choose a license: 必要に応じて選択
   ```

4. **「Create repository」をクリック**

### B. ローカルでの操作

```bash
# リモートリポジトリを追加（URLは作成したリポジトリのURLに置き換え）
git remote add origin https://github.com/YOUR_USERNAME/fa-tochi-homepage.git

# リモートリポジトリにプッシュ
git branch -M main
git push -u origin main
```

## 🔧 手順2: Netlifyとの連携

### A. Netlifyアカウント作成・ログイン

1. **Netlifyにアクセス**
   - https://netlify.com にアクセス
   - 「Get started for free」をクリック

2. **GitHubアカウントで連携**
   - 「GitHub」ボタンをクリック
   - GitHubアカウントでログイン
   - Netlifyアクセス許可を承認

### B. サイトのデプロイ設定

1. **「New site from Git」をクリック**

2. **Git provider選択**
   - 「GitHub」を選択

3. **リポジトリ選択**
   - 作成した「fa-tochi-homepage」リポジトリを選択

4. **デプロイ設定**
   ```
   Branch: main
   Build command: （空白のまま）
   Publish directory: （空白のまま）
   ```

5. **「Deploy site」をクリック**

### C. サイト名の変更（オプション）

1. **Site settings**をクリック
2. **「Change site name」**をクリック
3. **新しい名前を入力**（例：`fa-tochi-cleaning`）
4. **「Save」**をクリック

## 📋 手順3: Netlify Forms確認

### A. フォーム設定確認

1. **Netlify管理画面で「Forms」をクリック**
2. **初回デプロイ後、フォームが自動検出される**
3. **「contact」フォームが表示されることを確認**

### B. テスト送信

1. **デプロイされたサイトにアクセス**
2. **お問い合わせフォームに入力**
3. **送信テスト**
4. **Netlify管理画面「Forms」でデータ受信確認**

### C. スパム対策設定

1. **Forms設定で「Spam filtering」を有効化**
2. **「Akismet」連携（必要に応じて）**
3. **「Honeypot field」が機能していることを確認**

## 🔒 手順4: セキュリティ設定

### A. 環境変数設定（Node.jsサーバー使用時）

```bash
# Netlify CLI使用時
netlify env:set EMAIL_USER "your-email@gmail.com"
netlify env:set EMAIL_PASS "your-app-password"
```

または

1. **Netlify管理画面「Site settings」**
2. **「Environment variables」**
3. **必要な環境変数を追加**

### B. カスタムドメイン設定

1. **「Domain management」**
2. **「Add custom domain」**
3. **ドメイン名を入力**
4. **DNS設定（A/CNAMEレコード）**

## 📊 手順5: 継続的デプロイメント

### A. 自動デプロイ設定

- ✅ **既に設定済み**: GitHubにプッシュすると自動でNetlifyがデプロイ
- ✅ **ブランチ保護**: mainブランチへの直接プッシュ制限（必要に応じて）

### B. デプロイ通知設定

1. **「Build & deploy」→「Deploy notifications」**
2. **Slack、Email等の通知設定**
3. **デプロイ成功/失敗の通知を設定**

## 🛠️ トラブルシューティング

### よくある問題と解決方法

#### 1. フォームが動作しない
```
❌ 問題: フォーム送信後、データが受信されない
✅ 解決:
   - HTMLフォームに data-netlify="true" があることを確認
   - name属性が正しく設定されていることを確認
   - form-name hidden fieldが設定されていることを確認
```

#### 2. デプロイエラー
```
❌ 問題: Deploy failed
✅ 解決:
   - ファイル名に日本語や特殊文字が含まれていないか確認
   - package.jsonのbuild scriptを確認
   - Netlifyログでエラー詳細を確認
```

#### 3. 画像が表示されない
```
❌ 問題: 画像ファイルが表示されない
✅ 解決:
   - 画像ファイルがGitリポジトリに含まれているか確認
   - ファイルパスが正しいか確認（大文字小文字区別）
   - 画像ファイルサイズが大きすぎないか確認
```

## 📈 その他の設定

### A. Analytics設定
- Google Analytics連携
- Netlify Analytics有効化

### B. SSL証明書
- ✅ **自動設定**: Netlifyが自動でLet's Encrypt証明書を設定

### C. リダイレクト設定
```bash
# _redirects ファイル作成（必要に応じて）
/old-page.html /new-page.html 301
/contact /index.html#contact 302
```

## 🎯 完了チェックリスト

- [ ] GitHubリポジトリ作成完了
- [ ] ローカルコードをプッシュ完了
- [ ] Netlifyアカウント作成・連携完了
- [ ] サイトデプロイ完了
- [ ] Netlify Formsが機能することを確認
- [ ] サンクスページが正常に表示されることを確認
- [ ] スパム対策が機能することを確認
- [ ] カスタムドメイン設定（必要な場合）

---

**📞 サポート**: 設定で困った場合は、各ステップのスクリーンショットと一緒にお問い合わせください。 