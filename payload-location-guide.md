# 📍 Payload確認ガイド - 詳細手順

## 🎯 Payloadの場所

### ステップ1: Networkタブでリクエストを探す

送信後、Networkタブに以下のようなリクエストが表示されます：

```
Name                    Status    Type
formResponse           200       xhr
analytics              200       xhr
...その他のリクエスト
```

**探すべきリクエスト名:**
- `formResponse` 
- または `submit` 
- または Google Formsの長いURL

### ステップ2: リクエストをクリック

1. **formResponse**という名前のリクエストをクリック
2. 右側に詳細パネルが表示される

### ステップ3: Payloadタブを探す

右側のパネルに以下のタブが表示されます：

```
Headers | Payload | Response | Initiator | Timing
```

**Payloadタブをクリック**

### ステップ4: Form Dataを確認

Payloadタブ内に以下のセクションがあります：

```
Request Payload
├── Form Data
│   ├── entry.1234567890: テスト姓
│   ├── entry.1234567891: テスト名
│   ├── entry.1234567892: test@example.com
│   └── ...
└── Query String Parameters (場合によって)
```

## 🔧 見つからない場合の対処法

### パターン1: Payloadタブがない場合
- **Headers**タブを確認
- **Request Headers**セクションを探す
- **Form Data**セクションを探す

### パターン2: formResponseが見つからない場合
- **All**フィルターが選択されているか確認
- **XHR**フィルターをクリック
- **Fetch/XHR**フィルターをクリック

### パターン3: 別の名前の場合
以下の名前も探してください：
- `submit`
- `formResponse`
- `docs.google.com` を含むURL
- ステータスが `200` のリクエスト

## 📱 ブラウザ別の違い

### Chrome
- Payloadタブ → Form Data

### Firefox  
- Request タブ → Params

### Edge
- Payloadタブ → Form Data

### Safari
- Network タブ → リクエスト選択 → Request

## 🎯 実際の表示例

正しく見つかった場合、以下のように表示されます：

```
Form Data:
entry.123456789: 入力した姓
entry.123456790: 入力した名
entry.123456791: 入力したメール
entry.123456792: 入力した電話番号
entry.123456793: 選択したサービス
entry.123456794: 入力した住所
entry.123456795: 選択したエアコン台数
entry.123456796: 入力した希望日時
entry.123456797: 入力したお問い合わせ内容
```

## ⚠️ 注意点

1. **送信前にNetworkタブを開く**
   - 送信後に開いても表示されません

2. **Clearボタンを押す**
   - 古いリクエストが混在しないように

3. **フィルターを確認**
   - AllまたはXHRフィルターを選択

4. **複数のリクエストがある場合**
   - 時間順で最新のものを確認
   - ステータスが200のものを優先 