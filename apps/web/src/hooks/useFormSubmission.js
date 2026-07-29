import { useState } from 'react';
import { toast } from 'sonner';
import apiServerClient from '@/lib/apiServerClient';

export const useFormSubmission = (endpoint, successMessage = 'Submission successful!') => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitForm = async (data, resetFn) => {
    setIsSubmitting(true);
    try {
      const response = await apiServerClient.fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || result.message || 'Failed to submit form');
      }

      toast.success(successMessage);
      if (resetFn) {
        resetFn();
      }
      return true;
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error(error.message || 'An unexpected error occurred. Please try again.');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    submitForm,
    isSubmitting
  };
};