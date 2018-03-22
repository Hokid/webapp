import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";

var VuexStoreClient =
/*#__PURE__*/
function () {
  function VuexStoreClient(VuexStore) {
    _classCallCheck(this, VuexStoreClient);

    this.VuexStore = VuexStore;
  }

  _createClass(VuexStoreClient, [{
    key: "commit",
    value: function commit(path, payload) {
      this.VuexStore.commit(path, payload);
    }
  }, {
    key: "dispatch",
    value: function dispatch(action, payload) {
      this.VuexStore.dispatch(action, payload);
    }
  }, {
    key: "state",
    value: function state() {
      return this.VuexStore.state.user;
    }
  }, {
    key: "isAuth",
    value: function isAuth() {
      return this.VuexStore.getters['user/isAuth'];
    }
  }]);

  return VuexStoreClient;
}();

export { VuexStoreClient as default };