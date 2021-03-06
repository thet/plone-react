import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

import Register from './Register';

const mockStore = configureStore();

describe('Register', () => {
  it('renders a register component', () => {
    const store = mockStore({
      users: {
        create: {
          loading: false,
          loaded: false,
          error: null,
        },
      },
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <Register />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
