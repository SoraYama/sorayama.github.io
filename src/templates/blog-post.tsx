import * as React from 'react'
import { graphql } from 'gatsby'
import Link from 'gatsby-link'
import { get } from 'lodash'
import {
  Header,
  Container,
  Segment,
  Label,
  Grid,
  Card,
  Image,
  Item,
  Comment,
} from 'semantic-ui-react'
import {
  MarkdownRemark,
  ImageSharp,
  MarkdownRemarkConnection,
  Site,
} from '../graphql-types'
import BlogTitle from '../components/BlogTitle'
import { DiscussionEmbed, DisqusConfig } from 'disqus-react'
import { withLayout } from '../components/Layout'

interface BlogPostProps {
  data: {
    post: MarkdownRemark
    recents: MarkdownRemarkConnection
    site: Site
  }
}

const BlogPostPage = (props: BlogPostProps) => {
  const { frontmatter, html, timeToRead } = props.data.post
  const avatar = frontmatter.author.avatar.children[0] as ImageSharp

  const tags = props.data.post.frontmatter.tags.map(tag => (
    <Label key={tag}>
      <Link to={`/blog/tags/${tag}/`}>{tag}</Link>
    </Label>
  ))

  const recents = props.data.recents
    ? props.data.recents.edges.map(({ node }) => {
        const recentAvatar = node.frontmatter.author.avatar
          .children[0] as ImageSharp
        const recentCover = get(node, 'frontmatter.image.children.0.fixed', {})
        const extra = (
          <Comment.Group>
            <Comment>
              <Comment.Avatar
                src={recentAvatar.fixed.src}
                srcSet={recentAvatar.fixed.srcSet}
              />
              <Comment.Content>
                <Comment.Author style={{ fontWeight: 400 }}>
                  最近更新于 {node.frontmatter.updatedDate}
                </Comment.Author>
                <Comment.Metadata style={{ margin: 0 }}>
                  差不多需要 {node.timeToRead} 分钟阅读
                </Comment.Metadata>
              </Comment.Content>
            </Comment>
          </Comment.Group>
        )

        return (
          <div key={node.fields.slug} style={{ paddingBottom: '1em' }}>
            <Card
              // as={Link}
              to={node.fields.slug}
              image={recentCover}
              header={node.frontmatter.title}
              extra={extra}
            />
          </div>
        )
      })
    : ''

  const cover = get(frontmatter, 'image.children.0.fixed', {})
  const disqusConfig: DisqusConfig = {
    url: `https://sorayama.me/blog/${props.data.post.frontmatter.title}`,
    identifier: props.data.post.id,
    title: props.data.post.frontmatter.title,
  }
  return (
    <Container>
      <BlogTitle />
      <Segment vertical style={{ border: 'none' }}>
        <Item.Group>
          <Item>
            <Item.Image
              size="tiny"
              shape="circular"
              src={avatar.fixed.src}
              srcSet={avatar.fixed.srcSet}
            />
            <Item.Content>
              <Item.Description>{frontmatter.author.id}</Item.Description>
              <Item.Meta>{frontmatter.author.bio}</Item.Meta>
              <Item.Extra>
                更新于 {frontmatter.updatedDate} - 差不多要花 {timeToRead}{' '}
                分钟阅读
              </Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>
        <Header as="h1">{frontmatter.title}</Header>
      </Segment>
      <Image {...cover} fluid />
      <Segment
        vertical
        className="blog-post-md"
        style={{ border: 'none' }}
        dangerouslySetInnerHTML={{
          __html: html,
        }}
      />
      <Segment vertical>标签们：{tags}</Segment>
      {props.data.site &&
        props.data.site.siteMetadata &&
        props.data.site.siteMetadata.disqus && (
          <Segment vertical className="disqus-embed">
            <DiscussionEmbed
              config={disqusConfig}
              shortname={props.data.site.siteMetadata.disqus}
            />
          </Segment>
        )}
      <Segment vertical className="recent">
        <Header>最近更新了：</Header>
        <Grid padded centered>
          {recents}
        </Grid>
      </Segment>
    </Container>
  )
}

export default withLayout(BlogPostPage)

export const pageQuery = graphql`
  query TemplateBlogPost($slug: String!) {
    site: site {
      siteMetadata {
        disqus
      }
    }
    post: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      timeToRead
      fields {
        slug
      }
      frontmatter {
        tags
        author {
          id
          bio
          twitter
          avatar {
            children {
              ... on ImageSharp {
                fixed(width: 80, height: 80, quality: 100) {
                  src
                  srcSet
                }
              }
            }
          }
        }
        title
        updatedDate(formatString: "MMM D, YYYY")
        image {
          children {
            ... on ImageSharp {
              fixed(width: 900, height: 300, quality: 100) {
                src
                srcSet
              }
            }
          }
        }
      }
    }
    recents: allMarkdownRemark(
      filter: {
        fields: { slug: { ne: $slug } }
        frontmatter: { draft: { ne: true } }
        fileAbsolutePath: { regex: "/blog/" }
      }
      sort: { order: DESC, fields: [frontmatter___updatedDate] }
      limit: 4
    ) {
      edges {
        node {
          fields {
            slug
          }
          timeToRead
          frontmatter {
            title
            updatedDate
            image {
              children {
                ... on ImageSharp {
                  fixed(width: 300, height: 100) {
                    src
                    srcSet
                  }
                }
              }
            }
            author {
              avatar {
                children {
                  ... on ImageSharp {
                    fixed(width: 36, height: 36) {
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
