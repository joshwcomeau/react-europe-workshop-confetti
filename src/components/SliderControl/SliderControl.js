import React from 'react';
import styled from 'styled-components';

const SliderControl = ({ label, value, setValue, min, max, step = 1 }) => (
  <Wrapper style={{ display: 'block' }}>
    <Title>{label}</Title>
    <Range
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={ev => setValue(Number(ev.target.value))}
    />
  </Wrapper>
);

const Wrapper = styled.label`
  display: block;
  padding: 10px;
`;

const Title = styled.h4`
  color: #fff;
  font-size: 15px;
`;

const Range = styled.input`
  width: 200px;
`;

export default SliderControl;
