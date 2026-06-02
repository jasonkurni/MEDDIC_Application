import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Header from '../components/layout/Header';
import LoadingSpinner from '../components/common/LoadingSpinner';
import InfoTooltip from '../components/common/InfoTooltip';
import { dealApi } from '../services/api';
import { Deal, DealFormData } from '../types/deal.types';
import { exportDealToPDF } from '../utils/pdfExport';
import { formatDateForInput } from '../utils/formatters';

const DealDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [duplicating, setDuplicating] = useState(false);
  const [deal, setDeal] = useState<Deal | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    control,
    formState: { errors },
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

  const handleDuplicate = async () => {
    if (!deal) return;

    if (!window.confirm('Are you sure you want to duplicate this deal? A copy will be created with all the same information.')) {
      return;
    }

    try {
      setDuplicating(true);

      // Get current form values
      const currentValues = getValues();

      // Prepare deal data for duplication
      const duplicateData: Partial<Deal> = {
        company_name: `${currentValues.company_name} (Copy)`,
        opportunity_description: currentValues.opportunity_description,
        why_ibm: currentValues.why_ibm,
        project_name: currentValues.project_name,
        business_owner: currentValues.business_owner,
        close_date: currentValues.close_date || undefined,
        value_usd: currentValues.value_usd ? parseFloat(currentValues.value_usd) : undefined,
        metric: currentValues.metric,
        economic_buyer: currentValues.economic_buyer,
        decision_criteria: currentValues.decision_criteria,
        decision_process: currentValues.decision_process,
        identified_pain: currentValues.identified_pain,
        champion: currentValues.champion,
        competition: currentValues.competition,
        next_actions: currentValues.next_actions,
        action_date: currentValues.action_date || undefined,
        action_owner: currentValues.action_owner,
        metric_complete: currentValues.metric_complete,
        economic_buyer_complete: currentValues.economic_buyer_complete,
        decision_criteria_complete: currentValues.decision_criteria_complete,
        decision_process_complete: currentValues.decision_process_complete,
        identified_pain_complete: currentValues.identified_pain_complete,
        champion_complete: currentValues.champion_complete,
        competition_complete: currentValues.competition_complete,
      };

      // Create the duplicate deal
      const newDeal = await dealApi.createDeal(duplicateData);
      
      alert('Deal duplicated successfully!');
      navigate(`/deals/${newDeal.id}`);
    } catch (err) {
      alert('Failed to duplicate deal. Please try again.');
      console.error('Error duplicating deal:', err);
    } finally {
      setDuplicating(false);
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
              <div className="flex gap-3">
                <button
                  onClick={handleDuplicate}
                  disabled={duplicating}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  {duplicating ? 'Duplicating...' : 'Duplicate Deal'}
                </button>
                <button
                  onClick={handleExportPDF}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium"
                >
                  Export PDF
                </button>
              </div>
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
                <Controller
                  name="close_date"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      selected={field.value ? new Date(field.value) : null}
                      onChange={(date) => {
                        field.onChange(date ? date.toISOString().split('T')[0] : '');
                      }}
                      dateFormat="yyyy-MM-dd"
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      minDate={new Date(new Date().setFullYear(new Date().getFullYear() - 1))}
                      maxDate={new Date(new Date().setFullYear(new Date().getFullYear() + 2))}
                      placeholderText="Select close date"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-400"
                      wrapperClassName="w-full"
                    />
                  )}
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
                <div className="flex items-center justify-between mb-1">
                  <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700">
                    Metric
                    <InfoTooltip content="Show me the documented business case. If you can't print it and show me it, it's not real.

Has the customer seen it? Do they agree with it? Have they helped write it?

Clients do not buy that often and are likely not used to or very good at writing/creating a business case. They will need coaching or us to do it for them.

Key question: Does it align to the financial criteria of their decision making process? If NOT, it doesn't matter how good the business case is.

Will it be attached to the customer's approval process/paper trail as part of their decision making process?

Did they participate in building the ROI model?" />
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
                <div className="flex items-center justify-between mb-1">
                  <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700">
                    Economic Buyer
                    <InfoTooltip content="Individual with final budget approval. WRITE THE NAME IN THIS CELL.

Is he/she expecting to purchase our solution on the day/week/MONTH we expect and are forecasting it?

Have we met him/her to discuss project, timelines, process and business case?" />
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
                <div className="flex items-center justify-between mb-1">
                  <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700">
                    Decision Criteria
                    <InfoTooltip content="How a customer makes the buying decision - two components:

Financial criteria (payback period, ROI). MUST be re-validated on all deals. COVID-19 has impacted clients and their investment profiles and projects.

Technical criteria (does it meet the functional and non-functional requirements? Does it integrate with existing architecture?)

If a POC/POT is required: We will not do this unless we have agreed/documented the scope of the work and what success/failure looks like. The client must agree to this." />
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
                <div className="flex items-center justify-between mb-1">
                  <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700">
                    Decision Process
                    <InfoTooltip content="Document and understand the physical process the client will go through to raise a PO. Actually write the process in this cell.

Every deal MUST be re-validated - based on COVID-19 many clients have introduced new steps and reviews.

Often clients do not even know the process.

Example: document name, CIO, Tech Board, Finance, Procurement, Legal, Board etc. Business case attached - aligned to financial criteria? Architecture topology document attached?" />
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
                <div className="flex items-center justify-between mb-1">
                  <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700">
                    Identified Pain
                    <InfoTooltip content="Why do anything? Understand the business problem and impact to them (e.g., regulatory/compliance).

The cost of doing nothing.

Is it measurable?

Who benefits from fixing it?

What happens if it's not fixed?" />
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
                <div className="flex items-center justify-between mb-1">
                  <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700">
                    Champion
                    <InfoTooltip content="Sells for you when you are not there.

This could be THE most important person in a sales campaign.

This is the person that you educate who will fight for you when you are not in the room.

This person usually has personal motivation for wanting you to win.

Has power/influence to drive the internal process and influence the supplier choice.

Try to understand what that motivation is, and help them help you.

How do they get measured internally and compensated? Align to how we can de-risk them achieving these measures." />
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
                  <Controller
                    name="action_date"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        selected={field.value ? new Date(field.value) : null}
                        onChange={(date) => {
                          field.onChange(date ? date.toISOString().split('T')[0] : '');
                        }}
                        dateFormat="yyyy-MM-dd"
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        minDate={new Date(new Date().setFullYear(new Date().getFullYear() - 1))}
                        maxDate={new Date(new Date().setFullYear(new Date().getFullYear() + 2))}
                        placeholderText="Select action date"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-400"
                        wrapperClassName="w-full"
                      />
                    )}
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
