import { useState } from "react";
import styled from "styled-components"

interface MoodSliderProps {
  confirmMood: Function;
};

export function MoodSlider(props: MoodSliderProps) {

  const [moodRangePercentage, setMood] = useState(50);

  const moodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMood(+ event.target.value)
  }

  const StyledSlider = styled.input` 
      width: 100%; 
      -webkit-appearance: none;  /* Override default CSS styles */
      appearance: none;
      width: 100%; /* Full-width */
      height: 25px; /* Specified height */
      background: #d3d3d3; /* Grey background */
      outline: none; /* Remove outline */
      opacity: 0.7; /* Set transparency (for mouse-over effects on hover) */
      -webkit-transition: .2s; /* 0.2 seconds transition on hover */
      transition: opacity .2s;
      border-radius: 50%

      &:hover {
        opacity: 1; /* Fully shown on mouse-over */
      }

      &::-webkit-slider-thumb {
        -webkit-appearance: none; /* Override default look */
        appearance: none;
        width: 25px; /* Set a specific slider handle width */
        height: 25px; /* Slider handle height */
        background: #04AA6D; /* Green background */
        cursor: pointer; /* Cursor on hover */
        border-radius: 50%
      }

      &::-moz-range-thumb {
        width: 25px; /* Set a specific slider handle width */
        height: 25px; /* Slider handle height */
        background: #04AA6D; /* Green background */
        cursor: pointer; /* Cursor on hover */
        border-radius: 50%
      }
  `;

  return (
    <>
    <h3>Mood: {moodRangePercentage}</h3>
    <div>
        <StyledSlider type="range" min={1} max={100} value={moodRangePercentage} step={1} list="moodSection" onChange={moodChange}></StyledSlider>

        <datalist id="moodSection">
          <option value="50" label="Bad"></option>
        </datalist>
    </div>

    <button onClick={() => props.confirmMood(moodRangePercentage)}>Confirm</button>
    </>
  );
}
