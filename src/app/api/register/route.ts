import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import { addUser } from '../auth/login/route';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'pavanpandu33031@gmail.com',
    pass: process.env.EMAIL_PASSWORD
  },
  // Add DKIM configuration if you have it
  // dkim: {
  //   domainName: "devgenius.com",
  //   keySelector: "2023",
  //   privateKey: process.env.DKIM_PRIVATE_KEY
  // }
});

function generatePassword() {
  return crypto.randomBytes(4).toString('hex');
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, whatsapp } = body;

    // Generate login credentials
    const password = generatePassword();
    const username = email.split('@')[0] + '_' + crypto.randomBytes(2).toString('hex');

    // Store user data
    const userData = {
      username,
      password,
      name,
      email,
      phone,
      whatsapp,
      registeredAt: new Date().toISOString()
    };
    addUser(userData);

    // Common email options
    const commonOptions = {
      from: {
        name: 'DEV Genius Team',
        address: 'pavanpandu33031@gmail.com'
      },
      replyTo: 'pavanpandu33031@gmail.com',
      headers: {
        'List-Unsubscribe': '<mailto:unsubscribe@devgenius.com>',
        'Precedence': 'bulk'
      }
    };

    // Send welcome email to user
    await transporter.sendMail({
      ...commonOptions,
      to: {
        name: name,
        address: email
      },
      subject: 'Welcome to DEV Genius! ',
      text: `
Welcome to DEV Genius! 

Dear ${name},

Thank you for joining DEV Genius! We're excited to have you on board.

You will be informed about the official login platform along with the launch date. Currently, the implementation is in progress, and once we complete user registrations, we will proceed with granting access to the platform.

For your reference, here are your login credentials that you'll use when the platform launches:

Username: ${username}
Password: ${password}

We appreciate your patience and support during this phase. In the meantime, if you have any questions, feel free to reach out to our support team at support@devgenius.com.

Best regards,
The DEV Genius Team
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <img src="https://devgenius.com/logo.png" alt="DEV Genius Logo" style="max-width: 200px;">
          </div>

          <h1 style="color: #4F46E5; text-align: center;">Welcome to DEV Genius! </h1>
          
          <p style="color: #374151; font-size: 16px;">Dear ${name},</p>
          
          <p style="color: #374151; font-size: 16px;">Thank you for joining DEV Genius! We're excited to have you on board.</p>

          <div style="background-color: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #4F46E5;">
            <p style="color: #374151; font-size: 16px;">You will be informed about the official login platform along with the launch date. Currently, the implementation is in progress, and once we complete user registrations, we will proceed with granting access to the platform.</p>
          </div>

          <div style="margin: 30px 0;">
            <p style="color: #374151; font-size: 16px;">For your reference, here are your login credentials that you'll use when the platform launches:</p>
            
            <div style="background-color: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #4F46E5;">
              <p style="margin: 5px 0; color: #374151;"><strong>Username:</strong> <span style="font-family: monospace; background: #E5E7EB; padding: 2px 6px; border-radius: 4px;">${username}</span></p>
              <p style="margin: 5px 0; color: #374151;"><strong>Password:</strong> <span style="font-family: monospace; background: #E5E7EB; padding: 2px 6px; border-radius: 4px;">${password}</span></p>
            </div>
          </div>

          <p style="color: #374151; font-size: 16px;">We appreciate your patience and support during this phase. In the meantime, if you have any questions, feel free to reach out to our support team at <a href="mailto:support@devgenius.com" style="color: #4F46E5; text-decoration: none;">support@devgenius.com</a></p>
          
          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #E5E7EB;">
            <p style="color: #6B7280; font-size: 14px;">Best regards,<br>The DEV Genius Team</p>
          </div>

          <div style="margin-top: 30px; text-align: center; color: #6B7280; font-size: 12px;">
            <p>This email was sent to ${email}</p>
            <p>DEV Genius, Your Address Here</p>
            <p><a href="mailto:unsubscribe@devgenius.com" style="color: #6B7280; text-decoration: none;">Unsubscribe</a> | <a href="https://devgenius.com/privacy" style="color: #6B7280; text-decoration: none;">Privacy Policy</a></p>
          </div>
        </div>
      `
    });

    // Send notification to admin
    await transporter.sendMail({
      ...commonOptions,
      to: 'pavanpandu33031@gmail.com',
      subject: 'New DEV Genius Registration',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #4F46E5;">New User Registration</h2>
          <div style="background-color: #F3F4F6; padding: 20px; border-radius: 8px;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>WhatsApp:</strong> ${whatsapp}</p>
            <p><strong>Username:</strong> ${username}</p>
            <p><strong>Password:</strong> ${password}</p>
            <p><strong>Registration Time:</strong> ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `
    });

    return NextResponse.json({ 
      success: true,
      credentials: { username, password },
      user: {
        username,
        name,
        email
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Failed to process registration' },
      { status: 500 }
    );
  }
}
