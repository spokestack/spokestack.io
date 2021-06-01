import * as styles from '../../styles/features.css'

import Create from '../../components/Create'
import FeatureCallout from '../../components/features/FeatureCallout'
import Header from '../../components/features/Header'
import Layout from '../../components/Layout'
import React from 'react'
import SEO from '../../components/SEO'
import Section from '../../components/features/Section'
import { StaticImage } from 'gatsby-plugin-image'
import removeTrailingSlash from '../../utils/removeTrailingSlash'

export default function NLUPage() {
  return (
    <Layout>
      <SEO
        title="Natural Language Understanding (NLU) - Spokestack Maker"
        description="Turn speech into software commands by classifying intent and slot variables from speech. Learn more about NLU and start building free with Spokestack Maker."
        image={`${removeTrailingSlash(process.env.SITE_URL!)}/seo/nlu.png`}
      />
      <Header
        title="Natural Language Understanding"
        subtitle="Turn speech into software commands by classifying intent and slot variables from speech."
        image={
          <StaticImage
            width={600}
            alt="NLU"
            src="../../images/features/nlu.png"
          />
        }
      />
      <div css={styles.content}>
        <Section title="What is Natural Language Understanding?">
          <p>
            <strong>Natural language understanding</strong>, or NLU, uses
            cutting-edge machine learning techniques to classify speech as
            commands for your software. It works in concert with{' '}
            <a href="/features/asr">ASR</a> to turn a transcript of what someone
            has said into actionable commands. Check out{' '}
            <a href="/account/nlu">Spokestack&apos;s pre-built models</a> to see
            some example use cases,{' '}
            <a href="/docs/integrations/nlu-export">import a model</a> that
            you&apos;ve configured in another system, or use our{' '}
            <a href="/docs/machine-learning/nlu-training-data">
              training data format
            </a>{' '}
            to create your own.
          </p>
        </Section>
        <Section title="How Does NLU Work?">
          <p>
            NLU is a task within the broader field of{' '}
            <strong>natural language processing</strong>, or NLP, that focuses
            on processing an individual phrase or sentenct to extract its{' '}
            <strong>intent</strong> and any <strong>slots</strong> containing
            information necessary to fulfill that intent. In other words, it
            fits natural language (sometimes referred to as{' '}
            <strong>unstructured text</strong>) into a structure that an
            application can act on.
          </p>
          <p>
            In many systems, this task is performed after{' '}
            <a href="/features/asr">ASR</a> as a separate step. Occasionally
            it&apos;s combined with ASR in a model that receives audio as input
            and outputs structured text or, in some cases, application code like
            an SQL query or API call. This combined task is typically called{' '}
            <strong>spoken language understanding</strong>, or SLU.
          </p>
          <h3>Example of NLU in Action</h3>
          <p>
            To illustrate the basics of NLU, let&apos;s look at an example
            utterance:{' '}
          </p>
          <StaticImage
            width={814}
            css={styles.stepImage}
            alt="NLU Example"
            src="../../images/features/nlu/example.png"
          />
          <p>
            In this example, this user clearly intends to buy a plane ticket, so
            the intent could be named something like <code>book_flight</code>.
            The flight’s departure time is necessary for the booking, so the{' '}
            <code>book_flight</code> intent would have a slot named{' '}
            <code>departure_time</code>, in this case filled by &ldquo;8:00 AM
            on April 13&rdquo;. A good NLU might further parse that slot value
            into an{' '}
            <a href="https://en.wikipedia.org/wiki/ISO_8601">ISO time string</a>{' '}
            or similar formal representation.
          </p>
          <p>
            Note, however, that more information is necessary to book a flight,
            such as departure airport and arrival airport. The{' '}
            <code>book_flight</code> intent, then, would have unfilled slots for
            which the application would need to gather further information. An
            NLU component&apos;s job is to recognize the intent and as many
            related slot values as are present in the input text; getting the
            user to fill in information for missing slots is the job of a
            dialogue management component.
          </p>
          <p>
            A convenient analogy for the software world is that an intent
            roughly equates to a function (or method, depending on your
            programming language of choice), and slots are the arguments to that
            function. One can easily imagine our travel application containing a
            function named <code>book_flight</code> with arguments named{' '}
            <code>departureAirport</code>, <code>arrivalAirport</code>, and{' '}
            <code>departureTime</code>.
          </p>
        </Section>
        <Section title="Why Should I Use NLU?">
          <div css={styles.callouts}>
            <FeatureCallout
              title="Turn Speech Into Software Commands"
              description="Extract intent and variables from a sentence."
              image={
                <StaticImage
                  width={395}
                  alt="Turn Speech Into Software Commands"
                  src="../../images/features/nlu/commands.png"
                />
              }
            />
            <FeatureCallout
              title="Don't Just Listen to Your Users"
              image={
                <StaticImage
                  width={395}
                  alt="Don't Just Listen to Your Users"
                  src="../../images/features/nlu/understand.png"
                />
              }
            />
            <FeatureCallout
              title="Respond the Same Way You Would to a Tap/Click"
              description="Integrate a voice interface into your software by responding to an NLU intent the same way you respond to a screen tap or mouse click."
              image={
                <StaticImage
                  width={395}
                  alt="Respond the Same Way You Would to a Tap/Click"
                  src="../../images/features/nlu/respond.png"
                />
              }
            />
            <FeatureCallout
              title="Import Models from 3rd-Party Providers"
              description="Easily import Alexa, DialogFlow, or Jovo NLU models into your software on all Spokestack Open Source platforms."
              image={
                <StaticImage
                  width={395}
                  alt="Import Models"
                  src="../../images/features/nlu/import.png"
                />
              }
            />
          </div>
        </Section>
        <Section title="Use Case for NLU">
          <div css={styles.callouts}>
            <FeatureCallout
              title="Simple Commands"
              image={
                <StaticImage
                  width={395}
                  alt="Simple Commands"
                  src="../../images/features/nlu/simple-commands.png"
                />
              }
            />
            <FeatureCallout
              title="Complex Utterances"
              image={
                <StaticImage
                  width={395}
                  alt="Complex Utterances"
                  src="../../images/features/nlu/complex-utterances.png"
                />
              }
            />
            <FeatureCallout
              title="More Sophisticated"
              description="Move from using RegEx-based approaches to a more sophisticated, robust solution."
              image={
                <StaticImage
                  width={395}
                  alt="More Sophisticated"
                  src="../../images/features/nlu/sophisticated.png"
                />
              }
            />
          </div>
        </Section>
        <Section title="What Are NLU Techniques?">
          <p>
            Spokestack&apos;s approach to NLU attempts to minimize the distance
            between slot value and function argument through the use of{' '}
            <a href="/docs/concepts/nlu#slot-parsing">slot parsers</a>, designed
            to deliver data from the NLU in the shape you&apos;ll actually need
            in your code. For example, the value of an <code>integer</code> slot
            will be a numeral instead of a string (<code>100</code> instead of{' '}
            <code>one hundred</code>). Slot parsers are designed to be
            pluggable, so you can add your own as needed.
          </p>
          <p>
            The basic task of NLU can be accomplished with many techniques,
            ranging from running{' '}
            <a href="https://en.wikipedia.org/wiki/Regular_expression">
              regular expressions
            </a>{' '}
            on incoming text to see if it contains any commands relevant to your
            application, classical machine learning methods like classifiers
            driven by{' '}
            <a href="https://en.wikipedia.org/wiki/Logistic_regression">
              logistic regression
            </a>{' '}
            or{' '}
            <a href="https://en.wikipedia.org/wiki/Support-vector_machine">
              support-vector machines
            </a>
            , or neural networks.
          </p>
          <blockquote>
            Spokestack&apos;s NLU uses the third approach, starting with a large
            pre-trained language model and fine-tuning it with data relevant to
            your application&apos;s domain. The fine-tuned model is then
            optimized, resulting in a version that&apos;s small enough to run in
            under a second on a modern mobile device.
          </blockquote>
          <p>
            You may have noticed that NLU produces two types of output, intents
            and slots. The intent is a form of{' '}
            <a href="https://en.wikipedia.org/wiki/Pragmatics">pragmatic</a>{' '}
            distillation of the entire utterance and is produced by a portion of
            the model trained as a{' '}
            <a href="https://en.wikipedia.org/wiki/Statistical_classification">
              classifier
            </a>
            . Slots, on the other hand, are decisions made about individual
            words (or <strong>tokens</strong>) within the utterance. These
            decisions are made by a <strong>tagger</strong>, a model similar to
            those used for{' '}
            <a href="https://en.wikipedia.org/wiki/Part-of-speech_tagging">
              part of speech tagging
            </a>
            .
          </p>
        </Section>
        <Section title="Training NLU Models">
          <p>
            Spokestack makes it simple to train an NLU model for your
            application. All you&apos;ll need is a collection of intents and
            slots and a set of example utterances for each intent, and
            we&apos;ll train and package a model that you can download and
            include in your application.
          </p>
          <p>
            If you&apos;ve already created a smart speaker skill, you likely
            have this collection already. Spokestack can{' '}
            <a href="/docs/integrations/nlu-export">import an NLU</a> model
            created for Alexa, DialogFlow, or Jovo directly, so there&apos;s no
            additional work required on your part.
          </p>
          <p>
            If you&apos;re starting from scratch, we recommend Spokestack&apos;s{' '}
            <a href="/docs/machine-learning/nlu-training-data">
              NLU training data format
            </a>
            . This will give you the maximum amount of flexibility, as our
            format supports several features you won&apos;t find elsewhere, like{' '}
            <a href="/docs/machine-learning/nlu-training-data#implicit-slot-values">
              implicit slots
            </a>{' '}
            and{' '}
            <a href="/docs/machine-learning/nlu-training-data#generators">
              generators
            </a>
            .
          </p>
          <p>
            Once you&apos;ve assembled your data, import it to your account
            using <a href="/account/nlu">the NLU tool</a> in your Spokestack
            account, and we&apos;ll notify you when training is complete.
          </p>
        </Section>
      </div>
      <Create />
    </Layout>
  )
}
