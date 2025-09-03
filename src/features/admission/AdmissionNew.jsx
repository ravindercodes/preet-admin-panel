import React from 'react';
import AdmissionForm from './AdmissionForm';

export default function AdmissionNew() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Create New Admission</h2>
      <AdmissionForm />
    </div>
  );
}