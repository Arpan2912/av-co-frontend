import { UPDATE_HEADER_MENUS } from '../constants/action-type';

const initialState = {
    header: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case UPDATE_HEADER_MENUS:
            return {
                ...state,
                header: action.payload,
            };

        default:
            return state;
    }
}