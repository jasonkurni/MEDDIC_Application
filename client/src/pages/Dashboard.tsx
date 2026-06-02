import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { dealApi } from '../services/api';
import { Deal } from '../types/deal.types';
import { formatCurrency, formatDate, calculateMEDDICScore, getMEDDICStatus } from '../utils/formatters';

const Dashboard = () => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [filteredDeals, setFilteredDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadDeals();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredDeals(deals);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = deals.filter(
        (deal) =>
          deal.company_name.toLowerCase().includes(query) ||
          deal.opportunity_description?.toLowerCase().includes(query) ||
          deal.project_name?.toLowerCase().includes(query)
      );
      setFilteredDeals(filtered);
    }
  }, [searchQuery, deals]);

  const loadDeals = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await dealApi.getDeals();
      setDeals(data);
      setFilteredDeals(data);
    } catch (err) {
      setError('Failed to load deals. Please try again.');
      console.error('Error loading deals:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this deal?')) {
      return;
    }

    try {
      await dealApi.deleteDeal(id);
      await loadDeals();
    } catch (err) {
      alert('Failed to delete deal. Please try again.');
      console.error('Error deleting deal:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search deals by company name, description, or project..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-400"
            />
            <svg
              className="absolute left-4 top-3.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        ) : filteredDeals.length === 0 ? (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No deals found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchQuery ? 'Try adjusting your search query.' : 'Get started by creating a new deal.'}
            </p>
            {!searchQuery && (
              <div className="mt-6">
                <Link
                  to="/deals/new"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
                >
                  + New Deal
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredDeals.map((deal) => (
              <DealCard key={deal.id} deal={deal} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

// DealCard Component
interface DealCardProps {
  deal: Deal;
  onDelete: (id: number) => void;
}

const DealCard = ({ deal, onDelete }: DealCardProps) => {
  const meddicScore = calculateMEDDICScore(deal);
  const status = getMEDDICStatus(meddicScore);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="p-6">
        {/* Company Name */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {deal.company_name}
        </h3>

        {/* Opportunity Description */}
        {deal.opportunity_description && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {deal.opportunity_description}
          </p>
        )}

        {/* Deal Value and Close Date */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-xs text-gray-500">Value</p>
            <p className="text-lg font-bold text-gray-900">
              {formatCurrency(deal.value_usd)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Close Date</p>
            <p className="text-sm font-medium text-gray-900">
              {formatDate(deal.close_date) || 'Not set'}
            </p>
          </div>
        </div>

        {/* MEDDIC Score */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-medium text-gray-700">MEDDIC Score</span>
            <span className={`text-xs font-semibold ${status.color}`}>
              {status.label} ({meddicScore}%)
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${
                meddicScore >= 80
                  ? 'bg-green-500'
                  : meddicScore >= 50
                  ? 'bg-yellow-500'
                  : 'bg-red-500'
              }`}
              style={{ width: `${meddicScore}%` }}
            ></div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Link
            to={`/deals/${deal.id}`}
            className="flex-1 text-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors text-sm font-medium"
          >
            View Details
          </Link>
          <button
            onClick={() => deal.id && onDelete(deal.id)}
            className="px-4 py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors text-sm font-medium"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

// Made with Bob
