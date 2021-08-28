import React, {ReactNode} from 'react';
import boostNode from '../assets/BoostNode.png';
import pointsIllustration from '../assets/PointsIllustration.png';
import publicUsername from '../assets/PublicUsername.png';
import tnbProfile from '../assets/TnbProfile.png';
import voteForGovernors from '../assets/VoteForGovernors.png';

interface SlideProps {
  src: string;
  title: string;
  description: ReactNode;
}

// TODO: Update the 'learn more' links

const coinSlides: SlideProps[] = [
  {
    src: boostNode,
    title: 'Deposit coins to boost a node',
    description: <>Boost a node into the Top 20 so they get scheduled to be PV. Learn More</>,
  },
  {
    src: pointsIllustration,
    title: 'Depositing coins gives you points',
    description: <>Points let you perform a variety of actions within the network. Learn More</>,
  },
  {
    src: boostNode,
    title: 'Benefit the entire network',
    description: (
      <>Depositing coins increases the value of all coins by reducing overall available supply. Learn More</>
    ),
  },
];

const walletSlides: SlideProps[] = [
  {
    src: voteForGovernors,
    title: 'Vote for governors',
    description: <>Governors dictate the direction of the blockchain. Learn More</>,
  },
  {
    src: publicUsername,
    title: 'Gain a public username',
    description: <>Create a custom name and be identified by it. Learn More</>,
  },
  {
    src: tnbProfile,
    title: 'Access your TNB Profile',
    description: <>You can access your community public social profile. Learn More</>,
  },
];

export {coinSlides, walletSlides};
