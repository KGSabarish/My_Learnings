import { createStore } from "vuex";

export default createStore({
    state() {
        return {
            userId: "",
            requestId: "",
            convertedFileName: "",
            type: "",
        }
    },
    mutations: {
        setUserId: function (state, userId) {
            state.userId = userId
        },
        setRequestId: function (state, requestId) {
            state.requestId = requestId
        },
        setConvertedFileName: function (state, convertedFileName) {
            state.convertedFileName = convertedFileName
        },
        setType: function (state, type) {
            state.type = type
        },
    },
    getters: {
        getUserId: function (state) {
            return state.userId
        },
        getRequestId: function (state) {
            return state.requestId
        },
        getConvertedFileName: function (state) {
            return state.convertedFileName
        },
        getType: function (state) {
            return state.type
        },
    }
})