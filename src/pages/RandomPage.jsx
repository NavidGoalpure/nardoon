import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import shuffle from 'shuffle-array'
import styled from 'styled-components'
import t from 'typy'
import { Header, Layout } from '../components'
import config from '../../config/site'

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.theme.gridColumns}, 1fr);
  grid-gap: 50px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  .gatsby-image-outer-wrapper,
  .gatsby-image-wrapper {
    position: static !important;
  }
`

const Content = styled.div`
  margin: -6rem auto 0 auto;
  max-width: ${props => props.theme.maxWidths.general};
  padding: 0 ${props => props.theme.contentPadding} 6rem;
  position: relative;
`

const BG = styled.div`
  background-color: ${props => props.theme.colors.bg};
`
let finalImages

let randomImages

export default class RandomQuery extends React.Component {
  constructor(props) {
    super(props)
    this.state = { imgsArray: null }
    randomImages = shuffle(t(this.props, 'data.images.edges').safeObject)
    finalImages = randomImages.splice(3)
    console.log('-----------constructor------------')
  }

  // const img = imgs[Math.floor(Math.random() * imgs.length)]
  render() {
    console.log('state.imgs=', this.state.imgsArray)
    console.log('randomImages=', randomImages)
    console.log('finalImages=', finalImages)

    // console.log('imgsArray=', imgsArray)
    console.log('props=', this.props)
    return (
      <Layout>
        <Header
          avatar={config.avatar}
          name={config.name}
          siteDescription={config.siteDescription}
          socialMedia={config.socialMedia}
        />
        <BG>
          <Content>
            <Grid>
              <Img
                key={imgsArray.node.childImageSharp.fluid.src}
                fluid={imgsArray.node.childImageSharp.fluid}
                style={{ margin: '3rem 0' }}
              />
              {/* {imgs.map(image => (
              <Img
                key={image.node.childImageSharp.fluid.src}
                fluid={image.node.childImageSharp.fluid}
                style={{ margin: '3rem 0' }}
              />
            ))} */}
            </Grid>
          </Content>
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
