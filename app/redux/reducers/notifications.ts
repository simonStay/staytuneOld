import { OPEN_NOTIFICATION, NOTIFICATION_DETAIL_PLACE, NOTIFICATION_LIST, NOTIFICATIONS_BY_PREFERENCEID, LOADER_NOTIFICATION } from "../actions/notifications"
import { NOTIFICATION_SIGN_OUT } from "./../actions/user"

export default function notifications(state = {}, action) {
    switch (action.type) {
        case OPEN_NOTIFICATION:
            return {
                ...state,
                isNotificationOpen: action.payload
            }
        case NOTIFICATION_DETAIL_PLACE:
            return {
                ...state,
                loader: false,
                getPlaceInfo: action.payload
            }
        case NOTIFICATION_LIST:
            return {
                ...state,
                loader: false,
                userNotificationList: action.payload
            }
        case NOTIFICATIONS_BY_PREFERENCEID:
            return {
                ...state,
                loader: false,
                notificationsByPreferenceId: action.payload
            }
        case LOADER_NOTIFICATION:
            return {
                ...state,
                loader: action.payload,
            }
        case NOTIFICATION_SIGN_OUT:
            return {
                loader: false,
                notifications: {},
            }
    }
    return state
}