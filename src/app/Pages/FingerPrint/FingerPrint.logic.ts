import * as LocalAuthentication from 'expo-local-authentication';
import { useCallback, useEffect, useState } from 'react';

export interface BiometricCapabilities {
  hasHardware: boolean;
  isEnrolled: boolean;
  supportedTypes: string[];
}

export interface AuthResult {
  success: boolean;
  error?: string;
  warning?: string;
}

function mapAuthTypes(types: LocalAuthentication.AuthenticationType[]): string[] {
  return types.map((type) => {
    switch (type) {
      case LocalAuthentication.AuthenticationType.FINGERPRINT:
        return 'Fingerprint';
      case LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION:
        return 'Facial Recognition';
      case LocalAuthentication.AuthenticationType.IRIS:
        return 'Iris';
      default:
        return 'Unknown';
    }
  });
}

export function useFingerPrintLogic() {
  const [capabilities, setCapabilities] = useState<BiometricCapabilities | null>(null);
  const [authResult, setAuthResult] = useState<AuthResult | null>(null);
  const [isChecking, setIsChecking] = useState<boolean>(false);

  const handleCheckCapabilities = useCallback(async () => {
    try {
      setIsChecking(true);
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      const supportedTypesRaw = await LocalAuthentication.supportedAuthenticationTypesAsync();

      setCapabilities({
        hasHardware,
        isEnrolled,
        supportedTypes: mapAuthTypes(supportedTypesRaw),
      });
    } finally {
      setIsChecking(false);
    }
  }, []);

  const handleAuthenticate = useCallback(async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate to continue',
        fallbackLabel: 'Use passcode',
        cancelLabel: 'Cancel',
      });

      if (result.success) {
        setAuthResult({ success: true });
      } else {
        setAuthResult({
          success: false,
          error: (result as any).error,
          warning: (result as any).warning,
        });
      }
    } catch (error) {
      setAuthResult({ success: false, error: (error as Error).message });
    }
  }, []);

  useEffect(() => {
    handleCheckCapabilities();
  }, [handleCheckCapabilities]);

  return {
    capabilities,
    authResult,
    isChecking,
    handleCheckCapabilities,
    handleAuthenticate,
  };
}