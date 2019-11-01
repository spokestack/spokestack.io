import css from '@emotion/css'

export default css`
  html {
    --main-background: white;
    --main-color: #333333;
    --main-border-color: #e8e8e8;
    --primary-color: #14b5eb;
    --secondary-color: #19bd9e;

    --link-color: var(--primary-color);
    --link-color-hover: #1091bc;
    --link-color-active: #08485e;
    --link-color-visited: #108ab2;
    --link-background-image: linear-gradient(
      to top,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0) 1px,
      var(--link-color) 1px,
      var(--link-color) 2px,
      rgba(0, 0, 0, 0) 2px
    );
    --link-text-shadow: 0.03em 0 var(--main-background), -0.03em 0 var(--main-background),
      0 0.03em var(--main-background), 0 -0.03em var(--main-background),
      0.06em 0 var(--main-background), -0.06em 0 var(--main-background),
      0.09em 0 var(--main-background), -0.09em 0 var(--main-background),
      0.12em 0 var(--main-background), -0.12em 0 var(--main-background),
      0.15em 0 var(--main-background), -0.15em 0 var(--main-background);

    --code-background: #eee;

    @media (prefers-color-scheme: dark) {
      --main-background: #131313;
      --main-color: white;
      --main-border-color: #222222;
      --secondary-color: #062d26;
      --code-background: #232323;
    }

    height: 100%;
    background-color: var(--main-background);
  }
  body {
    color: var(--main-color);
  }
  a {
    color: var(--link-color);
    background-image: var(--link-background-image);
    text-shadow: var(--link-text-shadow);

    &:visited {
      color: var(--link-color-visited);
    }
    &:hover {
      color: var(--link-color-hover);
      text-shadow: var(--link-text-shadow);
      background-image: var(--link-background-image);
    }
    &:active {
      color: var(--link-color-active);
    }
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  small {
    color: var(--main-color);
  }
  .gatsby-resp-image-link {
    background-image: none;
  }
`
