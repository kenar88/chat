import React from 'react';
import { connect } from 'react-redux';
import { changeTheme } from '../../actions/index';

import './SettingsWindow.css';

class SettingsWindow extends React.Component {
  render() {
    const styles = (this.props.theme === 'dark') ? { backgroundColor: 'black' } : { backgroundColor: 'white' };

    return (
      <section style={styles} className="SettingsWindow">
        <h2 className="SettingsWindow__title">Settings</h2>
        <button onClick={this.props.changeTheme}>Change theme</button>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    theme: state.theme
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeTheme: () => dispatch(changeTheme())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsWindow);