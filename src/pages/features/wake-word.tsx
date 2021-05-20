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

export default function WakewordPage() {
  return (
    <Layout>
      <SEO
        title="Wake Words for Activating Software - Spokestack Maker"
        description="Multilingual on-device wake words recognize one or multiple commands to activate listening in your software. Create a custom wake word for free."
      />
      <Header
        title="Wake Words for Activating Software"
        subtitle="Multilingual on-device wake words recognize one or multiple commands to activate listening in your software."
        image={
          <StaticImage
            width={600}
            alt="Wake word"
            src="../../images/features/vad-wake-word.png"
          />
        }
      />
      <div css={styles.content}>
        <Section title="What Are Wake Words?">
          <p>
            Imagine you&apos;re at a party, and everyone&apos;s talking at once.
            There are so many conversations—how do you know if someone is
            talking to you? From the middle of the din, you hear someone call
            out your name. You immediately turn to see who it was and to listen
            for what they&apos;ll say next.
          </p>
          <blockquote>
            This is the real-life analog of a software{' '}
            <strong>wake word</strong> &mdash; a word (or set of words) that
            transitions voice technology from listening passively to actively
            attempting to recognize speech in order to act.
          </blockquote>
          <p>
            A <strong>wake word detector</strong> uses a machine learning model
            to process the sounds it is sent and listen for what can be thought
            of as its name. For example, you may respond to your first name,
            your family name, your full name, your nickname, and your honorific
            name. So can your software!
          </p>
        </Section>
        <Section title="Why Should I Use a Wake Word?">
          <p>
            By using wake words, your software is both more{' '}
            <strong>privacy-minded</strong> (not transcribing speech that
            isn&apos;t directed at it) and <strong>more efficient</strong> (only
            acting when it&apos;s directly addressed).
          </p>
          <div css={styles.callouts}>
            <FeatureCallout
              title="Hands-Free"
              description="Accessible, safe, natural."
              image={
                <StaticImage
                  width={395}
                  alt="Hands-Free"
                  src="../../images/features/wake-word/hands-free.png"
                />
              }
            />
            <FeatureCallout
              title="Edge-Based"
              description="Detection happens entirely on the device without accessing a network or cloud services."
              image={
                <StaticImage
                  width={395}
                  alt="Edge-Based"
                  src="../../images/features/wake-word/edge-based.png"
                />
              }
            />
            <FeatureCallout
              title="Energy-Conscious"
              description="Only activating your software when it’s directly addressed processes audio as efficiently as possible and uses less power."
              image={
                <StaticImage
                  width={395}
                  alt="Energy-Conscious"
                  src="../../images/features/wake-word/energy.png"
                />
              }
            />
            <FeatureCallout
              title="Cross-Platform"
              description={
                <p>
                  Train a model with our{' '}
                  <a href="/account">no-code AutoSpeech Maker</a> and use it
                  across all of our <a href="/docs">platforms</a>.
                </p>
              }
              image={
                <StaticImage
                  width={395}
                  alt="Cross-Platform"
                  src="../../images/features/wake-word/cross-platform.png"
                />
              }
            />
            <FeatureCallout
              title="Privacy-Minded"
              description="Rather than listen to audio, only answer &ldquo;Did I hear one of the names you trained me to listen for?&rdquo;"
              image={
                <StaticImage
                  width={395}
                  alt="Privacy-Minded"
                  src="../../images/features/wake-word/privacy.png"
                />
              }
            />
          </div>
        </Section>
        <Section title="How Do Wake Words Work?">
          <p>
            Wake words utilize a wake word detector, which in Spokestack employs
            machine learning models trained to constantly analyze input from a
            microphone for specific sounds (like what you can train and build
            with no code using <a href="/account">Spokestack Maker</a>). These
            models work in tandem with a{' '}
            <a href="/features/vad">Voice Activity Detector</a> to:{' '}
          </p>
          <StaticImage
            width={815}
            alt="How Does Wake Word Work?"
            src="../../images/features/wake-word/detection.png"
            css={styles.image}
          />
          <ul css={styles.detection}>
            <li>Detect human speech</li>
            <li>Detect if preset name, short phrase, or word is said</li>
            <li>
              Send trigger event to Spokestack&apos;s{' '}
              <a href="/features/speech-pipeline">Speech Pipeline</a> to respond
            </li>
          </ul>
          <Info>
            Detection happens entirely on the device the software is running on
            without accessing a network or cloud services.
          </Info>
          <p>
            A <strong>wake word detector</strong> is a type of{' '}
            <a href="https://en.wikipedia.org/wiki/Binary_classification">
              binary classifier
            </a>
            . Some are built to recognize a single word (or class), and some can
            recognize several. During training, the detector hears many examples
            of the desired wake word(s), many examples of other words, and
            background noise, and it learns to tell the difference between them.
            Spokestack&apos;s wake word detectors use a series of three neural
            models to filter user speech to isolate the most important frequency
            components, encode those for classification, and detect the presence
            of a wake word in the encoded version. More detailed information
            about the models themselves can be found in our{' '}
            <a href="/docs/concepts/wake-word">documentation</a>. Splitting the
            task into three stages allows us to process audio as efficiently as
            possible, keeping the process quick and using less power.
          </p>
          <div className="columns">
            <div className="column-half">
              <h3>Wake Word Triggers</h3>
              <p>
                We first discussed how wake words trigger the rest of the{' '}
                <a href="/features/speech-pipeline">speech pipeline</a> (
                <a href="/docs/concepts/vad">speech recognition</a>,{' '}
                <a href="/docs/concepts/keywords">keyword recognition</a>, and
                even{' '}
                <a href="/docs/concepts/nlu">natural language understanding</a>
                ). But a wake word response is not limited to just other voice
                technology components. A wake word can trigger any action in
                your software. For example, a wake word can activate a feature,
                or initiate a workflow. Wake word triggers are a powerful user
                interface.
              </p>
            </div>
            <div className="column-half">
              <h3>Wake Word Detection</h3>
              <p>
                Software using Spokestack&apos;s wake word will need the
                device&apos;s microphone to be active in order to activate upon
                hearing a wake word, but it&apos;s important to understand that
                until the wake word is recognized, Spokestack isn&apos;t
                &ldquo;listening&rdquo; to the audio in any real sense.
                It&apos;s merely answering the question, &ldquo;Did I just hear
                my name?&rdquo; over and over again.
              </p>
              <p>
                With <a href="/account/wake-word">Spokestack Maker</a>, you can
                create wake word models that can be trained to recognize a
                number of different phrases, or utterances, so your app can
                activate from different invocations without directly
                transcribing which one the user spoke. This contrasts with a{' '}
                <a href="/docs/concepts/keywords">keyword recognizer</a>, which
                will give you a transcript of the user&apos;s speech.
              </p>
            </div>
          </div>
        </Section>
      </div>
      <StaticImage
        layout="fullWidth"
        quality={100}
        // gatsby default: [750, 1080, 1366, 1920]
        breakpoints={[750, 980, 1280, 1600, 1920, 2200, 2500]}
        placeholder="dominantColor"
        alt="Create a Custom Wake Word Model"
        src="../../images/features/wake-word/custom.png"
        css={styles.image}
      />
      <div css={styles.content}>
        <Section>
          <p>
            Creating a personal wake word model is straightforward using{' '}
            <a href="/account/wake-word">Spokestack Maker</a>, a microphone, and
            a quiet room.
          </p>
          <Info>
            Spokestack&apos;s <strong>personal wake words</strong> use few-shot
            transfer learning allowing a small amount of data to produce a
            neural model with an accuracy level suitable for personal, hobby, or
            exploratory projects. These models will perform with good recall for
            the voice (or voices) used in the data it is trained on.
          </Info>
          <YouTubeLink
            title="See How it Works"
            href="https://www.youtube.com/watch?v=S9ED1_ET-T4"
          />
          <div>
            <div css={styles.step}>
              <h4>
                <span css={styles.number}>1</span> Create a Wake Word
              </h4>
              <StaticImage
                width={811}
                css={styles.stepImage}
                alt="Create a Wake Word Model"
                src="../../images/features/wake-word/create.png"
              />
              <p>
                First, head to the{' '}
                <a href="/account/wake-word">wake word builder</a> and click{' '}
                <code>Create wake word</code> in the top right. A section for a
                new model will appear. Change the model&apos;s name.
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
                src="../../images/features/wake-word/utterances.png"
              />
              <p>
                Then, look for the <code>Utterances</code> section. This is
                where you&apos;ll add the words or short phrases you want to
                trigger your app. Click <code>Add utterance</code> to compose
                your list; for each utterance you add, follow this process:
              </p>
              <div className="columns" css={styles.utterances}>
                <div className="column-third">
                  <StaticImage
                    width={254}
                    alt="Set utterance text"
                    src="../../images/features/wake-word/utterance-text.png"
                  />
                  <p>1. Set utterance text</p>
                </div>
                <div className="column-third">
                  <StaticImage
                    width={254}
                    alt="View samples"
                    src="../../images/features/wake-word/view-samples.png"
                  />
                  <p>
                    2. Click the arrow to the right of an utterance to view
                    samples.
                  </p>
                </div>
                <div className="column-third">
                  <StaticImage
                    width={254}
                    alt="Record"
                    src="../../images/features/wake-word/record.png"
                  />
                  <p>
                    3. Click <code>Record</code> at the bottom of the box to add
                    new samples.
                  </p>
                </div>
              </div>
              <Info>
                At least three samples per utterance are required to train a
                model, but the more samples, the better. If you want the model
                to respond to anyone other than you, collect samples using more
                than one voice (remember, this is a{' '}
                <a href="/docs/concepts/wake-word#personal-wake-word">
                  personal wake word model
                </a>
                , not a universal one).
              </Info>
            </div>
            <div css={styles.step}>
              <h4>
                <span css={styles.number}>3</span> Train Your Model
              </h4>
              <StaticImage
                width={811}
                css={styles.stepImage}
                alt="Train Your Model"
                src="../../images/features/wake-word/train.png"
              />
              <p>
                When you&apos;ve added as many different utterances as you want
                and recorded all your samples, click <code>Train</code>. In a
                few minutes, you&apos;ll be able to download and use your very
                own wake word model. You can retrain as many times as you like,
                adding or deleting both utterances and samples as necessary.
              </p>
            </div>
          </div>
        </Section>
      </div>
      <SampleCode title="How Do I Use a Wake Word Model?" codeKey="wakeword" />
      <Create />
    </Layout>
  )
}
