import { adjustFontSizeTo, rhythm } from './typography'

import { MIN_DEFAULT_MEDIA_QUERY } from 'typography-breakpoint-constants'
import { css } from '@emotion/core'

export default css`
  html {
    --main-background: #f6f9fc;
    --primary-color: #2f5bea;
    --secondary-color: #61fae9;
    --text-color: #323e48;
    --header-color: #2c363f;
    --footer-background: var(--header-color);
    --text-color-dark-bg: #f6f9fc;
    --main-border-color: #e6e9e9;
    --button-background: var(--secondary-color);
    --button-background-hover: #06c6b0;
    --transition-easing: cubic-bezier(0.77, 0.41, 0.2, 0.84);

    --code-background: #eee;

    height: 100%;
    min-width: 300px;
    background-color: var(--main-background);
  }
  section {
    padding: ${rhythm(1.3)} 20px;
  }
  .gatsby-resp-image-link {
    background-image: none;
  }
  ${MIN_DEFAULT_MEDIA_QUERY} {
    h1 {
      font-size: ${adjustFontSizeTo('45px').fontSize};
      line-height: ${adjustFontSizeTo('45px').lineHeight};
    }
    h3 {
      font-size: ${adjustFontSizeTo('30px').fontSize};
      line-height: ${adjustFontSizeTo('30px').lineHeight};
    }
  }
`
