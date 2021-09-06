import React, {ReactNode} from 'react';
import benefitGraph from '../assets/BenefitGraph.png';
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
    description: <>Boost a node into the Top 20 so they get scheduled to be PV. Learn More</>,
    src: boostNode,
    title: 'Deposit coins to boost a node',
  },
  {
    description: <>Points let you perform a variety of actions within the network. Learn More</>,
    src: pointsIllustration,
    title: 'Depositing coins gives you points',
  },
  {
    description: (
      <>Depositing coins increases the value of all coins by reducing overall available supply. Learn More</>
    ),
    src: benefitGraph,
    title: 'Benefit the entire network',
  },
];

const walletSlides: SlideProps[] = [
  {
    description: <>Governors dictate the direction of the blockchain. Learn More</>,
    src: voteForGovernors,
    title: 'Vote for governors',
  },
  {
    description: <>Create a custom name and be identified by it. Learn More</>,
    src: publicUsername,
    title: 'Gain a public username',
  },
  {
    description: <>You can access your community public social profile. Learn More</>,
    src: tnbProfile,
    title: 'Access your TNB Profile',
  },
];

export {coinSlides, walletSlides};
