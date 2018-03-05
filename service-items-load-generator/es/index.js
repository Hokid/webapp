import "regenerator-runtime/runtime";
import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import "core-js/modules/es6.object.assign";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
var defaults = {
  fetchCount: 5,
  limitCached: 5
};

var ItemsLoadGenerator =
/*#__PURE__*/
function () {
  function ItemsLoadGenerator(Api, options) {
    _classCallCheck(this, ItemsLoadGenerator);

    this.options = Object.assign(defaults, options);
    this.Api = new Api();
  }

  _createClass(ItemsLoadGenerator, [{
    key: "next",
    value: function () {
      var _next = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var end, items;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                end = false, items = [];

                if (!(this.cached().length < this.options.limitCached)) {
                  _context.next = 9;
                  break;
                }

                _context.next = 4;
                return this.Api.fetchItems(this.options.fetchCount);

              case 4:
                items = _context.sent;

                if (Array.isArray(items)) {
                  _context.next = 7;
                  break;
                }

                throw new TypeError('result must by an array');

              case 7:
                end = items.length < this.options.fetchCount;

                if (items.length > 0) {
                  this.Api.cacheItems(items);
                }

              case 9:
                return _context.abrupt("return", {
                  items: items,
                  end: end
                });

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function next() {
        return _next.apply(this, arguments);
      };
    }()
  }, {
    key: "cached",
    value: function cached() {
      return this.Api.getCachedItems();
    }
  }, {
    key: "has",
    value: function has() {
      return this.getCachedItems().length !== 0;
    }
  }]);

  return ItemsLoadGenerator;
}();

export { ItemsLoadGenerator as default };