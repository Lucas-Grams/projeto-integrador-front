(function (window) {
   window.__env = window.__env || {};

   // API url
   window.__env.url = {
      api: '${URL_API}',
      home: '${URL_HOME}'
   };

   //auth2 keycloak
   window.__env.keycloak = {
      url: "${KEYCLOAK_URL}",
      realm: "${KEYCLOAK_REALM}",
      clientId: "${KEYCLOAK_CLIENT}"
   };

}(this));
