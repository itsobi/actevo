'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { sendEmail } from '@/lib/actions/sendEmail';
import { CircleHelp } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toast } from 'sonner';

const formSchema = z.object({
  username: z.string().min(2),
  title: z.string().min(2).max(50),
  link: z.string().min(2).max(50),
  description: z.string().min(2).max(500),
});

export default function CreateWorkoutForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      title: '',
      link: '',
      description: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = await sendEmail(values);
    if (response.success) {
      toast.success(response.message);
      form.reset();
    } else {
      toast.error(response.message);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-4 w-full max-w-2xl"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="Username"
                  {...field}
                  className="border-b-2 border-gray-300"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Workout Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Title"
                  {...field}
                  className="border-b-2 border-gray-300"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="link"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-1">
                <span>YouTube Link</span>
                <Popover>
                  <PopoverTrigger asChild>
                    <button>
                      <CircleHelp size={12} className="cursor-pointer" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <p className="text-xs">
                      Create an unlisted YouTube video and paste the link here.
                      Don&apos;t worry about it not looking professional,
                      authenticity is all that matters!
                    </p>
                  </PopoverContent>
                </Popover>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="YouTube Link"
                  {...field}
                  className="border-b-2 border-gray-300"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Workout Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Description"
                  {...field}
                  className="border-b-2 border-gray-300"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="font-bold shadow-lg"
          type="submit"
          disabled={!form.formState.isValid || form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? 'Submitting...' : 'Send Submission'}
        </Button>
      </form>
    </Form>
  );
}
