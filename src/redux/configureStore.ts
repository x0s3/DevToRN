import { applyMiddleware, createStore, Store } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { composeWithDevTools } from 'remote-redux-devtools';
import { Services } from 'ServiceTypes';
import { RootAction, RootState } from 'typesafe-actions';
import rootEpic from './epics';
import { rootReducer } from './reducers';
import services from './services';

const composeEnhancers = composeWithDevTools({
  name: 'devtorn',
  realtime: true,
  port: 8000
});

export function configureStore(): Store {
  const epicMiddleware = createEpicMiddleware<
    RootAction,
    RootAction,
    RootState,
    Services
  >({
    dependencies: services
  });

  const middlewares = [epicMiddleware];

  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(...middlewares))
  );

  epicMiddleware.run(rootEpic);

  return store;
}
