import { useEffect, useState } from 'react';

interface UseWebComponentLoaderOptions {
  scriptUrl: string;
  elementName: string;
  enabled?: boolean;
}

export const useWebComponentLoader = ({
  scriptUrl,
  elementName,
  enabled = true,
}: UseWebComponentLoaderOptions) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    // Check if already loaded
    if (customElements.get(elementName)) {
      console.log(`[WebComponentLoader] ${elementName} already registered`);
      setIsLoaded(true);
      return;
    }

    // Check if script already exists
    const existingScript = document.querySelector(`script[src="${scriptUrl}"]`);
    if (existingScript) {
      console.log(`[WebComponentLoader] Script for ${elementName} already loaded`);
      
      // Wait for custom element to be defined
      customElements.whenDefined(elementName).then(() => {
        setIsLoaded(true);
        setIsLoading(false);
      });
      return;
    }

    setIsLoading(true);
    console.log(`[WebComponentLoader] Loading ${elementName} from ${scriptUrl}`);

    const script = document.createElement('script');
    script.src = scriptUrl;
    script.type = 'text/javascript';
    script.async = true;

    script.onload = () => {
      console.log(`[WebComponentLoader] Script loaded for ${elementName}`);
      
      // Wait for custom element to be defined
      customElements.whenDefined(elementName).then(() => {
        console.log(`[WebComponentLoader] ${elementName} registered successfully`);
        setIsLoaded(true);
        setIsLoading(false);
      }).catch((err) => {
        console.error(`[WebComponentLoader] Error waiting for ${elementName}:`, err);
        setError(err);
        setIsLoading(false);
      });
    };

    script.onerror = (err) => {
      console.error(`[WebComponentLoader] Failed to load script for ${elementName}:`, err);
      setError(new Error(`Failed to load ${scriptUrl}`));
      setIsLoading(false);
    };

    document.head.appendChild(script);

    return () => {
      // Optional: cleanup script on unmount
      // document.head.removeChild(script);
    };
  }, [scriptUrl, elementName, enabled]);

  return { isLoaded, isLoading, error };
};
