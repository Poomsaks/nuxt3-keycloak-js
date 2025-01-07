import Keycloak from 'keycloak-js';
import { omit } from 'remeda';

const KEYCLOAK_PARAMS = ['state', 'session_state', 'code'];

function getRelativeRoute(route: string) {
  return `${window.location.origin}/${route}`;
}

const plugin = defineNuxtPlugin({
  name: 'keycloakjs',
  enforce: 'pre',
  hooks: {
    'app:mounted'() {
      const router = useRouter();
      const query = omit(router.currentRoute.value.query, KEYCLOAK_PARAMS);
      router.replace({ query });
    },
  },
  async setup(nuxtApp) {
    const config = useRuntimeConfig();
    try {
      console.log('กำลังเริ่มต้น Keycloak...');
      console.log('Keycloak URL:', config.public.keycloakUrl);
      console.log('Keycloak Realm:', config.public.keycloakRealm);
      console.log('Keycloak Client ID:', config.public.keycloakClientId);

      const keycloak = new Keycloak({
        url: config.public.keycloakUrl,
        realm: config.public.keycloakRealm,
        clientId: config.public.keycloakClientId,
      });

      console.log('การตั้งค่า Keycloak:', {
        url: config.public.keycloakUrl,
        realm: config.public.keycloakRealm,
        clientId: config.public.keycloakClientId,
      });

      keycloak.init({
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: getRelativeRoute('silent-check-sso.html'),
      })
      .then((authenticated) => {
        if (authenticated) {
          console.log('Authenticated');
        } else {
          console.error('Keycloak authentication failed');
        }
      })
      .catch((err) => {
        console.error('Error initializing Keycloak:', err);
        throw createError({ statusCode: 500, message: `Keycloak initialization error: ${err.message}` });
      });
      

      if (keycloak.authenticated) {
        console.log('Authenticated');
        // คุณสามารถเก็บข้อมูล user หรือทำการ redirect ได้ที่นี่
      } else {
        console.error('Keycloak authentication failed');
      }

      return {
        provide: {
          keycloak,
        },
      };
    } catch (e) {
      console.error('ข้อผิดพลาดในการเริ่มต้น Keycloak:', e);
      throw createError({ statusCode: 401, message: 'Keycloak error' });
    }
  },
});

export default plugin;
