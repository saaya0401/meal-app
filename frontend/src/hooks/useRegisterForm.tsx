import { useCallback, useState } from "react";

export type FieldErrors = {
    name?: string;
    email?: string;
    password?: string;
    passwordConfirm?: string;
    general?: string;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^[\x21-\x7E]+$/;

export const useRegisterForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

    const validateForm = useCallback((): boolean => {
            const errs: FieldErrors = {};
            if (!name.trim()) errs.name = "ユーザー名を入力してください";
            if (!email.trim()) {
                errs.email = "メールアドレスを入力してください";
            } else if (!emailRegex.test(email)) {
                errs.email = "メールアドレスの形式が正しくありません";
            }
            if (!password) {
                errs.password = "パスワードを入力してください";
            } else if (password.length < 8) {
                errs.password = "パスワードは8文字以上で入力してください";
            } else if (!passwordRegex.test(password)) {
                errs.password = "パスワードは半角英数字と記号のみ使用できます";
            }
            if (!passwordConfirm) {
                errs.passwordConfirm = "確認用パスワードを入力してください";
            } else if (password !== passwordConfirm) {
                errs.passwordConfirm = "パスワードが一致しません";
            }

            setFieldErrors(errs);
            return Object.keys(errs).length === 0;
        }, [name, email, password, passwordConfirm]);
    return {name, email, password, passwordConfirm, setName, setEmail, setPassword, setPasswordConfirm, validateForm, setFieldErrors, fieldErrors}
}