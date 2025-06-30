# 🚀 Google Forms連携 - 簡単セットアップガイド

## 1. フィールドIDを取得する（5分）

### 手順
1. Google Formsのプレビューを開く
2. **F12**キーを押して開発者ツールを開く
3. **Network**タブをクリック
4. フォームにテストデータを入力して送信
5. `formResponse`をクリック→**Payload**を確認
6. `entry.xxxxxxxxx`の値をメモ

### 取得例
```
entry.1234567890: テスト姓    ← 姓のフィールドID
entry.1234567891: テスト名    ← 名のフィールドID
entry.1234567892: test@example.com ← メールのフィールドID
...
```

## 2. JavaScriptファイルを更新する（2分）

`google-forms-integration.js`を以下のように更新：

```javascript
const GOOGLE_FORM_URL = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSf8fj4CGDXeIJBTJywjd2hpO8EoUVFsQdmw0yh_bmvoyrDRqA/formResponse';

const GOOGLE_FORM_FIELDS = {
    lastName: 'entry.取得したID',      // ← ここに実際のIDを入力
    firstName: 'entry.取得したID',     // ← ここに実際のIDを入力
    email: 'entry.取得したID',         // ← ここに実際のIDを入力
    phone: 'entry.取得したID',         // ← ここに実際のIDを入力
    serviceType: 'entry.取得したID',   // ← ここに実際のIDを入力
    address: 'entry.取得したID',       // ← ここに実際のIDを入力
    airconCount: 'entry.取得したID',   // ← ここに実際のIDを入力
    preferredDate: 'entry.取得したID', // ← ここに実際のIDを入力
    message: 'entry.取得したID'        // ← ここに実際のIDを入力
};
```

## 3. HTMLファイルでスクリプトを有効化（1分）

`index.html`で以下の行のコメントアウトを外す：

```html
<!-- 変更前 -->
<!-- <script src="google-forms-integration.js"></script> -->

<!-- 変更後 -->
<script src="google-forms-integration.js"></script>
```

## 4. テスト送信（1分）

1. ホームページのお問い合わせフォームから送信
2. Google Formsのスプレッドシートで受信確認
3. 完了！

## 🔧 トラブルシューティング

### フィールドIDが取得できない場合
- Google Formsで実際にテスト送信を行う
- Networkタブの`formResponse`を必ず確認
- Payloadセクションを見る

### 送信エラーが出る場合
- フィールドIDが正しいか確認
- Google FormsのURLが正しいか確認
- CORSエラーは正常（Google Formsの仕様）

### データが保存されない場合
- Google Formsのスプレッドシート連携を確認
- フォームの公開設定を確認 