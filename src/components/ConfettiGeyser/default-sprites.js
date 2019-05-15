import squiggleSvg from '../../assets/squiggle.svg';
import rectSvg from '../../assets/rect.svg';
import circleSvg from '../../assets/circle.svg';
import xSvg from '../../assets/x.svg';
import openCircleSvg from '../../assets/open-circle.svg';
import zigzagSvg from '../../assets/zigzag.svg';

export default [
  {
    src: squiggleSvg,
    width: 51,
    height: 18,
    airFrictionMultiplier: 0.75,
  },
  {
    src: rectSvg,
    width: 12,
    height: 18,
    airFrictionMultiplier: 1.2,
  },
  {
    src: circleSvg,
    width: 16,
    height: 16,
    airFrictionMultiplier: 1.15,
  },
  {
    src: xSvg,
    width: 20,
    height: 20,
    airFrictionMultiplier: 0.9,
  },
  {
    src: openCircleSvg,
    width: 16,
    height: 14,
    airFrictionMultiplier: 1,
  },
  {
    src: zigzagSvg,
    width: 33,
    height: 18,
    airFrictionMultiplier: 0.8,
  },
];
