import router from '../router';

function goToUrl(url) {
  if (url === location.pathname + location.search) {
    router.push({
      path: '/'
    });
  }
  router.push(url);
}

export default goToUrl;
