/* eslint-disable react/no-unused-state */
import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import shuffle from 'shuffle-array'
import styled, { keyframes } from 'styled-components'
import t from 'typy'
import theme from '../../config/theme'
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
`
const InitialAnimation = keyframes`
  from {  filter: grayscale(0%);}
  to {  filter:grayscale(100%);}
`

const SelectedImageAnimation = keyframes`
  from {  filter: grayscale(100%);}
  to {  filter:grayscale(0%);}
`

const NoneSelectedImageAnimation = keyframes`
  from {  filter: grayscale(100%) blur(0px);}
  to {  filter:grayscale(100%) blur(5px);}
`

const Image = styled(Img)`
  animation-name: ${InitialAnimation};
  margin: 3rem 0;
  animation-duration: 2s;
  filter: grayscale(100%);
`
const NoneNoneSelectedImage = styled(Img)`
  animation-name: ${NoneSelectedImageAnimation};
  margin: 3rem 0;
  animation-duration: 1s;
  filter: grayscale(100%) blur(10px);
`
const ImageWithColorAnimation = styled(Img)`
  animation-name: ${SelectedImageAnimation};
  animation-duration: 1s;
  filter: grayscale(0%);
  margin: 3rem 0;
`
const ReloadBtn = styled.button`
  display: flex;
  border: 2px solid ${theme.colors.accent};
  border-radius: 7px;
  cursor: pointer;
  background: ${theme.colors.accent};
  :hover {
    -webkit-animation: none;
  }
`

let restImage = null

export default class RandomQuery extends React.Component {
  constructor(props) {
    super(props)

    restImage = [...shuffle(t(this.props, 'data.images.edges').safeObject)]

    this.state = {
      selected: new Array(config.numberOfCards).fill('none'),
      restImage: restImage.splice(config.numberOfCards),
      visibleImages: restImage,
      cardSelectedStatus: false,
    }
    restImage = [...this.state.restImage]
    // this.ActionLink = this.ActionLink.bind(this)
  }

  spliceItems = () => {
    this.setState({ restImage: restImage.splice(config.numberOfCards) })
  }

  cardSelect = index => {
    let { selected } = this.state
    selected = new Array(config.numberOfCards).fill('rejected')
    selected.splice(index, 1, 'selected')
    this.setState(
      {
        selected,
        cardSelectedStatus: true,
      },
      () => {
        restImage = [...this.state.restImage]
      }
    )
  }

  render() {
    const { visibleImages, selected, cardSelectedStatus } = this.state
    return (
      <Layout>
        <Header
          avatar={config.avatar}
          name={config.name}
          siteDescription={config.siteDescription}
          socialMedia={config.socialMedia}
        />
        <ReloadBtn
          onClick={() => {
            this.setState({
              cardSelectedStatus: false,
              selected: new Array(config.numberOfCards).fill('none'),
              restImage: restImage.splice(config.numberOfCards),
              visibleImages: restImage,
            })
          }}
        >
          {' '}
          کارت های بعدی
        </ReloadBtn>
        <BG>
          <OuterWrapper>
            <InnerWrapper>
              {visibleImages.map((image, index) => (
                // eslint-disable-next-line jsx-a11y/interactive-supports-focus
                <div
                  role="button"
                  onKeyDown={() => this.cardSelect(index)}
                  onClick={() => {
                    if (!cardSelectedStatus) this.cardSelect(index)
                  }}
                  key={image.node.childImageSharp.fluid.src}
                >
                  {/* this is a Case Statement */}
                  {
                    {
                      selected: <ImageWithColorAnimation fluid={image.node.childImageSharp.fluid} />,
                      rejected: <NoneNoneSelectedImage fluid={image.node.childImageSharp.fluid} />,
                      none: <Image fluid={image.node.childImageSharp.fluid} />,
                    }[selected[index]]
                  }
                </div>
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
