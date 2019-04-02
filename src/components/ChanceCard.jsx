import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Spring, animated, config } from 'react-spring'
import Img from 'gatsby-image'
import { Link } from 'gatsby'

const CardItem = styled(Link)`
  display: block;
  margin-bottom: -2rem;
  min-height: 500px;
  position: relative;
  overflow: hidden;
  color: ${props => props.theme.colors.color};
  transition: all 0.3s ease-in-out;

  @media (max-width: ${props => props.theme.breakpoints.s}) {
    min-height: 300px;
  }
  &:hover {
    transform: translateY(16px);
  }
`

const Cover = styled.div`
  width: 95%;
  height: 100%;
`

const Content = styled.div`
  padding: 1rem;
  position: relative;
  background: ${props => props.theme.colors.link};
  height: 5rem;
`
const Rectangle = styled.div`
  width: 5%;
  height: 2rem;
  width: 0;
  height: 0;
  border-top: 1.5rem solid transparent;
  border-left: 40px solid #075ea2;
  border-right-color: #075ea2;
`

const Name = styled.h4`
  margin-bottom: 0;
  margin-top: 0;
  padding-right: 0.5rem;
  @media (min-width: ${props => props.theme.breakpoints.m}) {
    padding-right: 1rem;
  }
`

const ChanceCard = ({ path, cover, delay, name }) => (
  <Spring
    native
    delay={200 * delay}
    from={{ opacity: 0, transform: 'translate3d(0, 30px, 0)' }}
    to={{ opacity: 1, transform: 'translate3d(0, 0, 0)' }}
    config={config.slow}
  >
    {props => (
      <animated.div style={props}>
        <CardItem to={path}>
          <Cover>
            <Img fluid={cover} imgStyle={{ width: '95%' }} />
          </Cover>
        </CardItem>
        <Rectangle />
        <Content>
          <Name>{name}</Name>
        </Content>
      </animated.div>
    )}
  </Spring>
)

export default ChanceCard

ChanceCard.propTypes = {
  path: PropTypes.string.isRequired,
  cover: PropTypes.object.isRequired,
  delay: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
}
