import * as React from 'react'
import Link from 'gatsby-link'
import { graphql } from 'gatsby'
import {
  Grid,
  Card,
  Container,
  Segment,
  Comment,
  Button,
} from 'semantic-ui-react'
import { MarkdownRemarkConnection, ImageSharp } from '../graphql-types'
import BlogTitle from '../components/BlogTitle'
import TagsCard from '../components/TagsCard/TagsCard'
import BlogPagination from '../components/BlogPagination/BlogPagination'
import { get } from 'lodash'
import { withLayout } from '../components/Layout'

interface BlogProps {
  data: {
    tags: MarkdownRemarkConnection
    posts: MarkdownRemarkConnection
  }
  pathContext: {
    tag?: string // only set into `templates/tags-pages.tsx`
  }
  location: {
    pathname: string
  }
}

const BlogPage = (props: BlogProps) => {
  const tags = props.data.tags.group
  const posts = props.data.posts.edges
  const { pathname } = props.location
  const pageCount = Math.ceil(props.data.posts.totalCount / 10)

  // TODO export posts in a proper component
  const Posts = (
    <Container>
      {posts.map(({ node }) => {
        const {
          frontmatter,
          timeToRead,
          fields: { slug },
          excerpt,
        } = node
        const avatar = frontmatter.author.avatar.children[0] as ImageSharp
        const cover = get(frontmatter, 'image.children.0.fixed', {})

        const extra = (
          <Comment.Group>
            <Comment>
              <Comment.Avatar
                src={avatar.fixed.src}
                srcSet={avatar.fixed.srcSet}
              />
              <Comment.Content>
                <Comment.Author style={{ fontWeight: 400 }}>
                  {frontmatter.author.id}
                </Comment.Author>
                <Comment.Metadata style={{ margin: 0 }}>
                  更新于 {frontmatter.updatedDate} - 差不多要花 {timeToRead}{' '}
                  分钟阅读
                </Comment.Metadata>
              </Comment.Content>
            </Comment>
          </Comment.Group>
        )

        const description = (
          <Card.Description>
            {excerpt}
            <br />
            <Link className="read-more" to={slug}>
              阅读更多
            </Link>
          </Card.Description>
        )

        return (
          <Card
            key={slug}
            className="blog-post"
            fluid
            image={cover}
            header={frontmatter.title}
            extra={extra}
            description={description}
          />
        )
      })}
    </Container>
  )

  return (
    <Container>
      {/* Title */}
      <BlogTitle />

      {/* Content */}
      <Segment vertical>
        <Grid padded style={{ justifyContent: 'space-around' }}>
          <div style={{ maxWidth: 600 }}>
            {Posts}
            <Segment vertical textAlign="center">
              <BlogPagination
                Link={Link}
                pathname={pathname}
                pageCount={pageCount}
              />
            </Segment>
          </div>
          <div>
            <TagsCard Link={Link} tags={tags} tag={props.pathContext.tag} />
          </div>
        </Grid>
      </Segment>
    </Container>
  )
}

export default withLayout(BlogPage)

export const pageQuery = graphql`
  query PageBlog {
    # Get tags
    tags: allMarkdownRemark(filter: { frontmatter: { draft: { ne: true } } }) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }

    # Get posts
    posts: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___updatedDate] }
      filter: {
        frontmatter: { draft: { ne: true } }
        fileAbsolutePath: { regex: "/blog/" }
      }
      limit: 10
    ) {
      totalCount
      edges {
        node {
          excerpt
          timeToRead
          fields {
            slug
          }
          frontmatter {
            title
            updatedDate(formatString: "DD MMMM, YYYY")
            image {
              children {
                ... on ImageSharp {
                  fixed(width: 700, height: 100) {
                    src
                    srcSet
                  }
                }
              }
            }
            author {
              id
              avatar {
                children {
                  ... on ImageSharp {
                    fixed(width: 35, height: 35) {
                      src
                      srcSet
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
