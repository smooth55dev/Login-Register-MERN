import emoji from "react-easy-emoji";

const user_name = {
    title1 : "ミル",
    title2 : "コマ",
    content : "私たちとつながって、さらに詳しく調べてください。",
    next : "行こう",
    noMember : "会員ではありませんか？",
    register : "今すぐ登録",
    username_placeholder : "ユーザー名",
}

const password_page = {
    loginSuccess : "ログイン成功しました…!",
    passError : "パスワードが一致しません!",
    content : "私たちとつながって、さらに詳しく調べてください。",
    password_placeholder : "パスワード",
    signin : "サインイン",
    forgotPassword : "パスワードをお忘れですか?",
    recoveryNow : "今すぐ回復する",
    isLoading : "読み込み中です"
}

const reset_page = {
    resetSuccess : "リセット成功…！",
    error : "リセットできませんでした!",
    isLoading : "読み込み中です",
    reset : "リセット",
    enterNewPassword : "新しいパスワードを入",
    newPassword : "新しいパスワード",
    confirmPassword : "パスワードを繰り返す",
    signin : "サインイン",
}

const recovery_page = {
    otpMsgSuccess : "OTP があなたのメールに送信されました。",
    otpMsgError : "OTP の生成中に問題が発生しました。",
    otpConfirmSuccess : "検証成功！",
    optConfirmError : "OTP が間違っています! もう一度メールをチェックしてください！",
    otpCouldnotSend : "送信できませんでした!",
    otpInputLabel : "OTP を入力してパスワードを回復します。",
    recoveryLabel : "回復",
    otpEnterComment : "電子メール アドレスに送信された 4 桁の OTP を入力します。",
    otpResendComment : "OTP が取得できない場合",
    otpResendLabel : "再送信します",
    sendingLabel : "送信中..."
}

export {
    user_name,
    password_page,
    reset_page,
    recovery_page
};

