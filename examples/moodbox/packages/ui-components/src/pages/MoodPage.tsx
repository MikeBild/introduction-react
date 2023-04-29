import { MoodSlider } from "../organisms/MoodSlider";

interface MoodPageProps {
  onMoodConfirmed: (moodValue: number) => void;
}

export function MoodPage(props: MoodPageProps) {
  return (
    <>
      <MoodSlider confirmMood={props.onMoodConfirmed} />
    </>
  );
}
