import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { YoutubeForm } from './youtube-form';
import { SelfUploadForm } from './self-upload-form';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export async function CreateWorkoutForm() {
  const session = await auth();
  if (!session) {
    redirect('/');
  }
  return (
    <Tabs defaultValue="self-upload" className="w-[400px] lg:w-[600px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="self-upload">Upload</TabsTrigger>
        <TabsTrigger value="youtube-link">YouTube Link</TabsTrigger>
      </TabsList>
      <TabsContent value="self-upload">
        <SelfUploadForm session={session} />
      </TabsContent>
      <TabsContent value="youtube-link">
        <YoutubeForm />
      </TabsContent>
    </Tabs>
  );
}
