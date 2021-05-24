import React from 'react'
import Header from '../../components/features/Header'
import Section from '../../components/features/Section'
import Layout from '../../components/Layout'
import SEO from '../../components/SEO'
import * as styles from '../../styles/features.css'
import { StaticImage } from 'gatsby-plugin-image'
import Create from '../../components/Create'

export default function ASRPage() {
  return (
    <Layout>
      <SEO
        title="Automatic Speech Recognition (ASR)- Spokestack Maker"
        description="Analyze and transcribe your software's audio to perform a function or simply record. Create a free account to access our ASR tools."
      />
      <Header
        title="Automatic Speech Recognition"
        subtitle="Analyze and transcribe your software’s audio to perform a function or simply record."
        image={
          <StaticImage
            width={416}
            alt="ASR"
            src="../../images/features/asr.png"
          />
        }
      />
      <div css={styles.content}>
        <Section title="What is Automatic Speech Recognition?">
          <p>
            <strong>Automatic speech recognition</strong>, or ASR, refers to the
            process of analyzing and transcribing a chunk of audio without human
            intervention, producing text that software can process further,
            either to perform a function or simply to record it. This technology
            is ubiquitous with a place in the stack of every major voice
            assistant on the market.
          </p>
        </Section>
        <Section title="How Does ASR Work?">
          <p>
            Many different techniques have been used to accomplish this
            throughout ASR&apos;s{' '}
            <a href="https://en.wikipedia.org/wiki/Speech_recognition#History">
              long history
            </a>
            , but modern models use — what else? —
            <strong>neural networks</strong>. The size and performance
            characteristics of these models vary widely, based on where
            they&apos;re designed to be deployed and their intended use cases.
          </p>
          <blockquote>
            Technology has advanced to the point where models small enough to
            fit on a mobile device and run in almost real time are accurate
            enough to use for many tasks, but models that run in the cloud are
            still widely used for their speed and relatively higher accuracy.
          </blockquote>
          <p>
            ASR models are trained on large, diverse collections of speech and
            corresponding transcripts. From this collection, they learn to
            recognize either individual <strong>phonemes</strong>, the smallest
            meaningful units of sound in a language, or{' '}
            <strong>characters</strong> of text. This is called an
            <strong>acoustic model</strong>.
          </p>
          <p>
            To process user speech, acoustic models are often combined with
            language models, which are independently trained on large
            collections of text to learn the most common groupings of sounds and
            letters into words. When ASR is active, the acoustic model receives
            raw audio, translating it into a stream of whatever basic units
            (phonemes or characters) it was trained to produce. The language
            model receives this output and arranges it into the most likely
            stream of words in the target language.
          </p>
        </Section>
        <Section title="Benefits of ASR">
          <p>
            Some form of ASR is a must for any application that wants to process
            user speech&mdash;without it, there&apos;s no way to tell what the
            user said. All speech recognizers are not created equal, though, and
            there are many factors to consider when choosing an ASR for your
            app.
          </p>
          <p>
            ASR accuracy is often measured in <strong>Word Error Rate</strong>,
            or WER, or the percentage of words that differ between the ASR
            system&apos;s transcript and that of a gold-standard version.
            Getting an accurate WER measurement means juggling many different
            variables (think accent, background noise, whether we&apos;re
            talking about a speech vs. a multi-party conversation, etc.), and
            it&apos;s{' '}
            <a href="https://arxiv.org/abs/2010.03432">easy to spin</a>. There
            are, however, various{' '}
            <a href="https://www.aclweb.org/anthology/2020.lrec-1.797.pdf">
              academic comparisons
            </a>{' '}
            of major vendors. For perspective, human WER hovers somewhere
            <a href="https://www.microsoft.com/en-us/research/wp-content/uploads/2017/06/paper-revised2.pdf">
              between 4-11%
            </a>
            , depending on variables like those mentioned above, usually falling
            on the lower end of that range.
          </p>
          <h3>Tips for Choosing the Right Speech Recongizer</h3>
          <p>
            Be wary of anything advertised as performing better than humans; it
            was likely measured under conditions very favorable to the system.
          </p>
          <p>
            Look for a vendor that has support for the languages your users
            speak. Truly multilingual ASR isn&apos;t widely available, but cloud
            ASR vendors often allow you to send a language code along with your
            audio to receive the type of results your app expects.
          </p>
          <p>
            Some ASR providers will also allow you to customize the language
            model by providing a list of vocabulary specific to your app. This
            can be helpful if you&apos;re expecting to process a lot of
            technical jargon, or if you want to improve support for a relatively
            small collection of well-known commands or phrases used to
            communicate with your app. For very constrained vocabularies, you
            might also benefit from using a keyword model as your ASR system.
          </p>
        </Section>
      </div>
      <Create />
    </Layout>
  )
}
