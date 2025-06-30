const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// ミドルウェア
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// データベース初期化
const db = new sqlite3.Database('contacts.db');

// テーブル作成
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        lastName TEXT NOT NULL,
        firstName TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        serviceType TEXT,
        address TEXT,
        airconCount TEXT,
        preferredDate TEXT,
        message TEXT NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        status TEXT DEFAULT 'new'
    )`);
});

// メール設定
const transporter = nodemailer.createTransporter({
    service: 'gmail', // または他のメールサービス
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// お問い合わせ送信API
app.post('/api/contact', async (req, res) => {
    try {
        const {
            lastName,
            firstName,
            email,
            phone,
            serviceType,
            address,
            airconCount,
            preferredDate,
            message
        } = req.body;

        // バリデーション
        if (!lastName || !firstName || !email || !message) {
            return res.status(400).json({
                success: false,
                message: '必須項目が入力されていません'
            });
        }

        // データベースに保存
        const stmt = db.prepare(`
            INSERT INTO contacts 
            (lastName, firstName, email, phone, serviceType, address, airconCount, preferredDate, message)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);

        stmt.run([
            lastName,
            firstName,
            email,
            phone || null,
            serviceType || null,
            address || null,
            airconCount || null,
            preferredDate || null,
            message
        ], function(err) {
            if (err) {
                console.error('データベース保存エラー:', err);
                return res.status(500).json({
                    success: false,
                    message: 'データの保存に失敗しました'
                });
            }

            // 管理者にメール通知
            const adminMailOptions = {
                from: process.env.EMAIL_USER,
                to: 'admin@fa-tochi.com', // 管理者のメールアドレス
                subject: '新しいお問い合わせ - 株式会社FAとち',
                html: `
                    <h2>新しいお問い合わせが届きました</h2>
                    <p><strong>お名前:</strong> ${lastName} ${firstName}</p>
                    <p><strong>メールアドレス:</strong> ${email}</p>
                    <p><strong>電話番号:</strong> ${phone || '未入力'}</p>
                    <p><strong>希望サービス:</strong> ${serviceType || '未選択'}</p>
                    <p><strong>住所:</strong> ${address || '未入力'}</p>
                    <p><strong>エアコン台数:</strong> ${airconCount || '未選択'}</p>
                    <p><strong>希望日時:</strong> ${preferredDate || '未入力'}</p>
                    <p><strong>お問い合わせ内容:</strong></p>
                    <p>${message.replace(/\n/g, '<br>')}</p>
                    <hr>
                    <p>管理画面: <a href="http://localhost:${PORT}/admin">http://localhost:${PORT}/admin</a></p>
                `
            };

            // お客様に自動返信メール
            const customerMailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'お問い合わせありがとうございます - 株式会社FAとち',
                html: `
                    <h2>お問い合わせありがとうございます</h2>
                    <p>${lastName} ${firstName} 様</p>
                    <p>この度は株式会社FAとちにお問い合わせいただき、ありがとうございます。</p>
                    <p>以下の内容でお問い合わせを承りました。</p>
                    
                    <h3>お問い合わせ内容</h3>
                    <p><strong>希望サービス:</strong> ${serviceType || '未選択'}</p>
                    <p><strong>エアコン台数:</strong> ${airconCount || '未選択'}</p>
                    <p><strong>希望日時:</strong> ${preferredDate || '未入力'}</p>
                    <p><strong>お問い合わせ内容:</strong></p>
                    <p>${message.replace(/\n/g, '<br>')}</p>
                    
                    <p>担当者より2営業日以内にご連絡いたします。</p>
                    <p>お急ぎの場合は、お電話でもお気軽にお問い合わせください。</p>
                    
                    <hr>
                    <p>株式会社FAとち<br>
                    エアコンクリーニング専門<br>
                    ※住所等の詳細情報は後日追記予定</p>
                `
            };

            // メール送信
            Promise.all([
                transporter.sendMail(adminMailOptions),
                transporter.sendMail(customerMailOptions)
            ]).then(() => {
                res.json({
                    success: true,
                    message: 'お問い合わせを受け付けました',
                    id: this.lastID
                });
            }).catch(mailError => {
                console.error('メール送信エラー:', mailError);
                // データは保存されているので成功として返す
                res.json({
                    success: true,
                    message: 'お問い合わせを受け付けました',
                    id: this.lastID
                });
            });
        });

        stmt.finalize();

    } catch (error) {
        console.error('サーバーエラー:', error);
        res.status(500).json({
            success: false,
            message: 'サーバーエラーが発生しました'
        });
    }
});

// 管理画面API
app.get('/api/contacts', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    db.all(
        'SELECT * FROM contacts ORDER BY createdAt DESC LIMIT ? OFFSET ?',
        [limit, offset],
        (err, rows) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            db.get('SELECT COUNT(*) as total FROM contacts', (err, countRow) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }

                res.json({
                    contacts: rows,
                    total: countRow.total,
                    page,
                    totalPages: Math.ceil(countRow.total / limit)
                });
            });
        }
    );
});

// お問い合わせステータス更新
app.put('/api/contacts/:id/status', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    db.run(
        'UPDATE contacts SET status = ? WHERE id = ?',
        [status, id],
        function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ success: true, changes: this.changes });
        }
    );
});

// 簡単な管理画面
app.get('/admin', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>お問い合わせ管理 - 株式会社FAとち</title>
            <meta charset="utf-8">
            <style>
                body { font-family: 'Noto Sans JP', sans-serif; margin: 20px; }
                table { width: 100%; border-collapse: collapse; }
                th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                th { background-color: #f2f2f2; }
                .status-new { background-color: #fff3cd; }
                .status-processing { background-color: #d1ecf1; }
                .status-completed { background-color: #d4edda; }
            </style>
        </head>
        <body>
            <h1>お問い合わせ管理</h1>
            <div id="contacts"></div>
            <script>
                fetch('/api/contacts')
                    .then(response => response.json())
                    .then(data => {
                        const table = document.createElement('table');
                        table.innerHTML = \`
                            <tr>
                                <th>ID</th>
                                <th>日時</th>
                                <th>お名前</th>
                                <th>メール</th>
                                <th>電話</th>
                                <th>サービス</th>
                                <th>ステータス</th>
                                <th>内容</th>
                            </tr>
                            \${data.contacts.map(contact => \`
                                <tr class="status-\${contact.status}">
                                    <td>\${contact.id}</td>
                                    <td>\${new Date(contact.createdAt).toLocaleString('ja-JP')}</td>
                                    <td>\${contact.lastName} \${contact.firstName}</td>
                                    <td>\${contact.email}</td>
                                    <td>\${contact.phone || '-'}</td>
                                    <td>\${contact.serviceType || '-'}</td>
                                    <td>
                                        <select onchange="updateStatus(\${contact.id}, this.value)">
                                            <option value="new" \${contact.status === 'new' ? 'selected' : ''}>新規</option>
                                            <option value="processing" \${contact.status === 'processing' ? 'selected' : ''}>対応中</option>
                                            <option value="completed" \${contact.status === 'completed' ? 'selected' : ''}>完了</option>
                                        </select>
                                    </td>
                                    <td style="max-width: 200px; overflow: hidden;">\${contact.message}</td>
                                </tr>
                            \`).join('')}
                        \`;
                        document.getElementById('contacts').appendChild(table);
                    });

                function updateStatus(id, status) {
                    fetch(\`/api/contacts/\${id}/status\`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ status })
                    }).then(() => location.reload());
                }
            </script>
        </body>
        </html>
    `);
});

app.listen(PORT, () => {
    console.log(`サーバーが起動しました: http://localhost:${PORT}`);
    console.log(`管理画面: http://localhost:${PORT}/admin`);
});

module.exports = app; 