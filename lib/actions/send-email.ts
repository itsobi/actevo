'use server';

import { auth } from '@/auth';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const myEmail = process.env.MY_EMAIL;

type values = {
  title: string;
  link: string;
  description: string;
  selfUpload?: boolean;
};
export const sendEmail = async (values: values) => {
  const session = await auth();
  const name = session?.user?.name;
  if (!name) {
    return {
      success: false,
      message: 'Please login to submit a workout',
    };
  }
  const { title, link, description, selfUpload } = values;

  if (!name || !title || !link || !description) {
    return {
      success: false,
      message: 'All fields are required',
    };
  }

  const { error } = await resend.emails.send({
    from: 'ActEvo <onboarding@resend.dev>',
    to: myEmail!,
    subject: 'New Workout Submission',
    text: `${
      selfUpload ? 'Self-Upload' : 'Youtube'
    } - Name: ${name}\nTitle: ${title}\nLink: ${link}\nDescription: ${description}`,
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
