import React from 'react';
import { PwaInstallPrompt } from './PwaInstallPrompt';
import { UpdatePrompt } from './UpdatePrompt';

export const PwaManager: React.FC = () => {
  return (
    <>
      <UpdatePrompt />
      <PwaInstallPrompt />
    </>
  );
};