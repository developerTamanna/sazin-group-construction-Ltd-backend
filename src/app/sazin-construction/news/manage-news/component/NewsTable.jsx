import { useState } from 'react';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';

export default function NewsTable({ news }) {
  return (
    <div className="w-full overflow-hidden bg-white dark:bg-neutral-900 rounded-2xl shadow-lg border border-gray-100 dark:border-neutral-800">
      <div className="px-6 py-5 border-b border-gray-100 dark:border-neutral-800">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          News Management
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Manage your news articles and content
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="bg-gray-50 dark:bg-neutral-800/50 border-b border-gray-100 dark:border-neutral-700">
              <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Image
              </th>
              <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Title
              </th>
              <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Description
              </th>
              <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Author
              </th>
              <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Date
              </th>
              <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 dark:divide-neutral-700">
            {news?.length > 0 ? (
              news.map((item, index) => <NewsRow key={index} item={item} />)
            ) : (
              <tr>
                <td colSpan="6" className="py-12 text-center">
                  <div className="flex flex-col items-center justify-center text-gray-400 dark:text-gray-500">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mb-4">
                      <svg
                        className="w-8 h-8"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 5c0-1.1.9-2 2-2h8a2 2 0 012 2v14l-6-3-6 3V5z"
                        />
                      </svg>
                    </div>
                    <p className="text-lg font-medium text-gray-500 dark:text-gray-400 mb-1">
                      No news articles found
                    </p>
                    <p className="text-sm text-gray-400 dark:text-gray-500">
                      Get started by creating your first news article
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// আলাদা component description সহ
function NewsRow({ item }) {
  const [showFull, setShowFull] = useState(false);

  return (
    <tr className="transition-all duration-200 hover:bg-gray-50 dark:hover:bg-neutral-800/30 group">
      <td className="py-4 px-6">
        <div className="flex items-center">
          <img
            src={item?.imageUrl || '/placeholder.png'}
            alt={item?.newstitle}
            className="w-12 h-12 rounded-lg object-cover shadow-sm border border-gray-200 dark:border-neutral-700"
          />
        </div>
      </td>
      <td className="py-4 px-6">
        <div className="max-w-[200px]">
          <p className="font-medium text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {item?.newstitle}
          </p>
        </div>
      </td>
      <td className="py-4 px-6 max-w-[300px]">
        <p
          className={`text-sm text-gray-600 dark:text-gray-300 leading-relaxed ${
            showFull ? '' : 'line-clamp-2'
          }`}
        >
          {item?.description}
        </p>
        {item?.description?.length > 100 && (
          <button
            className="text-blue-500 dark:text-blue-400 text-xs mt-1 hover:underline"
            onClick={() => setShowFull(!showFull)}
          >
            {showFull ? 'Show Less' : 'Read More'}
          </button>
        )}
      </td>
      <td className="py-4 px-6">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-800">
          {item?.author}
        </span>
      </td>
      <td className="py-4 px-6">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {item?.date
              ? new Date(item.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })
              : 'N/A'}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {item?.date
              ? new Date(item.date).toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                })
              : ''}
          </span>
        </div>
      </td>
      <td className="py-4 px-6">
        <div className="flex items-center gap-2">
          <button
            className="p-2.5 rounded-xl bg-gray-100 dark:bg-neutral-800 text-gray-600 dark:text-gray-400 hover:bg-blue-500 hover:text-white transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105"
            title="View Details"
          >
            <FaEye size={16} />
          </button>
          <button
            className="p-2.5 rounded-xl bg-gray-100 dark:bg-neutral-800 text-gray-600 dark:text-gray-400 hover:bg-green-500 hover:text-white transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105"
            title="Edit Content"
          >
            <FaEdit size={16} />
          </button>
          <button
            className="p-2.5 rounded-xl bg-gray-100 dark:bg-neutral-800 text-gray-600 dark:text-gray-400 hover:bg-red-500 hover:text-white transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105"
            title="Delete Article"
          >
            <FaTrash size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
}
