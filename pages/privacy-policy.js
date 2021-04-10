import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Layout from '../src/Layout';
import { Box, Container, Grid, Typography } from '@material-ui/core';
import {
  commonStyles,
  desktopStyles,
  mobileStyles,
  TabStyles,
} from '../src/styles';

const useStyles = makeStyles((theme) => ({
  ...commonStyles,
  [theme.breakpoints.up('md')]: desktopStyles,
  [theme.breakpoints.between('sm', 'md')]: TabStyles,
  [theme.breakpoints.down('sm')]: mobileStyles,
}));

<style jsx>{`
        ol {
            margin: 0;
            padding: 0
        }

        table td,
        table th {
            padding: 0
        }

        .c7 {
            color: #000000;
            font-weight: 700;
            text-decoration: none;
            vertical-align: baseline;
            font-size: 15pt;
            font-family: "Arial";
            font-style: normal
        }

        .c0 {
            color: #000000;
            font-weight: 400;
            text-decoration: none;
            vertical-align: baseline;
            font-size: 11pt;
            font-family: "Arial";
            font-style: normal
        }

        .c3 {
            color: #000000;
            font-weight: 400;
            text-decoration: none;
            vertical-align: baseline;
            font-family: "Arial";
            font-style: normal
        }

        .c4 {
            padding-top: 12pt;
            padding-bottom: 12pt;
            line-height: 1.15;
            orphans: 2;
            widows: 2;
            text-align: left
        }

        .c14 {
            color: #000000;
            text-decoration: none;
            vertical-align: baseline;
            font-family: "Arial";
            font-style: normal
        }

        .c9 {
            text-decoration-skip-ink: none;
            -webkit-text-decoration-skip: none;
            color: #1155cc;
            text-decoration: underline
        }

        .c12 {
            font-weight: 400;
            vertical-align: baseline;
            font-family: "Arial";
            font-style: normal
        }

        .c10 {
            background-color: #ffffff;
            max-width: 451.4pt;
            padding: 72pt 72pt 72pt 72pt
        }

        .c11 {
            font-size: 15pt;
            font-weight: 700
        }

        .c8 {
            color: inherit;
            text-decoration: inherit
        }

        .c2 {
            font-size: 16pt;
            font-weight: 700
        }

        .c13 {
            font-size: 18pt;
            font-weight: 700
        }

        .c6 {
            margin-left: 54pt;
            text-indent: -18pt
        }

        .c1 {
            font-size: 12pt
        }

        .c5 {
            font-size: 7pt
        }

        .title {
            padding-top: 0pt;
            color: #000000;
            font-size: 26pt;
            padding-bottom: 3pt;
            font-family: "Arial";
            line-height: 1.15;
            page-break-after: avoid;
            orphans: 2;
            widows: 2;
            text-align: left
        }

        .subtitle {
            padding-top: 0pt;
            color: #666666;
            font-size: 15pt;
            padding-bottom: 16pt;
            font-family: "Arial";
            line-height: 1.15;
            page-break-after: avoid;
            orphans: 2;
            widows: 2;
            text-align: left
        }

        li {
            color: #000000;
            font-size: 11pt;
            font-family: "Arial"
        }

        p {
            margin: 0;
            color: #000000;
            font-size: 11pt;
            font-family: "Arial"
        }

        h1 {
            padding-top: 20pt;
            color: #000000;
            font-size: 20pt;
            padding-bottom: 6pt;
            font-family: "Arial";
            line-height: 1.15;
            page-break-after: avoid;
            orphans: 2;
            widows: 2;
            text-align: left
        }

        h2 {
            padding-top: 18pt;
            color: #000000;
            font-size: 16pt;
            padding-bottom: 6pt;
            font-family: "Arial";
            line-height: 1.15;
            page-break-after: avoid;
            orphans: 2;
            widows: 2;
            text-align: left
        }

        h3 {
            padding-top: 16pt;
            color: #434343;
            font-size: 14pt;
            padding-bottom: 4pt;
            font-family: "Arial";
            line-height: 1.15;
            page-break-after: avoid;
            orphans: 2;
            widows: 2;
            text-align: left
        }

        h4 {
            padding-top: 14pt;
            color: #666666;
            font-size: 12pt;
            padding-bottom: 4pt;
            font-family: "Arial";
            line-height: 1.15;
            page-break-after: avoid;
            orphans: 2;
            widows: 2;
            text-align: left
        }

        h5 {
            padding-top: 12pt;
            color: #666666;
            font-size: 11pt;
            padding-bottom: 4pt;
            font-family: "Arial";
            line-height: 1.15;
            page-break-after: avoid;
            orphans: 2;
            widows: 2;
            text-align: left
        }

        h6 {
            padding-top: 12pt;
            color: #666666;
            font-size: 11pt;
            padding-bottom: 4pt;
            font-family: "Arial";
            line-height: 1.15;
            page-break-after: avoid;
            font-style: italic;
            orphans: 2;
            widows: 2;
            text-align: left
        }
      `}</style>


export default function About({ bproducts, sproducts, events, reviews, ads }) {
  const classes = useStyles();

    return (
    <Layout>
        <section className={classes.section}>
        <Container maxWidth="xl">
          <Box>
            <Typography variant="h3">
            Privacy Policy for friendzproducts
            </Typography>
                        <p class="c4"><span class="c1">At friendzproducts, accessible from</span><span class="c1"><a class="c8"
                            href="https://www.google.com/url?q=http://friendzproducts.com/&amp;sa=D&amp;source=editors&amp;ust=1616178051714000&amp;usg=AOvVaw0LrgZJ-pDej5VZza3ZqjdA">&nbsp;</a></span><span
                                class="c9 c1"><a class="c8"
                                    href="https://www.google.com/url?q=http://friendzproducts.com/&amp;sa=D&amp;source=editors&amp;ust=1616178051714000&amp;usg=AOvVaw0LrgZJ-pDej5VZza3ZqjdA">http://friendzproducts.com/</a></span><span
                                        class="c1">&nbsp;one of our main priorities is the privacy of our visitors. This Privacy Policy document
            contains types of information that is collected and recorded by friendzproducts and how we use it.</span>
                        </p>
                        <p class="c4"><span class="c1">If you have additional questions or require more information about our Privacy
            Policy, do not hesitate to contact us.</span></p>
                        <p class="c4"><span class="c3 c1">This Privacy Policy applies only to our online activities and is valid for
                        visitors to our website with regards to the information that they shared and/or collect in friendzproducts.
                        This policy is not applicable to any information collected offline or via channels other than this
            website.</span></p>
                        <p class="c4"><span class="c2">Consent</span></p>
                        <p class="c4"><span class="c1">By using our website, you hereby consent to our Privacy Policy and agree to its
            terms.</span></p>
                        <p class="c4"><span class="c2">Information we collect</span><span class="c0">&nbsp;</span></p>
                        <p class="c4"><span class="c3 c1">The personal information that you are asked to provide, and the reasons why you
                        are asked to provide it, will be made clear to you at the point we ask you to provide your personal
            information.</span></p>
                        <p class="c4"><span class="c3 c1">If you contact us directly, we may receive additional information about you such
                        as your name, email address, phone number, the contents of the message and/or attachments you may send us,
            and any other information you may choose to provide.</span></p>
                        <p class="c4"><span class="c1">When you register for an Account, we may ask for your contact information, including
            items such as name, college name, address, email address, bank account details and telephone number.</span>
                        </p>
                        <p class="c4"><span class="c2">How we use your information</span></p>
                        <p class="c4"><span class="c1">We use the information we collect in various ways, including to:</span></p>
                        <p class="c4"><span class="c0">&nbsp;</span></p>
                        <p class="c4 c6"><span>&#9679;</span><span class="c5">&nbsp; &nbsp; &nbsp;</span><span class="c0">Provide, operate,
            and maintain our website</span></p>
                        <p class="c4 c6"><span>&#9679;</span><span class="c5">&nbsp; &nbsp; &nbsp;</span><span class="c0">Improve,
            personalize, and expand our website</span></p>
                        <p class="c4 c6"><span>&#9679;</span><span class="c5">&nbsp; &nbsp; &nbsp;</span><span class="c0">Understand and
            analyze how you use our website</span></p>
                        <p class="c4 c6"><span>&#9679;</span><span class="c5">&nbsp; &nbsp; &nbsp;</span><span class="c0">Develop new
            products, services, features, and functionality</span></p>
                        <p class="c4 c6"><span>&#9679;</span><span class="c5">&nbsp; &nbsp; &nbsp;</span><span class="c0">Communicate with
                        you, either directly or through one of our partners, including for customer service, to provide you with
            updates and other information relating to the website, and for marketing and promotional purposes</span></p>
                        <p class="c4 c6"><span>&#9679;</span><span class="c5">&nbsp; &nbsp; &nbsp;</span><span class="c0">Send you
            emails</span></p>
                        <p class="c4 c6"><span>&#9679;</span><span class="c5">&nbsp; &nbsp; &nbsp;</span><span class="c0">Find and prevent
            fraud</span></p>
                        <p class="c4"><span class="c2">Log Files</span></p>
                        <p class="c4"><span class="c1">friendzproducts follows a standard procedure of using log files. These files log
                        visitors when they visit websites. All hosting companies do this and a part of hosting services&#39;
                        analytics. The information collected by log files include internet protocol (IP) addresses, browser type,
                        Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of
                        clicks. These are not linked to any information that is personally identifiable. The purpose of the
                        information is for analyzing trends, administering the site, tracking users&#39; movement on the website,
            and gathering demographic information.</span></p>
                        <p class="c4"><span class="c11">Cookies and Web Beacons</span></p>
                        <p class="c4"><span class="c1">Like any other website, friendzproducts uses &#39;cookies&#39;. These cookies are
                        used to store information including visitors&#39; preferences, and the pages on the website that the visitor
                        accessed or visited. The information is used to optimize the users&#39; experience by customizing our web
            page content based on visitors&#39; browser type and/or other information.</span></p>
                        <p class="c4"><span class="c1">For more general information on cookies, please read &quot;</span><span
                            class="c9 c1"><a class="c8"
                                href="https://www.google.com/url?q=https://www.cookieconsent.com/what-are-cookies/&amp;sa=D&amp;source=editors&amp;ust=1616178051717000&amp;usg=AOvVaw1e-J9PjrV-PCt2YrFHjuuS">https://www.cookieconsent.com/what-are-cookies/</a></span>
                        </p>
                        <p class="c4"><span class="c3 c1">What Are Cookies from Cookie Consent.</span></p>
                        <p class="c4"><span class="c2">Google DoubleClick DART Cookie</span></p>
                        <p class="c4"><span class="c1">Google is one of a third-party vendor on our site. It also uses cookies, known as
                        DART cookies, to serve ads to our site visitors based upon their visit to www.website.com and other sites on
                        the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and
            content network Privacy Policy at the following URL</span><span class="c1"><a class="c8"
                                href="https://www.google.com/url?q=https://policies.google.com/technologies/ads&amp;sa=D&amp;source=editors&amp;ust=1616178051717000&amp;usg=AOvVaw3lFRjb140_htpb1VN9t73X">&nbsp;</a></span><span
                                    class="c9 c1"><a class="c8"
                                        href="https://www.google.com/url?q=https://policies.google.com/technologies/ads&amp;sa=D&amp;source=editors&amp;ust=1616178051717000&amp;usg=AOvVaw3lFRjb140_htpb1VN9t73X">https://policies.google.com/technologies/ads</a></span>
                        </p>
                        <p class="c4"><span class="c3 c1">&nbsp;</span></p>
                        <p class="c4"><span class="c2">Our Advertising Partners</span></p>
                        <p class="c4"><span class="c1">Some of advertisers on our site may use cookies and web beacons. Our advertising
                        partners are listed below. Each of our advertising partners has their own Privacy Policy for their policies
            on user data. For easier access, we hyperlinked to their Privacy Policies below.</span></p>
                        <p class="c4 c6"><span class="c1">&#9679;</span><span
                            class="c5">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="c1">Google</span><span
                                class="c1"><a class="c8"
                                    href="https://www.google.com/url?q=https://policies.google.com/technologies/ads&amp;sa=D&amp;source=editors&amp;ust=1616178051718000&amp;usg=AOvVaw2dd1e-bLfrNfJvMXf-EXPS">&nbsp;</a></span><span
                                        class="c9"><a class="c8"
                                            href="https://www.google.com/url?q=https://policies.google.com/technologies/ads&amp;sa=D&amp;source=editors&amp;ust=1616178051718000&amp;usg=AOvVaw2dd1e-bLfrNfJvMXf-EXPS">https://policies.google.com/technologies/ads</a></span>
                        </p>
                        <p class="c4"><span class="c2">Advertising Partners Privacy Policies</span></p>
                        <p class="c4"><span class="c3 c1">You may consult this list to find the Privacy Policy for each of the advertising
            partners of friendzproducts.</span></p>
                        <p class="c4"><span class="c1">Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or
                        Web Beacons that are used in their respective advertisements and links that appear on friendzproducts, which
                        are sent directly to users&#39; browser. They automatically receive your IP address when this occurs. These
                        technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the
            advertising content that you see on websites that you visit.</span></p>
                        <p class="c4"><span class="c1">Note that friendzproducts has no access to or control over these cookies that are
            used by third-party advertisers.</span></p>
                        <p class="c4"><span class="c2">Third Party Privacy Policies</span></p>
                        <p class="c4"><span class="c1">friendzproducts&#39;s Privacy Policy does not apply to other advertisers or websites.
                        Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for
                        more detailed information. It may include their practices and instructions about how to opt-out of certain
            options.</span></p>
                        <p class="c4"><span class="c1">You can choose to disable cookies through your individual browser options. To know
                        more detailed information about cookie management with specific web browsers, it can be found at the
            browsers&#39; respective websites.</span></p>
                        <p class="c4"><span class="c11">CCPA Privacy Rights (Do Not Sell My Personal Information)</span></p>
                        <p class="c4"><span class="c3 c1">Under the CCPA, among other rights,consumers have the right to:</span></p>
                        <p class="c4"><span class="c3 c1">Request that a business that collects a consumer&#39;s personal data disclose the
            categories and specific pieces of personal data that a business has collected about consumers.</span></p>
                        <p class="c4"><span class="c3 c1">Request that a business delete any personal data about the consumer that a
            business has collected.</span></p>
                        <p class="c4"><span class="c3 c1">Request that a business that sells a consumer&#39;s personal data, not sell the
            consumer&#39;s personal data.</span></p>
                        <p class="c4"><span class="c1">If you make a request, we have one month to respond to you. If you would like to
            exercise any of these rights, please contact us.</span></p>
                        <p class="c4"><span class="c2">GDPR Data Protection Rights</span></p>
                        <p class="c4"><span class="c3 c1">We would like to make sure you are fully aware of all of your data protection
            rights. Every user is entitled to the following</span></p>
                        <p class="c4"><span class="c1 c3">The right to access &ndash; You have the right to request copies of your personal
            data. We may charge you a small fee for this service.</span></p>
                        <p class="c4"><span class="c3 c1">The right to rectification &ndash; You have the right to request that we correct
                        any information you believe is inaccurate. You also have the right to request that we complete the
            information you believe is incomplete.</span></p>
                        <p class="c4"><span class="c3 c1">The right to erasure &ndash; You have the right to request that we erase your
            personal data, under certain conditions.</span></p>
                        <p class="c4"><span class="c3 c1">The right to restrict processing &ndash; You have the right to request that we
            restrict the processing of your personal data, under certain conditions.</span></p>
                        <p class="c4"><span class="c3 c1">The right to object to processing &ndash; You have the right to object to our
            processing of your personal data, under certain conditions.</span></p>
                        <p class="c4"><span class="c1">The right to data portability &ndash; You have the right to request that we transfer
                        the data that we have collected to another organization, or directly to you, under certain conditions.If you
                        make a request, we have one month to respond to you. If you would like to exercise any of these rights,
            please contact us.</span></p>
                        <p class="c4"><span class="c2">Children&#39;s Information</span></p>
                        <p class="c4"><span class="c1">Another part of our priority is adding protection for children while using the
                        internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their
            online activity.</span></p>
                        <p class="c4"><span class="c1">friendzproducts does not knowingly collect any Personal Identifiable Information from
                        children under the age of 13. If you think that your child provided this kind of information on our website,
                        we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such
            information from our records.</span></p>
              </Box>
        </Container>
      </section>
    </Layout>
  );
}