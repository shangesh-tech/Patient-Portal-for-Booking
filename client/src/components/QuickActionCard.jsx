export const QuickActionCard = ({ icon: Icon, title, description, onClick }) => (
    <div 
      onClick={onClick}
      className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer border border-gray-100 hover:border-blue-500"
    >
      <div className="flex items-center space-x-4">
        <div className="bg-blue-50 p-3 rounded-full">
          <Icon className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h3 className="font-semibold text-lg text-gray-800">{title}</h3>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );