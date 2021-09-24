import React, { useEffect } from "react";
import Link from "next/link";
import { useAuth } from "./context/authContext";
import { useRouter } from "next/router";
import Login from "../components/Login";
import styles from "../styles/home.module.css";

export default function Home() {
  const {
    authUser,
    loading,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
  } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && authUser) {
      console.log(authUser, loading);
      router.push("/loggedin");
    }
  }, [authUser, loading]);

  if (loading || authUser) {
    return "";
  }
  const signUp = ({ email, password }) => {
    return createUserWithEmailAndPassword(email, password)
      .then((response) => {
        console.log(response);
        router.push("/loggedin");
      })
      .catch((error) => {
        return { error };
      });
  };

  const signIn = ({ email, password }) => {
    return signInWithEmailAndPassword(email, password)
      .then((response) => {
        console.log(response);
        router.push("/loggedin");
      })
      .catch((error) => {
        return { error };
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: e.target.name.value,
      password: e.target.password.value,
    };
    return signUp(data).then((user) => {
      console.log(user);
    });
  };

  const onSubmitSign = (e) => {
    e.preventDefault();
    const data = {
      email: e.target.name.value,
      password: e.target.password.value,
    };
    return signIn(data).then((user) => {
      console.log(user);
    });
  };

  const formSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.name.value);
    console.log(e.target.password.value);
  };

  return (
    <div className={styles.body}>
      <Login></Login>
    </div>
  );
}
