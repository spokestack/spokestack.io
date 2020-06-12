import React from 'react'
import Layout from '../components/Layout'
import { PageRendererProps } from 'gatsby'
import { css } from '@emotion/core'
import * as theme from '../styles/theme'

export default function Rules({ location }: PageRendererProps) {
  return (
    <Layout location={location}>
      <div css={styles.container}>
        <h1>Spokestack Export to Independence Developer Contest</h1>
        <h2>Official Rules</h2>
        <p>NO PURCHASE NECESSARY TO ENTER OR WIN.</p>
        <section>
          <h3>Eligibility</h3>
          <p>
            The{' '}
            <strong>Spokestack Export to Independence Developer Contest</strong>{' '}
            (the &ldquo;Contest&rdquo;) is open only to individuals who are
            legal residents of the fifty (50) United States of America or the
            District of Columbia who are eighteen (18) years of age or older at
            the time of entry. Employees, officers, and directors of Spokestack
            (&ldquo;Sponsor&rdquo;), and their immediate family members (spouse,
            parents, siblings, and children) and members of the same household
            (whether or not related), are not eligible.
          </p>
        </section>
        <section>
          <h3>Agreement to Official Rules</h3>
          <p>
            Participation in the Contest constitutes entrant’s full and
            unconditional acceptance of these Official Rules and the decisions
            of Sponsor, which are final and legally binding in all respects. The
            Contest is subject to all applicable federal, state, and local laws.
            Void outside the United States and where prohibited by law.
          </p>
        </section>
        <section>
          <h3>Registration</h3>
          <p>
            Please fill out{' '}
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSfXBFTLuyK8BWIFThCRNxMZwjgWBhVtE5EsCuQkvtaDaVvRqw/viewform">
              this online form
            </a>{' '}
            to register for the contest.
          </p>
        </section>
        <section>
          <h3>Entry</h3>
          <p>
            The Contest asks developers to convert their smart speaker skill to
            a mobile app on either iOS and/or Android mobile platforms using
            Spokestack’s Free Developer Package. This developer package contains
            the following tools:
          </p>
          <ul>
            <li>Automatic speech recognition (ASR) management</li>
            <li>An on-device natural language understanding (NLU) service</li>
            <li>The Spokestack Free Text-To-Speech Service</li>
            <li>A free Spokestack developer account</li>
          </ul>
          <p>
            After creating a Spokestack developer account, developers can export
            their smart speaker app’s interaction model and upload it to
            Spokestack for training for Spokestack’s on-device NLU service.
            Directions for exporting interaction models and uploading for
            training are included in Spokestack’s documentation. Spokestack
            includes Swift, Java and React Native programming language examples
            of Spokestack-powered mobile apps based on smart speaker interaction
            models.
          </p>
          <p>
            Entries will be judged based on usability, utility and creativity.
            Submissions <strong>do not</strong> need to have feature parity to
            the original smart speaker apps on which they are based.
          </p>
        </section>
        <section>
          <h3>Entry Submission</h3>
          <p>
            Please{' '}
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSfXBFTLuyK8BWIFThCRNxMZwjgWBhVtE5EsCuQkvtaDaVvRqw/viewform">
              register
            </a>{' '}
            before submitting an entry.
          </p>
          <p>
            When your submission is ready, send an email to{' '}
            <a href="mailto:contest@spokestack.io">contest@spokestack.io</a>{' '}
            that includes a short description of your app and a link to a GitHub
            respository with instructions on how to build the application. The
            email may also include an invite to a Testflight beta or Google Play
            beta.
          </p>
          <p>
            Submissions must be received between 12:00:01 a.m. Pacific Time
            (&ldquo;PT&rdquo;) on June 16th, 2020, and 11:59:59 p.m. PT on July
            16th, 2020 (the &ldquo;Entry Period&rdquo;).
          </p>
        </section>
        <section>
          <h3>Submission Requirements</h3>
          <p>
            The app you develop (your &ldquo;Submission&rdquo;) must be your own
            original work and must not contain any material that:
          </p>
          <ul>
            <li>
              violates or infringes another person or entity’s rights, including
              but not limited to privacy, publicity or intellectual property
              rights;
            </li>
            <li>
              depicts nudity or is indecent, obscene, hateful, tortious,
              defamatory, slanderous or libelous;
            </li>
            <li>
              promotes bigotry, racism, hatred or harm against any group or
              individual or promotes discrimination based on race, gender,
              religion, nationality, disability, sexual orientation or age;
            </li>
            <li>promotes activity that may be unsafe or dangerous;</li>
            <li>promotes any particular political agenda or message;</li>
            <li>enables or promotes any illegal activities; or</li>
            <li>
              is violates the laws of the United States or in the state where
              the Submission is created.
            </li>
          </ul>
          <p>
            Limitations on entry: You may make more than one Submission.
            Multiple Submissions should come from the same user account. Any
            attempt to enter by using multiple/different email addresses,
            identities, registrations and logins or any other methods will void
            that entrant&rsquo;s entry and that entrant may be disqualified. Use
            of any script, macro, or another mechanical or automated program to
            enter will result in disqualification and all such Submissions will
            be void.
          </p>
          <p>
            <strong>Gift for Entry</strong>: All entrants into the Contest will
            receive a free t-shirt. The t-shirt will be mailed to the address
            stated provided by the contestant in the{' '}
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSfXBFTLuyK8BWIFThCRNxMZwjgWBhVtE5EsCuQkvtaDaVvRqw/viewform">
              registration form
            </a>
            .
          </p>
        </section>
        <section>
          <h3>Determination of Winner</h3>
          <p>
            Five (5) winners will be selected from among all submissions meeting
            the entry requirements received from eligible Entrants within the
            Entry Period (each a &ldquo;Winner&rdquo;).
          </p>
          <p>
            A panel of qualified judges determined by Sponsor in its sole
            discretion will select the top Submission from among all eligible
            Submissions. Submissions will be judged based on the following
            criteria:
          </p>
          <ul>
            <li>Usability (50%)</li>
            <li>Utility (40%)</li>
            <li>Creativity (10%)</li>
          </ul>
          <p>
            In the event of a tie, those entries will be reevaluated by the
            judges in a head-to-head manner until the judges agree on a winner.
            Decisions of the judges are final and binding.
          </p>
        </section>
        <section>
          <h3>Prizes</h3>
          <p>
            One grand prize winner will receive $5,000 in U.S. dollars. Ten
            runner-up submissions will receive $500. All winner will receive
            their cash award in the form of a company check. In no event will
            more than eleven (11) cash prizes be awarded.
          </p>
        </section>
        <section>
          <h3>Prize Conditions</h3>
          <p>
            Grand prize winner is fully responsible for all applicable taxes
            (including income and withholding taxes). Sponsor is required by law
            to obtain the Grand Prize winners’ social security number on Form
            W-9 and will issue each Winner an IRS Form 1099-MISC for the full
            value of the prize.
          </p>
        </section>
        <section>
          <h3>Notification</h3>
          <p>
            Only Winners will be notified. Entrants will not be notified if
            their Submission is disqualified or if their Submission does not
            win. The potential Winners will be notified by email (in the sole
            discretion of Sponsor) provided at the time of entry on or around
            July 14, 2020 (&ldquo;Prize Notification&rdquo;). The potential
            Winner must, within seven (7) days of the date of issuance, execute
            and return an Affidavit of Eligibility and Release of Liability and,
            unless prohibited by law, a Publicity Release, and any other
            document(s) required by Sponsor. In the event that the Prize
            Notification is returned as undeliverable, or the potential Winner
            is otherwise unreachable for any reason within the stated time, the
            Sponsor may award the prize to an alternate potential Winner. If any
            potential Winner is deemed a minor under the laws of his/her state
            of residence, confirmation of eligibility and acceptance of these
            Official Rules may be required from a parent or legal guardian or
            disqualification may result.
          </p>
        </section>
        <section>
          <h3>Entry Conditions</h3>
          <p>
            As a condition of entry into this Contest, you represent, warrant
            and agree that (i) the Submission is your wholly original
            creation,(ii) you are the exclusive owner of all of the rights to
            the Submission, (iii) you have all rights necessary to present the
            Submission to Sponsor, and (iv) the Submission does not infringe on
            the intellectual property or any other rights of any third party.
            Each entrant agrees to list their Submissions publicly on Sponsor’s
            website and other promotional materials related to the Contest and
            Sponsor’s business.
          </p>
        </section>
        <section>
          <h3>General Conditions</h3>
          <p>
            The decisions of the Sponsor are final and binding on all matters
            relating to this Contest. Sponsor shall have the sole right to
            disqualify any entrant for violation of these Official Rules or any
            applicable laws relating to the Contest, and to resolve all disputes
            in Sponsor’s sole discretion. Sponsor’s failure to enforce any term
            of these Official Rules shall not constitute a waiver of that
            provision.
          </p>
          <p>
            In the event of a dispute as to the ownership of any entry, the
            authorized account holder of the email address used to enter will be
            deemed to be the entrant and he/she must comply with these Official
            Rules. Potential Winners may be required to show proof of being the
            authorized account holder. The &ldquo;authorized account
            holder&rdquo; is the natural person assigned an email address by an
            Internet access provider, online service provider or other
            organization responsible for assigning email addresses for the
            domain associated with the submitted address.
          </p>
          <p>
            Sponsor reserves the right to cancel, suspend, and/or modify the
            Contest, in whole or in part, if any fraud, virus or other problem
            corrupts the administration, security, or fairness of the Contest,
            as determined by Sponsor in its sole discretion. In such event,
            Sponsor reserves the right to award the prize(s) from among the
            non-suspect eligible Submissions received up to the time of the
            impairment or cancellation. Sponsor reserves the right in its sole
            discretion to disqualify any individual it finds to be tampering
            with the entry process or the operation of the Contest, annoying,
            abusing, threatening or harassing any other entrant or
            Sponsor&rsquo;s representatives, or to be acting in violation of
            these Official Rules. Any attempt by any person to undermine the
            legitimate operation of the Contest may be a violation of criminal
            and civil law, and, should such an attempt be made, Sponsor reserves
            the right to seek damages from any such person to the fullest extent
            permitted by law.
          </p>
          <p>
            The Released Parties (as defined below) are not responsible for
            incomplete, inaccurate, misdirected, lost, delayed, stolen,
            postage-due, damaged, or garbled Submissions, entries, email or
            mail; or for lost, interrupted or unavailable telephone, computer
            network, Internet Service Provider, computer hardware or software
            malfunctions or failures, or other errors or problems of any kind
            whether human, mechanical, electronic, computer or communication
            network, typographical, printing or otherwise relating to or in
            connection with entry into Contest, administration of the Contest,
            the processing of entries, the availability of Prizes or any portion
            of Prizes, the announcement of Winners or in any Contest-related
            materials. Released Parties are also not responsible for any
            incorrect or inaccurate information caused by website users,
            tampering, hacking, or by any equipment or programming associated
            with or utilized in the Contest. Proof of submission is not proof of
            receipt by Sponsor.
          </p>
          <p>
            Released Parties are not responsible for injury, death or damage to
            participants or to any other person or their computer or property
            related to or resulting from participating in this Contest,
            accepting or using a Prize or downloading materials from or use of
            Sponsor’s website or services.
          </p>
        </section>
        <section>
          <h3>Governing Law</h3>
          <p>
            All issues and questions relating to the Contest or concerning the
            construction, validity, interpretation and enforceability of these
            Official Rules, entrant’s rights and obligations or the rights and
            obligations of the Sponsor in connection with the Contest, shall be
            governed by, and construed in accordance with, the laws of the State
            of California, without giving effect to any choice of law or
            conflict of law rules (whether of California or any other
            jurisdiction), which would cause the application of the laws of any
            jurisdiction other than California.
          </p>
        </section>
        <section>
          <h3>Release and Indemnification</h3>
          <p>
            ENTRANTS AGREE TO RELEASE, INDEMNIFY AND HOLD HARMLESS SPONSOR AND
            ITS AFFILIATES, AND EACH OF THEIR DIRECTORS, EMPLOYEES, OFFICERS,
            AND AGENTS (COLLECTIVELY, &ldquo;RELEASED PARTIES&rdquo;) FROM AND
            AGAINST ANY INJURIES, DEATH, LOSSES, DAMAGES, CLAIMS, ACTIONS AND
            OTHER LIABILITY OF ANY KIND RESULTING OR ARISING FROM THE CONTEST OR
            ACCEPTANCE, POSSESSION, USE, MISUSE OR NONUSE OF ANY PRIZE THAT MAY
            BE AWARDED.
          </p>
        </section>
        <section>
          <h3>Dispute Resolution</h3>
          <p>
            All disputes, claims, controversies or causes of action arising out
            of or relating to this Contest or the Official Rules (each, a
            &ldquo;Claim&rdquo;), shall be resolved exclusively in the federal
            or state courts of appropriate jurisdiction in San Francisco, CA
          </p>
          <p>
            IN NO EVENT SHALL EITHER PARTY BE ENTITLED TO RECOVER PUNITIVE,
            EXEMPLARY, CONSEQUENTIAL OR INCIDENTAL DAMAGES OR HAVE DAMAGES
            MULTIPLIED OR OTHERWISE INCREASED, OR AN AWARD OF ATTORNEYS’ FEES OR
            OTHER SUCH RELATED COSTS OF BRINGING A CLAIM, OR TO REVOKE OR
            RESCIND THIS AGREEMENT. PARTICIPANTS AGREE THAT THE RIGHTS AND
            OBLIGATIONS OF ANY PARTICIPANT AND/OR RELEASED PARTIES AND/OR ANY
            OTHER PARTY SHALL BE RESOLVED INDIVIDUALLY, WITHOUT RESORT TO ANY
            FORM OF CLASS ACTION. ENTRANT FURTHER AGREES THAT THE RELEASED
            PARTIES’ LIABILITY WILL BE LIMITED TO THE COST OF ENTERING AND
            PARTICIPATING IN THE CONTEST, OR THE VALUE OF THE PRIZE IF THE
            ENTRANT WAS PROPERLY SELECTED AS A WINNER. SOME JURISDICTIONS DO NOT
            ALLOW THE LIMITATION OR EXCLUSION OF LIABILITY FOR INCIDENTAL OR
            CONSEQUENTIAL DAMAGES. ACCORDINGLY, SOME OF THESE LIMITATIONS MAY
            NOT APPLY TO YOU.
          </p>
          <p>
            ANY CLAIM MUST BE FILED WITHIN ONE (1) YEAR FROM THE END OF THE
            CONTEST PERIOD, OR THE CAUSE OF ACTION SHALL BE FOREVER BARRED.
          </p>
        </section>
        <section>
          <h3>Publicity Release</h3>
          <p>
            Each Winner, by acceptance of a prize, hereby grants Sponsor the
            right to publicize such Winner&rsquo;s name, city and state of
            residence, photograph, voice, statements and/or other likeness, a
            description of Winner’s entry, and prize information in any media
            now known or hereafter devised, throughout the world, in perpetuity,
            without limitation and without additional compensation or
            consideration, notification, approval or permission, unless
            prohibited by law.
          </p>
        </section>
        <section>
          <h3>Privacy</h3>
          <p>
            Personal information collected during the Contest may be used or
            disclosed by Sponsor and its affiliates as stated in these Official
            Rules (including for publicity and promotional purposes), for
            purposes of Contest administration, winner identification and
            qualification, winner notification, and prize award, to send you
            information about our products and services, and otherwise as
            described in our <a href="/privacy">Privacy Policy</a>.
          </p>
        </section>
        <section>
          <h3>Requesting Official Rules</h3>
          <p>
            To request a copy of the Official Rules, send an email to{' '}
            <a href="mailto:hello@spokestack.io">hello@spokestack.io</a>; or a
            self-addressed stamped envelope to Spokestack Attn: Export to
            Freedom Contest at 369 3rd Street, B575, San Rafael, CA 94901.
            Requests must be received by September 4th, 2020.
          </p>
        </section>
        <section>
          <h3>Requesting Winner&rsquo;s List</h3>
          <p>
            For a list of Winners, submit your request to{' '}
            <a href="mailto:hello@spokestack.io">hello@spokestack.io</a> by
            September 15, 2020.
          </p>
        </section>
        <section>
          <h3>Sponsor</h3>
          <p>
            The Contest is sponsored by Pylon ai, Inc., dba Spokestack at 369 3
            <sup>rd</sup> Street, B575, San Rafael, CA 94901
            (&ldquo;Sponsor&rdquo;).
          </p>
        </section>
      </div>
    </Layout>
  )
}

const styles = {
  container: css`
    display: flex;
    flex-direction: column;
    max-width: ${theme.MAX_TEXT_WIDTH};
    margin: 0 auto;
    padding: 50px 20px;

    ${theme.ieBreakpoint} {
      width: 100%;
    }
  `
}
