import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import { Card, Header, Layout, ChanceCard } from '../components'
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

const Index = ({ data: { filterOnYearkDay, filterOnWeekDay, multiChance } }) => {
  const filterdCatagories = [...filterOnWeekDay.edges, ...filterOnYearkDay.edges]
  console.log('filterOnYearkDay=', filterOnYearkDay)
  console.log('filterOnWeekDay=', filterOnWeekDay)
  console.log('filterdCatagories=', filterdCatagories)
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
            <ChanceCard delay={0} cover={multiChance.edges[0].node.fluid} path="/RandomPage/" />
            {filterdCatagories.map((project, index) => (
              <Card
                delay={index}
                title={project.node.frontmatter.title}
                cover={project.node.frontmatter.cover.childImageSharp.fluid}
                path={project.node.fields.slug}
                areas={project.node.frontmatter.areas}
                key={project.node.fields.slug}
              />
            ))}
          </Grid>
        </Content>
      </BG>
    </Layout>
  )
}

export default Index

Index.propTypes = {
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      edges: PropTypes.array.isRequired,
    }),
  }).isRequired,
}
// به نظر میاد گتبزبی راهی برای تعریف عملگر «یا» نداره. به همین دلیل مجبور شدم دوبار کوئری بزنم
// یکبار برای پست هایی که با روزهای هفته فیلتر میشن و یکبار برای پست هایی که با تاریخ سالانه فیلتر می‌شن
// درنهایت این دو خروجی رو در یک آرایه جمع می‌کنم
export const pageQuery = graphql`
  query HomeQuery {
    filterOnYearkDay: allMdx(
      filter: { frontmatter: { limitDate: { eq: "Sunday" } } }
      sort: { fields: [frontmatter___title], order: DESC }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            cover {
              childImageSharp {
                fluid(maxWidth: 760, quality: 90) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
            title
            areas
          }
        }
      }
    }
    filterOnWeekDay: allMdx(
      filter: { frontmatter: { limitDate: { eq: "Saturday" } } }
      sort: { fields: [frontmatter___title], order: DESC }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            cover {
              childImageSharp {
                fluid(maxWidth: 760, quality: 90) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
            title
            areas
          }
        }
      }
    }
    multiChance: allImageSharp(filter: { fluid: { originalName: { eq: "multiChance.png" } } }) {
      edges {
        node {
          fluid(maxWidth: 760, quality: 90) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  }
`
