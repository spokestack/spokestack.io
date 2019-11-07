import styled from '@emotion/styled'
import { rhythm } from '../utils/typography'

const Wrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: ${rhythm(24)};
  padding: ${rhythm(2)} ${rhythm(1)};

  @media (max-width: 450px) {
    padding-bottom: ${rhythm(6)};
  }
`

export default Wrapper
