import { PageHeader } from '@/components/page-header';
import VideosSection from '@/components/videos/videos-section';
import { armsVideos } from '@/lib/data/arms';

export default function ArmWorkoutsPage() {
  return (
    <div>
      <PageHeader title="Arm Workouts" />
      <VideosSection videos={armsVideos} />
    </div>
  );
}
