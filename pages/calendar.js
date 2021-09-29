import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "./context/authContext";
import firebase from "./config/firebase";
import InputField from "../components/Input";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

export default function calendar() {
  const router = useRouter();
  const { authUser, loading, signOut } = useAuth();
  const [userData, setUserData] = useState({ data: {}, error: {}, boxes: [] });
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState({});
  const item = { title: "Test", content: "Test1, Test3" };
  // Listen for changes on loading and authUser, redirect if needed
  useEffect(() => {
    if (!loading && !authUser) {
      console.log("Loggedin Page");
      console.log(authUser, loading);
      router.push("/home");
    } else if (!loading && authUser) {
      //   getData();
      console.log("User Auth");
    }
  }, [authUser, loading]);

  //   const getData = async () => {
  //     const doc = await firebase
  //       .firestore()
  //       .collection("users")
  //       .doc(`${authUser.uid}`)
  //       .get();
  //     const box = await firebase
  //       .firestore()
  //       .collection("boxes")
  //       .doc(`${authUser.uid}`)
  //       .get();
  //     const data = { id: doc.id, ...doc.data() };
  //     setUserData({ ...userData, data, boxes: box.data().boxes });
  //   };

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  if (loading || !authUser) {
    return "";
  }

  const myEventsList = [];

  return (
    <div>
      <div>
        <Calendar
          localizer={localizer}
          events={myEventsList}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
        />
      </div>
    </div>
  );
}
