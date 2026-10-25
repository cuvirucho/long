// Configuración de Firebase. Los valores se leen de .env.local (ver .env.example).
// Mientras falten, las funciones de comunidad (publicar, votar) quedan desactivadas
// y la interfaz muestra un aviso en lugar de fallar.

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

export const isFirebaseConfigured = Boolean(
  config.apiKey && config.projectId && config.appId,
);

let firebasePromise = null;
let userPromise = null;

// Carga Firebase bajo demanda (import dinámico) para no pesar en la carga inicial.
export function getFirebase() {
  if (!isFirebaseConfigured)
    return Promise.reject(new Error("Firebase no está configurado"));
  firebasePromise ??= Promise.all([
    import("firebase/app"),
    import("firebase/firestore"),
    import("firebase/auth"),
  ])
    .then(([appModule, fs, authModule]) => {
      const app = appModule.initializeApp(config);
      return {
        fs,
        db: fs.getFirestore(app),
        auth: authModule.getAuth(app),
        authModule,
      };
    })
    .catch((error) => {
      firebasePromise = null;
      throw error;
    });
  return firebasePromise;
}

// Sesión anónima (invisible para el usuario): identifica el dispositivo para
// permitir un solo voto por wrap.
export async function ensureUser() {
  const { auth, authModule } = await getFirebase();
  if (auth.currentUser) return auth.currentUser;
  userPromise ??= new Promise((resolve) => {
    const unsubscribe = authModule.onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    });
  })
    .then(
      (user) =>
        user ??
        authModule
          .signInAnonymously(auth)
          .then((credential) => credential.user),
    )
    .catch((error) => {
      userPromise = null;
      throw error;
    });
  return userPromise;
}
