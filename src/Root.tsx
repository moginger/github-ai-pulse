import { Composition } from "remotion";
import { GitHubPulseMain } from "./GitHubPulse/Main";

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="GitHubAIPulse"
      component={GitHubPulseMain}
      durationInFrames={990}
      fps={30}
      width={1080}
      height={1920}
    />
  </>
);
