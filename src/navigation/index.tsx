import React from 'react';
import {AuthProvider} from '@src/context/AuthContext';
import Routes from './Routes';

export default function Providers() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}
