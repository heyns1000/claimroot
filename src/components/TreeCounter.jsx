import { useEffect, useRef, useState } from 'react';

export function TreeCounter({ widgetUrl, maxWidth = '400px', height = '300px' }) {
    const iframeRef = useRef();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const iframe = iframeRef.current;
        if (iframe && widgetUrl) {
            iframe.src = widgetUrl;
            const handleLoad = () => setIsLoading(false);
            iframe.onload = handleLoad;
            
            return () => {
                iframe.onload = null;
            };
        }
    }, [widgetUrl]);

    return (
        <div style={{ 
            maxWidth, 
            borderRadius: '8px', 
            overflow: 'hidden',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}>
            {isLoading && (
                <div style={{ 
                    padding: '20px', 
                    textAlign: 'center',
                    background: '#f0f0f0'
                }}>
                    Loading tree counter...
                </div>
            )}
            <iframe
                ref={iframeRef}
                width="100%"
                height={height}
                frameBorder="0"
                style={{ border: 'none', display: isLoading ? 'none' : 'block' }}
                title="Tree Planting Progress"
            />
        </div>
    );
}
