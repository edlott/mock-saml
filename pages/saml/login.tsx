import Head from 'next/head';
import { GetServerSideProps } from 'next';
import type { FormEvent } from 'react';
import React, { useState } from 'react';
import { IdpDetails } from '../../types';
import config from '../../lib/env';

const Login: React.FC<{ metadata: IdpDetails }> = ({ metadata }) => {
  const {
    defaultAcsUrl, 
    defaultAudience, 
    defaultRelayState, 
    defaultUserName, 
    defaultFirstName, 
    defaultLastName, 
    defaultEmail,
    defaultMfa
  } = metadata;
  
  const [state, setState] = useState({
    firstName: defaultFirstName,
    lastName: defaultLastName,
    acsUrl: defaultAcsUrl,
    audience: defaultAudience,
    relayState: defaultRelayState,
    userName: defaultUserName,
    email: defaultEmail,
    mfa: defaultMfa,
    domain:'t-mymatrixx.oktapreview.com'
  });

  const handleChange = (e: FormEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.currentTarget;

      setState({
          ...state,
          [name]: value,
      });
  };
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch(`/api/saml/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        audience: state.audience,
        acsUrl: `https://${state.domain}/sso/saml2/${state.acsUrl}`,
        relayState: `${state.relayState}?domain=${state.domain}`,
        mfa: state.mfa,
        email: state.email,
        firstName: state.firstName,
        lastName: state.lastName,
        userName: state.userName
      }),
    });

    if (response.ok) {
      const newDoc = document.open('text/html', 'replace');

      newDoc.write(await response.text());
      newDoc.close();
    } else {
      document.write('Error in getting SAML response');
    }
  };

  return (
    <>
      <Head>
        <title>Mock SAML Identity Provider - Login</title>
      </Head>
      <div className='flex min-h-full items-center justify-center'>
        <div className='flex w-full flex-col px-3'>
          <div className='space-y-2'>
            <div className='border-2 p-4'>
              <h2 className='mb-5 text-center text-2xl font-bold text-gray-900'>SAML SSO Login</h2>
              <form onSubmit={handleSubmit}>
                <div className='grid grid-cols-2 gap-y-1 gap-x-5'>
                  <button className='btn btn-primary col-span-2 block'>Sign In</button>
                  <div className='form-control'>
                    <label className='label'>
                      <span className='label-text font-bold'>Okta ACS Suffix</span>
                    </label>
                    <input
                            type='text'
                            className='input input-bordered'
                            name='acsUrl'
                            id='acsUrl'
                            autoComplete='off'
                            placeholder=''
                            value={state.acsUrl}
                    onChange={handleChange}
                    />
                  </div>
                  <div className='form-control'>
                    <label className='label'>
                      <span className='label-text font-bold'>ACS Domain</span>
                    </label>
                    <select
                            name='domain'
                            id='domain'
                            className='select select-bordered'
                            onChange={handleChange}
                            value={state.domain}>
                    <option value='t-mymatrixx.oktapreview.com'>default</option>
                    <option value='t1.login.mymatrixx.com'>custom</option>
                  </select>
                </div>
                  <div className='col-span-2'>
                    <div className='form-control col-span-2'>
                      <label className='label'>
                        <span className='label-text font-bold'>Audience</span>
                      </label>
                      <input
                        type='text'
                        className='input input-bordered'
                        name='audience'
                        id='audience'
                        autoComplete='off'
                        placeholder=''
                        value={state.audience}
                        onChange={handleChange}
                      />
                    </div>
                    <div className='form-control col-span-2'>
                      <label className='label'>
                        <span className='label-text font-bold'>RelayState</span>
                      </label>
                      <input
                          type='text'
                          className='input input-bordered'
                          name='relayState'
                          id='relayState'
                          autoComplete='off'
                          placeholder=''
                          value={state.relayState}
                          onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className='form-control'>
                    <label className='label'>
                      <span className='label-text font-bold'>Email</span>
                    </label>
                    <input
                      name='email'
                      id='email'
                      autoComplete='off'
                      type='text'
                      placeholder=''
                      value={state.email}
                      onChange={handleChange}
                      className='input input-bordered'
                      title='Please provide a mock email address'
                    />
                  </div>
                  <div className='form-control'>
                    <label className='label'>
                      <span className='label-text font-bold'>First Name</span>
                    </label>
                    <input
                        name='firstName'
                        id='firstName'
                        autoComplete='off'
                        type='text'
                        placeholder=''
                        value={state.firstName}
                        onChange={handleChange}
                        className='input input-bordered'
                        title='First Name'
                    />
                  </div>
                  <div className='form-control'>
                    <label className='label'>
                      <span className='label-text font-bold'>Last Name</span>
                    </label>
                    <input
                        name='lastName'
                        id='lastName'
                        autoComplete='off'
                        type='text'
                        placeholder=''
                        value={state.lastName}
                        onChange={handleChange}
                        className='input input-bordered'
                        title='Last Name'
                    />
                  </div>
                  <div className='form-control'>
                    <label className='label'>
                      <span className='label-text font-bold'>MFA</span>
                    </label>
                    <input
                        name='mfa'
                        id='mfa'
                        autoComplete='off'
                        type='text'
                        placeholder='TEST_SSO or TEST_SSO_PARTNER_MFA'
                        value={state.mfa}
                        onChange={handleChange}
                        className='input input-bordered'
                        title='MFA'
                    />
                  </div>
                  <div className='form-control'>
                    <label className='label'>
                      <span className='label-text font-bold'>Username</span>
                    </label>
                    <input
                        name='userName'
                        id='userName'
                        autoComplete='off'
                        type='text'
                        placeholder=''
                        value={state.userName}
                        onChange={handleChange}
                        className='input input-bordered'
                        title='User ID'
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className='alert alert-info'>
              <div>
                <span className='text-sm text-white'>
                  This is a simulated login screen, feel free to pick any username but you are restricted to
                  two domains example.com and example.org. But this should allow you to test all combinations
                  of your authentication and user modelling.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
    const metadata: IdpDetails = {
        defaultAcsUrl: config.defaultAcsUrl,
        defaultAudience: config.defaultAudience,
        defaultRelayState: config.defaultRelayState,
        defaultUserName: config.defaultUserName,
        defaultEmail: config.defaultEmail,
        defaultFirstName: config.defaultFirstName,
        defaultLastName: config.defaultLastName,
        defaultMfa: config.defaultMfa
    };

    return {
        props: {
            metadata,
        },
    };
};

export default Login;

