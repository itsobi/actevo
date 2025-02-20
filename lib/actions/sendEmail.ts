'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const myEmail = process.env.MY_EMAIL;

type values = {
  username: string;
  title: string;
  link: string;
  description: string;
};
export const sendEmail = async (values: values) => {
  const { username, title, link, description } = values;

  if (!username || !title || !link || !description) {
    return {
      success: false,
      message: 'All fields are required',
    };
  }

  const { error } = await resend.emails.send({
    from: 'ActEvo <onboarding@resend.dev>',
    to: myEmail!,
    subject: 'New Workout Submission',
    text: `Username: ${username}\nTitle: ${title}\nLink: ${link}\nDescription: ${description}`,
  });

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  return {
    success: true,
    message: 'Workout submitted successfully! 💪',
  };
};
