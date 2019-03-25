import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import shuffle from 'shuffle-array'
import styled, { keyframes } from 'styled-components'
import { animated } from 'react-spring'
import t from 'typy'
import arrow from '../images/right-chevron.svg'
import { Layout, ReloadBtn } from '../components'
import config from '../../config/site'

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`

const Back = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  img[data-info='back'] {
    width: 1.5rem;
    height: 1.5rem;
    margin: 0 1rem 0 0;
  }
`

const Avatar = styled.div`
  height: 3rem;
  width: 3rem;
  image-rendering: -moz-crisp-edges;
  image-rendering: -o-crisp-edges;
  image-rendering: -webkit-optimize-contrast;
  -ms-interpolation-mode: nearest-neighbor;

  img {
    border-radius: 50%;
    height: auto;
    width: 100%;
  }
`

const Desc = styled(animated.h5)`
  text-align: center;
  margin: 7rem 2rem 7rem 2rem;
`

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
  margin-top: auto;
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

let allImage = null

export default class RandomQuery extends React.Component {
  constructor(props) {
    super(props)

    allImage = [...shuffle(t(this.props, 'data.images.edges').safeObject)]
    const someImage = allImage.splice(config.numberOfCards)
    this.state = {
      selected: new Array(config.numberOfCards).fill('none'),
      restImage: someImage,
      visibleImages: allImage,
      cardSelectedStatus: false,
    }
    allImage = [...this.state.restImage]

    // this.ActionLink = this.ActionLink.bind(this)
  }

  cardSelect = index => {
    let { selected } = this.state
    selected = new Array(config.numberOfCards).fill('rejected')
    selected.splice(index, 1, 'selected')
    this.setState({
      selected,
      cardSelectedStatus: true,
    })
  }

  render() {
    const { visibleImages, selected, cardSelectedStatus } = this.state
    return (
      <Layout>
        <TopRow>
          <Back to="/">
            <img src={arrow} data-info="back" alt="Back to home" aria-label="Back to home" />
            <Avatar>
              <img src={config.avatar} alt="لوگو" />
            </Avatar>
          </Back>
        </TopRow>
        {allImage.length > config.numberOfCards - 1 ? (
          <React.Fragment>
            <ReloadBtn
              style={{ margin: ' 5rem 1rem 5rem 1rem' }}
              onClick={() => {
                const someImage = allImage.splice(config.numberOfCards)
                this.setState(
                  {
                    cardSelectedStatus: false,
                    selected: new Array(config.numberOfCards).fill('none'),
                    restImage: someImage,
                    visibleImages: allImage,
                  },
                  () => {
                    allImage = [...this.state.restImage]
                  }
                )
              }}
            />
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
            <Desc>برای انتخاب «هر کارت» ‌روی آن کلیک کنید.</Desc>
          </React.Fragment>
        ) : (
          <Desc> شما همه کارت ها را بازی کرده اید...</Desc>
        )}
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
