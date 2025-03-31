'use client';

import './styles-module.css';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import MuxUploader, {
  MuxUploaderDrop,
  MuxUploaderFileSelect,
  MuxUploaderProgress,
  MuxUploaderRetry,
  MuxUploaderStatus,
} from '@mux/mux-uploader-react';
import { Session } from 'next-auth';
import { uploadVideo } from '@/lib/actions/mux-actions';
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { sendEmail } from '@/lib/actions/send-email';
import { toast } from 'sonner';

export function SelfUploadForm({ session }: { session: Session }) {
  const [uploadUrl, setUploadUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [showUploader, setShowUploader] = useState(true);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await sendEmail({
      title,
      description,
      link: uploadUrl,
      selfUpload: true,
    });
    if (res.success) {
      toast.success('Email sent');
      window.location.reload();
    } else {
      toast.error(res.message);
    }
  };

  const canSubmit = title && description && !showUploader;

  return (
    <form onSubmit={handleSubmit}>
      {showUploader ? (
        <div className="flex flex-col gap-2 mb-4">
          <Label>Upload Video</Label>

          <MuxUploader
            id="video-uploader"
            endpoint={async () => {
              const response = await uploadVideo(session?.user?.id ?? '');
              if (!response.success || !response.url) {
                toast.error(response.message || 'Upload failed');
                throw new Error(response.message || 'Upload failed'); // This will trigger the error state in MuxUploader
              }
              setUploadUrl(response.url);
              return response.url;
            }}
            className="hidden"
            onSuccess={() => setShowUploader(false)}
          />
          <MuxUploaderDrop
            muxUploader="video-uploader"
            className="group border-2 border-dashed border-gray-300 rounded-md"
          >
            <div
              slot="heading"
              className="flex flex-col justify-center items-center gap-2"
            >
              <div className="flex flex-col justify-center items-center">
                <span className="text-4xl">📹</span>
              </div>
              <span className="text-sm text-muted-foreground">
                Drag and drop your video to upload
              </span>
              <span className="text-sm text-muted-foreground">or</span>
            </div>
            <span slot="separator" className="hidden" />
            <MuxUploaderFileSelect
              muxUploader="video-uploader"
              className="mt-3"
            >
              <Button className="font-semibold" type="button">
                Select File
              </Button>
            </MuxUploaderFileSelect>
            <MuxUploaderStatus muxUploader="video-uploader" />
            <MuxUploaderProgress
              muxUploader="video-uploader"
              type="percentage"
            />
          </MuxUploaderDrop>
        </div>
      ) : (
        <div className="group border-2 border-dashed border-gray-300 rounded-md p-8 my-4">
          <div className="flex flex-col justify-center items-center gap-2">
            <div className="flex flex-col justify-center items-center">
              <span className="text-4xl">✅</span>
            </div>
            <span className="text-sm text-muted-foreground">
              File uploaded successfully
            </span>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2 mb-2">
        <Label>Title</Label>
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2 mb-2">
        <Label>Description</Label>
        <Textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <Button
        type="submit"
        className="w-full mt-4 font-semibold"
        disabled={!canSubmit}
      >
        Submit
      </Button>
    </form>
  );
}
