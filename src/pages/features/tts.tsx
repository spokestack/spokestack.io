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

export default function TTSPage() {
  return (
    <Layout>
      <SEO
        title="Text-to-Speech | Spokestack"
        description="Spokestack's Text-to-Speech service is easy to use and available on many platforms."
      />
      <Header
        title="Text-to-Speech"
        subtitle="Personal AI voice clone — it's your voice, not a deepfake!"
        image={
          <StaticImage
            width={540}
            alt="TTS"
            src="../../images/features/tts.png"
          />
        }
      />
      <div css={styles.content}>
        <Section title="What is Text-to-Speech?">
          <blockquote>
            <strong>Text-to-Speech</strong>, or TTS, uses a machine learning
            model to synthesize the text you provide into an AI voice that reads
            the text aloud. In short, its speech synthesis technology made
            popular as the &ldquo;Siri voice&rdquo;, Sir Stephen Hawkings, or
            even ET&apos;s Speak &amp; Spell!
          </blockquote>
          <p>
            With Spokestack, TTS is no longer limited to a single device or only
            available with a ton of machine learning work&mdash;it&apos;s easy
            to create a TTS voice and use it in your software!
          </p>
        </Section>
        <Section title="Why Should I Use TTS?">
          <div css={styles.callouts}>
            <FeatureCallout
              title="Unique Audio Branding Opportunity"
              image={
                <StaticImage
                  width={395}
                  alt="Unique Audio Branding Opportunity"
                  src="../../images/features/tts/branding.png"
                />
              }
            />
            <FeatureCallout
              title="Multimodal UI Not Limited to a Screen"
              image={
                <StaticImage
                  width={395}
                  alt="Multimodal UI Not Limited to a Screen"
                  src="../../images/features/tts/multimodal.png"
                />
              }
            />
            <FeatureCallout
              title="Create an Artificial Persona"
              image={
                <StaticImage
                  width={395}
                  alt="Create an Artificial Persona"
                  src="../../images/features/tts/persona.png"
                />
              }
            />
            <FeatureCallout
              title="Personalized Speech Specific to Each Potential User"
              image={
                <StaticImage
                  width={395}
                  alt="Personalized Speech"
                  src="../../images/features/tts/personalized.png"
                />
              }
            />
          </div>
        </Section>
        <Section title="How Does Text-to-Speech Work?">
          <blockquote>
            TTS transforms text input into audio that mimics a human speaker
            reading it aloud. It&apos;s essentially the opposite of{' '}
            <a href="/features/asr">ASR</a>.
          </blockquote>
          <p>
            Synthesizing speech might be the oldest field in voice technology,
            with early efforts potentially dating back to the{' '}
            <a href="https://en.wikipedia.org/wiki/Speech_synthesis#History">
              Middle Ages
            </a>
            . We&apos;ve come a long way since then, and today neural networks
            can produce speech nearly indistinguishable from a human speaker in
            both reproduction of individual letters and the qualities that make
            speech sound natural — things like cadence, intonation, and stress —
            collectively known as <strong>prosody</strong>. Natural speech
            synthesis is still a computationally intensive task; the models that
            approach human performance require too many resources to run on a
            mobile device, but the field is advancing rapidly.
          </p>
          <h3>Cloud-Based TTS</h3>
          <p>
            Spokestack&apos;s current approach to TTS is{' '}
            <strong>cloud-based</strong>. You send us either plain text or text
            formatted with{' '}
            <a href="https://www.w3.org/TR/speech-synthesis11/">SSML</a> or{' '}
            <a href="https://www.speechmarkdown.org/">Speech Markdown</a> if you
            need fine control over the result, and we&apos;ll send you a URL
            where you can stream your result for the next 60 seconds. Our mobile
            libraries have convenience methods for automatically streaming the
            audio to your local or web device. Our system works faster than
            real-time, so there&apos;s no waiting for your audio to be ready —
            by the time you can send a request to your streaming URL, the first
            chunks of audio should be ready, and playback won&apos;t get ahead
            of synthesis.
          </p>
          <p>
            Our TTS is currently limited to English, but we can produce{' '}
            <strong>custom voices</strong> for your brand, and we offer an{' '}
            <a href="/pricing">affordable subscription tier</a>
            that lets you train your own TTS voice with as little as 5 minutes
            of data. The quality of a voice trained on a very small data set
            won&apos;t be quite up to par with our custom voices, but it can be
            a great way to produce a proof of concept or power a hobby project.
          </p>
        </Section>
      </div>
      <StaticImage
        layout="fullWidth"
        alt="Create a Custom TTS Model"
        src="../../images/features/tts/custom-voice.png"
        css={styles.image}
      />
      <div css={styles.content}>
        <Section>
          <p>
            Creating a personal text-to-speech model is straightforward using{' '}
            <a href="/account/tts">Spokestack Maker</a>, a microphone, and a
            quiet room.
          </p>
          <Info>
            Spokestack&apos;s <strong>personal text-to-speech</strong> uses
            few-shot transfer learning to produce a speech model capable of
            synthesizing any sound in the English language in near real-time
            using a small amount of training data. The quality of the model is
            highly dependent on the quality and quantity of training data
            provided.
          </Info>
          <YouTubeLink
            title="See How it Works"
            href="https://www.youtube.com/watch?v=OmwjXqvYGkc"
          />
          <div>
            <div css={styles.step}>
              <h4>
                <span css={styles.number}>1</span> Create a TTS Model
              </h4>
              <StaticImage
                width={811}
                css={styles.stepImage}
                alt="Create a TTS Model"
                src="../../images/features/tts/create.png"
              />
              <p>
                First, head to the{' '}
                <a href="/account/tts">text-to-speech builder</a> and click{' '}
                <code>Create model</code> in the top right. A section for a new
                model will appear. Change the model&apos;s name.
              </p>
            </div>
            <div css={styles.step}>
              <h4>
                <span css={styles.number}>2</span> Record and Upload Samples
              </h4>
              <StaticImage
                width={811}
                css={styles.stepImage}
                alt="Record Samples"
                src="../../images/features/tts/record.png"
              />
              <p>
                Then, look for the <code>Data Collection</code> section.
                Training a TTS model requires recordings of a single voice. The
                tool will provide the scripts; all you have to do is read them.
                Click <code>Record</code> to open a window that will let you
                record as many scripts as you like, review your recordings
                before upload, and move on to the next script.
              </p>
              <Info>
                At least 75 samples are required to train a model, but the more
                samples, the better your model will sound.
              </Info>
              <p>
                It may be tempting to give the scripts a bit of personality.
                Since we&apos;re training a model with relatively little data,
                it&apos;s best to keep both your pace and pitch at a natural,
                even level. Don&apos;t feel like you have to read in a monotone
                — we do want to capture pauses and natural pitch contours — but
                don&apos;t put too much emotion into your read.
              </p>
              <StaticImage
                width={811}
                css={styles.stepImage}
                alt="Upload Samples"
                src="../../images/features/tts/upload.png"
              />
            </div>
            <div css={styles.step}>
              <h4>
                <span css={styles.number}>3</span> Train Your Model
              </h4>
              <StaticImage
                width={811}
                css={styles.stepImage}
                alt="Train Your Model"
                src="../../images/features/tts/train.png"
              />
              <p>
                When you’ve reached 75 scripts (or your personal tolerance
                level, whichever is higher), click <code>Train</code>. It takes
                longer to train a TTS model than wake word or keyword models, so
                don&apos;t record all your samples right before you need to use
                it; you&apos;ll probably have at least a couple hours to wait.
              </p>
            </div>
          </div>
        </Section>
      </div>
      <SampleCode title="How Do I Use a TTS Model?" codeKey="tts" />
      <Create />
    </Layout>
  )
}
