import React from 'react'
import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components'
import theme from '../../config/theme'

const Container = styled.div``
const Btn = styled.div`
  transition: all 300ms;
  box-shadow: 0px 2px 1px rgba(0, 0, 0, 0.1);
  border-radius: 100%;
  background: ${theme.colors.accent2};
  cursor: pointer;
  height: 5rem;
  width: 5rem;
`
const Svg = styled.svg`
  transition: transform 500ms cubic-bezier(0.85, -0.48, 0.26, 0.67);
  height: 100%;
  width: 100%;
  ${Container}:hover & {
    transform: rotate(30deg);
    transform: rotate(-150deg);
  }
`
const Path = styled.path`
  fill: #111;
`

const ReloadBtn = props => {
  const { onClick, style } = props
  return (
    <Container style={style}>
      <Btn onClick={onClick}>
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          x="0px"
          y="0px"
          width="40px"
          height="40px"
          viewBox="0 0 40 40"
          enableBackground="new 0 0 40 40"
          xmlSpace="preserve"
        >
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.011 20c0-0.002 0-0.003 0-0.005 0-4.421 3.578-8.005 7.991-8.005 2.683 0 5.051 1.329 6.5 3.361l1.26-1.644c-1.834-2.254-4.627-3.696-7.76-3.696 -5.519 0-9.994 4.471-10.001 9.989H8.013l3.018 4.013L13.987 20H12.011zM32 20l-2.969-3.985L26 20h1.992c-0.003 4.419-3.579 8.001-7.99 8.001 -2.716 0-5.111-1.36-6.555-3.435l-1.284 1.644c1.832 2.314 4.66 3.803 7.84 3.803 5.524 0 10.001-4.478 10.001-10.001 0-0.004-0.001-0.008-0.001-0.012H32z"
          />
        </Svg>
      </Btn>
    </Container>
  )
}
export default ReloadBtn
ReloadBtn.propTypes = {
  onClick: PropTypes.func.isRequired,
  style: PropTypes.object,
}
