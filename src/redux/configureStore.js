import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';
import rootReducer from './rootReducer';
import logger from 'redux-logger'

const sagaMiddleware = createSagaMiddleware();

const configureStore = (preloadState) => {
    const store = createStore(
        rootReducer,
        preloadState,
        applyMiddleware(logger, sagaMiddleware)
    );
    sagaMiddleware.run(rootSaga);
    return store;
}

export default store = configureStore();