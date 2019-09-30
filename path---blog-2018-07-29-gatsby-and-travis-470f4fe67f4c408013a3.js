webpackJsonp([0x5faea7e7f822],{682:function(a,s){a.exports={data:{site:{siteMetadata:{disqus:"sorayama"}},post:{html:'<blockquote>\n<p>算是处女博了，主要是想记录一下 .travis.yml 的几个配置</p>\n</blockquote>\n<h2 id="gatsby-的构建和部署"><a href="#gatsby-%E7%9A%84%E6%9E%84%E5%BB%BA%E5%92%8C%E9%83%A8%E7%BD%B2" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>gatsby 的构建和部署</h2>\n<p><a href="https://www.gatsbyjs.org/docs/how-gatsby-works-with-github-pages/">gatsby 官方</a>给出构建静态页面们的并部署只需要</p>\n<div class="gatsby-highlight" data-language="json">\n      <pre class="language-json"><code class="language-json"><span class="token punctuation">{</span>\n  scripts<span class="token operator">:</span> <span class="token punctuation">{</span>\n    ...\n    <span class="token property">"deploy"</span><span class="token operator">:</span> <span class="token string">"gatsby build &amp;&amp; gh-pages -d public -b master"</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>然后执行 <code class="language-text">yarn deploy</code> 或 <code class="language-text">npm run deploy</code> 即可</p>\n<h2 id="问题和解决"><a href="#%E9%97%AE%E9%A2%98%E5%92%8C%E8%A7%A3%E5%86%B3" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>问题和解决</h2>\n<p>在本地执行都没有问题，然而配置好 <code class="language-text">.travis.yml</code> 后执行这个部署命令的话应该是不行的，因为没有 github 的\b仓库权限而导致执行 <code class="language-text">gh-pages</code> 的时候认证失败了。</p>\n<h3 id="配置-ssh"><a href="#%E9%85%8D%E7%BD%AE-ssh" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>配置 ssh</h3>\n<p>查阅了一些文档和别人的 blog 之后大概明白了解决思路，<a href="https://imzlp.me/posts/42318/">其中一种</a> 是这么个意思:</p>\n<ul>\n<li>下载 <code class="language-text">travis cli</code>，然后用 <code class="language-text">travis encrypt-file</code> 在 <code class="language-text">.travis.yml</code> 注入用 <code class="language-text">openssl</code> 加解密文件的脚本</li>\n<li>将本地的 <code class="language-text">.ssh</code> 配置和私钥加密之后放到比如叫 <code class="language-text">.travis</code> 的文件夹里</li>\n<li>将 <code class="language-text">ssh_config</code> 写好（主要是声明只通过 <code class="language-text">config</code> 认证）放入 <code class="language-text">.travis</code> 文件夹，然后放到仓库里</li>\n<li><code class="language-text">git push</code> 之后 <code class="language-text">travis</code> 开始构建，将仓库里的私钥通过之前 <code class="language-text">travis encrypt-file</code> 生成并存在自己的 <code class="language-text">Env variables</code> 中的 <code class="language-text">key</code> 解密 <code class="language-text">ssh</code> 私钥</li>\n<li>拷贝私钥并放在 <code class="language-text">~/.ssh/</code> 下，然后覆盖 <code class="language-text">ssh_config</code></li>\n<li>赋权限什么的，然后 <code class="language-text">push</code> 就无忧了</li>\n</ul>\n<p>整体看上去没什么问题，但是在认证的时候失败了，调试了几次没有什么关键性的提示，由于 ci 调试一次成本略高，于是思考别的路子。\n想到其实 travis-ci 既然和 \bgithub 无缝集成，应该是能现成配置并部署\b github-pages 的。发现 <a href="https://docs.travis-ci.com/user/deployment/pages/">官方文档</a> 确实也有，不过确实花了一些时间阅读之后还是没搞清配置具体怎么写。\n（这里就想吐槽下\b， travis-ci 官方文档是挺细致，但是有时候更需要一个类似于 <a href="https://www.typescriptlang.org/docs/handbook/compiler-options.html">typescript compiler options list</a> 这样总览的配置项说明会更节省时间。）</p>\n<h3 id="travis-ci-deploy-github-pages"><a href="#travis-ci-deploy-github-pages" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>travis-ci deploy github-pages</h3>\n<p>\n  <a\n    class="gatsby-resp-image-link"\n    href="/static/travis-ci-12a395307fe2dd2ef6cc151c0b946b31-72da5.jpg"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block; ; max-width: 690px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 26.666666666666668%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAFABQDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAIF/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEAMQAAAB2bCgf//EABcQAQADAAAAAAAAAAAAAAAAAAECEBH/2gAIAQEAAQUCmK41/8QAFBEBAAAAAAAAAAAAAAAAAAAAEP/aAAgBAwEBPwE//8QAFBEBAAAAAAAAAAAAAAAAAAAAEP/aAAgBAgEBPwE//8QAGRAAAgMBAAAAAAAAAAAAAAAAAhEAECEy/9oACAEBAAY/AhRLZ1X/xAAZEAACAwEAAAAAAAAAAAAAAAAAEQEhYZH/2gAIAQEAAT8hegttNnCT/9oADAMBAAIAAwAAABDwD//EABQRAQAAAAAAAAAAAAAAAAAAABD/2gAIAQMBAT8QP//EABQRAQAAAAAAAAAAAAAAAAAAABD/2gAIAQIBAT8QP//EABkQAQACAwAAAAAAAAAAAAAAAAEAESExcf/aAAgBAQABPxB7MuAXSAuXOJvP/9k=\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px #f7f0eb;"\n        alt="travis-ci"\n        title=""\n        src="/static/travis-ci-12a395307fe2dd2ef6cc151c0b946b31-da128.jpg"\n        srcset="/static/travis-ci-12a395307fe2dd2ef6cc151c0b946b31-17be1.jpg 173w,\n/static/travis-ci-12a395307fe2dd2ef6cc151c0b946b31-79cf8.jpg 345w,\n/static/travis-ci-12a395307fe2dd2ef6cc151c0b946b31-da128.jpg 690w,\n/static/travis-ci-12a395307fe2dd2ef6cc151c0b946b31-72da5.jpg 750w"\n        sizes="(max-width: 690px) 100vw, 690px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    </p>\n<p>后来发现一个 <a href="https://takuti.me/note/travis-gh-pages-deployment/">老哥的配置</a> 试了试，第一次蠢了直接把 <code class="language-text">github token</code> 写在配置里面了（蠢哭，一开始看文档的时候人家就说了不要把 <code class="language-text">token</code> 直接写在 <code class="language-text">commit</code> 里，结果还是这么干了 QAQ）。\n后来配置好 <code class="language-text">Env variable</code> 上传之后还是执行 <code class="language-text">gh-pages</code> 的是时候没有权限，但是 <code class="language-text">travis-ci</code> deploy 阶段就直接部署了，那这时候\b就知道把 <code class="language-text">deploy</code> 脚本下的 <code class="language-text">gh-pages</code> 命令去掉，只构建就可以了。</p>\n<p>最后附上现在的配置</p>\n<div class="gatsby-highlight" data-language="yaml">\n      <pre class="language-yaml"><code class="language-yaml"><span class="token key atrule">language</span><span class="token punctuation">:</span> node_js\n<span class="token key atrule">node_js</span><span class="token punctuation">:</span>\n  <span class="token punctuation">-</span> 9.8.0\n<span class="token key atrule">sudo</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>\n<span class="token key atrule">cache</span><span class="token punctuation">:</span>\n  <span class="token key atrule">directories</span><span class="token punctuation">:</span>\n    <span class="token punctuation">-</span> node_modules\n<span class="token key atrule">branches</span><span class="token punctuation">:</span>\n  <span class="token key atrule">only</span><span class="token punctuation">:</span>\n    <span class="token punctuation">-</span> dev\n<span class="token key atrule">deploy</span><span class="token punctuation">:</span>\n  <span class="token key atrule">provider</span><span class="token punctuation">:</span> pages\n  <span class="token key atrule">local-dir</span><span class="token punctuation">:</span> public\n  <span class="token key atrule">skip_cleanup</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>\n  <span class="token key atrule">target-branch</span><span class="token punctuation">:</span> master\n  <span class="token key atrule">github_token</span><span class="token punctuation">:</span> $GITHUB_TOKEN\n  <span class="token key atrule">keep-history</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>\n  <span class="token key atrule">on</span><span class="token punctuation">:</span>\n    <span class="token key atrule">branch</span><span class="token punctuation">:</span> dev\n<span class="token key atrule">addons</span><span class="token punctuation">:</span>\n  <span class="token key atrule">apt</span><span class="token punctuation">:</span>\n    <span class="token key atrule">sources</span><span class="token punctuation">:</span>\n      <span class="token punctuation">-</span> ubuntu<span class="token punctuation">-</span>toolchain<span class="token punctuation">-</span>r<span class="token punctuation">-</span>test\n    <span class="token key atrule">packages</span><span class="token punctuation">:</span>\n      <span class="token punctuation">-</span> g++<span class="token punctuation">-</span><span class="token number">4.8</span>\n<span class="token key atrule">before_install</span><span class="token punctuation">:</span>\n  <span class="token punctuation">-</span> if <span class="token punctuation">[</span><span class="token punctuation">[</span> "$TRAVIS_OS_NAME" == "linux" <span class="token punctuation">]</span><span class="token punctuation">]</span>; then export CXX=g++<span class="token punctuation">-</span>4.8; fi\n  <span class="token punctuation">-</span> npm install <span class="token punctuation">-</span>g yarn\n<span class="token key atrule">install</span><span class="token punctuation">:</span>\n  <span class="token punctuation">-</span> yarn\n<span class="token key atrule">script</span><span class="token punctuation">:</span>\n  <span class="token punctuation">-</span> yarn run test\n<span class="token key atrule">after_success</span><span class="token punctuation">:</span>\n  <span class="token punctuation">-</span> yarn run build\n  <span class="token punctuation">-</span> yarn run codeclimate</code></pre>\n      </div>\n<blockquote>\n<p>注意：</p>\n<ul>\n<li>这里要把 <code class="language-text">build</code> 放在 <code class="language-text">after_success</code> 阶段</li>\n<li>因为我是直接从 <code class="language-text">dev</code> 分支推代码，然后直接构建到 <code class="language-text">master</code> 上，因此要写 <code class="language-text">target-branch</code> 和 <code class="language-text">on</code></li>\n</ul>\n</blockquote>\n<h2 id="后记"><a href="#%E5%90%8E%E8%AE%B0" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>后记</h2>\n<p>其实就是简单的一点记录而已，然后先放在这撑一哈门面。这里其实还是可以再继续研究下第一个老哥的 <code class="language-text">ssh</code> 配置，说不定以后会用得到。</p>\n<h2 id="其他的参考"><a href="#%E5%85%B6%E4%BB%96%E7%9A%84%E5%8F%82%E8%80%83" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>其他的参考</h2>\n<ul>\n<li><a href="https://brettdewoody.com/secure-environment-variables-with-travis/">secure-environment-variables-with-travis</a></li>\n<li><a href="https://heygrady.com/deploying-travis/">deploying-travis</a></li>\n<li><a href="https://github.com/nukc/how-to-use-travis-ci">how-to-use-travis-ci</a></li>\n<li><a href="https://blog.wyrihaximus.net/2015/09/github-auth-token-on-travis/">github-auth-token-on-travis</a></li>\n</ul>',excerpt:"算是处女博了，主要是想记录一下 .travis.yml 的几个配置 gatsby 的构建和部署 gatsby…",timeToRead:3,fields:{slug:"/blog/2018-07-29--Gatsby-and-Travis/"},frontmatter:{tags:["2018-07","技术","gatsby","travis-ci","自动化"],author:{id:"SoraYama - 空山",bio:"折腾点前端",twitter:"@ClassicSilence1",avatar:{children:[{__typename:"ImageSharp",responsiveResolution:{src:"/static/avatar-d7657fc7ec759cfa220ac058ed0b571a-0294e.jpg",srcSet:"/static/avatar-d7657fc7ec759cfa220ac058ed0b571a-0294e.jpg 1x,\n/static/avatar-d7657fc7ec759cfa220ac058ed0b571a-f0f16.jpg 1.5x,\n/static/avatar-d7657fc7ec759cfa220ac058ed0b571a-6c605.jpg 2x,\n/static/avatar-d7657fc7ec759cfa220ac058ed0b571a-031f1.jpg 3x"}}]}},title:"用 gatsby 和 travis-ci 自动化构建和部署 github-pages",updatedDate:"Jul 29, 2018",image:{children:[{__typename:"ImageSharp",responsiveResolution:{src:"/static/gatsby-word-c44bca7fd6ad9ad38985ba07e1a3b252-53e6a.jpeg",srcSet:"/static/gatsby-word-c44bca7fd6ad9ad38985ba07e1a3b252-53e6a.jpeg 1x,\n/static/gatsby-word-c44bca7fd6ad9ad38985ba07e1a3b252-8127e.jpeg 1.5x,\n/static/gatsby-word-c44bca7fd6ad9ad38985ba07e1a3b252-d2c77.jpeg 2x"}}]}}},recents:{edges:[{node:{fields:{slug:"/blog/2018-07-29--misc/"},timeToRead:3,frontmatter:{title:"Misc",updatedDate:"2019-07-30",image:{children:[{__typename:"ImageSharp",responsiveResolution:{src:"/static/cup-of-coffee-laptop-office-macbook-89786-98bc53d2012296d56b37cad2ff328b5a-1bfe5.jpeg",srcSet:"/static/cup-of-coffee-laptop-office-macbook-89786-98bc53d2012296d56b37cad2ff328b5a-1bfe5.jpeg 1x,\n/static/cup-of-coffee-laptop-office-macbook-89786-98bc53d2012296d56b37cad2ff328b5a-60440.jpeg 1.5x,\n/static/cup-of-coffee-laptop-office-macbook-89786-98bc53d2012296d56b37cad2ff328b5a-168f5.jpeg 2x,\n/static/cup-of-coffee-laptop-office-macbook-89786-98bc53d2012296d56b37cad2ff328b5a-40495.jpeg 3x"}}]},author:{avatar:{children:[{__typename:"ImageSharp",responsiveResolution:{src:"/static/avatar-d7657fc7ec759cfa220ac058ed0b571a-e9ed2.jpg",srcSet:"/static/avatar-d7657fc7ec759cfa220ac058ed0b571a-e9ed2.jpg 1x,\n/static/avatar-d7657fc7ec759cfa220ac058ed0b571a-f1b3b.jpg 1.5x,\n/static/avatar-d7657fc7ec759cfa220ac058ed0b571a-d2364.jpg 2x,\n/static/avatar-d7657fc7ec759cfa220ac058ed0b571a-6f7fc.jpg 3x"}}]}}}}},{node:{fields:{slug:"/blog/2019-07-03--前端面试汇总/"},timeToRead:9,frontmatter:{title:"前端面试汇总(持续更新)",updatedDate:"2019-07-28",image:{children:[{__typename:"ImageSharp",responsiveResolution:{src:"/static/fe-509f7cfdd1a14bf357f75a03cde10624-1bfe5.jpg",srcSet:"/static/fe-509f7cfdd1a14bf357f75a03cde10624-1bfe5.jpg 1x,\n/static/fe-509f7cfdd1a14bf357f75a03cde10624-60440.jpg 1.5x,\n/static/fe-509f7cfdd1a14bf357f75a03cde10624-168f5.jpg 2x,\n/static/fe-509f7cfdd1a14bf357f75a03cde10624-40495.jpg 3x"}}]},author:{avatar:{children:[{__typename:"ImageSharp",responsiveResolution:{src:"/static/avatar-d7657fc7ec759cfa220ac058ed0b571a-e9ed2.jpg",srcSet:"/static/avatar-d7657fc7ec759cfa220ac058ed0b571a-e9ed2.jpg 1x,\n/static/avatar-d7657fc7ec759cfa220ac058ed0b571a-f1b3b.jpg 1.5x,\n/static/avatar-d7657fc7ec759cfa220ac058ed0b571a-d2364.jpg 2x,\n/static/avatar-d7657fc7ec759cfa220ac058ed0b571a-6f7fc.jpg 3x"}}]}}}}}]}},pathContext:{slug:"/blog/2018-07-29--Gatsby-and-Travis/"}}}});
//# sourceMappingURL=path---blog-2018-07-29-gatsby-and-travis-470f4fe67f4c408013a3.js.map