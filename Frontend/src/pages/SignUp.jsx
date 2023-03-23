import { Box, Button, FormControl, FormLabel, Heading, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../Components/Navbar'
// const init = {
//   email: "",
//   password: "",
// }
const SignUp = () => {
  const usenavigate = useNavigate()

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async () => {
    const payload = {
      email,
      password,
    }

    try {
      let res = await axios.post("https://poco-care-assignment.onrender.com/user/signup", payload)
      console.log(res)
      if (res.data === "User already exist") {
        alert(res.data);
        return;
      }
      alert(res.data);
      usenavigate("/login");
    }
    catch (err) {
      alert("Wrong Data");
      console.log(err);
    }

  }


  return (
    <div>
      <Navbar />
      <Heading mb="5">Sign Up Page</Heading>


      <Box margin="auto" w="40%"
        mb="10"
        borderRadius="20"
        padding="10px"
        boxShadow="rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset"
      >
        <FormControl maxW="80%" margin="auto">
          <FormLabel fontWeight={'bold'} mt="10" >Email</FormLabel>
          <Input type="email" variant="flushed" placeholder="Enter Email" pl="3" value={email} onChange={(e) => setEmail(e.target.value)} />

        </FormControl>

        <FormControl maxW="80%" margin="auto">
          <FormLabel fontWeight={'bold'} mt="10">Password</FormLabel>
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              name="password"
              type={show ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              variant="flushed"
              pl="3"
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>


        <Button size='md' px={8} colorScheme="red" variant={'solid'} marginTop="10" mb="10"
          // onClick={createuser} disabled={loading}
          onClick={handleSubmit}
        >
          Sign Up
        </Button>
      </Box>
    </div>
  )
}

export default SignUp