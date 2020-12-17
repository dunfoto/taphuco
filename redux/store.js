import { createWrapper } from 'next-redux-wrapper';
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';

const bindMiddleware = (middleware) => {
    if (process.env.NODE_ENV !== "production") {
        const { composeWithDevTools } = require("redux-devtools-extension");
        return composeWithDevTools(applyMiddleware(...middleware));
    }
    if (process.env.NODE_ENV === "development") {
        middleware.push(logger)
    }
    return applyMiddleware(...middleware);
};

const makeStore = ({ isServer }) => {
    if (isServer) {
        return createStore(rootReducer, bindMiddleware([thunkMiddleware]));
    } else {
        const { persistStore, persistReducer, autoRehydrate } = require("redux-persist");
        const storage = require("redux-persist/lib/storage").default;

        const persistConfig = {
            key: "taphuco",
            whitelist: ["auth"],
            storage
        };

        const persistedReducer = persistReducer(persistConfig, rootReducer);

        const store = createStore(
            persistedReducer,
            {},
            bindMiddleware([thunkMiddleware, logger])
        );

        store.__persistor = persistStore(store);

        return store;
    }
};

export const wrapper = createWrapper(makeStore);