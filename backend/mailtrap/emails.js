import {
  VERIFICATION_EMAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
} from './emailTemplates.js';
// import express, { Request, Response } from 'express';
import { mailtrapClient, sender } from './mailtrap.config.js';
import { Resend } from 'resend';
import { config } from 'dotenv';
config();

export const sendVerificationEmail = async (email, verificationToken) => {
  // const recipient = [{ email }];
  const resend = new Resend(process.env.RESEND_API_KEY);
  console.log('Top email:', email);
  try {
    /*
            To use MailTrap:
            1. Uncomment the code below
            const response = await mailtrapClient.send({
                  from: sender,
                  to: recipient,
                  subject: "Verify Your Email",
                  html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
                  category: 'Email Verification'
            })
            */

    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: `${email}`,
      subject: 'Verify Your Email',
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        '{verificationCode}',
        verificationToken
      ),
    });
    console.log('email');

    if (error) {
      // return res.status(400).json({ error });
      console.log('Error sending verification email', error);
    }

    //     console.log('Email sent successfully', response);
    console.log('Email sent successfully', data);
  } catch (error) {
    console.error('Error sending verification email', error);
    throw new Error(`Error sending verification email: ${error}`);
  }
};

export const sendWelcomeEmail = async (email, name) => {
  const recipient = [{ email }];
  try {
    /*
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: '4ed46895-dcb0-4b7e-abdb-3541d1b7313a',
      template_variables: {
        company_info_name: 'Authify',
        name: name,
      },
    });
    */

    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: recipient,
      subject: 'Welcome to Authify',
      html: WELCOME_EMAIL_TEMPLATE.replace('{name}', name ? name : 'there'),
    });

    if (error) {
      // return res.status(400).json({ error });
      console.log('Error sending verification email');
    }

    //     console.log('Welcome Email sent successfully', response); /*?*/
    console.log('Welcome Email sent successfully', data); /*?*/
  } catch (error) {}
};

export const sendPasswordResetEmail = async (email, resetURL) => {
  const recipient = [{ email }];

  try {
    /*
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: 'Reset your password',
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace('{resetURL}', resetURL),
      category: 'Password Reset',
    });
    */

    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: recipient,
      subject: 'Reset your password',
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace('{resetURL}', resetURL),
    });

    if (error) {
      // return res.status(400).json({ error });
      console.log('Error sending verification email');
    }
  } catch (error) {
    console.error(`Error sending password reset email`, error);

    throw new Error(`Error sending password reset email: ${error}`);
  }
};

export const sendResetSuccessEmail = async (email) => {
  const recipient = [{ email }];

  try {
    /*
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: 'Password Reset Successful',
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: 'Password Reset',
    });
    */

    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: recipient,
      subject: 'Password Reset Successful',
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
    });

    if (error) {
      // return res.status(400).json({ error });
      console.log('Error sending verification email');
    }

    //     console.log('Password reset email sent successfully', response);
    console.log('Password reset email sent successfully', data);
  } catch (error) {
    console.error(`Error sending password reset success email`, error);

    throw new Error(`Error sending password reset success email: ${error}`);
  }
};
