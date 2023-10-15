import * as dotenv from 'dotenv';
dotenv.config();
const FRONT_URL = process.env.FRONT_URL;

const textSignup = `様\n
『PARTNER_MTC』カスタマーサポートでございます。\n
この度は『PARTNER_MTC』にご登録いただきありがとうございます。\n
『PARTNER_MTC』でオーナー権の購入やお取引をいただくには、\n
本人認証が必要となります。\n
マイページにログインいただき、本人認証の手続きをお願い致します。\n
${FRONT_URL}/login\n
ご不明な点がございましたらお気軽にご連絡くださいませ。\n
`;

const textRegisterTemp = (url: string) => `この度は、『PARTNER_MTC』の会員登録にお申し込みいただき、ありがとうございます。\n
仮登録が完了しました。\n
\n
ご本人様確認のため下記URLにアクセスいただき、本登録を完了させてください。\n
↓↓\n
${url} \n
URLの有効期限は、このメールを受信してから24時間です。\n
有効期限切れとなった場合は仮登録メールを再送信してお手続きをお願いいたします。\n
再送信はサービスにログインのうえ、再度リクエストしてください。\n
${FRONT_URL}/login   \n
\n
※本メールは送信専用です。返信することはできません。\n
※本メールに心当たりのない場合や、ご意見ご質問等は下記へご連絡ください。\n
`

const textSupport = `様\n
『PARTNER_MTC』カスタマーサポートでございます。\n
お問い合わせを受け付けさせていただきました。\n
サポート担当より順次確認の上、土日祝を除く当日～1営業日以内にご回答を差し上げます。\n
ご回答まで今しばらくお待ちくださいませ。\n
`;

const textResetPassword = (url: string) => `『PARTNER_MTC』をご利用いただき、ありがとうございます。\n
\n
パスワード再設定のご案内です。\n
下記URLにアクセスいただき、パスワードを再設定してください。\n
↓↓ \n
${url} \n
URLの有効期限は、このメールを受信してから1時間です。\n
\n
※本メールは送信専用です。返信することはできません。\n
※本メールに心当たりのない場合や、ご意見ご質問等は下記へご連絡ください。`;

const textChangeEmail = (url: string) => `『PARTNER_MTC』をご利用いただき、ありがとうございます。\n
\n
メールアドレス変更のご案内です。\n
下記URLにアクセスいただき、メールアドレス変更してください。\n
↓↓ \n
${url} \n
URLの有効期限は、このメールを受信してから8時間です。\n
\n
※本メールは送信専用です。返信することはできません。\n
※本メールに心当たりのない場合や、ご意見ご質問等は下記へご連絡ください。`;

const htmlSafetyEmail = (data: any, name: string) => `<!DOCTYPE html>
<html>
<head>
    <style>
table, td, th {  
  border: 1px solid #ddd;
  text-align: center;
  table-layout: fixed ;
}
table {
  border-collapse: collapse;
  width: 100%;
}
th, td {
  padding: 3px;
}
</style>
</head>
<body>
<div> お疲れ様です。</div>
<div style="display:flex;">
    <div style="width:20%;"> アビタ店舗 </div>
    <div style="float:left">小口・金庫 金差異はないです。</div>
</div>
<div>担当: ${name}</div>
<div style="margin-top: 30px;">
    <table>
        <thead>
            <tr>
                <td style="width: 10%"></td><td>10,000</td><td>5,000</td><td>1,000</td><td>500</td><td>100</td><td>50</td><td>10</td><td>5</td><td>1</td><td>合計</td>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>金庫残金</td><td>${data[0]?.['10,000円']}</td><td>${data[0]?.['5,000円']}</td><td>${data[0]?.['1,000円']}</td><td>${data[0]?.['500円']}</td><td>${data[0]?.['100円']}</td><td>${data[0]?.['50円']}</td><td>${data[0]?.['10円']}</td><td>${data[0]?.['5円']}</td><td>${data[0]?.['1円']}</td><td>${data[0]?.['合計']}</td>
            </tr>
            <tr>
                <td>小口残金</td><td>${data[1]?.['10,000円']}</td><td>${data[1]?.['5,000円']}</td><td>${data[1]?.['1,000円']}</td><td>${data[1]?.['500円']}</td><td>${data[1]?.['100円']}</td><td>${data[1]?.['50円']}</td><td>${data[1]?.['10円']}</td><td>${data[1]?.['5円']}</td><td>${data[1]?.['1円']}</td><td>${data[1]?.['合計']}</td>
            </tr>
        </tbody>
    </table>
</div>

</body>
</html>`;

const htmlReportEmail = (data: any) => `<!DOCTYPE html>
<html>

<head>
    <style>
        table, td, th {
            border: 1px solid #ddd;
            text-align: center;
            table-layout: fixed;
        }
        table {
            border-collapse: collapse;
            width: 100%;
            margin-top: 30px;
        }
        th, td {
            padding: 3px;
        }
    </style>
</head>

<body>
    <div> お疲れ様です。</div>
    <div style="display:flex;">
        <div style="width:40%;"> 店舗1 </div>
        <div style="float:left">${data['newDate']}</div>
    </div>
    <div>着地報告になります。</div>
    <div>担当：${data['name']}</div>
    <div style="margin-top: 30px;">
        <table>
            <tbody>
                <tr>
                    <td>入電数</td>
                    <td>${data['visits']}</td>
                </tr>
                <tr>
                    <td>来店数</td>
                    <td>${data['visits']}</td>
                </tr>
                <tr>
                    <td>成約数</td>
                    <td>${data['deals']}</td>
                </tr>
                <tr>
                    <td>単日買取金額</td>
                    <td>${data['price']}</td>
                </tr>
                <tr>
                    <td>単日粗利予想</td>
                    <td>${data['forecast']}</td>
                </tr>
                <tr>
                    <td>顧客</td>
                    <td>${data['clients']}</td>
                </tr>
                <tr>
                    <td>紹介</td>
                    <td>${data['introductions']}</td>
                </tr>
                <tr>
                    <td>店舗前</td>
                    <td>${data['stores']}</td>
                </tr>
                <tr>
                    <td>HP</td>
                    <td>${data['hp']}</td>
                </tr>
                <tr>
                    <td>情報誌</td>
                    <td>${data['magazine']}</td>
                </tr>
                <tr>
                    <td>折込</td>
                    <td>${data['inserts']}</td>
                </tr>
                <tr>
                    <td>ポスティング</td>
                    <td>${data['postings']}</td>
                </tr>
                <tr>
                    <td>その他</td>
                    <td>${data['others']}</td>
                </tr>
            </tbody>
        </table>

        <table>
            <tbody>
                <tr>
                    <td>当月買取金額合計</td>
                    <td>${data['total']}</td>
                </tr>
                <tr>
                    <td>当月粗利予想金額</td>
                    <td>${data['estimate']}</td>
                </tr>
                <tr>
                    <td>単日実績</td>
                    <td>${data['single']}</td>
                </tr>
                <tr>
                    <td>粗利実績</td>
                    <td>${data['gross']}</td>
                </tr>
                <tr>
                    <td>単日経費</td>
                    <td>${data['singleExpense']}</td>
                </tr>
                <tr>
                    <td>月間合計経費</td>
                    <td>${data['monthly']}</td>
                </tr>
                <tr>
                    <td>通帳残金</td>
                    <td>${data['passbook']}</td>
                </tr>
                <tr>
                    <td>現金（金庫）残金</td>
                    <td>${data['cash']}</td>
                </tr>
                <tr>
                    <td>小口残金</td>
                    <td>${data['petty']}</td>
                </tr>
            </tbody>
        </table>

        <table style="margin-top: 30px;">
            <tbody>
                <tr>
                    <td>通帳入金</td>
                    <td>${data['passbookIn']}</td>
                </tr>
                <tr>
                    <td>通帳出し金</td>
                    <td>${data['passbookOut']}</td>
                </tr>
                <tr>
                    <td>現金（金庫）追加金</td>
                    <td>${data['cashIn']}</td>
                </tr>
                <tr>
                    <td>小口使用金</td>
                    <td>${data['prettyFee']}</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div style="margin-top: 30px">店舗1 &nbsp; &nbsp; ${data['forecast']}円/${parseInt(data['price']) + parseInt(data['forecast'])}円　${data['deals']}/${data['visits']}</div>
</body>

</html>`;

export {
    textSignup,
    textSupport,
    textRegisterTemp,
    textResetPassword,
    textChangeEmail,
    htmlSafetyEmail,
    htmlReportEmail
}