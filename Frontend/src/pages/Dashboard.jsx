import { Box, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import "../App.css";
import Navbar from "../Components/Navbar";


const UserProfile = () => {

  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [tag, setTag] = useState("");


  useEffect(() => {
    fetch("https://poco-care-assignment.onrender.com/todos", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
        // console.log(res[0].status);
        setStatus(res[2].status);
        setName(res[1].taskname);
        setTag(res[2].tag)
      });
  });


  return (
    <>
    <Navbar/>
      <Text fontSize="30px" fontWeight="800" marginBottom="50px">Todo List</Text>
      <Box>
      <Box>
          <Text fontSize="20px" fontWeight="600">Task Name - {name}</Text>
        </Box>
        <Box>
          <Text fontSize="20px" fontWeight="600">Status - {status}</Text>
        </Box>
        <Box>
          <Text fontSize="20px" fontWeight="600">Tag - {tag}</Text>
        </Box>
      </Box>
    </>
  );
};

export default UserProfile;

