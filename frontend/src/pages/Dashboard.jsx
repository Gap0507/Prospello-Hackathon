import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DollarSign, LogOut, PlusCircle, Users, BarChart3, Coffee } from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();
  
  // Simulated user data - would normally come from context or props
  const user = {
    name: "Alex Chen"
  };
  
  // Mock data - this would normally come from an API
  const balances = {
    youOwe: [
      { user: { name: "Taylor Swift" }, amount: 650.75 },
      { user: { name: "Priya Sharma" }, amount: 120.50 },
    ],
    youAreOwed: [
      { user: { name: "James Wilson" }, amount: 430.25 },
      { user: { name: "Sarah Kim" }, amount: 85.00 },
      { user: { name: "Mike Johnson" }, amount: 275.30 },
    ]
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="flex items-center">
                  <DollarSign className="h-8 w-8 text-emerald-400" />
                  <span className="ml-2 text-xl font-bold bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">SplitEase</span>
                </span>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <a href="/dashboard" className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">Dashboard</a>
                  <a href="/groups" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Groups</a>
                  <a href="/expenses" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Expenses</a>
                  <a href="/activity" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Activity</a>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <button 
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center"
                  onClick={() => navigate('/expenses/new')}
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Expense
                </button>
                <button 
                  onClick={handleLogout}
                  className="ml-3 bg-gray-700 hover:bg-gray-600 text-gray-300 px-4 py-2 rounded-md text-sm font-medium flex items-center"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-white">Hey, {user.name}</h1>
            <div className="bg-gray-800 px-4 py-2 rounded-lg border border-gray-700 flex items-center">
              <span className="text-sm text-gray-400">Last updated:</span>
              <span className="ml-2 text-sm text-gray-300">May 10, 2025</span>
            </div>
          </div>
          
          {/* Summary Cards */}
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Total balance */}
            <div className="bg-gray-800/80 backdrop-blur rounded-lg shadow p-6 border border-gray-700 flex flex-col">
              <h2 className="text-lg font-medium text-gray-300">Total Balance</h2>
              <div className="mt-2 flex items-end">
                <span className="text-3xl font-bold text-emerald-400">₹{(430.25 + 85.00 + 275.30 - 650.75 - 120.50).toFixed(2)}</span>
                <span className="ml-2 text-sm text-gray-400">(overall)</span>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">You owe</p>
                  <p className="font-medium text-red-400">₹{(650.75 + 120.50).toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">You are owed</p>
                  <p className="font-medium text-emerald-400">₹{(430.25 + 85.00 + 275.30).toFixed(2)}</p>
                </div>
              </div>
            </div>
            
            {/* Recent Activity */}
            <div className="bg-gray-800/80 backdrop-blur rounded-lg shadow p-6 border border-gray-700 lg:col-span-2">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-300">Recent Activity</h2>
                <a href="/activity" className="text-sm text-emerald-400 hover:text-emerald-300">View all</a>
              </div>
              <div className="mt-4 space-y-3">
                <div className="bg-gray-700/50 p-3 rounded-lg flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="bg-emerald-900/30 h-8 w-8 rounded-full flex items-center justify-center mr-3">
                      <Coffee className="h-4 w-4 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-gray-300">Coffee & Snacks</p>
                      <p className="text-xs text-gray-400">Taylor paid • Yesterday</p>
                    </div>
                  </div>
                  <span className="font-medium text-red-400">You owe ₹120.50</span>
                </div>
                <div className="bg-gray-700/50 p-3 rounded-lg flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="bg-indigo-900/30 h-8 w-8 rounded-full flex items-center justify-center mr-3">
                      <DollarSign className="h-4 w-4 text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-gray-300">Group dinner</p>
                      <p className="text-xs text-gray-400">You paid • 2 days ago</p>
                    </div>
                  </div>
                  <span className="font-medium text-emerald-400">You get back ₹275.30</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* You owe */}
            <div className="bg-gray-800 rounded-lg shadow p-6 border border-gray-700">
              <h2 className="text-xl font-semibold text-white flex items-center">
                <span className="bg-red-900/30 p-2 rounded-full mr-2">
                  <BarChart3 className="h-5 w-5 text-red-400" />
                </span>
                You owe
              </h2>
              
              {balances.youOwe.length === 0 ? (
                <p className="mt-4 text-gray-400">You don't owe anyone.</p>
              ) : (
                <ul className="mt-4 space-y-3">
                  {balances.youOwe.map((balance, index) => (
                    <li key={index} className="bg-gray-700/50 p-3 rounded-lg flex justify-between items-center hover:bg-gray-700 transition-colors">
                      <div className="flex items-center">
                        <div className="bg-gray-600 h-10 w-10 rounded-full flex items-center justify-center mr-3">
                          <span className="text-sm font-medium text-gray-300">
                            {balance.user.name.split(' ').map(name => name[0]).join('')}
                          </span>
                        </div>
                        <span className="text-gray-300">{balance.user.name}</span>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="font-medium text-red-400">₹{balance.amount.toFixed(2)}</span>
                        <button className="text-xs text-emerald-400 mt-1 hover:text-emerald-300">Settle up</button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            
            {/* You are owed */}
            <div className="bg-gray-800 rounded-lg shadow p-6 border border-gray-700">
              <h2 className="text-xl font-semibold text-white flex items-center">
                <span className="bg-emerald-900/30 p-2 rounded-full mr-2">
                  <BarChart3 className="h-5 w-5 text-emerald-400" />
                </span>
                You are owed
              </h2>
              
              {balances.youAreOwed.length === 0 ? (
                <p className="mt-4 text-gray-400">No one owes you money.</p>
              ) : (
                <ul className="mt-4 space-y-3">
                  {balances.youAreOwed.map((balance, index) => (
                    <li key={index} className="bg-gray-700/50 p-3 rounded-lg flex justify-between items-center hover:bg-gray-700 transition-colors">
                      <div className="flex items-center">
                        <div className="bg-gray-600 h-10 w-10 rounded-full flex items-center justify-center mr-3">
                          <span className="text-sm font-medium text-gray-300">
                            {balance.user.name.split(' ').map(name => name[0]).join('')}
                          </span>
                        </div>
                        <span className="text-gray-300">{balance.user.name}</span>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="font-medium text-emerald-400">₹{balance.amount.toFixed(2)}</span>
                        <button className="text-xs text-gray-400 mt-1 hover:text-gray-300">Remind</button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          
          {/* Quick actions */}
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <button 
              onClick={() => navigate('/expenses/new')}
              className="bg-gray-800 hover:bg-gray-700 border border-gray-700 p-4 rounded-lg flex items-center transition-colors"
            >
              <div className="rounded-full bg-emerald-900/30 p-3 mr-4">
                <PlusCircle className="h-6 w-6 text-emerald-400" />
              </div>
              <div className="text-left">
                <h3 className="text-white font-medium">Add an expense</h3>
                <p className="text-gray-400 text-sm">Record a new expense</p>
              </div>
            </button>
            
            <button 
              onClick={() => navigate('/groups/new')}
              className="bg-gray-800 hover:bg-gray-700 border border-gray-700 p-4 rounded-lg flex items-center transition-colors"
            >
              <div className="rounded-full bg-indigo-900/30 p-3 mr-4">
                <Users className="h-6 w-6 text-indigo-400" />
              </div>
              <div className="text-left">
                <h3 className="text-white font-medium">Create a group</h3>
                <p className="text-gray-400 text-sm">Start tracking group expenses</p>
              </div>
            </button>
            
            <button 
              onClick={() => navigate('/settle')}
              className="bg-gray-800 hover:bg-gray-700 border border-gray-700 p-4 rounded-lg flex items-center transition-colors"
            >
              <div className="rounded-full bg-teal-900/30 p-3 mr-4">
                <DollarSign className="h-6 w-6 text-teal-400" />
              </div>
              <div className="text-left">
                <h3 className="text-white font-medium">Settle up</h3>
                <p className="text-gray-400 text-sm">Record a payment</p>
              </div>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}