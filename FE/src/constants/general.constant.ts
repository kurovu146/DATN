export const STATUS_CODE = {
    DONE: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FOR_BIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    ERR_NETWORK: "ERR_NETWORK"
};

export const MESSAGE = {
    INVALID_PASSWORD: "Your password is invalid",
    INVALID_REGISTER:  "Your username or email is used!",
    INVALID_LOGIN:  "Your username or password is incorrect!",
    ERR_NETWORK: "Network error, please try again later!",
    ADD_SUCESS: "Add successfullly!",
    DELETE_SUCCESS: "Delete successfully",
    ERROR_LOGIN: "You haven't logged in!"
};

export const LocalStorageKey = {
    TOKEN: "token",
    USER: "user",
    USER_STATUS: "userStatus",
    USER_NAME: "userName"
};

export const DEFAULT_PAGE_SIZE = 5;

export const DEFAULT_CURRENT_PAGE = 0;

export const VOTE_PAGE = {
  UP_VOTE: "UP_VOTE",
  DOWN_VOTE: "DOWN_VOTE",
};


