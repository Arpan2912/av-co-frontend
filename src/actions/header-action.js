import {
    UPDATE_HEADER_MENUS
} from "../constants/action-type";

export const updateHeaderMenus = (payload) => dispatch => {
    console.log("fetch posts");
    dispatch({
        type: UPDATE_HEADER_MENUS,
        payload: payload,

    });
    return Promise.resolve();
}