/**
 * ClaimRootCheckout.tsx - Checkout Interface Component
 * Layer 4: Interface component for finalizing governance actions
 */

import React, { useState } from 'react';
import { CheckCircle, AlertCircle, Lock, Unlock, Shield } from 'lucide-react';

const ClaimRootCheckout = ({ action, onComplete, onCancel }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    vaultLevel: 7,
    authorization: '',
    signature: '',
    confirmed: false
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const steps = [
    { id: 1, title: 'Review', icon: Shield },
    { id: 2, title: 'Authorization', icon: Lock },
    { id: 3, title: 'Confirmation', icon: CheckCircle }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleComplete = async () => {
    setIsProcessing(true);
    
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const receipt = {
      receiptId: `VL7-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
      action: action,
      vaultLevel: formData.vaultLevel,
      timestamp: Date.now(),
      authorization: formData.authorization,
      status: 'COMPLETED',
      signature: `VAULT7-${Date.now().toString(16)}`
    };

    setIsProcessing(false);
    onComplete(receipt);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg shadow-2xl w-full max-w-2xl mx-4 border border-gray-700">
        {/* Header */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">ClaimRoot Checkout</h2>
              <p className="text-gray-400 mt-1">Secure governance action processing</p>
            </div>
            <button
              onClick={onCancel}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Steps Indicator */}
          <div className="flex items-center gap-4 mt-6">
            {steps.map((s, index) => {
              const StepIcon = s.icon;
              const isActive = step === s.id;
              const isCompleted = step > s.id;

              return (
                <React.Fragment key={s.id}>
                  <div className="flex items-center gap-2">
                    <div
                      className={`
                        w-10 h-10 rounded-full flex items-center justify-center
                        ${isActive ? 'bg-nexus-purple text-white' : ''}
                        ${isCompleted ? 'bg-green-600 text-white' : ''}
                        ${!isActive && !isCompleted ? 'bg-gray-700 text-gray-400' : ''}
                      `}
                    >
                      <StepIcon className="w-5 h-5" />
                    </div>
                    <span className={`text-sm font-medium ${isActive ? 'text-white' : 'text-gray-400'}`}>
                      {s.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-0.5 ${step > s.id ? 'bg-green-600' : 'bg-gray-700'}`}></div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 min-h-[300px]">
          {/* Step 1: Review */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Review Action</h3>
              <div className="bg-gray-800 rounded-lg p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Action Type:</span>
                  <span className="text-white font-medium">{action?.type || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Vault Level:</span>
                  <span className="text-vault-gold font-medium">Level {formData.vaultLevel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Authority:</span>
                  <span className="text-white font-medium">NEXUS_NAIR</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Compliance:</span>
                  <span className="text-faa-green font-medium">FAA-TREATY-COMPLIANT</span>
                </div>
              </div>

              {action?.details && (
                <div className="bg-gray-800 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Action Details:</h4>
                  <p className="text-white">{action.details}</p>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Authorization */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Authorization Required</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Authorization Code
                  </label>
                  <input
                    type="text"
                    value={formData.authorization}
                    onChange={(e) => handleInputChange('authorization', e.target.value)}
                    placeholder="Enter authorization code"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-nexus-purple"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Vault Signature
                  </label>
                  <input
                    type="text"
                    value={formData.signature}
                    onChange={(e) => handleInputChange('signature', e.target.value)}
                    placeholder="Enter vault signature"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-nexus-purple"
                  />
                </div>

                <div className="bg-blue-900 bg-opacity-20 border border-blue-500 rounded-lg p-4">
                  <div className="flex gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-200">
                      <p className="font-medium mb-1">Security Notice</p>
                      <p>This action will be recorded on the VaultChain ledger and cannot be undone. Ensure all information is correct before proceeding.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Confirmation */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Final Confirmation</h3>
              
              <div className="bg-gray-800 rounded-lg p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-vault-gold" />
                  <span className="text-white">VaultLevel 7 Security Active</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-faa-green" />
                  <span className="text-white">FAA Treaty Compliant</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-400" />
                  <span className="text-white">Ready for Execution</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-gray-800 rounded-lg">
                <input
                  type="checkbox"
                  id="confirm"
                  checked={formData.confirmed}
                  onChange={(e) => handleInputChange('confirmed', e.target.checked)}
                  className="mt-1"
                />
                <label htmlFor="confirm" className="text-sm text-gray-300">
                  I confirm that I have reviewed all details and authorize this action to be executed on the VaultChain ledger. I understand this action is irreversible and will create a permanent VaultLevel 7 receipt.
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-700 flex justify-between">
          <button
            onClick={step === 1 ? onCancel : handlePrevious}
            className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            {step === 1 ? 'Cancel' : 'Previous'}
          </button>
          
          {step < 3 ? (
            <button
              onClick={handleNext}
              className="px-6 py-2 bg-nexus-purple text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleComplete}
              disabled={!formData.confirmed || isProcessing}
              className={`
                px-6 py-2 rounded-lg transition-colors
                ${formData.confirmed && !isProcessing
                  ? 'bg-faa-green text-white hover:bg-green-600'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }
              `}
            >
              {isProcessing ? 'Processing...' : 'Complete'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClaimRootCheckout;
