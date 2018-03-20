import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _inherits from "@babel/runtime/helpers/inherits";
// @flow
import Emmiter from 'events';

var GlobalEvents =
/*#__PURE__*/
function (_Emmiter) {
  _inherits(GlobalEvents, _Emmiter);

  function GlobalEvents() {
    _classCallCheck(this, GlobalEvents);

    return _possibleConstructorReturn(this, (GlobalEvents.__proto__ || Object.getPrototypeOf(GlobalEvents)).apply(this, arguments));
  }

  return GlobalEvents;
}(Emmiter);

;
var events = new GlobalEvents();
export default events;