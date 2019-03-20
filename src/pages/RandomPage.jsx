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
const toGray = keyframes`
  from {  filter: grayscale(0%);}
  to {  filter:grayscale(100%);}
`
const GrayCard = {
  // animationName: toGray,
  // filter: 'grayscale(100%)',
  opacity: '0.5',
}

const toColorize = keyframes`
  from {  filter: grayscale(100%);}
  to {  filter:grayscale(0%);}
`
const colorizedCard = {
  // animationName: toColorize,
  // filter: 'grayscale(0%)',
  opacity: '1',
}

const toBlur = keyframes`
  from {  filter: blur(0px);}
  to {  filter:blur(5px);}
`
const blurizedCard = {
  // animationName: toBlur,
  // filter: 'toBlur(5px)',
  opacity: '0',
}
const Image = styled(Img)`
  margin: 3rem 0;
  animation-duration: 2s;
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
// filter: 'grayscale(100%)',
// animationName: toGray,
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
    const cssClasses = new Array(config.numberOfCards).fill('none')

    for (let i = 0; i < config.numberOfCards; i += 1) {
      if (selected[i] === 'selected') {
        cssClasses[i] = colorizedCard
      } else if (selected[i] === 'rejected') {
        cssClasses[i] = blurizedCard
      } else {
        cssClasses[i] = GrayCard
      }
    }
    console.log('cssClasses=', cssClasses)
    // let colorizedCardStyle= classNames({colorizedCard:true})

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
                  <Image fluid={image.node.childImageSharp.fluid} style={cssClasses[index]} />
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
