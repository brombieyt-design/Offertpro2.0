import React from "react";
import { Composition } from "remotion";
import { HeroVideo } from "./compositions/HeroVideo";
import { FeaturesVideo } from "./compositions/FeaturesVideo";
import { CTAVideo } from "./compositions/CTAVideo";

// Instagram Reels: 1080x1920 (9:16), 30fps
export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="HeroVideo"
        component={HeroVideo}
        durationInFrames={300}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="FeaturesVideo"
        component={FeaturesVideo}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="CTAVideo"
        component={CTAVideo}
        durationInFrames={270}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
