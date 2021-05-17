import React from 'react'
import FeatureCallout from '../../components/features/FeatureCallout'
import Header from '../../components/features/Header'
import Info from '../../components/features/Info'
import Section from '../../components/features/Section'
import Layout from '../../components/Layout'
import SEO from '../../components/SEO'
import YouTubeLink from '../../components/YouTubeLink'
import * as styles from '../../styles/features.css'
import { StaticImage } from 'gatsby-plugin-image'
import Create from '../../components/Create'
import SampleCode from '../../components/features/SampleCode'

export default function KeywordPage() {
  return (
    <Layout>
      <SEO
        title="Keyword | Spokestack"
        description="A keyword is a brief command that supports variations in phrasing—using a fast, lightweight model—without user audio leaving the device. Create an account and make your own keyword models with Spokestack."
      />
      <Header
        title="Keyword Recognition"
        subtitle="Local on-device keyword spotting &mdash; recognize any sound whether or not it's part of a langauge."
        image={
          <StaticImage
            width={544}
            alt="Keyword"
            src="../../images/features/keyword.png"
          />
        }
      />
      <div css={styles.content}>
        <Section title="What is Keyword Recognition?">
          <p>
            Instead of having to recognize and respond to anything that can be
            said, like a voice assistant, why not just act on what your users
            know software can do?
          </p>
          <blockquote>
            Your custom multilingual on-device model recognizes pre-defined
            keywords, sending a transcript of trained commands, each associated
            with one or more utterances. That’s the insight behind{' '}
            <strong>keyword recognition</strong>.
          </blockquote>
          <p>
            Your software listens for multiple brief commands and supports
            variations in phrasing for each of them—using a fast, lightweight
            model—without user audio leaving the device.
          </p>
        </Section>
        <Section title="Why Should I Use Keyword Recognition?">
          <p>
            The main use cases for keyword models are in{' '}
            <strong>domains with limited vocabularies</strong> or apps that only
            wish to <strong>support specific words or phrases</strong>.
          </p>
          <p>
            The main benefits of choosing a keyword model over traditional{' '}
            <a href="/features/asr">ASR</a> are:
          </p>
          <div css={styles.callouts}>
            <FeatureCallout
              title="Hands-Free"
              description="Accessible, safe, natural."
              image={
                <StaticImage
                  width={395}
                  alt="Hands-Free"
                  src="../../images/features/keyword/hands-free.png"
                />
              }
            />
            <FeatureCallout
              title="Edge-Based"
              description="Only activating your software when it’s directly addressed processes audio as efficiently as possible."
              image={
                <StaticImage
                  width={395}
                  alt="Edge-Based"
                  src="../../images/features/keyword/edge-based.png"
                />
              }
            />
            <FeatureCallout
              title="Energy-Conscious"
              description="Running fully on device (without an internet connection) is fast and consumes little power."
              image={
                <StaticImage
                  width={395}
                  alt="Energy-Conscious"
                  src="../../images/features/keyword/energy.png"
                />
              }
            />
            <FeatureCallout
              title="Cross-Platform"
              description={
                <p>
                  Train a model with our{' '}
                  <a href="/account">no-code AutoSpeech Maker</a> and use it
                  across all our <a href="/docs">platforms</a>
                </p>
              }
              image={
                <StaticImage
                  width={395}
                  alt="Cross-Platform"
                  src="../../images/features/keyword/cross-platform.png"
                />
              }
            />
            <FeatureCallout
              title="Privacy-Minded"
              description="Rather than listen to audio, only answer &ldquo;Did I hear on the keywords you trained me to listen for?&rdquo; All other sounds are immediately forgotten."
              image={
                <StaticImage
                  width={395}
                  alt="Privacy-Minded"
                  src="../../images/features/keyword/privacy.png"
                />
              }
            />
            <FeatureCallout
              title="Portable"
              description="Constraining your app’s vocabulary means a lightweight customized recognition model."
              image={
                <StaticImage
                  width={395}
                  alt="Portable"
                  src="../../images/features/keyword/portable.png"
                />
              }
            />
          </div>
          <Info>
            If users are expected to interact using complete sentences or you
            want to support unanticipated prhasings, a speech recognition
            component paired with natural language understanding would be a
            better fit for your use case.
          </Info>
          <h3>Use Case for Keyword Recognition</h3>
          <p>
            Imagine an app designed to control music while running. Classes
            could be named <code>play</code> and <code>stop</code> &mdash;
            we&apos;ll just talk about two for sake of brevity.
          </p>
          <div className="columns">
            <div className="column-half" css={styles.utteranceColumn}>
              <p>
                Utterances (variations) for <code>play</code> could include:
              </p>
              <StaticImage
                width={395}
                alt="play, start, go, music on"
                src="../../images/features/keyword/play.png"
                css={styles.image}
              />
            </div>
            <div className="column-half" css={styles.utteranceColumn}>
              <p>
                Utterances (variations) for <code>stop</code> could include:
              </p>
              <StaticImage
                width={395}
                alt="stop, quit, pause, music off"
                src="../../images/features/keyword/stop.png"
                css={styles.image}
              />
            </div>
          </div>
          <p>
            If a user says any of the above utterances, your app would recieve a
            transcript, but the utterances are normalized in a transcript to one
            of your two commands, <code>play</code> and <code>stop</code>,
            making it easy to map the command to the proper app feature.
          </p>
        </Section>
        <Section title="How Do Keyword Recognition Models Work?">
          <p>
            A <strong>keyword recognizer</strong> or{' '}
            <strong>keyword spotter</strong> straddles the line between{' '}
            <a href="/features/wake-word">wake word detection</a> and{' '}
            <a href="/features/asr">speech recognition</a>, with the performance
            of the former and the results of the latter. A{' '}
            <strong>keyword model</strong> is trained to recognize multiple
            named <strong>classes</strong>, each associated with one or more{' '}
            <strong>utterances</strong>. When the model detects one of these
            utterances in user speech, it returns as a transcript the name of
            the keyword class associated with that utterance.
          </p>
          <p>
            A <strong>keyword detector</strong> is trained using machine
            learning models (like what you create with no code using Spokestack
            Maker) to constantly analyze input from a microphone for specific
            sounds. These models work in tandem with a{' '}
            <a href="/features/vad">voice activity detector</a> to:
          </p>
          <StaticImage
            width={815}
            alt="How Do Keyword Recognition Models Work?"
            src="../../images/features/keyword/detection.png"
            css={styles.image}
          />
          <ul css={styles.detection}>
            <li>Detect human speech</li>
            <li>Detect if preset keyword utterance is spoken</li>
            <li>
              Send transcript event to Spokestack&apos;s{' '}
              <a href="/features/speech-pipeline">Speech Pipeline</a> so you can
              respond
            </li>
          </ul>
          <Info>
            Detection happens entirely on the device the software is running on
            without accessing a network or cloud services.
          </Info>
          <p>
            The technical term for what a keyword recognition model does is{' '}
            <a href="https://en.wikipedia.org/wiki/Multiclass_classification">
              multiclass classification
            </a>
            . Each keyword is a <strong>class label</strong>, and the utterances
            associated with that class are its <strong>instances</strong>.
            During training, the model receives multiple instances of the
            keyword classes and multiple words and phrases that don&apos;t fit
            into any of the classes, and it learns to tell the difference.
          </p>
          <p>
            This probably sounds similar to the training process for a{' '}
            <a href="/features/wake-word">wake word model</a>, and that&apos;s
            because it is: Spokestack&apos;s wake word and keyword recognition
            models are very similar, with small differences at the very end to
            allow the keyword model to detect multiple classes and return the
            label of the class that was detected.
          </p>
          <div>At runtime, they both consist of three separate models:</div>
          <ol>
            <li>
              One for <strong>filtering</strong> incoming audio to retain only
              certain frequency components
            </li>
            <li>
              One for <strong>encoding</strong> the filtered representation into
              a format conducive to classification
            </li>
            <li>
              One for <strong>detecting</strong> target words or phrases
            </li>
          </ol>
        </Section>
      </div>
      <StaticImage
        layout="fullWidth"
        quality={100}
        breakpoints={[750, 1080, 1366, 1920, 2200, 2500]}
        placeholder="dominantColor"
        alt="Create a Custom Keyword Model"
        src="../../images/features/keyword/custom.png"
        css={styles.image}
      />
      <div css={styles.content}>
        <Section>
          <p>
            Creating a personal keyword model is straightforward using{' '}
            <a href="/account/keyword">Spokestack Maker</a>, a microphone, and a
            quiet room.
          </p>
          <Info>
            Spokestack&apos;s <strong>personal keywords</strong> use few-shot
            transfer learning allowing a small amount of data to produce a
            neural model with an accuracy level suitable for personal, hobby, or
            exploratory projects. Personal models will respond to the voice (or
            voices) used in the data you submit.
          </Info>
          <YouTubeLink
            title="See How it Works"
            href="https://www.youtube.com/watch?v=6nc5Wq7CFPY"
          />
          <div>
            <div css={styles.step}>
              <h4>
                <span css={styles.number}>1</span> Create a Keyword Recognition
                Model
              </h4>
              <StaticImage
                width={811}
                css={styles.stepImage}
                alt="Create a Keyword Recognition Model"
                src="../../images/features/keyword/create.png"
              />
              <p>
                First, head to the{' '}
                <a href="/account/keyword">keyword builder</a> and click{' '}
                <code>Create model</code> in the top right. A section for a new
                model will appear. Change the model&apos;s name.
              </p>
            </div>
            <div css={styles.step}>
              <h4>
                <span css={styles.number}>2</span> Add and Record Utterances
              </h4>
              <StaticImage
                width={811}
                css={styles.stepImage}
                alt="Add and Record Utterances"
                src="../../images/features/keyword/utterances.png"
              />
              <p>
                Then, look for the <code>Keywords</code> section. This is where
                you&apos;ll add the words or short phrases that make up your
                recognizer&apos;s vocabulary. Use <code>Add Keyword</code> to
                compose your list; for each keyword you add, follow this
                process:
              </p>
              <div className="columns" css={styles.utterances}>
                <div className="column-third">
                  <StaticImage
                    width={254}
                    alt="Set keyword text"
                    src="../../images/features/keyword/keyword-text.png"
                  />
                  <p>1. Set keyword text</p>
                </div>
                <div className="column-third">
                  <StaticImage
                    width={254}
                    alt="View utterances"
                    src="../../images/features/keyword/view-utterances.png"
                  />
                  <p>
                    2. Click the arrow to the right of the keyword to view
                    utterances.
                  </p>
                </div>
                <div className="column-third">
                  <StaticImage
                    width={254}
                    alt="Add utterance"
                    src="../../images/features/keyword/add-utterance.png"
                  />
                  <p>
                    3. Use <code>Add Utterance</code> to add new utterances to
                    the selected keyword.
                  </p>
                </div>
              </div>
              <div className="columns" css={styles.utterances}>
                <div className="column-third">
                  <StaticImage
                    width={254}
                    alt="View samples"
                    src="../../images/features/keyword/view-samples.png"
                  />
                  <p>
                    4. Click the arrow to the right of an utterance to view
                    samples.
                  </p>
                </div>
                <div className="column-third">
                  <StaticImage
                    width={254}
                    alt="Record"
                    src="../../images/features/keyword/record.png"
                  />
                  <p>
                    5. Click <code>Record</code> at the bottom of the box to add
                    new samples.
                  </p>
                </div>
                <div className="column-third" />
              </div>
              <Info>
                At least three samples per utterance are required to train a
                model, but the more samples, the better. If you want the model
                to respond to anyone other than you, collect samples using more
                than one voice (remember, this is a{' '}
                <a href="/docs/concepts/keywords/#personal-keyword">
                  personal keyword model
                </a>
                , not a universal one).
              </Info>
              <p>
                Note the extra steps here compared to the{' '}
                <a href="/features/wake-word">
                  process for creating a wake word model
                </a>
                . This reflects the difference between the two types of model.
              </p>
              <p>
                When you create a keyword recognizer, the list of keywords are
                the only text your app will ever see. Each one of those
                keywords, sometimes referred to as{' '}
                <strong>keyword classes</strong> in technical documentation, can
                be thought of as its own miniature wake word model, in that it
                can have different utterances that trigger it. This is why you
                have to add a keyword and an utterance in order to begin
                recording samples: a keyword for establishing the text you want
                returned to your app as a transcript, and an utterance to
                represent the text mapped to that keyword.
              </p>
              <p>
                Each keyword can have one utterance that simply matches the
                keyword&apos;s name (or doesn&apos;t, if you want to change the
                formatting/spelling of some word before your app sees it), or
                several that should all be normalized to the same text before
                your app sees it. The keyword name itself has no correlation to
                the audio meant to trigger it.
              </p>
            </div>
            <div css={styles.step}>
              <h4>
                <span css={styles.number}>3</span> Train Your Model
              </h4>
              <StaticImage
                width={811}
                css={styles.stepImage}
                alt="Train Your Model"
                src="../../images/features/keyword/train.png"
              />
              <p>
                When you&apos;ve added as many different keywords and utterances
                as you want and recorded all your samples, click{' '}
                <code>Train</code>. That&apos;s all there is to it! In a few
                minutes you&apos;ll be able to download and use your very own
                keyword model. You can retrain as many times as you like, adding
                or deleting keywords, utterances, and samples as necessary.
              </p>
            </div>
          </div>
        </Section>
      </div>
      <SampleCode
        title="How Do I Use a Keyword Recognition Model?"
        codeKey="keyword"
      />
      <Create />
    </Layout>
  )
}
