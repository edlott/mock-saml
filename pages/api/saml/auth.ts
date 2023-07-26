import { createHash } from 'crypto';
import config from 'lib/env';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { User } from 'types';
import { createResponseXML, signResponseXML } from 'utils';
import saml from '@boxyhq/saml20';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const {
      email, audience, acsUrl, relayState, firstName, lastName, mfa, userName
    } = req.body;

    const user: User = {
      id: userName,
      email,
      firstName,
      lastName,
      mfa
    };

    const xml = await createResponseXML({
      idpIdentityId: config.entityId,
      audience,
      acsUrl,
      samlReqId: '',
      user,
    });

    const xmlSigned = await signResponseXML(xml, config.privateKey, config.publicKey);
    const encodedSamlResponse = Buffer.from(xmlSigned).toString('base64');
    const html = saml.createPostForm(acsUrl, [
      {
        name: 'RelayState',
        value: relayState,
      },
      {
        name: 'SAMLResponse',
        value: encodedSamlResponse,
      },
    ]);

    res.send(html);
  } else {
    res.status(405).send(`Method ${req.method} Not Allowed`);
  }
}
