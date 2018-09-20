import BrowserRouter from 'react-router-dom/BrowserRouter';
import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-intl-redux';
import configureStore from './store';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { Api, persistAuthToken } from './helpers';
import { ReduxAsyncConnect } from 'redux-connect';
import nlLocaleData from 'react-intl/locale-data/nl';
import deLocaleData from 'react-intl/locale-data/de';
import enLocaleData from 'react-intl/locale-data/en';
import { addLocaleData } from 'react-intl';

import routes from '~/routes';

import 'semantic-ui-less/semantic.less';

const history = createBrowserHistory();
const api = new Api();

const store = configureStore(window.__data, history, api);
addLocaleData([...nlLocaleData, ...deLocaleData, ...enLocaleData]);
persistAuthToken(store);

hydrate(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <BrowserRouter>
        <ReduxAsyncConnect routes={routes} helpers={api} />
      </BrowserRouter>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('main'),
);

if (module.hot) {
  module.hot.accept();
}
