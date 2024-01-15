import { IQuestionDetail } from '../interfaces/question.interfaces';
import { LocalStorageKey } from './../constants/general.constant';
export const passwordValidation = (password: string) => {
    const regExDigit = /^(?=.*\d)/;
    const regExLowerCase = /^(?=.*[a-z])/;
    const regExUpperCase = /^(?=.*[A-Z])/;
    const regExSpecial = /^(?=.*[@$!%*#?&])/;
    const regExMin = /^[A-Za-z\d@$!%*#?&]{6,}/;

    return regExDigit.test(password) &&
        regExLowerCase.test(password) &&
        regExUpperCase.test(password) &&
        regExSpecial.test(password) &&
        regExMin.test(password)
        ? true
        : false;
};

export const checkToken = () => {
    return localStorage.getItem(LocalStorageKey.TOKEN) ? true : false;
};

export const getUserInfo = () => {
    const userInfo = localStorage.getItem(LocalStorageKey.USER);
    return userInfo && JSON.parse(userInfo);
};

export const processPagination = (data : any, currentPage: number, pageSize: number) => {
    const indexOfFirst = (currentPage * pageSize) % data.length;
    const indexOfLast = indexOfFirst + pageSize;
    return(data.slice(indexOfFirst, indexOfLast));
};