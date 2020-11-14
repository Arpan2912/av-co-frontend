import {
    UPDATE_HEADER_MENUS,
    UPDATE_COMAPANY_DETAIL
} from "../constants/action-type";

export const updateHeaderMenus = (payload) => dispatch => {
    console.log("fetch posts");
    dispatch({
        type: UPDATE_HEADER_MENUS,
        payload: payload,

    });
    return Promise.resolve();
}

export const updateCompanyDetail = (payload) => dispatch => {
    dispatch({
        type: UPDATE_COMAPANY_DETAIL,
        payload: payload,

    });
    return Promise.resolve();
}