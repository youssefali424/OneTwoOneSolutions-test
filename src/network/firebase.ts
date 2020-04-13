import auth, {firebase, FirebaseAuthTypes} from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';

firebase.initializeApp({
  appId: '1:232334549531:android:09e91fdcf1924eddbbcebe',
  apiKey: 'AIzaSyDIK1hL-0DEZ0oxLoHacC-WvbF5RFTgKxg',
  projectId: 'onetwoonesolutions-19364',
  databaseURL: 'https://onetwoonesolutions-19364.firebaseio.com/',
  storageBucket: 'onetwoonesolutions-19364.appspot.com',
  messagingSenderId: '',
  clientId: '',
});
export const createAccount = (
  email: string,
  name: string,
  password: string,
  onSuccess: () => void,
  imagePath?: string,
  onFail?: (message: string) => void,
) => {
  auth()
    .createUserWithEmailAndPassword(email, password)
    .then(async () => {
      console.log(imagePath);
      if (imagePath) {
        try {
          const ref = storage().ref(`/images/${email}`);
          await ref.putFile(imagePath);
          const imgUrl = await ref.getDownloadURL();
          console.log(imgUrl);
          await auth().currentUser?.updateProfile({
            displayName: name,
            photoURL: imgUrl,
          });
          onSuccess();
        } catch {
          auth().currentUser?.delete();
          onFail ? onFail('Server Error') : null;
        }
      } else {
        await auth().currentUser?.updateProfile({displayName: name});
        onSuccess();
      }
    })
    .catch((error) => {
      if (error.code === 'auth/email-already-in-use') {
        onFail ? onFail('That email address is already in use!') : null;
      } else if (error.code === 'auth/invalid-email') {
        onFail ? onFail('That email address is invalid!') : null;
      } else {
        onFail ? onFail('Server Error') : null;
      }
    });
};
export const singOut = (onSignOut?: () => void, onFail?: () => void) => {
  auth()
    .signOut()
    .then(onSignOut)
    .catch(onFail || console.error);
};
export const singIn = (
  email: string,
  password: string,
  onSignIn: (value: FirebaseAuthTypes.User) => void,
  onFail?: (error: any) => void,
) => {
  console.log('singIn ' + email);
  auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => onSignIn(auth().currentUser!))
    .catch(onFail || console.error);
};
export const isLoggedIn = (): boolean => {
  return auth().currentUser ? true : false;
};
export const getCurrentUser = () => {
  return auth().currentUser;
};
