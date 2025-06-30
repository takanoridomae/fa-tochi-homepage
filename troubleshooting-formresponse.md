# 🔧 formResponse が見つからない場合の対処法

## 🎯 よくある原因と解決策

### 原因1: フォーム送信前にNetworkタブを確認している
**解決策**: フォーム送信後に確認する

1. Networkタブを開く
2. Clearボタンでログをクリア
3. フォームに入力して送信
4. 送信後にNetworkタブを確認

### 原因2: 別の名前で表示されている
**探すべき名前**:
- `formResponse`
- `submit`
- `batchexecute`
- `docs.google.com` を含むURL
- ステータスが `302` または `200` のリクエスト

### 原因3: フィルターが適切でない
**確認すべきフィルター**:
- **All** を選択
- または **Fetch/XHR** を選択
- **Doc** フィルターも確認

## 🔍 実際の表示例

### 正常な場合の表示
```
Name                           Status    Type      Size
formResponse                   200       xhr       1.2 kB
batchexecute                   200       xhr       2.1 kB
docs.google.com/forms/...      302       document  0 B
```

### 送信成功時に表示されるリクエスト
1. **formResponse** (最重要)
2. **batchexecute** 
3. **リダイレクト系のリクエスト**

## 🎯 代替確認方法

### 方法1: Docフィルターを確認
1. **Doc** フィルターをクリック
2. Google Formsのページ遷移を確認
3. 送信完了ページへのリクエストを探す

### 方法2: 時系列で確認
1. **送信ボタンクリック直後**のリクエストを確認
2. **時間順**で新しいリクエストを探す
3. **サイズが大きい**リクエストを優先確認

### 方法3: URLで判断
以下を含むURLを探す:
- `docs.google.com/forms`
- `formResponse`
- `submit`

## 🚨 緊急時の代替手段

### Google Formsのスプレッドシートで確認
1. Google Formsの「回答」タブを開く
2. スプレッドシートを確認
3. テスト送信データが保存されているか確認
4. 列の順番からフィールドの対応を推測

### 順番による推測方法
フォーム作成順に以下のIDパターンが多い:
```javascript
const GOOGLE_FORM_FIELDS = {
    lastName: 'entry.1234567890',      // 1番目
    firstName: 'entry.1234567891',     // 2番目  
    email: 'entry.1234567892',         // 3番目
    phone: 'entry.1234567893',         // 4番目
    serviceType: 'entry.1234567894',   // 5番目
    address: 'entry.1234567895',       // 6番目
    airconCount: 'entry.1234567896',   // 7番目
    preferredDate: 'entry.1234567897', // 8番目
    message: 'entry.1234567898'        // 9番目
};
```

## ⚡ 今すぐ試す手順

1. **Networkタブをクリア**
2. **フォームに入力**
3. **送信ボタンをクリック**
4. **All フィルターで確認**
5. **docs.google.com を含むリクエストを探す**
6. **ステータス200または302のリクエストをクリック** 