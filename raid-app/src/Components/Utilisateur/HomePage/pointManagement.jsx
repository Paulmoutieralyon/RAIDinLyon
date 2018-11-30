import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addPoint, removePoint } from '../../../Actions/Utilisateur/pointManagement_action.jsx';


class pointManagement extends React.Component {


  render() {
    return (

      <div>
        <h1>{this.props.points}</h1>
        <button onClick={this.props.addPoints}>Ajout</button >
        <button onClick={this.props.removePoints}>Enlevement</button>
      </div>
    )
  }
}




const mapStateToProps = state => ({
  points: state.pointManagement.points
})

const mapDispatchToProps = dispatch => {
  return {
    addPoints: bindActionCreators(addPoint, dispatch),
    removePoints: bindActionCreators(removePoint, dispatch)
  }

};

export default connect(mapStateToProps, mapDispatchToProps)(pointManagement);