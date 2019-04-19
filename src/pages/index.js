import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import moment from 'moment-jalaali'
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
function isShow(project) {
  if (
    project.node.frontmatter.limitToDate === 'All' ||
    project.node.frontmatter.limitToDate === moment().format('jM/jD') ||
    project.node.frontmatter.limitToDate ===
      moment()
        .local('fa')
        .format('dddd')
  )
    return true
  return false
}
const Index = ({ data: { categories, multiChance } }) => (
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
          <ChanceCard delay={0} cover={multiChance.edges[0].node.fluid} name="شانسی" path="/RandomPage/" />
          {categories.edges.map((project, index) => {
            // ارسال متغیر تاریخ به کوئری گستبی در صفحه ایندکس پیچیدگی داره.
            //  به همین دلیل اینجا تست میکنیم که اگه محدودیت تاریخی برای نشون دادن یک دسته بندی وجود داره،
            //  اون رو اعمال کنه
            if (isShow(project))
              return (
                <Card
                  delay={index}
                  title={project.node.frontmatter.title}
                  cover={project.node.frontmatter.cover.childImageSharp.fluid}
                  path={project.node.fields.slug}
                  key={project.node.fields.slug}
                />
              )
            return false
          })}
        </Grid>
      </Content>
    </BG>
  </Layout>
)

export default Index

Index.propTypes = {
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      edges: PropTypes.array.isRequired,
    }),
  }).isRequired,
}

export const pageQuery = graphql`
  query HomeQuery {
    categories: allMdx(sort: { fields: [frontmatter___title], order: DESC }) {
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
            limitToDate
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
