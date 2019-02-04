import React from 'react'
import styled, { keyframes } from 'styled-components'
import theme from '../../config/theme'

const pulse = keyframes`
  0% {
    @include transform(scale(0.9));
  }

  70% {
    @include transform(scale(1));
    box-shadow: 0 0 0 20px rgba( 0,0,0, 0);
  }
    100% {
    @include transform(scale(.9));
    box-shadow: 0 0 0 0 rgba( 0,0,0, 0);
  }
`
const Container = styled.div`
  display: flex;
  border: 2px solid ${theme.colors.accent};
  border-radius: 7px;
  cursor: pointer;
  background: ${theme.colors.accent};
  :hover {
    -webkit-animation: none;
  }
`
const Text = styled.a`
  line-height: 1rem;
  margin-left: 0.5em;
  font-weight: bold;
  margin: auto 10px;
  color: ${theme.colors.color} !important;
`
const Pulse = styled.div`
  align-items: center;
  display: table;
  width: 1rem;
  height: 1rem;
  text-align: center;
  line-height: 4rem;
  color: white;
  margin: auto 10px;
  border: none;
  border-radius: 50%;
  background: ${theme.colors.color};
  box-shadow: 0 0 0 0 ${theme.colors.color};
  -webkit-animation: ${pulse} 1.5s infinite;
  z-index: 100;
`
const RandomBtn = () => (
  <Container>
    <Text>شانسی</Text>
    <Pulse />
  </Container>
)
export default RandomBtn
