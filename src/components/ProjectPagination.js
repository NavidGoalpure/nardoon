import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import arrowLeft from '../images/left-chevron.svg'
import arrowRight from '../images/right-chevron.svg'

const Wrapper = styled.div`
  display: flex;
  max-width: ${props => props.theme.maxWidths.general};
  margin: 0 auto;
  padding: 3rem 0;
  a {
    color: ${props => props.theme.colors.color};
    display: flex;
    align-items: center;
    font-size: 1.25rem;
    &:hover {
      color: ${props => props.theme.colors.linkHover};
    }
  }
  justify-items: center;
`

const Prev = styled.div`
  img {
    width: 40px;
    height: 40px;
    margin: 0 1rem 0 0;
  }
`

const Next = styled.div`
  img {
    width: 40px;
    height: 40px;
    margin: 0 0 0 1rem;
  }
  margin-left: auto;
`

const ProjectPagination = ({ next, prev }) => (
  <Wrapper>
    {next && (
      <Next>
        <Link to={next.fields.slug}>
          <img src={arrowRight} alt="Arrow Right" />
          <h3>{next.frontmatter.title}</h3>
        </Link>
      </Next>
    )}
    {prev && (
      <Prev>
        <Link to={prev.fields.slug}>
          <h3> {prev.frontmatter.title}</h3>
          <img src={arrowLeft} alt="Arrow Left" />
        </Link>
      </Prev>
    )}
  </Wrapper>
)

export default ProjectPagination

ProjectPagination.propTypes = {
  next: PropTypes.object,
  prev: PropTypes.object,
}

ProjectPagination.defaultProps = {
  next: null,
  prev: null,
}
