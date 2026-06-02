import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Header from '../components/layout/Header';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { dealApi } from '../services/api';
import { Deal, DealFormData } from '../types/deal.types';
import { exportDealToPDF } from '../utils/pdfExport';
import { formatDateForInput } from '../utils/formatters';

const DealDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deal, setDeal] = useState<Deal | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<DealFormData>();

  const isEditMode = id && id !== 'new';

  useEffect(() => {
    if (isEditMode) {
      loadDeal();
    }
  }, [id]);

  const loadDeal = async () => {
    if (!id || id === 'new') return;

    try {
      setLoading(true);
      const data = await dealApi.getDealById(parseInt(id));
      setDeal(data);
      
      // Populate form with deal data
      reset({
        company_name: data.company_name || '',
        opportunity_description: data.opportunity_description || '',
        why_ibm: data.why_ibm || '',
        project_name: data.project_name || '',
        business_owner: data.business_owner || '',
        close_date: formatDateForInput(data.close_date) || '',
        value_usd: data.value_usd?.toString() || '',
        metric: data.metric || '',
        economic_buyer: data.economic_buyer || '',
        decision_criteria: data.decision_criteria || '',
        decision_process: data.decision_process || '',
        identified_pain: data.identified_pain || '',
        champion: data.champion || '',
        competition: data.competition || '',
        next_actions: data.next_actions || '',
        action_date: formatDateForInput(data.action_date) || '',
        action_owner: data.action_owner || '',
        metric_complete: data.metric_complete || false,
        economic_buyer_complete: data.economic_buyer_complete || false,
        decision_criteria_complete: data.decision_criteria_complete || false,
        decision_process_complete: data.decision_process_complete || false,
        identified_pain_complete: data.identified_pain_complete || false,
        champion_complete: data.champion_complete || false,
        competition_complete: data.competition_complete || false,
      });
    } catch (err) {
      alert('Failed to load deal. Please try again.');
      console.error('Error loading deal:', err);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: DealFormData) => {
    try {
      setSaving(true);

      const dealData: Partial<Deal> = {
        company_name: data.company_name,
        opportunity_description: data.opportunity_description,
        why_ibm: data.why_ibm,
        project_name: data.project_name,
        business_owner: data.business_owner,
        close_date: data.close_date || undefined,
        value_usd: data.value_usd ? parseFloat(data.value_usd) : undefined,
        metric: data.metric,
        economic_buyer: data.economic_buyer,
        decision_criteria: data.decision_criteria,
        decision_process: data.decision_process,
        identified_pain: data.identified_pain,
        champion: data.champion,
        competition: data.competition,
        next_actions: data.next_actions,
        action_date: data.action_date || undefined,
        action_owner: data.action_owner,
        metric_complete: data.metric_complete,
        economic_buyer_complete: data.economic_buyer_complete,
        decision_criteria_complete: data.decision_criteria_complete,
        decision_process_complete: data.decision_process_complete,
        identified_pain_complete: data.identified_pain_complete,
        champion_complete: data.champion_complete,
        competition_complete: data.competition_complete,
      };

      if (isEditMode) {
        await dealApi.updateDeal(parseInt(id!), dealData);
        alert('Deal updated successfully!');
        await loadDeal();
      } else {
        const newDeal = await dealApi.createDeal(dealData);
        alert('Deal created successfully!');
        navigate(`/deals/${newDeal.id}`);
      }
    } catch (err) {
      alert('Failed to save deal. Please try again.');
      console.error('Error saving deal:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!id || id === 'new') return;
    
    if (!window.confirm('Are you sure you want to delete this deal? This action cannot be undone.')) {
      return;
    }

    try {
      await dealApi.deleteDeal(parseInt(id));
      alert('Deal deleted successfully!');
      navigate('/');
    } catch (err) {
      alert('Failed to delete deal. Please try again.');
      console.error('Error deleting deal:', err);
    }
  };

  const handleExportPDF = () => {
    if (deal) {
      exportDealToPDF(deal);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <Link to="/" className="text-sm text-primary-600 hover:text-primary-700 mb-2 inline-block">
                ← Back to Dashboard
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">
                {isEditMode ? 'Edit Deal' : 'New Deal'}
              </h1>
            </div>
            {isEditMode && deal && (
              <button
                onClick={handleExportPDF}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium"
              >
                Export PDF
              </button>
            )}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Information Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register('company_name', { required: 'Company name is required' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-400"
                  placeholder="Enter company name"
                />
                {errors.company_name && (
                  <p className="mt-1 text-sm text-red-600">{errors.company_name.message}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Opportunity Description
                </label>
                <textarea
                  {...register('opportunity_description')}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-400"
                  placeholder="Describe the opportunity"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Why IBM - Differentiators
                </label>
                <textarea
                  {...register('why_ibm')}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-400"
                  placeholder="What makes IBM the right choice?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Name
                </label>
                <input
                  type="text"
                  {...register('project_name')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-400"
                  placeholder="Enter project name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Business Owner
                </label>
                <input
                  type="text"
                  {...register('business_owner')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-400"
                  placeholder="Enter business owner name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Close Date
                </label>
                <input
                  type="date"
                  {...register('close_date')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Value (US$ Net)
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register('value_usd')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-400"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>

          {/* MEDDIC Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">MEDDIC Qualification</h2>
            
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Metric
                  </label>
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input
                      type="checkbox"
                      {...register('metric_complete')}
                      className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <span className="text-xs text-gray-600">Complete</span>
                  </label>
                </div>
                <textarea
                  {...register('metric')}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-400"
                  placeholder="What are the quantifiable business outcomes?"
                />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Economic Buyer
                  </label>
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input
                      type="checkbox"
                      {...register('economic_buyer_complete')}
                      className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <span className="text-xs text-gray-600">Complete</span>
                  </label>
                </div>
                <input
                  type="text"
                  {...register('economic_buyer')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-400"
                  placeholder="Who has the budget authority?"
                />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Decision Criteria
                  </label>
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input
                      type="checkbox"
                      {...register('decision_criteria_complete')}
                      className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <span className="text-xs text-gray-600">Complete</span>
                  </label>
                </div>
                <textarea
                  {...register('decision_criteria')}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-400"
                  placeholder="What criteria will be used to make the decision?"
                />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Decision Process
                  </label>
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input
                      type="checkbox"
                      {...register('decision_process_complete')}
                      className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <span className="text-xs text-gray-600">Complete</span>
                  </label>
                </div>
                <textarea
                  {...register('decision_process')}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-400"
                  placeholder="What is the decision-making process?"
                />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Identified Pain
                  </label>
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input
                      type="checkbox"
                      {...register('identified_pain_complete')}
                      className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <span className="text-xs text-gray-600">Complete</span>
                  </label>
                </div>
                <textarea
                  {...register('identified_pain')}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-400"
                  placeholder="What pain points are we addressing?"
                />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Champion
                  </label>
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input
                      type="checkbox"
                      {...register('champion_complete')}
                      className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <span className="text-xs text-gray-600">Complete</span>
                  </label>
                </div>
                <input
                  type="text"
                  {...register('champion')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-400"
                  placeholder="Who is our internal champion?"
                />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Competition
                  </label>
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input
                      type="checkbox"
                      {...register('competition_complete')}
                      className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <span className="text-xs text-gray-600">Complete</span>
                  </label>
                </div>
                <textarea
                  {...register('competition')}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-400"
                  placeholder="Who are we competing against?"
                />
              </div>
            </div>
          </div>

          {/* Action Items Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Action Items</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Next Actions and Steps to Close
                </label>
                <textarea
                  {...register('next_actions')}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-400"
                  placeholder="What are the next steps?"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Action Date
                  </label>
                  <input
                    type="date"
                    {...register('action_date')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Action Owner
                  </label>
                  <input
                    type="text"
                    {...register('action_owner')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-400"
                    placeholder="Who is responsible?"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-between items-center">
            <div>
              {isEditMode && (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors font-medium"
                >
                  Delete Deal
                </button>
              )}
            </div>
            <div className="flex gap-3">
              <Link
                to="/"
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? 'Saving...' : isEditMode ? 'Update Deal' : 'Create Deal'}
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default DealDetail;

// Made with Bob
