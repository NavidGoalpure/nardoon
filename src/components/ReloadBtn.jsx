import React from 'react'
import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components'
import theme from '../../config/theme'

const Container = styled.div`
  position: relative;
  cursor: pointer;
  background-color: #000;
  height: 5rem;
  z-index: 0;
  box-shadow: 0px 0px 17px 1px rgba(0, 0, 0, 0.34);
  line-height: 5em;
`
const Up = styled.div`
  content: '';
  background: ${theme.colors.accent};
  height: 50%;
  width: 0;
  position: absolute;
  transition: 0.3s cubic-bezier(0.785, 0.135, 0.15, 0.86);
  top: 0;
  left: 0;
  right: auto;

  ${Container}:hover & {
    width: 100%;
    right: 0;
    left: auto;
  }
`
const Down = styled.div`
  content: '';
  background: ${theme.colors.accent};
  height: 50%;
  width: 0;
  position: absolute;
  transition: 0.3s cubic-bezier(0.785, 0.135, 0.15, 0.86);
  bottom: 0;
  right: 0;
  left: auto;
  ${Container}:hover & {
    width: 100%;
    left: 0;
    right: auto;
  }
`

const Span = styled.span`
  color: #fff;
  display: block;
  z-index: 1;
  position: absolute;
  text-align: center;
  width: 100%;
  ${Container}:hover & {
    color: #000;
  }
`

const ReloadBtn = props => {
  const { style, classname, onClick } = props
  return (
    <Container onClick={onClick} style={style} classname={classname}>
      <Up />
      <Span> تعویض کارت‌ها</Span>
      <Down />
    </Container>
  )
}
export default ReloadBtn
ReloadBtn.propTypes = {
  style: PropTypes.object,
  classname: PropTypes.object,
  onClick: PropTypes.func,
}
