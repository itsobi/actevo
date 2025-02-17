import { PageHeader } from '@/components/page-header';
import CreateWorkoutForm from './_components/create-workout-form';

export default function CreatePage() {
  return (
    <div>
      <PageHeader
        title="Create Workout Submission"
        description="Fill out the form below to have your workout featured within the community. It can be as little as calf raises or as complex as a full body workout. You never know, someone out there might be looking for exactly what you're doing!"
      />
      <div className="flex justify-center items-center">
        <CreateWorkoutForm />
      </div>
    </div>
  );
}
