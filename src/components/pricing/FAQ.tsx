import { css } from '@emotion/react'
import React from 'react'
import * as theme from '../../styles/theme'
import { SiteSiteMetadataContact } from '../../utils/graphql'
import Question from './Question'

interface Props {
  contact: SiteSiteMetadataContact
}

export default function FAQ({ contact }: Props) {
  return (
    <div id="faq" className="ie-fix" css={styles.faq}>
      <div css={styles.header}>
        <h2>FAQ</h2>
        <p className="title">
          Need more help? Check out our <a href="/docs">documentation</a>,{' '}
          <a href="https://forums.spokestack.io">forum</a>, or{' '}
          <a href={`mailto:${contact.email}`}>email us</a>.
        </p>
      </div>
      <div css={styles.questions}>
        <Question
          question="What is the starting cost of Spokestack Enterprise?"
          answer="Spokestack Enterprise is priced according to your custom requirements, designed in consultation with your company's unique business needs."
        />
        <Question
          question="Does Spokestack Enterprise charge for cloud requests?"
          answer="Spokestack Entrprise pricing is tailored to your precise use case--unmetered cloud requests included."
        />
        <Question
          question="How can I use Spokestack?"
          answer={
            <p>
              Spokestack offers low-code integrations for many other voice
              technology providers, as well as offering our own{' '}
              <a href="https://spokestack.io/docs/node">Node</a>,{' '}
              <a href="https://spokestack.io/docs/react-native">React Native</a>
              , <a href="https://spokestack.io/docs/ios">iOS</a>,{' '}
              <a href="https://spokestack.io/docs/android">Android</a>, and{' '}
              <a href="https://spokestack.io/docs/python">Python</a> platform
              SDKs that make it easy to put voice into your software.
            </p>
          }
        />
        <Question
          question="What free universal models are available?"
          answer="We offer our highest quality TTS male voice of a Hollywood voice actor in a professional recording studio for free. In addition, we offer a free universal 'Spokestack' wake word model, digits and commands keyword models, and a trivia, Minecraft recipe, and high-low NLU models."
        />
        <Question
          question="What happens when I hit my usage limits?"
          answer="There are no penalties associated with reaching your cloud API usage limits. We will contact you to determine the best plan for your cloud API usage needs."
        />
        <Question
          question="What are my payment options?"
          answer="Spokestack accepts payment from all major credit cards and  with Google Pay."
        />
        <Question
          question="Why are custom wake words & keywords so expensive?"
          answer={
            <p>
              Spokestack believes that the future of human-machine interface in
              software incorporates voice. We intentionally keep the majority of
              our offerings very affordable in an effort to speed the adoption
              of voice. In fact, if you compare the cost of creating a custom
              wake word with Spokestack to that of making one with one of our
              competitors with similar performance, you&aposll find that our
              price is still rather low. Making a wake word or keyword spotting
              model that performs well for a wide variety of people requires
              collecting a substantial amount of data; it&aposs not something
              that you can just generate. We take care of that data collection
              on your behalf, and we&aposll notify you when the task is
              complete, and your model is ready to train. If you have a
              substantial user base already, there are ways to bootstrap this
              data collection, and we&aposre happy to help with that; just
              <a href="mailto:hello@spokestack.io?subject=Bootstrapping data for custom model">
                get in touch
              </a>
              !
            </p>
          }
        />
      </div>
    </div>
  )
}

const styles = {
  faq: css`
    padding: 50px 20px 0;
  `,
  header: css`
    text-align: center;

    h2 {
      margin-bottom: 25px;
    }
    .title {
      margin-bottom: 50px;
    }
    a {
      font-weight: 400;
    }
  `,
  questions: css`
    display: flex;
    flex-direction: column;
    background-color: white;
    border: 1px solid ${theme.mainBorder};
    border-radius: 7px;
    overflow: hidden;
  `
}
