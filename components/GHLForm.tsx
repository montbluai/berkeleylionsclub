import { useEffect } from 'react';

interface GHLFormProps {
  formId: string;
  formName: string;
  height: number;
}

const GHL_SCRIPT_ID = 'ghl-form-embed-script';
const GHL_SCRIPT_SRC = 'https://links.montbluai.com/js/form_embed.js';

export function GHLForm({ formId, formName, height }: GHLFormProps) {
  useEffect(() => {
    if (document.getElementById(GHL_SCRIPT_ID)) return;

    const script = document.createElement('script');
    script.id = GHL_SCRIPT_ID;
    script.src = GHL_SCRIPT_SRC;
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <iframe
      src={`https://links.montbluai.com/widget/form/${formId}`}
      style={{ width: '100%', height: `${height}px`, border: 'none', borderRadius: '3px' }}
      id={`inline-${formId}`}
      data-layout="{'id':'INLINE'}"
      data-trigger-type="alwaysShow"
      data-trigger-value=""
      data-activation-type="alwaysActivated"
      data-activation-value=""
      data-deactivation-type="neverDeactivate"
      data-deactivation-value=""
      data-form-name={formName}
      data-height={String(height)}
      data-layout-iframe-id={`inline-${formId}`}
      data-form-id={formId}
      title={formName}
    />
  );
}
