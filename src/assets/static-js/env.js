(function (window) {
   window.__env = window.__env || {};

   // API url
   window.__env.url = {
      api: 'http://dev.your-api.com'
   };

   //auth2 keycloak
   window.__env.keycloak = {
      url: "http://localhost:8099",
      realm: "pdsa-dev",
      clientId: "pdsa-web"
   };

}(this));
