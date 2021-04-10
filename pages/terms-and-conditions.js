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

        .c1 {
            color: #000000;
            font-weight: 400;
            text-decoration: none;
            vertical-align: baseline;
            font-size: 11pt;
            font-family: "Arial";
            font-style: normal
        }

        .c2 {
            color: #000000;
            font-weight: 400;
            text-decoration: none;
            vertical-align: baseline;
            font-size: 12pt;
            font-family: "Arial";
            font-style: normal
        }

        .c0 {
            padding-top: 12pt;
            padding-bottom: 12pt;
            line-height: 1.15;
            orphans: 2;
            widows: 2;
            text-align: left
        }

        .c9 {
            padding-top: 0pt;
            padding-bottom: 0pt;
            line-height: 1.15;
            orphans: 2;
            widows: 2;
            text-align: left
        }

        .c7 {
            color: #000000;
            text-decoration: none;
            vertical-align: baseline;
            font-family: "Arial";
            font-style: normal
        }

        .c10 {
            text-decoration-skip-ink: none;
            -webkit-text-decoration-skip: none;
            color: #1155cc;
            text-decoration: underline
        }

        .c13 {
            background-color: #ffffff;
            max-width: 451.4pt;
            padding: 72pt 72pt 72pt 72pt
        }

        .c6 {
            font-size: 16pt;
            font-weight: 700
        }

        .c12 {
            color: inherit;
            text-decoration: inherit
        }

        .c11 {
            font-weight: 700;
            font-size: 18pt
        }

        .c4 {
            margin-left: 54pt;
            text-indent: -18pt
        }

        .c8 {
            height: 11pt
        }

        .c3 {
            font-size: 7pt
        }

        .c5 {
            font-size: 12pt
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

        p.c0.c4 {
            padding-bottom: 0;
        }


      `}</style>

export default function About({ bproducts, sproducts, events, reviews, ads }) {
  const classes = useStyles();

    return (
    <Layout>
        <section className={classes.section}>
        <Container maxWidth="xl">
          <Box className={classes.sectionHeader}>
            <Typography variant="h3">
              Terms and Conditions
            </Typography>
              <p class="c0"><span class="c2">Welcome to friendzproducts!</span></p>
              <p class="c0"><span class="c5">These terms and conditions outline the rules and regulations for the use of
            friendzproducts&#39;s Website, located at</span><span class="c5"><a class="c12"
                  href="https://www.google.com/url?q=http://friendzproducts.com/&amp;sa=D&amp;source=editors&amp;ust=1616177031879000&amp;usg=AOvVaw21JZlq79PPcwmxtRjP0EZj">&nbsp;</a></span><span
                    class="c5 c10"><a class="c12"
                      href="https://www.google.com/url?q=http://friendzproducts.com/&amp;sa=D&amp;source=editors&amp;ust=1616177031879000&amp;usg=AOvVaw21JZlq79PPcwmxtRjP0EZj">http://friendzproducts.com/</a></span><span
                        class="c2">.</span></p>
              <p class="c0"><span class="c2">By accessing this website we assume you accept these terms and conditions. Do not
              continue to use friendzproducts if you do not agree to take all of the terms and conditions stated on this
            page.</span></p>
              <p class="c0"><span class="c2">The following terminology applies to these Terms and Conditions, Privacy Statement
              and Disclaimer Notice and all Agreements: &quot;Client&quot;, &quot;You&quot; and &quot;Your&quot; refers to
              you, the person log on this website and compliant to the Company&rsquo;s terms and conditions. &quot;The
              Company&quot;, &quot;Ourselves&quot;, &quot;We&quot;, &quot;Our&quot; and &quot;Us&quot;, refers to our
              Company. &quot;Party&quot;, &quot;Parties&quot;, or &quot;Us&quot;, refers to both the Client and ourselves.
              All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of
              our assistance to the Client in the most appropriate manner for the express purpose of meeting the
              Client&rsquo;s needs in respect of provision of the Company&rsquo;s stated services, in accordance with and
              subject to, prevailing law of Netherlands. Any use of the above terminology or other words in the singular,
              plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to the
            same.</span></p>
              <p class="c0"><span class="c1">&nbsp;</span></p>
              <p class="c0"><span class="c7 c6">Cookies</span></p>
              <p class="c0"><span class="c2">We employ the use of cookies. By accessing friendzproducts, you agreed to use cookies
            in agreement with the friendzproducts&#39;s Privacy Policy.</span></p>
              <p class="c0"><span class="c2">Most interactive websites use cookies to let us retrieve the user&rsquo;s details for
              each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier
            for people visiting our website. Some of our affiliate/advertising partners may also use cookies.</span></p>
              <p class="c0"><span>&nbsp;</span><span class="c7 c6">License</span></p>
              <p class="c0"><span class="c2">Unless otherwise stated, friendzproducts and/or its licensors own the intellectual
              property rights for all material on friendzproducts. All intellectual property rights are reserved. You may
              access this from friendzproducts for your own personal use subjected to restrictions set in these terms and
            conditions.</span></p>
              <p class="c0"><span class="c2">You must not:</span></p>
              <p class="c0 c8"><span class="c1"></span></p>
              <p class="c0 c4"><span>&#9679;</span><span class="c3">&nbsp; &nbsp; &nbsp;</span><span>&nbsp; &nbsp; </span><span
                class="c2">Republish material from friendzproducts</span></p>
              <p class="c0 c4"><span class="c5">&#9679;</span><span
                class="c3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="c2">&nbsp; &nbsp; Sell,
            rent or sub-license material from friendzproducts</span></p>
              <p class="c0 c4"><span class="c5">&#9679;</span><span
                class="c3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="c2">&nbsp; &nbsp;
            Reproduce, duplicate or copy material from friendzproducts</span></p>
              <p class="c0 c4"><span class="c5">&#9679;</span><span
                class="c3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="c2">&nbsp; &nbsp;
            Redistribute content from friendzproducts</span></p>
              <p class="c0"><span class="c2">&nbsp;</span></p>
              <p class="c0"><span class="c2">Parts of this website offer an opportunity for users to post and exchange opinions
              and information in certain areas of the website. friendzproducts does not filter, edit, publish or review
              Comments prior to their presence on the website. Comments do not reflect the views and opinions of
              friendzproducts,its agents and/or affiliates. Comments reflect the views and opinions of the person who post
              their views and opinions. To the extent permitted by applicable laws, friendzproducts shall not be liable
              for the Comments or for any liability, damages or expenses caused and/or suffered as a result of any use of
            and/or posting of and/or appearance of the Comments on this website.</span></p>
              <p class="c0"><span class="c2">friendzproducts reserves the right to monitor all Comments and to remove any Comments
            which can be considered inappropriate, offensive or causes breach of these Terms and Conditions.</span></p>
              <p class="c0"><span>&nbsp;</span><span class="c2">You warrant and represent that:</span></p>
              <p class="c0 c4"><span class="c5">&#9679;</span><span
                class="c3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="c2">&nbsp; &nbsp; You
                are entitled to post the Comments on our website and have all necessary licenses and consents to do
            so;</span></p>
              <p class="c0 c4"><span class="c5">&#9679;</span><span
                class="c3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="c2">&nbsp; &nbsp; The
                Comments do not invade any intellectual property right, including without limitation copyright, patent or
            trademark of any third party;</span></p>
              <p class="c0 c4"><span class="c5">&#9679;</span><span
                class="c3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="c2">&nbsp; &nbsp; The
                Comments do not contain any defamatory, libelous, offensive, indecent or otherwise unlawful material which
            is an invasion of privacy</span></p>
              <p class="c0 c4"><span class="c5">&#9679;</span><span
                class="c3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="c2">&nbsp; &nbsp; The
                Comments will not be used to solicit or promote business or custom or present commercial activities or
            unlawful activity.</span></p>
              <p class="c0"><span class="c2">You hereby grant friendzproducts a non-exclusive license to use, reproduce, edit and
              authorize others to use, reproduce and edit any of your Comments in any and all forms, formats or
            media.</span></p>
              <p class="c0 c8"><span class="c2"></span></p>
              <p class="c0"><span class="c6">Hyperlinking to our Content</span><span class="c1">&nbsp;</span></p>
              <p class="c0"><span class="c2">The following organizations may link to our Website without prior written
            approval:</span></p>
              <p class="c0 c4"><span class="c5">&#9679;</span><span
                class="c3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="c2">&nbsp; &nbsp;
            Government agencies;</span></p>
              <p class="c0 c4"><span class="c5">&#9679;</span><span
                class="c3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="c2">&nbsp; &nbsp;
            Search engines;</span></p>
              <p class="c0 c4"><span class="c5">&#9679;</span><span
                class="c3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="c2">&nbsp; &nbsp; News
            organizations;</span></p>
              <p class="c0 c4"><span class="c5">&#9679;</span><span
                class="c3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="c2">&nbsp; &nbsp;
                Online directory distributors may link to our Website in the same manner as they hyperlink to the Websites
            of other listed businesses; and</span></p>
              <p class="c0 c4"><span class="c5">&#9679;</span><span
                class="c3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="c2">&nbsp; &nbsp;
                System wide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and
            charity fundraising groups which may not hyperlink to our Website.</span></p>
              <p class="c0"><span class="c2">These organizations may link to our home page, to publications or to other Website
              information so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship,
              endorsement or approval of the linking party and its products and/or services; and (c) fits within the
            context of the linking party&rsquo;s site.</span></p>
              <p class="c0"><span class="c2">We may consider and approve other link requests from the following types of
            organizations:</span></p>
              <p class="c0 c4"><span class="c5">&#9679;</span><span
                class="c3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="c2">&nbsp; &nbsp;
            commonly-known consumer and/or business information sources;</span></p>
              <p class="c0 c4"><span class="c5">&#9679;</span><span
                class="c3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="c2">&nbsp; &nbsp;
            dot.com community sites;</span></p>
              <p class="c0 c4"><span class="c5">&#9679;</span><span
                class="c3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="c2">&nbsp; &nbsp;
            associations or other groups representing charities;</span></p>
              <p class="c0 c4"><span class="c5">&#9679;</span><span
                class="c3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="c2">&nbsp; &nbsp;
            online directory distributors;</span></p>
              <p class="c0 c4"><span class="c5">&#9679;</span><span
                class="c3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="c2">&nbsp; &nbsp;
            internet portals;</span></p>
              <p class="c0 c4"><span class="c5">&#9679;</span><span
                class="c3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="c2">&nbsp; &nbsp;
            accounting, law and consulting firms; and</span></p>
              <p class="c0 c4"><span class="c5">&#9679;</span><span
                class="c3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="c2">&nbsp; &nbsp;
            educational institutions and trade associations.</span></p>
              <p class="c0"><span class="c2">We will approve link requests from these organizations if we decide that: (a) the
              link would not make us look unfavorably to ourselves or to our accredited businesses; (b) the organization
              does not have any negative records with us; (c) the benefit to us from the visibility of the hyperlink
              compensates the absence of friendzproducts; and (d) the link is in the context of general resource
            information.</span></p>
              <p class="c0"><span class="c2">These organizations may link to our home page so long as the link: (a) is not in any
              way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its
            products or services; and (c) fits within the context of the linking party&rsquo;s site.</span></p>
              <p class="c0"><span class="c2">If you are one of the organizations listed in paragraph 2 above and are interested in
              linking to our website, you must inform us by sending an email to friendzproducts. Please include your name,
              your organization name, contact information as well as the URL of your site, a list of any URLs from which
              you intend to link to our Website, and a list of the URLs on our site to which you would like to link. Wait
            2-3 weeks for a response.</span></p>
              <p class="c0"><span class="c2">&nbsp;Approved organizations may hyperlink to our Website as follows:</span></p>
              <p class="c0 c4"><span class="c5">&#9679;</span><span
                class="c3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="c2">&nbsp; &nbsp; By
            use of our corporate name;</span></p>
              <p class="c0 c4"><span class="c5">&#9679;</span><span
                class="c3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="c2">&nbsp; &nbsp; By
            use of the uniform resource locator being linked to;</span></p>
              <p class="c0 c4"><span class="c5">&#9679;</span><span
                class="c3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="c2">&nbsp; &nbsp; By
                use of any other description of our Website being linked to that makes sense within the context and format
            of content on the linking party&rsquo;s site.</span></p>
              <p class="c0"><span class="c2">&nbsp;No use of friendzproducts&#39;s logo or other artwork will be allowed for
            linking absent a trademark license agreement.</span></p>
              <p class="c0"><span class="c2">&nbsp;</span></p>
              <p class="c0"><span class="c6">iFrames</span></p>
              <p class="c0"><span class="c2">Without prior approval and written permission, you may not create frames around our
            Web Pages that alter in any way the visual presentation or appearance of our Website.</span></p>
              <p class="c0"><span class="c6">Content Liability</span></p>
              <p class="c0"><span class="c2">We shall not be held responsible for any content that appears on your Website. You
              agree to protect and defend us against all claims that are rising on your Website. No link(s) should appear
              on any Website that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise
            violates, or advocates the infringement or other violation of, any third party rights.</span></p>
              <p class="c0"><span class="c6">Your Privacy</span></p>
              <p class="c0"><span class="c2">Please read Privacy Policy</span></p>
              <p class="c0"><span class="c6 c7">Reservation of Rights</span></p>
              <p class="c0"><span class="c2">We reserve the right to request that you remove all links or any particular link to
              our Website. You approve to immediately remove all links to our Website upon request. We also reserve the
              right to amend these terms and conditions and it&rsquo;s linking policy at any time. By continuously linking
            to our Website, you agree to be bound to and follow these linking terms and conditions.</span></p>
              <p class="c0"><span class="c6">Removal of links from our website</span></p>
              <p class="c0"><span class="c2">If you find any link on our Website that is offensive for any reason, you are free to
              contact and inform us any moment. We will consider requests to remove links but we are not obligated to or
            so or to respond to you directly.</span></p>
              <p class="c0"><span class="c2">We do not ensure that the information on this website is correct, we do not warrant
              its completeness or accuracy; nor do we promise to ensure that the website remains available or that the
            material on the website is kept up to date.</span></p>
              <p class="c0"><span class="c2">&nbsp;</span></p>
              <p class="c0"><span class="c6">Disclaimer</span></p>
              <p class="c0"><span class="c2">To the maximum extent permitted by applicable law, we exclude all representations,
              warranties and conditions relating to our website and the use of this website. Nothing in this disclaimer
            will:</span></p>
              <p class="c0 c4"><span class="c5">&#9679;</span><span
                class="c3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="c2">&nbsp; &nbsp; limit
            or exclude our or your liability for death or personal injury;</span></p>
              <p class="c0 c4"><span class="c5">&#9679;</span><span
                class="c3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="c2">&nbsp; &nbsp; limit
            or exclude our or your liability for fraud or fraudulent misrepresentation;</span></p>
              <p class="c0 c4"><span class="c5">&#9679;</span><span
                class="c3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="c2">&nbsp; &nbsp; limit
            any of our or your liabilities in any way that is not permitted under applicable law;</span></p>
              <p class="c0 c4"><span class="c5">&#9679;</span><span
                class="c3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="c2">&nbsp; &nbsp;
            exclude any of our or your liabilities that may not be excluded under applicable law.</span></p>
              <p class="c0"><span class="c2">The limitations and prohibitions of liability set in this Section and elsewhere in
              this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under
            the disclaimer, including liabilities arising in contract, in tort and for breach of statutory duty.</span>
              </p>
              <p class="c0"><span class="c2">As long as the website and the information and services on the website are provided
            free of charge, we will not be liable for any loss or damage of any nature.</span></p>
              <p class="c0"><span class="c1">&nbsp;</span></p>
              <p class="c8 c9"><span class="c1"></span></p>
              <p class="c9 c8"><span class="c1"></span></p>
              </Box>
        </Container>
      </section>
    </Layout>
  );
}