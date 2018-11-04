export default function patchRouter (Router, User) {
  const resolveEnd = (to, from, next) => {
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

  Router.beforeEach((to, from, next) => {
    if (!User.isAuth()) {
      if (User.token()) {
        return User.loginByToken(User.token())
          .then(() => {
            next();
          })
          .catch(() => {
            resolveEnd(to, from, next);
          });
      }
    }

    resolveEnd(to, from, next);
  });
};
