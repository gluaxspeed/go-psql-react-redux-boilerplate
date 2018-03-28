import { bindActionCreators } from 'redux';

//match actions to dispatch to props
export function matdtp(actions) {
  return (dispatch) => {
    return Object.keys(actions).map((key) => {
      actions[key] = bindActionCreators(actions[key], dispatch);
    });
  }
}