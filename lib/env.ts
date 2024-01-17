import { fetchPrivateKey, fetchPublicKey } from 'utils';

const appUrl = process.env.APP_URL || 'http://localhost:4000';
const entityId = process.env.ENTITY_ID || 'https://saml.example.com/entityid';
const defaultAcsUrl = process.env.DEFAULT_ACS_SERVICE || '';
const defaultAudience = process.env.DEFAULT_AUDIENCE || '';
const defaultRelayState = process.env.DEFAULT_RELAY_STATE || '';
const defaultUserName = process.env.DEFAULT_USERNAME || '';
const defaultEmail = process.env.DEFAULT_EMAIL || '';
const defaultFirstName = process.env.DEFAULT_FIRSTNAME || '';
const defaultLastName = process.env.DEFAULT_LASTNAME || '';
const defaultMfa = process.env.DEFAULT_MFA || '';
const defaultCaseId = process.env.DEFAULT_CASE_ID || '90210';
const defaultRoleId = process.env.DEFAULT_ROLE_ID || '11';

const ssoUrl = `${appUrl}/api/saml/sso`;
const privateKey = fetchPrivateKey();
const publicKey = fetchPublicKey();

const config = {
  appUrl,
  entityId,
  ssoUrl,
  privateKey,
  publicKey,
  defaultAcsUrl,
  defaultAudience,
  defaultRelayState,
  defaultUserName,
  defaultEmail,
  defaultFirstName,
  defaultLastName,
  defaultMfa,
  defaultCaseId,
  defaultRoleId
};

export default config;
