import { DEFAULT_WIDTH } from 'typography-breakpoint-constants'
import Layout from '../components/Layout'
import React from 'react'
import SEO from '../components/SEO'
import { css } from '@emotion/core'
import { rhythm } from '../utils/typography'

export default function Privacy() {
  return (
    <Layout>
      <SEO title="Privacy Policy" />
      <div css={styles.container}>
        <h3>What information we collect</h3>
        <p>
          Contact information. We collect information like your name or phone number. We may also
          collect your street address and email address.
        </p>
        <p>
          Information you submit or post. We collect information you post in a public space on our
          websites.
        </p>
        <p>
          Demographic information. We may collect information like your gender and age. We may
          collect your zip code (for example, to help you find a store that sells our products).
        </p>
        <p>
          Payment information. We may collect your credit card number and shipping address if you
          make a purchase.
        </p>
        <p>
          Other information. &nbsp;If you use our website, we may collect information about the
          browser you&rsquo;re using. We might look at what site you came from, or what site you
          visit when you leave us. In a mobile environment, we might collect your location.
        </p>
        <p>
          Job application information. If you apply for a job, we collect information about you,
          your prior education and work history and your skills and qualifications for the position.
          &nbsp;We may ask about your salary expectations, how you learned of the position and your
          driving record or other information about your ability to perform the position. We may
          also collect the last four digits of your social security number and your nationality.
        </p>

        <h3>How we collect information</h3>
        <p>
          We collect information directly from you. We collect information if you sign up for a
          newsletter, enter a promotion or fill out an online survey. We also collect information if
          you make a purchase or apply for a job.
        </p>
        <p>
          We collect information from you passively. We may use tracking tools like browser cookies
          and web beacons. We also collect information from our mobile apps.
        </p>
        <p>
          We get information about you from third parties. For example, our business partners or
          social media platforms may give us information about you.
        </p>

        <h3>How we use information</h3>
        <p>
          We use information to respond to your requests, questions, applications and entries. We
          may use your information to respond to your comments and questions, to notify you if you
          win a contest or sweepstakes or complete a purchase. If you apply for a job, we may use
          your information to process your application and determine if you are qualified.
        </p>
        <p>
          We use information to improve our products and services. We may use your information to
          make our websites and products better. We might use your information to customize your
          experience with us. We may combine information we get from you with information about you
          we get from third parties.
        </p>
        <p>
          We use information for security purposes. We may use information to protect our company,
          our customers, and our websites.
        </p>
        <p>
          We use information for marketing purposes. For example, we might send you information
          about new products and special offers. We might tell you about new promotions, features or
          updates. These might be third party offers or products we think you might find
          interesting. &nbsp;We may also use push notifications on our mobile apps. To manage this,
          read the &ldquo;Your Choices&rdquo; section below.
        </p>
        <p>
          We use information to communicate with you about your account or our relationship. We may
          contact you about your account or feedback. We might also contact you about this Policy or
          our website Terms.
        </p>
        <p>We use information as otherwise permitted by law.</p>

        <h3>Sharing information</h3>
        <p>
          We may share information within the Pylon ai family of companies which may be launched in
          the future.
        </p>
        <p>
          We may share information with third parties who perform services on our behalf. For
          example, we share information with vendors so they can perform services for us. &nbsp;We
          may also share information with companies that operate our websites or run a promotion for
          us.
        </p>
        <p>
          We may share information with joint promotion partners. Sometimes we conduct joint
          promotions with third parties. &nbsp;If you register for one of those joint promotions
          your information may be collected by both Pylon ai and the third party. &nbsp;Or, we may
          give you the option to have us share your information with the promotion partner.
          &nbsp;Your information will be used by us and/or by them as described in our posted
          privacy policies.
        </p>
        <p>
          We will share information if we think we have to in order to comply with the law or to
          protect ourselves. For example, we will share information to respond to a court order or
          subpoena. We may share it if a government agency or investigatory body requests. We might
          share information when we are investigating potential fraud. &nbsp;This might include
          fraud we think has happened during a sweepstakes or promotion.
        </p>
        <p>
          We may share information with any successor to all or part of our business. For example,
          if part of our business is sold we may give our customer list as part of that transaction.
        </p>
        <p>We may share information for other reasons we may describe to you.</p>

        <h3>Your choices about sharing and marketing practices</h3>
        <p>
          You can opt out of receiving our marketing emails. To stop receiving promotional emails
          from us, follow the instructions in any promotional message you get from us. Even if you
          opt out of getting marketing messages, we will still send you transactional messages and
          respond to questions from you.
        </p>

        <h3>California privacy rights</h3>
        <p>
          If you reside in California, you have the right to ask us one time each year if we have
          shared personal information with third parties for their direct marketing purposes. To
          make a request, please send us an email or write to us at the address listed below.
          Indicate in your letter that you are a California resident making a &ldquo;shine the
          light&rdquo; inquiry.
        </p>

        <h3>Our sites are not for kids</h3>
        <p>
          Our sites and apps are meant for adults and teens. We do not knowingly collect personally
          identifiable information from children under 13. If you are a parent or legal guardian and
          think your child under 13 has given us information, you can contact us. Parents can learn
          more about how to protect children&#39;s privacy on-line here:
          https://www.consumer.ftc.gov/topics/protecting-kids-online
        </p>

        <h3>We use standard security measures</h3>
        <p>
          The Internet is not 100% secure. We cannot promise that your use of our sites will be
          completely safe. We encourage you to use caution when using the Internet. This includes
          not sharing your passwords. We keep personal information as long as it is necessary or
          relevant for the practices described in this Policy. We also keep information as otherwise
          required by law.
        </p>

        <h3>We store information in the United States</h3>
        <p>
          If you live outside of the U.S., you understand and agree that we may transfer your
          information to the United States. This site is subject to U.S. laws, which may not afford
          the same level of protection as those in your country.
        </p>

        <h3>
          We may link to other sites or have third party services on our site we don&rsquo;t control
        </h3>
        <p>
          If you click on a link to a third party site, you will be taken to websites or pages we do
          not control. &nbsp;This includes social media sites. This policy does not apply to the
          privacy practices of third party websites. Read the privacy policy of other websites
          carefully. We are not responsible for third party policies or practices.
        </p>
        <p>
          Our site may also serve third party content that contains the third party&rsquo;s own
          cookies or tracking technologies. &nbsp;We do not control the use of those technologies.
        </p>

        <h3>We use common tracking technologies</h3>
        <p>
          We collect personal information about users over time and across different Web sites when
          you use this Web site or service. We also have third parties that collect personal
          information this way. We use several common tracking tools to do this. Our vendors may
          also use these tools. These tools may include browser cookies or web beacons. We use these
          tools:
        </p>
        <ul>
          <li>To recognize new or past customers.</li>
          <li>To store your password if you are registered on our site.</li>
          <li>To improve our website.</li>
          <li>
            To serve you with advertising content in which we think you will be interested. To do
            so, we may observe your behaviors on this website and other websites. We may also
            collect information about your browsing history.
          </li>
          <li>To better understand the interests of our customers and our website visitors</li>
        </ul>

        <h3>You can control tracking tools</h3>
        <p>
          Your browser may give you the ability to control cookies. How you do so depends on the
          type of cookie. Certain browsers can be set to reject browser cookies. If you block
          cookies on your browser, certain features on our sites may not work. Choices you make are
          both browser and device-specific. If you block or delete cookies, not all of the tracking
          that we have described in this policy will stop.
        </p>
        <p>
          You can control tools on your mobile devices. For example, you can turn off the GPS
          locator or push notifications on your phone. Each push notification has an
          &ldquo;unsubscribe&rdquo; link. Some browsers have a &ldquo;Do Not Track&rdquo; feature
          that lets you tell websites that you do not want to have your online activities tracked.
          These features are not yet uniform, so we are not currently set up to respond to those
          signals.
        </p>

        <h3>Our ads may be served based on tracking</h3>
        <p>
          We may work with online advertising companies to show you relevant and useful ads. This
          includes ads served on other companies&rsquo; sites. These ads may be served based on
          information collected by us or third parties. For example, information a third party
          collects when you register for a site, like your zip code. This might be used to target an
          ad for people in your area. These ads may also be based on your activities on our websites
          or on third party sites.
        </p>

        <h3>You can opt-out of online behavioral advertising</h3>
        <p>
          To opt out of having your online behavior collected for advertising purposes, visit
          http://www.aboutads.info/choices. Choices you make are both browser and device-specific.
        </p>

        <h3>Contact us if you have more questions</h3>
        <p>
          If you have any questions about this Policy, please contact Pylon ai Consumer Relations:
        </p>
        <p>By Mail: 369 3rd Street #B575, San Rafael, CA 94901</p>
        <p>By Phone: 1-415-493-8322</p>

        <h3>We may update this policy</h3>
        <p>
          From time to time we may change our privacy policies. We will notify you of any material
          changes to our Policy as required by law. We will also post an updated copy on our
          website. &nbsp;Please check our site periodically for updates.
        </p>
      </div>
    </Layout>
  )
}
const styles = {
  container: css`
    padding: ${rhythm(1)};
    max-width: ${DEFAULT_WIDTH};
    margin: 0 auto;
  `
}
