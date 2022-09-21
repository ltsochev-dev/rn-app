import React, {createContext, useState, type PropsWithChildren} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

type UserType = FirebaseAuthTypes.User | null;

interface IAuthContext {
  user: UserType;
  loading: boolean;
  setUser: (u: UserType) => void;
  login: (email: string, password: string) => Promise<void>;
  googleLogin: () => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<IAuthContext>({
  user: null,
  loading: false,
  setUser: (_user: UserType) => {},
  login: async (_email: string, _password: string) => {},
  signup: async (_email: string, _password: string) => {},
  googleLogin: async () => {},
  logout: async () => {},
});

export const AuthProvider: React.FC<PropsWithChildren> = ({children}) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        setUser,
        login: async (email: string, password: string) => {
          setLoading(true);
          try {
            await auth().signInWithEmailAndPassword(email, password);
          } catch (e) {
            console.error(e);
          }
          setLoading(false);
        },
        googleLogin: async () => {
          setLoading(true);
          try {
            await GoogleSignin.signOut();
            await GoogleSignin.hasPlayServices();
            const {idToken} = await GoogleSignin.signIn();
            const googleCredential =
              auth.GoogleAuthProvider.credential(idToken);
            await auth().signInWithCredential(googleCredential);
          } catch (e) {
            console.error(e);
          }
          setLoading(false);
        },
        signup: async (email: string, password: string) => {
          try {
            await auth().createUserWithEmailAndPassword(email, password);
          } catch (e) {
            console.error(e);
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            console.error(e);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
