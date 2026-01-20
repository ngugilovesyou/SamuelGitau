import React, { useState } from 'react';
import { Search, Star, MapPin, Clock, Users, DollarSign, Plus, X, Building2, Award, TrendingUp } from 'lucide-react';

const CleanersMarketplace = () => {
  const [view, setView] = useState('customer');
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [bookingModal, setBookingModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [addCompanyModal, setAddCompanyModal] = useState(false);
  const [viewCompanyModal, setViewCompanyModal] = useState(null);

  const [companies, setCompanies] = useState([
    {
      id: 1,
      name: "SparkleClean Team",
      owner: "Grace Wanjiku",
      teamSize: 8,
      rating: 4.8,
      reviews: 234,
      location: "Westlands, Nairobi",
      established: "2022",
      teamRate: 3500,
      minTeamSize: 2,
      logo: "✨",
      availability: "Mon-Sat, 7AM-7PM",
      specialties: ["Office Deep Cleaning", "Event Cleanup", "Move-in/out"],
      verified: true,
      completedJobs: 156,
      members: [
        { name: "Grace Wanjiku", role: "Team Leader", experience: "5 years" },
        { name: "Mary Akinyi", role: "Senior Cleaner", experience: "3 years" },
        { name: "Jane Muthoni", role: "Cleaner", experience: "2 years" },
        { name: "Elizabeth Njeri", role: "Cleaner", experience: "2 years" },
        { name: "Rose Chebet", role: "Cleaner", experience: "1 year" },
        { name: "Faith Wambui", role: "Cleaner", experience: "1 year" },
        { name: "Lucy Auma", role: "Cleaner", experience: "1 year" },
        { name: "Mercy Nyambura", role: "Trainee", experience: "6 months" }
      ]
    },
    {
      id: 2,
      name: "Mama's Touch Cleaning Co.",
      owner: "Margaret Nduta",
      teamSize: 12,
      rating: 4.9,
      reviews: 189,
      location: "Kilimani & Karen, Nairobi",
      established: "2021",
      teamRate: 4200,
      minTeamSize: 3,
      logo: "🏠",
      availability: "All week, 6AM-8PM",
      specialties: ["Residential Cleaning", "Post-Construction", "Carpet Cleaning"],
      verified: true,
      completedJobs: 203,
      members: [
        { name: "Margaret Nduta", role: "Owner & Manager", experience: "7 years" },
        { name: "Agnes Wangari", role: "Team Lead A", experience: "4 years" },
        { name: "Susan Achieng", role: "Team Lead B", experience: "4 years" },
        { name: "Beatrice Maina", role: "Senior Cleaner", experience: "3 years" },
        { name: "Nancy Otieno", role: "Senior Cleaner", experience: "3 years" },
        { name: "Catherine Kimani", role: "Cleaner", experience: "2 years" },
        { name: "Esther Mutua", role: "Cleaner", experience: "2 years" },
        { name: "Rebecca Juma", role: "Cleaner", experience: "1 year" },
        { name: "Violet Kibet", role: "Cleaner", experience: "1 year" },
        { name: "Patricia Oloo", role: "Cleaner", experience: "1 year" },
        { name: "Hannah Wairimu", role: "Trainee", experience: "8 months" },
        { name: "Sarah Nafula", role: "Trainee", experience: "6 months" }
      ]
    },
    {
      id: 3,
      name: "ProClean Squad",
      owner: "John Kamau",
      teamSize: 6,
      rating: 4.7,
      reviews: 98,
      location: "Parklands, Nairobi",
      established: "2023",
      teamRate: 3000,
      minTeamSize: 2,
      logo: "💼",
      availability: "Mon-Fri, 8AM-6PM",
      specialties: ["Office Cleaning", "Commercial Spaces", "Window Cleaning"],
      verified: true,
      completedJobs: 87,
      members: [
        { name: "John Kamau", role: "Manager", experience: "6 years" },
        { name: "Alice Njoki", role: "Team Leader", experience: "4 years" },
        { name: "Daniel Omondi", role: "Cleaner", experience: "2 years" },
        { name: "Joyce Wambui", role: "Cleaner", experience: "2 years" },
        { name: "Peter Mwangi", role: "Cleaner", experience: "1 year" },
        { name: "Ann Adhiambo", role: "Trainee", experience: "4 months" }
      ]
    },
    {
      id: 4,
      name: "ShineLight Services",
      owner: "Faith Muthoni",
      teamSize: 5,
      rating: 4.6,
      reviews: 45,
      location: "Ngong Road, Nairobi",
      established: "2024",
      teamRate: 2800,
      minTeamSize: 2,
      logo: "💡",
      availability: "Mon-Sat, 7AM-6PM",
      specialties: ["Home Cleaning", "Kitchen Deep Clean", "Laundry"],
      verified: false,
      completedJobs: 34,
      members: [
        { name: "Faith Muthoni", role: "Owner", experience: "3 years" },
        { name: "Lydia Wanjiru", role: "Senior Cleaner", experience: "2 years" },
        { name: "Monica Akinyi", role: "Cleaner", experience: "1 year" },
        { name: "Purity Chebet", role: "Cleaner", experience: "1 year" },
        { name: "Emily Nafula", role: "Trainee", experience: "3 months" }
      ]
    }
  ]);

  const [bookingForm, setBookingForm] = useState({
    date: '',
    time: '',
    teamSize: 2,
    hours: 4,
    address: '',
    phone: '',
    serviceType: '',
    propertySize: 'medium'
  });

  const [newCompany, setNewCompany] = useState({
    name: '',
    owner: '',
    location: '',
    teamSize: '',
    specialties: '',
    availability: ''
  });

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleBooking = (company) => {
    setSelectedCompany(company);
    setBookingForm({...bookingForm, serviceType: company.specialties[0], teamSize: company.minTeamSize});
    setBookingModal(true);
  };

  const calculateTotal = () => {
    if (!selectedCompany) return 0;
    const baseRate = selectedCompany.teamRate;
    const teamMultiplier = bookingForm.teamSize / selectedCompany.minTeamSize;
    const hourMultiplier = bookingForm.hours / 4;
    return Math.round(baseRate * teamMultiplier * hourMultiplier);
  };

  const submitBooking = () => {
    const total = calculateTotal();
    alert(`Booking confirmed with ${selectedCompany.name}!\n\nTeam Size: ${bookingForm.teamSize} cleaners\nDuration: ${bookingForm.hours} hours\nTotal: KES ${total}\n\nYou will receive an M-Pesa prompt shortly.\n\n${selectedCompany.owner} will contact you to confirm team assignment.`);
    setBookingModal(false);
  };

  const handleAddCompany = () => {
    const company = {
      id: companies.length + 1,
      name: newCompany.name,
      owner: newCompany.owner,
      teamSize: parseInt(newCompany.teamSize),
      rating: 0,
      reviews: 0,
      location: newCompany.location,
      established: new Date().getFullYear().toString(),
      teamRate: 3000,
      minTeamSize: 2,
      logo: "🆕",
      availability: newCompany.availability,
      specialties: newCompany.specialties.split(',').map(s => s.trim()),
      verified: false,
      completedJobs: 0,
      members: []
    };

    setCompanies([...companies, company]);
    setAddCompanyModal(false);
    setNewCompany({
      name: '',
      owner: '',
      location: '',
      teamSize: '',
      specialties: '',
      availability: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">CleanTeams Kenya</h1>
              <p className="text-sm text-blue-100">Professional Cleaning Companies, Not Just Individuals</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setView('customer')}
                className={`px-4 py-2 rounded ${view === 'customer' ? 'bg-white text-blue-600' : 'bg-blue-700'}`}
              >
                Hire a Team
              </button>
              <button
                onClick={() => setView('admin')}
                className={`px-4 py-2 rounded ${view === 'admin' ? 'bg-white text-blue-600' : 'bg-blue-700'}`}
              >
                Company Admin
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Customer View */}
      {view === 'customer' && (
        <div className="max-w-6xl mx-auto p-4">
          {/* Info Banner */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="font-bold text-blue-900 mb-2">Why Book a Cleaning Team?</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>✓ Faster completion - multiple cleaners working together</li>
              <li>✓ Consistent quality - teams are trained together with standardized processes</li>
              <li>✓ Reliability - if one member is sick, the team still shows up</li>
              <li>✓ Supervision - team leaders ensure quality control</li>
            </ul>
          </div>

          {/* Search Bar */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by company name, location, or specialty..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Companies Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {filteredCompanies.map(company => (
              <div key={company.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition border-2 border-transparent hover:border-blue-200">
                <div className="flex items-start gap-4">
                  <div className="text-5xl">{company.logo}</div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{company.name}</h3>
                        <p className="text-sm text-gray-600">Managed by {company.owner}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex items-center text-yellow-500">
                            <Star size={16} fill="currentColor" />
                            <span className="ml-1 text-gray-700 font-medium">{company.rating}</span>
                          </div>
                          <span className="text-gray-500 text-sm">({company.reviews} reviews)</span>
                          {company.verified && (
                            <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded flex items-center gap-1">
                              <Award size={12} />
                              Verified
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <div className="flex items-center text-blue-600 text-sm font-medium">
                          <Users size={16} className="mr-2" />
                          Team Size
                        </div>
                        <p className="text-xl font-bold text-blue-700 mt-1">{company.teamSize} members</p>
                      </div>
                      
                      <div className="bg-green-50 p-3 rounded-lg">
                        <div className="flex items-center text-green-600 text-sm font-medium">
                          <TrendingUp size={16} className="mr-2" />
                          Completed
                        </div>
                        <p className="text-xl font-bold text-green-700 mt-1">{company.completedJobs} jobs</p>
                      </div>
                    </div>

                    <div className="mt-3 space-y-2">
                      <div className="flex items-center text-gray-600 text-sm">
                        <MapPin size={16} className="mr-2" />
                        {company.location}
                      </div>
                      <div className="flex items-center text-gray-600 text-sm">
                        <Clock size={16} className="mr-2" />
                        {company.availability}
                      </div>
                      <div className="flex items-center text-gray-600 text-sm">
                        <Building2 size={16} className="mr-2" />
                        Est. {company.established}
                      </div>
                    </div>

                    <div className="mt-3">
                      <p className="text-sm font-medium text-gray-700 mb-2">Specialties:</p>
                      <div className="flex flex-wrap gap-2">
                        {company.specialties.map((specialty, idx) => (
                          <span key={idx} className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 bg-gray-50 p-3 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Team Rate (from):</span>
                        <span className="text-xl font-bold text-blue-600">KES {company.teamRate}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Min {company.minTeamSize} cleaners, 4 hours</p>
                    </div>

                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={() => setViewCompanyModal(company)}
                        className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition font-medium"
                      >
                        View Team
                      </button>
                      <button
                        onClick={() => handleBooking(company)}
                        className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium"
                      >
                        Book Team
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Admin View */}
      {view === 'admin' && (
        <div className="max-w-6xl mx-auto p-4">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Registered Cleaning Companies</h2>
                <p className="text-sm text-gray-600">Manage teams and verify new companies</p>
              </div>
              <button
                onClick={() => setAddCompanyModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
              >
                <Plus size={20} />
                Register New Company
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left">Company Name</th>
                    <th className="px-4 py-3 text-left">Owner</th>
                    <th className="px-4 py-3 text-left">Team Size</th>
                    <th className="px-4 py-3 text-left">Rating</th>
                    <th className="px-4 py-3 text-left">Jobs</th>
                    <th className="px-4 py-3 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {companies.map(company => (
                    <tr key={company.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{company.logo}</span>
                          <span className="font-medium">{company.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{company.owner}</td>
                      <td className="px-4 py-3">
                        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm font-medium">
                          {company.teamSize} members
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <Star size={14} fill="#EAB308" className="text-yellow-500 mr-1" />
                          {company.rating} ({company.reviews})
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{company.completedJobs}</td>
                      <td className="px-4 py-3">
                        <span className={`px-3 py-1 rounded-full text-xs ${company.verified ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                          {company.verified ? 'Verified' : 'Pending Review'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Revenue Dashboard */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-gray-600 text-sm font-medium">Total Companies</h3>
              <p className="text-3xl font-bold text-blue-600 mt-2">{companies.length}</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-gray-600 text-sm font-medium">Total Cleaners</h3>
              <p className="text-3xl font-bold text-green-600 mt-2">
                {companies.reduce((sum, c) => sum + c.teamSize, 0)}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-gray-600 text-sm font-medium">Completed Jobs</h3>
              <p className="text-3xl font-bold text-purple-600 mt-2">
                {companies.reduce((sum, c) => sum + c.completedJobs, 0)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* View Company Team Modal */}
      {viewCompanyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-2xl font-bold">{viewCompanyModal.name}</h3>
                <p className="text-gray-600">Meet the team</p>
              </div>
              <button onClick={() => setViewCompanyModal(null)}>
                <X size={24} className="text-gray-500 hover:text-gray-700" />
              </button>
            </div>

            <div className="mb-6">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-600 font-medium">Total Members</p>
                  <p className="text-3xl font-bold text-blue-700">{viewCompanyModal.teamSize}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-green-600 font-medium">Completed Jobs</p>
                  <p className="text-3xl font-bold text-green-700">{viewCompanyModal.completedJobs}</p>
                </div>
              </div>

              <h4 className="font-bold text-gray-800 mb-3">Team Members</h4>
              <div className="space-y-3">
                {viewCompanyModal.members.length > 0 ? (
                  viewCompanyModal.members.map((member, idx) => (
                    <div key={idx} className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-800">{member.name}</p>
                        <p className="text-sm text-gray-600">{member.role}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-blue-600 font-medium">{member.experience}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">No team members listed yet</p>
                )}
              </div>
            </div>

            <button
              onClick={() => {
                setViewCompanyModal(null);
                handleBooking(viewCompanyModal);
              }}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Book This Team
            </button>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {bookingModal && selectedCompany && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold">Book {selectedCompany.name}</h3>
              <button onClick={() => setBookingModal(false)}>
                <X size={24} className="text-gray-500 hover:text-gray-700" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Service Date</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={bookingForm.date}
                  onChange={(e) => setBookingForm({...bookingForm, date: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Service Time</label>
                <input
                  type="time"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={bookingForm.time}
                  onChange={(e) => setBookingForm({...bookingForm, time: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Team Size</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={bookingForm.teamSize}
                  onChange={(e) => setBookingForm({...bookingForm, teamSize: parseInt(e.target.value)})}
                >
                  {[...Array(10)].map((_, i) => {
                    const size = selectedCompany.minTeamSize + i;
                    return size <= selectedCompany.teamSize ? (
                      <option key={size} value={size}>{size} cleaners</option>
                    ) : null;
                  })}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration (hours)</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={bookingForm.hours}
                  onChange={(e) => setBookingForm({...bookingForm, hours: parseInt(e.target.value)})}
                >
                  <option value={2}>2 hours</option>
                  <option value={4}>4 hours</option>
                  <option value={6}>6 hours</option>
                  <option value={8}>8 hours</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Service Type</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={bookingForm.serviceType}
                  onChange={(e) => setBookingForm({...bookingForm, serviceType: e.target.value})}
                >
                  {selectedCompany.specialties.map((specialty, idx) => (
                    <option key={idx} value={specialty}>{specialty}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  value={bookingForm.address}
                  onChange={(e) => setBookingForm({...bookingForm, address: e.target.value})}
                  placeholder="Enter your full address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={bookingForm.phone}
                  onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                  placeholder="0712345678"
                />
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">Base Rate:</span>
                  <span className="font-medium">KES {selectedCompany.teamRate}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">Team Size Multiplier:</span>
                  <span className="font-medium">×{(bookingForm.teamSize / selectedCompany.minTeamSize).toFixed(1)}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">Duration Multiplier:</span>
                  <span className="font-medium">×{(bookingForm.hours / 4).toFixed(1)}</span>
                                    <p className="text-xl font-bold text-blue-700">{viewCompanyModal.teamSize}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-green-600 font-medium">Jobs Completed</p>
                  <p className="text-xl font-bold text-green-700">{viewCompanyModal.completedJobs}</p>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-yellow-800">
                  <span className="font-medium">Note:</span> Teams work together and are trained as a unit. 
                  This ensures consistent quality and faster completion of cleaning tasks.
                </p>
              </div>

              <h4 className="font-bold text-gray-800 mb-3">Team Members</h4>
              <div className="space-y-3">
                {viewCompanyModal.members.map((member, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                    <div>
                      <p className="font-medium text-gray-800">{member.name}</p>
                      <p className="text-sm text-gray-600">{member.role}</p>
                    </div>
                    <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">
                      {member.experience} experience
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setViewCompanyModal(null);
                  handleBooking(viewCompanyModal);
                }}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-medium"
              >
                Book This Team
              </button>
              <button
                onClick={() => setViewCompanyModal(null)}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {bookingModal && selectedCompany && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-xl font-bold">Book {selectedCompany.name}</h3>
                <p className="text-sm text-gray-600">Managed by {selectedCompany.owner}</p>
              </div>
              <button onClick={() => setBookingModal(false)}>
                <X size={24} className="text-gray-500 hover:text-gray-700" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Service Type</label>
                <select
                  className="w-full border border-gray-300 rounded-lg p-2"
                  value={bookingForm.serviceType}
                  onChange={(e) => setBookingForm({...bookingForm, serviceType: e.target.value})}
                >
                  {selectedCompany.specialties.map((specialty, idx) => (
                    <option key={idx} value={specialty}>{specialty}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Team Size</label>
                  <select
                    className="w-full border border-gray-300 rounded-lg p-2"
                    value={bookingForm.teamSize}
                    onChange={(e) => setBookingForm({...bookingForm, teamSize: parseInt(e.target.value)})}
                  >
                    {Array.from({length: selectedCompany.teamSize - selectedCompany.minTeamSize + 1}, (_, i) => 
                      selectedCompany.minTeamSize + i
                    ).map(size => (
                      <option key={size} value={size}>{size} cleaners</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                  <select
                    className="w-full border border-gray-300 rounded-lg p-2"
                    value={bookingForm.hours}
                    onChange={(e) => setBookingForm({...bookingForm, hours: parseInt(e.target.value)})}
                  >
                    <option value="2">2 hours</option>
                    <option value="4">4 hours</option>
                    <option value="6">6 hours</option>
                    <option value="8">8 hours</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Property Size</label>
                <select
                  className="w-full border border-gray-300 rounded-lg p-2"
                  value={bookingForm.propertySize}
                  onChange={(e) => setBookingForm({...bookingForm, propertySize: e.target.value})}
                >
                  <option value="small">Small (1-2 bedrooms)</option>
                  <option value="medium">Medium (3-4 bedrooms)</option>
                  <option value="large">Large (5+ bedrooms)</option>
                  <option value="commercial">Commercial/Office</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded-lg p-2"
                  value={bookingForm.date}
                  onChange={(e) => setBookingForm({...bookingForm, date: e.target.value})}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                <select
                  className="w-full border border-gray-300 rounded-lg p-2"
                  value={bookingForm.time}
                  onChange={(e) => setBookingForm({...bookingForm, time: e.target.value})}
                >
                  <option value="">Select time</option>
                  <option value="07:00">7:00 AM</option>
                  <option value="08:00">8:00 AM</option>
                  <option value="09:00">9:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="12:00">12:00 PM</option>
                  <option value="13:00">1:00 PM</option>
                  <option value="14:00">2:00 PM</option>
                  <option value="15:00">3:00 PM</option>
                  <option value="16:00">4:00 PM</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg p-2"
                  placeholder="Enter your address"
                  value={bookingForm.address}
                  onChange={(e) => setBookingForm({...bookingForm, address: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  className="w-full border border-gray-300 rounded-lg p-2"
                  placeholder="07XX XXX XXX"
                  value={bookingForm.phone}
                  onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                />
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">Estimated Total:</span>
                  <span className="text-2xl font-bold text-blue-600">KES {calculateTotal()}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Based on {bookingForm.teamSize} cleaners for {bookingForm.hours} hours
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={submitBooking}
                  className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-medium"
                >
                  Confirm Booking & Pay
                </button>
                <button
                  onClick={() => setBookingModal(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Company Modal */}
      {addCompanyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Register New Cleaning Company</h3>
              <button onClick={() => setAddCompanyModal(false)}>
                <X size={24} className="text-gray-500 hover:text-gray-700" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg p-2"
                  placeholder="e.g., SparkleClean Team"
                  value={newCompany.name}
                  onChange={(e) => setNewCompany({...newCompany, name: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Owner Name</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg p-2"
                  placeholder="e.g., Grace Wanjiku"
                  value={newCompany.owner}
                  onChange={(e) => setNewCompany({...newCompany, owner: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Team Size</label>
                  <input
                    type="number"
                    min="2"
                    className="w-full border border-gray-300 rounded-lg p-2"
                    placeholder="Number of cleaners"
                    value={newCompany.teamSize}
                    onChange={(e) => setNewCompany({...newCompany, teamSize: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg p-2"
                    placeholder="e.g., Westlands, Nairobi"
                    value={newCompany.location}
                    onChange={(e) => setNewCompany({...newCompany, location: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Specialties</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg p-2"
                  placeholder="e.g., Office Cleaning, Residential, Event Cleanup"
                  value={newCompany.specialties}
                  onChange={(e) => setNewCompany({...newCompany, specialties: e.target.value})}
                />
                <p className="text-xs text-gray-500 mt-1">Separate with commas</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg p-2"
                  placeholder="e.g., Mon-Sat, 7AM-7PM"
                  value={newCompany.availability}
                  onChange={(e) => setNewCompany({...newCompany, availability: e.target.value})}
                />
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  <span className="font-medium">Note:</span> New companies are marked as "Pending Review" 
                  until verified. The platform will assign a base rate and you can add team members later.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleAddCompany}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-medium"
                  disabled={!newCompany.name || !newCompany.owner || !newCompany.teamSize}
                >
                  Register Company
                </button>
                <button
                  onClick={() => setAddCompanyModal(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="bg-gray-800 text-white p-6 mt-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold">CleanTeams Kenya</h3>
              <p className="text-gray-400">Professional cleaning teams for hire</p>
            </div>
            <div className="flex gap-6">
              <div>
                <h4 className="font-medium mb-2">For Customers</h4>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>Book a Team</li>
                  <li>How it Works</li>
                  <li>Pricing</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">For Companies</h4>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>Register Your Team</li>
                  <li>Team Management</li>
                  <li>Resources</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Contact</h4>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>support@cleanteams.co.ke</li>
                  <li>+254 700 123 456</li>
                  <li>Nairobi, Kenya</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-6 pt-6 text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} CleanTeams Kenya. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CleanersMarketplace;
