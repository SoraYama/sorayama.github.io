// package.json
declare module "*/package.json" {
  export const version: string;
  export const author: string;
}

declare const graphql: (query: TemplateStringsArray) => void;

declare module "disqus-react" {

  interface DisqusConfig {
    url: string;
    identifier: string;
    title: string;
  }
  export class DiscussionEmbed extends React.Component<{
    config: DisqusConfig,
    shortname: string,
  }, {}> { }
}
