(function (window) {
   window.__env = window.__env || {};

   // API url
   window.__env.url = {
      api: 'http://localhost:8089'
   };

   //auth2 keycloak
   window.__env.keycloak = {
      url: "http://localhost:8098",
      realm: "pnip-local",
      clientId: "pnip-web"
   };

}(this));
