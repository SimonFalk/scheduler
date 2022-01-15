import { EmailAuthProvider } from "firebase/auth";

const uiConfig = {
  signInFlow: "popup",
  signInSuccessUrl: "/",
  tosUrl: "/",
  privacyPolicyUrl: "/",
  signInOptions: [
    {
      provider: EmailAuthProvider.PROVIDER_ID,
      disableSignUp: {
        status: true,
        adminEmail: "klucidor@gmail.com",
        helpLink: undefined,
      },
    },
  ],
};

export { uiConfig };
