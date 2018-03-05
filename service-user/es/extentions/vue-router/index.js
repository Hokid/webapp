export default function patchRouter(Router, User) {
  var resolveEnd = function resolveEnd(to, from, next) {
    if (to.meta.requireAuth === true && !User.isAuth()) {
      next('/login', {
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // продожаем, если уже авторизован
      next();
    }
  };

  Router.beforeEach(function (to, from, next) {
    if (!User.isAuth()) {
      if (User.token()) {
        return User.loginByToken(User.token()).then(function () {
          next();
        }).catch(function () {
          resolveEnd(to, from, next);
        });
      }
    }

    resolveEnd(to, from, next);
  });
}
;