interface GHLFormProps {
  formId: string;
  formName: string;
  height: number;
}

export function GHLForm({ formId, formName, height }: GHLFormProps) {
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
