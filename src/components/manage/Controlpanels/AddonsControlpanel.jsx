/**
 * Users controlpanel container.
 * @module components/manage/Controlpanels/AddonsControlpanel
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { Portal } from 'react-portal';
import { Accordion, Header, Icon, Segment } from 'semantic-ui-react';
import jwtDecode from 'jwt-decode';
import {
  FormattedMessage,
  defineMessages,
  injectIntl,
  intlShape,
} from 'react-intl';

import { getAddon, listAddons } from '../../../actions';
import { getBaseUrl } from '../../../helpers';
import { Toolbar } from '../../../components';

const messages = defineMessages({
  activateAndDeactivate: {
    id: 'Activate and deactivate',
    defaultMessage: 'Activate and deactivate add-ons in the lists below.',
  },
  addAddons: {
    id: 'Add Addons',
    defaultMessage: 'To make new add-ons show up here, add them to your buildout configuration, run buildout, and restart the server process. For detailed instructions see Installing a third party add-on.',
  },
  addonsSettings: {
    id: 'Add-ons Settings',
    defaultMessage: 'Add-ons Settings',
  },
  available: {
    id: 'Available',
    defaultMessage: 'Available',
  },
  back: {
    id: 'Back',
    defaultMessage: 'Back',
  },
  installed: {
    id: 'Installed',
    defaultMessage: 'Installed',
  },
  installedVersion: {
    id: 'Installed Version',
    defaultMessage: 'Installed Version',
  },
  update: {
    id: 'Update',
    defaultMessage: 'Update',
  },
  uninstall: {
    id: 'Uninstall',
    defaultMessage: 'Uninstall',
  },
});

@injectIntl
@connect(
  (state, props) => ({
    items: state.search.items,
    activeIndex: state.activeIndex,
    pathname: props.location.pathname,
  }),
  dispatch => bindActionCreators({ getAddon, listAddons }, dispatch),
)
/**
 * AddonsControlpanel class.
 * @class AddonsControlpanel
 * @extends Component
 */
export default class AddonsControlpanel extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    getAddon: PropTypes.func.isRequired,
    listAddons: PropTypes.func.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        '@id': PropTypes.string,
        'name': PropTypes.string,
        'version': PropTypes.string,
        'description': PropTypes.string,
      })).isRequired,
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs Sharing
   */
  constructor(props) {
    super(props);
    this.onAccordionClick = this.onAccordionClick.bind(this);
    this.state = {
      activeIndex: -1,
    };
  }

  /**
   * On accordion click handler
   * @method onAccordionClick
   * @param {object} event Event object.
   * @returns {undefined}
   */
  onAccordionClick(event, titleProps) {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }


  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    console.log('Rendering')
    return (
      <div id="page-addons">
        <Helmet title="Addons" />
        <Segment.Group raised>

            <Segment className="primary">
              <FormattedMessage
                id="Add-ons Settings"
                defaultMessage="Add-ons Settings"
              />
            </Segment>
            <Segment>
              <Header as="h3">
                <FormattedMessage
                  id="Activate and deactivate"
                  defaultMessage="Activate and deactivate add-ons in the lists below."
                />
              </Header>
              <FormattedMessage
                id="Add Addons"
                defaultMessage="To make new add-ons show up here, add them to your buildout configuration, run buildout, and restart the server process. For detailed instructions see Installing a third party add-on."
              />
            </Segment>


          <Segment key={`header-installed`} secondary>
            <FormattedMessage
              id="Installed"
              defaultMessage="Installed"
            />:
          </Segment>

          <Segment key={`body-installed`} attached>

            <Accordion>
              <Accordion.Title active={this.state.activeIndex === 0} index={0} onClick={this.onAccordionClick}>
                Products.CMFPlacefulWorkflow
                <Icon name='dropdown' floated='right' />
              </Accordion.Title>
              <Accordion.Content active={this.state.activeIndex === 0}>
              Add the capability to change workflow chains for types in every object. Includes a dependency on core Plone types. 
              <FormattedMessage
                id="Installed Version"
                defaultMessage="Installed Version"
              />
              3.4.9
              <FormattedMessage
                id="Update"
                defaultMessage="Update"
              />
              <FormattedMessage
                id="Uninstall"
                defaultMessage="Uninstall"
              />

              </Accordion.Content>
            </Accordion>

            <Accordion>
              <Accordion.Title active={this.state.activeIndex === 1} index={1} onClick={this.onAccordionClick}>
                Products.CMFPlacefulWorkflow
                <Icon name='dropdown' floated='right' />
              </Accordion.Title>
              <Accordion.Content active={this.state.activeIndex === 1}>
              Add the capability to change workflow chains for types in every object. Includes a dependency on core Plone types. 
              <FormattedMessage
                id="Installed Version"
                defaultMessage="Installed Version"
              />
              3.4.9
              <FormattedMessage
                id="Update"
                defaultMessage="Update"
              />
              <FormattedMessage
                id="Uninstall"
                defaultMessage="Uninstall"
              />

              </Accordion.Content>
            </Accordion>

          </Segment>

          <Segment key={`header-available`} secondary>
            <FormattedMessage
              id="Available"
              defaultMessage="Available"
            />:
          </Segment>
          <Segment key={`body-available`} attached>

          </Segment>

        </Segment.Group>

        <Portal node={__CLIENT__ && document.getElementById('toolbar')}>
          <Toolbar
            pathname={this.props.pathname}
            inner={
              <Link to={`${getBaseUrl(this.props.pathname)}`} className="item">
                <Icon
                  name="arrow left"
                  size="big"
                  color="blue"
                  title={this.props.intl.formatMessage(messages.back)}
                />
              </Link>
            }
          />
        </Portal>
      </div>
    );
  }
}
