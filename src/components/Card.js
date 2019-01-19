import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Spring, animated, config } from 'react-spring'
import { rgba } from 'polished'
import Img from 'gatsby-image'
import { Link } from 'gatsby'

const CardItem = styled(Link)`
  min-height: 500px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  color: ${props => props.theme.colors.color};
  transition: all 0.3s ease-in-out;

  &:hover {
    color: white;
    transform: translateY(-6px);
  }

  @media (max-width: ${props => props.theme.breakpoints.s}) {
    min-height: 300px;
  }
`

const Cover = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  div {
    overflow: hidden;
  }
`

const Content = styled.div`
  padding: 1rem;
  position: relative;
  transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  opacity: 0;
  background: ${props => rgba(props.theme.colors.link, 0.65)};
  height: 0;

  ${CardItem}:hover & {
    opacity: 1;
    height: 120px;
  }
`

const Bottom = styled.div`
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  font-size: 0.85rem;
  div:first-child {
    margin-right: 1rem;
  }
`

const Name = styled.h4`
  margin-bottom: 0;
  margin-top: 0;
`

const Card = ({ path, cover, date, areas, title, delay }) => (
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
            <Img fluid={cover} />
          </Cover>
          <Content>
            <Name>{title}</Name>
            <Bottom>
              <div>
                {areas.map((area, index) => (
                  <React.Fragment key={area}>
                    {index > 0 && ', '}
                    <a>{area}</a>
                  </React.Fragment>
                ))}
              </div>
            </Bottom>
          </Content>
        </CardItem>
      </animated.div>
    )}
  </Spring>
)

export default Card

Card.propTypes = {
  path: PropTypes.string.isRequired,
  cover: PropTypes.object.isRequired,
  date: PropTypes.string.isRequired,
  areas: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  delay: PropTypes.number.isRequired,
}