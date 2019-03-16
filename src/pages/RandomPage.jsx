import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import shuffle from 'shuffle-array'
import styled from 'styled-components'
import t from 'typy'
import { Header, Layout } from '../components'
import config from '../../config/site'

const BG = styled.div`
  background-color: ${props => props.theme.colors.bg};
  position: relative;
  padding: 2rem 0 0 0;
  z-index: -1;
`

const OuterWrapper = styled.div`
  padding: 0 ${props => props.theme.contentPadding};
  margin: -10rem auto 0 auto;
  z-index: -1;
`

const InnerWrapper = styled.div`
  position: relative;
  max-width: ${props => `${props.theme.maxWidths.project}px`};
  margin: 0 auto;
  z-index: -1;
`

export default class RandomQuery extends React.Component {
  constructor(props) {
    super(props)
    const randomImages = [...shuffle(t(this.props, 'data.images.edges').safeObject)]
    this.state = { allImage: randomImages.splice(config.numberOfCards), finalImages: randomImages }
  }

  render() {
    const { finalImages } = this.state
    console.log('finalImages=', finalImages)

    return (
      <Layout>
        <Header
          avatar={config.avatar}
          name={config.name}
          siteDescription={config.siteDescription}
          socialMedia={config.socialMedia}
        />
        <BG>
          <OuterWrapper>
            <InnerWrapper>
              {finalImages.map(image => (
                <Img
                  key={image.node.childImageSharp.fluid.src}
                  fluid={image.node.childImageSharp.fluid}
                  style={{ margin: '3rem 0' }}
                />
              ))}
            </InnerWrapper>
          </OuterWrapper>
        </BG>
      </Layout>
    )
  }
}

RandomQuery.propTypes = {
  data: PropTypes.shape({
    allFile: PropTypes.shape({
      edges: PropTypes.array.isRequired,
    }),
  }).isRequired,
}

export const pageQuery = graphql`
  {
    images: allFile(filter: { extension: { regex: "/(jpg)|(png)|(tif)|(tiff)|(webp)|(jpeg)/" } }) {
      edges {
        node {
          childImageSharp {
            fluid(maxWidth: 1600, quality: 90) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
`
