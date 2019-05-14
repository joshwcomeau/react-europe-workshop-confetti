import React from 'react';
import styled from 'styled-components';

const PlaygroundControl = ({ label, value, setValue, kind, ...inputProps }) => {
  let input;

  switch (kind) {
    case 'slider': {
      input = (
        <Range
          type="range"
          value={value}
          onChange={ev => setValue(Number(ev.target.value))}
          {...inputProps}
        />
      );
      break;
    }

    case 'boolean': {
      input = (
        <input
          type="checkbox"
          checked={value}
          onChange={() => setValue(!value)}
          {...inputProps}
        />
      );
      break;
    }

    default: {
      throw new Error('Unrecognized kind');
    }
  }
  return (
    <Wrapper style={{ display: 'block' }}>
      <Title>{label}</Title>
      {input}
    </Wrapper>
  );
};

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

export default PlaygroundControl;
