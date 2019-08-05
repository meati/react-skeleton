import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '@store/actions';
import LayoutPage from '@components/layouts/layout-page';
import LayoutContent from '@components/layouts/layout-content';
import HeaderContainer from '@containers/header-container';
import EditableList from '@components/elements/editable-list';
import { lists } from '@utils';

class Home extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
  };

  updateItem(item) {
    this.props.dispatch(actions.list.update(item));
    return Promise.resolve(item);
  }

  componentDidMount() {
    this.props.dispatch(actions.list.get());
  }

  render() {
    const { tree } = this.props;
    return (
      <LayoutPage header={<HeaderContainer />}>
        <LayoutContent>
          <h1>Редактируемый список</h1>
          { tree && <EditableList onUpdateItem={this.updateItem.bind(this)} items={tree}></EditableList> }
        </LayoutContent>
      </LayoutPage>
    );
  }
}
export default connect(state=> ({ tree: state.list.tree }))(Home);
