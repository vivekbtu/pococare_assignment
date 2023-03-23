import { HStack, Text } from '@chakra-ui/react'
import React from 'react'
import { NavLink } from 'react-router-dom'
const Navbar = () => {
  return (

    <HStack spacing='70px' backgroundColor={"teal"} justifyContent="center" py="5">
      <Text color={"black"} fontSize="20px">
        <NavLink to="/">Sign Up</NavLink>
      </Text>

      <Text color={"black"} fontSize="20px">
        <NavLink to="/login">Log In</NavLink>
      </Text>
      <Text color={"black"} fontSize="20px">
        <NavLink to="/dashboard">Todo List</NavLink>
      </Text>
      {/* <Text color={"black"} fontSize="20px">
        <NavLink to="/refresh">Refresh Token</NavLink>
      </Text> */}


    </HStack>
  )
}

export default Navbar