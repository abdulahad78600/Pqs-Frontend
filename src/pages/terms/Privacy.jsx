import LegalLayout, { Section, SubSection, Paragraphs } from '../../components/terms/LegalLayout.jsx'

export default function Privacy() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title={<><span className="gold-text">Privacy</span> Policy</>}
      intro="The regulations on the protection of natural persons with regard to the processing of personal data and on the free movement of such data, known as GDPR, contain a series of rules aiming to ensure that the processing of personal data takes place in compliance with the rights and fundamental freedoms of people."
    >
      <Section title="Privacy notice">
        <p>This notice is designed to inform you how we have implemented GDPR and make you aware of the rights available to you.</p>

        <SubSection title="Identity and contact details of the data controller">
          <p>Premier Quantitative Strategies Fund SP, a Limited Company registered in the Cayman Islands and regulated by the Cayman Islands Monetary Authority (CIMA), its capacity as Data Controller (ESLJ or the Data Controller) processes your personal data (the Personal Data) for the purposes indicated below.</p>
        </SubSection>

        <SubSection title="Contact details of the data protection officer">
          <p>
            The Compliance Officer at PQS FUND SP is responsible for managing all issues relating to the processing of your Personal Data and/or to exercise your rights provided by the GDPR, should you wish to do so, please contact the Compliance Officer at the following e-mail address:{' '}
            <a href="mailto:compliance@pqs.fund">compliance@pqs.fund</a>
          </p>
        </SubSection>

        <SubSection title="Categories of personal data, purposes and legal basis of the processing">
          <Paragraphs text={`Categories of Personal Data
Included among the Personal Data that the PQS FUND SP processes, by way of example, are biographical data, data acquired from payment instructions, data deriving from installing and using the PQS FUND SP's Apps (including geographical location data, data deriving from web services etc.).`} />
        </SubSection>
      </Section>

      <Section title="Purpose and legal basis of the processing">
        <p>The Personal Data that concern you, which you communicated to the or PQS FUND SP collected from third party subjects (in the latter case the compliance with the law and regulations by the third parties shall be duly verified), are processed by the PQS FUND SP as part of its business activity for the following purposes:</p>
        <ol type="a">
          <li>
            <strong>Providing services and performing contracts.</strong> The submission of your Personal Data needed to provide the services requested and perform the contracts (including the steps to be taken prior to entering into a contract) is not mandatory, but refusal to provide this Personal Data do not allow the PQS FUND SP to fulfil the relevant requests.
          </li>
          <li>
            <strong>Complying with the provisions of national and EU legislation.</strong> The processing of your Personal Data, in order to comply with the regulatory provisions is mandatory and your consent is not required. The processing is mandatory, for example, when it is required by anti-money laundering, taxation, anticorruption, fraud prevention regulations in the payment services or to fulfil instructions or requests of the supervisory and control authority.
          </li>
          <li>
            <strong>Legitimate interest of the Data Controller.</strong> The processing of your Personal Data is necessary to pursue a legitimate interest of PQS FUND SP, namely to prevent fraud; to acquire images and videos relating to the closed-circuit-television (CCTV) system for security purposes; and to pursue any and additional legitimate interests. In the latter case, the PQS FUND SP may process your Personal Data only after having informed you and having ascertained that achieving its legitimate interests, or those of third parties, does not override your fundamental rights and freedoms. In these cases, your consent is not required.
          </li>
        </ol>
      </Section>

      <Section title="Categories of recipients to whom your personal data may be communicated">
        <p>To achieve the purposes indicated above, it might be necessary for PQS FUND SP to communicate your Personal Data to the following categories of recipients:</p>
        <ol>
          <li>Matco trust company that manages the IT system and some administrative, legal and accounting services.</li>
          <li>
            Third parties (companies, freelancers, etc.) operating within and outside the European Union and that may process your Personal Data as part of: recording the financial risks for the purpose of preventing and controlling the risk of insolvency; credit recovery and related activities; providing and managing procedures and IT systems; security and CCTV management services; managing communication with customers, as well as the storage of data and documents, whether in paper or electronic form; and recording of service quality, market research, information and commercial promotion of its products and/or services.
          </li>
          <li>
            Authorities (e.g. judicial, administrative etc.) and public information systems established at public administrations, such as, for example, HMRC in the UK. PQS FUND SP and the third parties your Personal Data may be communicated to, act as:
            <ol>
              <li>Data Controllers, i.e. subjects which determine the purposes and means of the Personal Data processing;</li>
              <li>Data Processors, i.e. subjects which process the Personal Data on behalf of the Controller; or</li>
              <li>Joint Data Controllers, which determine, together with the ESLJ, the relevant purposes and means.</li>
            </ol>
          </li>
        </ol>
      </Section>

      <Section title="Transferring personal data outside the European Union">
        <Paragraphs text={`For the avoidance of doubt, your Personal Data is processed by ESLJ in the UK — which is outside of the European Union. However appropriate safeguards are in place to ensure that all Personal Data processed outside of the European Union either within the UK or another third-country is based on adequacy decisions of the European Commission.

Personal Data contained in messages regarding financial transfers may be provided, for the exclusive purpose of preventing and fighting terrorism and its financing, to the public authorities of the United States of America.`} />
      </Section>

      <Section title="Processing method and personal data retention time">
        <Paragraphs text={`Your Personal Data will be processed using manual, electronic and telematic tools and in a way that ensures its security and confidentiality.

In particular, your Personal Data are generally retained for a time period of 10 years, starting from the end of the contractual relationship you are part of. Likewise, the Personal Data may be processed for a longer time, should an act that interrupts and/or suspends the course of the term occur, entailing an extension of the data retention, or if such longer retention is considered necessary for legitimate business interests.`} />
      </Section>

      <Section title="Rights of the data subject">
        <p>
          In your capacity as Data subject, you may exercise, at any time towards the Data Controller, the rights provided by the Regulation listed below, by sending a specific request in writing to the e-mail address{' '}
          <a href="mailto:compliance@pqs.fund">compliance@pqs.fund</a>.
        </p>
        <p>Any communications and actions undertaken by the PQS FUND SP in connection with exercising the rights listed below, will be made free of charge. However, if your requests are manifestly unfounded or excessive, in particular due to their repetitive character, PQS FUND SP may charge you a fee, taking into account the administrative costs incurred, or refuse to act on your requests.</p>

        <SubSection title="Right of access">
          <Paragraphs text={`You can obtain from the PQS FUND SP confirmation as to whether or not your Personal Data are being processed and, where that is the case, to obtain access to the Personal Data and the information envisaged under art. 15 of the Regulation, among which, by way of example: the purposes of the processing, the categories of Personal Data concerned etc.

Where Personal Data are transferred to a third country or to an international organisation, you have the right to be informed of the appropriate safeguards relating to the transfer, as provided above.

If requested, PQS FUND SP shall provide you with a copy of the Personal Data undergoing processing. For any further copies requested, the PQS FUND SP may charge you a reasonably fee based on the administrative costs. If the request is submitted by electronic means, and unless otherwise requested, the information shall be provided by the PQS FUND SP in a commonly used electronic form.`} />
        </SubSection>

        <SubSection title="Right to rectification">
          <p>You may obtain from PQS FUND SP the rectification of your Personal Data that are inaccurate as well as, taking into account the purpose of the processing, their integration, if the data are incomplete, by providing a supplementary statement.</p>
        </SubSection>

        <SubSection title="Right to erasure">
          <Paragraphs text={`You may obtain from the Data Controller the erasure of your Personal Data, if one of the reasons provided by art. 17 of the Regulation occurs, including, by way of example, whether the Personal Data are no longer necessary in relation to the purposes for which they were collected or otherwise processed or if the consent on which the processing of your Personal Data is based was withdrawn by you or there is no other legal ground for the processing.

We hereby inform you that PQS FUND SP may not erase your Personal Data: if their processing is necessary, for example, to comply with a legal obligation, for reasons of public interest, for the establishment, exercise or defence a legal claim.`} />
        </SubSection>

        <SubSection title="Right to restriction of processing">
          <p>You may obtain the restriction of your Personal Data if one of the cases provided by art. 18 of the Regulation applies, among which, for example:</p>
          <ul>
            <li>should the accuracy of your Personal Data be contested by you for a period enabling the Controller to verify the accuracy of the Personal Data; or</li>
            <li>the data subject has objected to processing, pending the verification whether the legitimate grounds of the Controller override those of the data subject.</li>
          </ul>
        </SubSection>

        <SubSection title="Right to data portability">
          <p>If the processing of your Personal Data is based on the consent or is necessary for the performance of a contract or to take steps prior to enter into a contract and the processing is carried out by automated means, you may:</p>
          <ul>
            <li>request to receive the Personal Data provided by you in a structured, commonly used and machine readable format (e.g.: a computer and/or tablet); and</li>
            <li>transmit your Personal Data to another Data Controller without hindrance from the PQS FUND SP.</li>
          </ul>
          <p>In the latter case, you shall provide PQS FUND SP with the exact details of the new data controller to whom you intend to transmit your Personal Data, providing PQS FUND SP with a written authorisation.</p>
        </SubSection>

        <SubSection title="Right to object">
          <Paragraphs text={`You may object at any time to the processing of Personal Data if the processing is carried out for the performance of a task carried out in the public interest or is necessary for the purposes of the legitimate interest of the Data Controller (including profiling).

Should you decide to exercise the right to object, PQS FUND SP will abstain from further processing your Personal Data, unless compelling legitimate grounds for the processing occur (grounds which override the interests, rights and freedoms of the data subject), or the processing is necessary for the establishment, exercise or defence of legal claims.`} />
        </SubSection>

        <SubSection title="Right to lodge a complaint with the Data Protection Authority">
          <p>Notwithstanding your right to appeal to any other administrative or jurisdictional court, should you deem that the processing of your Personal Data takes place in breach of the GDPR, you may lodge a complaint with the Information Commissioners Office:</p>
          <p>
            <a href="https://ico.org.uk/concerns/" target="_blank" rel="noreferrer">https://ico.org.uk/concerns/</a>
          </p>
        </SubSection>
      </Section>
    </LegalLayout>
  )
}
