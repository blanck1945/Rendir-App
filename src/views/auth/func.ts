import * as firebase from "firebase/app";
import "firebase/auth";

export interface NewUser {
  name: string;
  email: string;
  password: string;
  confirmPass: string;
}

export const matchPass = (pass1: string, pass2: string) => {
  return pass1 === pass2 ? true : false;
};

export const returnErMsg = () => {
  return {
    error: true,
    msg: "Los campos no pueden estar vacios",
  };
};

export const checkValues = (values: NewUser) => {
  if (values.name && values.email && values.password && values.confirmPass) {
    return {
      error: false,
    };
  }
  returnErMsg();
};

export const controlCheck = (values: NewUser, filter: string) => {
  if (filter === "register") {
    return checkValues(values);
  }

  if (values.email && values.password) {
    return {
      errors: false,
    };
  }

  returnErMsg();
};

export const onSubmit = async (user: NewUser, mode: string) => {
  const { name, email, password } = user;
  try {
    if (mode === "register") {
      return await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
    }
    return await firebase.auth().signInWithEmailAndPassword(email, password);
  } catch (err) {
    return err.message;
  }
};
