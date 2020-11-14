import { UPDATE_HEADER_MENUS, UPDATE_COMAPANY_DETAIL } from '../constants/action-type';

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

        case UPDATE_COMAPANY_DETAIL:
            return {
                ...state,
                companyDetail: action.payload,
            };

        default:
            return state;
    }
}
