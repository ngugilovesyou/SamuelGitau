import React, { useState, useEffect } from 'react';
import { Plus, ShoppingCart, Package, TrendingUp, AlertCircle, History, FileText, Users, LogOut, Menu, X, Download, Mail, Search, Upload, ArrowUp, ArrowDown, Filter, Printer, Smartphone } from 'lucide-react';

// ====================== STOCK & SALES MANAGEMENT SYSTEM ======================
// Designed for Hardware Stores, Timber Yards & Furniture Shops in Kenya
// Features: M-Pesa integration, offline capability, simple UI, profit tracking
// ============================================================================

const HardwareStoreSystem = () => {
  const [currentView, setCurrentView] = useState('login');
  const [currentUser, setCurrentUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [offlineMode, setOfflineMode] = useState(false);
  
  // Core business data states
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [stockHistory, setStockHistory] = useState([]);
  const [suppliers, setSuppliers] = useState([
    { id: 1, name: 'Bamburi Cement Ltd', contact: '0712345678' },
    { id: 2, name: 'Timberland Suppliers', contact: '0723456789' },
    { id: 3, name: 'Mabati Rolling Mills', contact: '0734567890' },
    { id: 4, name: 'Hilti Kenya', contact: '0745678901' }
  ]);
  
  const [users, setUsers] = useState([
    { id: 1, username: 'owner', password: 'owner123', role: 'owner', name: 'Shop Owner' },
    { id: 2, username: 'staff', password: 'staff123', role: 'staff', name: 'Sales Staff' },
    { id: 3, username: 'manager', password: 'manager123', role: 'manager', name: 'Store Manager' }
  ]);

  // Sales transaction state
  const [currentSale, setCurrentSale] = useState({
    items: [],
    total: 0,
    profit: 0,
    paymentMethod: 'cash',
    mpesaNumber: '',
    customerEmail: '',
    discount: 0
  });

  // Check online status
  useEffect(() => {
    const handleOnline = () => setOfflineMode(false);
    const handleOffline = () => setOfflineMode(true);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    setOfflineMode(!navigator.onLine);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Initialize with sample data for demo
  useEffect(() => {
    const loadData = async () => {
      try {
        // Check if storage API exists (simulating for demo)
        if (typeof window !== 'undefined' && window.storage) {
          const productsData = await window.storage.get('products');
          const salesData = await window.storage.get('sales');
          const stockHistoryData = await window.storage.get('stockHistory');
          
          if (productsData) setProducts(JSON.parse(productsData.value));
          if (salesData) setSales(JSON.parse(salesData.value));
          if (stockHistoryData) setStockHistory(JSON.parse(stockHistoryData.value));
        } else {
          // Load demo data
          const demoProducts = [
            { id: 1, name: 'Cement 50kg', category: 'Building Materials', quantity: 45, costPrice: 650, sellingPrice: 750, supplier: 'Bamburi Cement Ltd', lowStockAlert: 10, unit: 'bag' },
            { id: 2, name: 'Nails 3-inch', category: 'Hardware', quantity: 120, costPrice: 150, sellingPrice: 200, supplier: 'Timberland Suppliers', lowStockAlert: 20, unit: 'kg' },
            { id: 3, name: 'Mahogany Timber', category: 'Timber', quantity: 25, costPrice: 2500, sellingPrice: 3200, supplier: 'Timberland Suppliers', lowStockAlert: 5, unit: 'piece' },
            { id: 4, name: 'Office Chair', category: 'Furniture', quantity: 8, costPrice: 4500, sellingPrice: 6000, supplier: 'Local Craftsman', lowStockAlert: 3, unit: 'piece' },
            { id: 5, name: 'Paint 4L', category: 'Paint', quantity: 15, costPrice: 1200, sellingPrice: 1800, supplier: 'Crown Paints', lowStockAlert: 5, unit: 'tin' },
            { id: 6, name: 'PVC Pipe 2-inch', category: 'Plumbing', quantity: 32, costPrice: 850, sellingPrice: 1200, supplier: 'Plumbworld', lowStockAlert: 10, unit: 'piece' }
          ];
          
          const demoSales = [
            { id: 1, date: '2024-03-15', items: [{id: 1, name: 'Cement 50kg', quantity: 5, price: 750}], total: 3750, profit: 500, paymentMethod: 'mpesa', receiptNo: 'REC001' },
            { id: 2, date: '2024-03-15', items: [{id: 3, name: 'Mahogany Timber', quantity: 2, price: 3200}], total: 6400, profit: 1400, paymentMethod: 'cash', receiptNo: 'REC002' }
          ];
          
          setProducts(demoProducts);
          setSales(demoSales);
        }
      } catch (error) {
        console.log('Starting with fresh data');
      }
    };
    loadData();
  }, []);

  // Save data functions with offline sync
  const saveData = async (key, data) => {
    try {
      if (typeof window !== 'undefined' && window.storage) {
        await window.storage.set(key, JSON.stringify(data));
      } else {
        localStorage.setItem(`hardware_${key}`, JSON.stringify(data));
      }
      
      // If online, also sync to cloud (simulated)
      if (!offlineMode) {
        // Simulate cloud sync
        console.log(`Syncing ${key} to cloud...`);
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  // Save on data changes
  useEffect(() => {
    if (products.length > 0) saveData('products', products);
  }, [products]);

  useEffect(() => {
    if (sales.length > 0) saveData('sales', sales);
  }, [sales]);

  useEffect(() => {
    if (stockHistory.length > 0) saveData('stockHistory', stockHistory);
  }, [stockHistory]);

  // ====================== LOGIN COMPONENT ======================
  const LoginView = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
      const user = users.find(u => u.username === username && u.password === password);
      if (user) {
        setCurrentUser(user);
        setCurrentView('dashboard');
        setError('');
        // Log login for audit
        console.log(`User ${user.name} logged in at ${new Date().toISOString()}`);
      } else {
        setError('Invalid username or password');
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="bg-blue-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="text-white" size={40} />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Hardware Manager</h1>
            <p className="text-gray-600 mt-2">Stock & Sales System for Kenyan Hardware Stores</p>
            {offlineMode && (
              <div className="mt-2 bg-yellow-100 text-yellow-800 p-2 rounded text-sm">
                🔄 Working in Offline Mode
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-4 border-2 border-gray-300 rounded-lg text-lg"
                placeholder="Enter username"
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 border-2 border-gray-300 rounded-lg text-lg"
                placeholder="Enter password"
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <button
              onClick={handleLogin}
              className="w-full bg-blue-600 text-white p-4 rounded-lg text-lg font-semibold hover:bg-blue-700 flex items-center justify-center gap-2"
            >
              Login to System
            </button>

            <div className="mt-6 p-4 bg-gray-100 rounded-lg">
              <p className="text-sm font-semibold text-gray-700 mb-2">Demo Accounts:</p>
              <p className="text-sm text-gray-600">👑 Owner: owner / owner123</p>
              <p className="text-sm text-gray-600">👥 Staff: staff / staff123</p>
              <p className="text-sm text-gray-600">📊 Manager: manager / manager123</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ====================== SIDEBAR COMPONENT ======================
  const Sidebar = () => {
    const menuItems = [
      { id: 'dashboard', label: 'Dashboard', icon: TrendingUp, visible: true },
      { id: 'newSale', label: 'New Sale', icon: ShoppingCart, visible: true },
      { id: 'products', label: 'Products', icon: Package, visible: true },
      { id: 'addProduct', label: 'Add Product', icon: Plus, visible: true },
      { id: 'addStock', label: 'Add Stock', icon: ArrowUp, visible: true },
      { id: 'salesHistory', label: 'Sales History', icon: History, visible: true },
      { id: 'reports', label: 'Reports', icon: FileText, visible: true },
      { id: 'stockHistory', label: 'Stock History', icon: History, visible: ['owner', 'manager'].includes(currentUser?.role) },
      { id: 'manageUsers', label: 'Users', icon: Users, visible: currentUser?.role === 'owner' },
    ];

    return (
      <>
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
        `}>
          <div className="p-6 border-b border-gray-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Package size={32} className="text-blue-400" />
                <div>
                  <h2 className="text-xl font-bold">HardwareBiz</h2>
                </div>
              </div>
              <button 
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="mt-4 flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                {currentUser?.name?.charAt(0) || 'U'}
              </div>
              <div>
                <p className="font-semibold">{currentUser?.name}</p>
                <p className="text-gray-400 text-sm capitalize">{currentUser?.role}</p>
              </div>
            </div>
          </div>

          <nav className="p-4 space-y-2">
            {menuItems.map(item => {
              if (!item.visible || (Array.isArray(item.visible) && !item.visible.includes(currentUser?.role))) {
                return null;
              }
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentView(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`
                    w-full flex items-center space-x-3 p-3 rounded-lg
                    transition-colors duration-200
                    ${currentView === item.id 
                      ? 'bg-blue-600 text-white' 
                      : 'hover:bg-gray-800 text-gray-300'
                    }
                  `}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="absolute bottom-0 w-full p-4 border-t border-gray-800">
            <button
              onClick={() => {
                setCurrentUser(null);
                setCurrentView('login');
              }}
              className="flex items-center space-x-3 p-3 text-gray-300 hover:bg-gray-800 rounded-lg w-full"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
            
            {offlineMode && (
              <div className="mt-4 bg-yellow-900 bg-opacity-30 p-3 rounded text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                  <span>Offline Mode</span>
                </div>
                <p className="text-gray-400 text-xs mt-1">Data will sync when online</p>
              </div>
            )}
          </div>
        </aside>
      </>
    );
  };

  // ====================== DASHBOARD COMPONENT ======================
  const DashboardView = () => {
    const today = new Date().toISOString().split('T')[0];
    const todaySales = sales.filter(s => s.date === today);
    const todayRevenue = todaySales.reduce((sum, s) => sum + s.total, 0);
    const todayProfit = todaySales.reduce((sum, s) => sum + s.profit, 0);
    
    // Weekly sales (last 7 days)
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);
    const weeklySales = sales.filter(s => new Date(s.date) >= lastWeek);
    const weeklyRevenue = weeklySales.reduce((sum, s) => sum + s.total, 0);
    
    // Monthly sales
    const thisMonth = new Date().getMonth();
    const thisYear = new Date().getFullYear();
    const monthlySales = sales.filter(s => {
      const saleDate = new Date(s.date);
      return saleDate.getMonth() === thisMonth && saleDate.getFullYear() === thisYear;
    });
    const monthlyRevenue = monthlySales.reduce((sum, s) => sum + s.total, 0);
    const monthlyProfit = monthlySales.reduce((sum, s) => sum + s.profit, 0);
    
    const lowStockItems = products.filter(p => p.quantity <= p.lowStockAlert);
    const outOfStockItems = products.filter(p => p.quantity === 0);

    // Top selling products
    const topProducts = [...sales]
      .flatMap(sale => sale.items)
      .reduce((acc, item) => {
        const existing = acc.find(i => i.id === item.id);
        if (existing) {
          existing.quantity += item.quantity;
          existing.total += item.quantity * item.price;
        } else {
          acc.push({
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            total: item.quantity * item.price
          });
        }
        return acc;
      }, [])
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5);

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
            <p className="text-gray-600 mt-1">Welcome back, {currentUser.name} 👋</p>
          </div>
          <div className="text-sm text-gray-500">
            {new Date().toLocaleDateString('en-KE', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
        </div>

        {/* Network Status */}
        {offlineMode && (
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg">
            <div className="flex items-center">
              <AlertCircle className="text-yellow-500 mr-3" size={20} />
              <div>
                <h3 className="font-semibold text-yellow-800">Working Offline</h3>
                <p className="text-yellow-700 text-sm">Sales will sync when connection is restored</p>
              </div>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Today's Sales</p>
                <p className="text-3xl font-bold mt-2">KSh {todayRevenue.toLocaleString()}</p>
                <p className="text-green-100 text-sm mt-1">{todaySales.length} transactions</p>
                <p className="text-green-200 text-xs mt-2">Profit: KSh {todayProfit.toLocaleString()}</p>
              </div>
              <ShoppingCart size={48} className="opacity-30" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">This Week</p>
                <p className="text-3xl font-bold mt-2">KSh {weeklyRevenue.toLocaleString()}</p>
                <p className="text-blue-100 text-sm mt-1">{weeklySales.length} transactions</p>
                <p className="text-blue-200 text-xs mt-2">Avg: KSh {(weeklyRevenue/7).toLocaleString()}/day</p>
              </div>
              <TrendingUp size={48} className="opacity-30" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">This Month</p>
                <p className="text-3xl font-bold mt-2">KSh {monthlyRevenue.toLocaleString()}</p>
                <p className="text-purple-100 text-sm mt-1">{monthlySales.length} transactions</p>
                <p className="text-purple-200 text-xs mt-2">Profit: KSh {monthlyProfit.toLocaleString()}</p>
              </div>
              <FileText size={48} className="opacity-30" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Inventory Status</p>
                <p className="text-3xl font-bold mt-2">{products.length}</p>
                <p className="text-orange-100 text-sm mt-1">{lowStockItems.length} low stock</p>
                <p className="text-orange-200 text-xs mt-2">{outOfStockItems.length} out of stock</p>
              </div>
              <Package size={48} className="opacity-30" />
            </div>
          </div>
        </div>

        {/* Alerts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Low Stock Alert */}
          {lowStockItems.length > 0 && (
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
              <div className="flex items-start">
                <AlertCircle className="text-red-500 mr-3 flex-shrink-0" size={24} />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-red-800 mb-2">⚠️ Low Stock Alert</h3>
                  <p className="text-red-700 mb-3">{lowStockItems.length} items need restocking</p>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {lowStockItems.map(item => (
                      <div key={item.id} className="flex justify-between items-center bg-white p-3 rounded border">
                        <div>
                          <span className="font-medium text-gray-800">{item.name}</span>
                          <span className="text-gray-600 text-sm ml-2">({item.category})</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-red-600 font-semibold">{item.quantity} {item.unit}</span>
                          <button 
                            onClick={() => {
                              setCurrentView('addStock');
                              // Could pass product ID here
                            }}
                            className="text-sm bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200"
                          >
                            Restock
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Top Selling Products */}
          {topProducts.length > 0 && (
            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg">
              <div className="flex items-start">
                <TrendingUp className="text-green-500 mr-3 flex-shrink-0" size={24} />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-green-800 mb-2">🏆 Top Selling Products</h3>
                  <p className="text-green-700 mb-3">Best performers this month</p>
                  <div className="space-y-2">
                    {topProducts.map((item, index) => (
                      <div key={item.id} className="flex justify-between items-center bg-white p-3 rounded border">
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 bg-green-100 text-green-800 rounded-full flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </span>
                          <span className="font-medium text-gray-800">{item.name}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">{item.quantity} sold</div>
                          <div className="text-green-600 text-sm">KSh {item.total.toLocaleString()}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <button
            onClick={() => setCurrentView('newSale')}
            className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg hover:from-green-600 hover:to-green-700 flex items-center justify-center space-x-3 shadow-lg"
          >
            <ShoppingCart size={32} />
            <div className="text-left">
              <span className="text-2xl font-semibold block">New Sale</span>
              <span className="text-green-100 text-sm">Start a POS transaction</span>
            </div>
          </button>
          
          <button
            onClick={() => setCurrentView('addProduct')}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg hover:from-blue-600 hover:to-blue-700 flex items-center justify-center space-x-3 shadow-lg"
          >
            <Plus size={32} />
            <div className="text-left">
              <span className="text-2xl font-semibold block">Add Product</span>
              <span className="text-blue-100 text-sm">Add new inventory item</span>
            </div>
          </button>
          
          <button
            onClick={() => setCurrentView('addStock')}
            className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg hover:from-purple-600 hover:to-purple-700 flex items-center justify-center space-x-3 shadow-lg"
          >
            <ArrowUp size={32} />
            <div className="text-left">
              <span className="text-2xl font-semibold block">Add Stock</span>
              <span className="text-purple-100 text-sm">Restock existing items</span>
            </div>
          </button>
        </div>

        {/* Recent Sales */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Sales</h3>
          {sales.slice(-5).reverse().map(sale => (
            <div key={sale.id} className="flex items-center justify-between p-4 border-b last:border-b-0 hover:bg-gray-50">
              <div>
                <div className="font-medium">Receipt #{sale.receiptNo || sale.id}</div>
                <div className="text-gray-600 text-sm">{sale.date}</div>
                <div className="text-gray-600 text-sm">
                  {sale.items.length} items • {sale.paymentMethod === 'mpesa' ? 'M-Pesa' : 'Cash'}
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold">KSh {sale.total.toLocaleString()}</div>
                <div className="text-green-600 text-sm">Profit: KSh {sale.profit.toLocaleString()}</div>
              </div>
            </div>
          ))}
          {sales.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No sales recorded yet
            </div>
          )}
        </div>
      </div>
    );
  };

  // ====================== NEW SALE COMPONENT (POS) ======================
  const NewSaleView = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [cart, setCart] = useState([]);
    const [paymentStep, setPaymentStep] = useState('cart'); // 'cart', 'payment', 'complete'
    const [mpesaLoading, setMpesaLoading] = useState(false);
    
    // Filter products based on search
    const filteredProducts = products.filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Calculate cart totals
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discount = currentSale.discount;
    const total = subtotal - discount;
    const profit = cart.reduce((sum, item) => {
      const product = products.find(p => p.id === item.id);
      if (!product) return sum;
      return sum + ((item.price - product.costPrice) * item.quantity);
    }, 0);

    // Add to cart
    const addToCart = (product) => {
      const existing = cart.find(item => item.id === product.id);
      
      if (existing) {
        // Check if enough stock
        if (existing.quantity >= product.quantity) {
          alert(`Only ${product.quantity} ${product.unit} available!`);
          return;
        }
        setCart(cart.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ));
      } else {
        if (product.quantity < 1) {
          alert(`Out of stock: ${product.name}`);
          return;
        }
        setCart([...cart, {
          id: product.id,
          name: product.name,
          price: product.sellingPrice,
          quantity: 1,
          unit: product.unit
        }]);
      }
    };

    // Remove from cart
    const removeFromCart = (id) => {
      setCart(cart.filter(item => item.id !== id));
    };

    // Update quantity
    const updateQuantity = (id, quantity) => {
      if (quantity < 1) {
        removeFromCart(id);
        return;
      }
      
      const product = products.find(p => p.id === id);
      if (product && quantity > product.quantity) {
        alert(`Only ${product.quantity} ${product.unit} available!`);
        return;
      }
      
      setCart(cart.map(item => 
        item.id === id ? { ...item, quantity } : item
      ));
    };

    // Process M-Pesa payment
    const processMpesaPayment = () => {
      if (!currentSale.mpesaNumber || currentSale.mpesaNumber.length !== 10) {
        alert('Please enter a valid M-Pesa number (10 digits, starts with 07)');
        return;
      }

      setMpesaLoading(true);
      
      // Simulate M-Pesa STK push
      setTimeout(() => {
        setMpesaLoading(false);
        
        // In real implementation, integrate with Safaricom API
        // For demo, simulate success
        const confirmed = window.confirm(
          `Send M-Pesa STK Push to ${currentSale.mpesaNumber} for KSh ${total}?\n\n` +
          `Simulating payment - in production this would trigger actual M-Pesa request.`
        );
        
        if (confirmed) {
          completeSale('mpesa');
        }
      }, 1500);
    };

    // Complete sale
    const completeSale = (paymentMethod) => {
      // Generate receipt number
      const receiptNo = 'REC' + String(Date.now()).slice(-6);
      
      // Update stock quantities
      const updatedProducts = products.map(product => {
        const cartItem = cart.find(item => item.id === product.id);
        if (cartItem) {
          return {
            ...product,
            quantity: product.quantity - cartItem.quantity
          };
        }
        return product;
      });
      
      // Create sale record
      const newSale = {
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
        items: [...cart],
        subtotal,
        discount: currentSale.discount,
        total,
        profit,
        paymentMethod,
        receiptNo,
        mpesaNumber: paymentMethod === 'mpesa' ? currentSale.mpesaNumber : null,
        customerEmail: currentSale.customerEmail,
        staff: currentUser.name
      };
      
      // Update states
      setProducts(updatedProducts);
      setSales([...sales, newSale]);
      setPaymentStep('complete');
      
      // Add to stock history
      cart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        if (product) {
          setStockHistory(prev => [...prev, {
            id: Date.now() + item.id,
            productId: item.id,
            productName: item.name,
            type: 'sale',
            quantity: -item.quantity,
            price: item.price,
            date: new Date().toISOString().split('T')[0],
            notes: `Sale - Receipt ${receiptNo}`
          }]);
        }
      });
      
      // Save data
      saveData('products', updatedProducts);
      saveData('sales', [...sales, newSale]);
      
      // Reset cart for next sale
      setTimeout(() => {
        setCart([]);
        setCurrentSale({
          items: [],
          total: 0,
          profit: 0,
          paymentMethod: 'cash',
          mpesaNumber: '',
          customerEmail: '',
          discount: 0
        });
        setPaymentStep('cart');
      }, 5000);
    };

    // Generate receipt
    const generateReceipt = () => {
      const receiptContent = `
        HARDWARE PRO STORE
        ===================
        Receipt: ${sales[sales.length - 1]?.receiptNo}
        Date: ${new Date().toLocaleDateString()}
        Time: ${new Date().toLocaleTimeString()}
        Staff: ${currentUser.name}
        
        ITEMS:
        ${cart.map(item => `${item.name} x${item.quantity} = KSh ${(item.price * item.quantity).toLocaleString()}`).join('\n')}
        
        -------------------
        Subtotal: KSh ${subtotal.toLocaleString()}
        Discount: KSh ${discount.toLocaleString()}
        TOTAL: KSh ${total.toLocaleString()}
        
        Payment: ${currentSale.paymentMethod === 'mpesa' ? 'M-Pesa' : 'Cash'}
        ${currentSale.paymentMethod === 'mpesa' ? `M-Pesa No: ${currentSale.mpesaNumber}` : ''}
        
        Thank you for your business!
        📞 0700 000 000
      `;
      
      // Download as text file (simplified)
      const blob = new Blob([receiptContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `receipt-${sales[sales.length - 1]?.receiptNo}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    };

    return (
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Point of Sale (POS)</h2>
        
        {paymentStep === 'cart' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Product Selection */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search products by name or category..."
                    className="w-full pl-10 p-3 border-2 border-gray-300 rounded-lg text-lg"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredProducts.map(product => (
                    <button
                      key={product.id}
                      onClick={() => addToCart(product)}
                      disabled={product.quantity === 0}
                      className={`
                        p-4 border rounded-lg text-left hover:shadow-md transition-shadow
                        ${product.quantity === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:border-blue-500'}
                      `}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-semibold text-gray-800">{product.name}</span>
                        <span className="text-lg font-bold text-blue-600">KSh {product.sellingPrice.toLocaleString()}</span>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">{product.category}</div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Stock: {product.quantity} {product.unit}</span>
                        {product.quantity <= product.lowStockAlert && (
                          <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">Low Stock</span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Current Sale</h3>
                
                {cart.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <ShoppingCart size={48} className="mx-auto mb-4 text-gray-300" />
                    <p>No items in cart</p>
                    <p className="text-sm">Search and add products to start</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                      {cart.map(item => (
                        <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                          <div className="flex-1">
                            <div className="font-medium">{item.name}</div>
                            <div className="text-sm text-gray-600">KSh {item.price.toLocaleString()} / {item.unit}</div>
                          </div>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"
                            >
                              -
                            </button>
                            <span className="font-bold">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"
                            >
                              +
                            </button>
                            <div className="text-right min-w-20">
                              <div className="font-bold">KSh {(item.price * item.quantity).toLocaleString()}</div>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <X size={18} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Totals */}
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span className="font-semibold">KSh {subtotal.toLocaleString()}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span>Discount:</span>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            value={currentSale.discount}
                            onChange={(e) => setCurrentSale({...currentSale, discount: Math.max(0, parseInt(e.target.value) || 0)})}
                            className="w-24 p-2 border rounded text-right"
                            placeholder="0"
                          />
                          <span>KSh</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between text-lg font-bold border-t pt-3">
                        <span>TOTAL:</span>
                        <span className="text-green-600">KSh {total.toLocaleString()}</span>
                      </div>
                      
                      <div className="text-sm text-green-600">
                        Estimated Profit: KSh {profit.toLocaleString()}
                      </div>
                    </div>

                    <button
                      onClick={() => setPaymentStep('payment')}
                      disabled={cart.length === 0}
                      className={`
                        w-full p-4 rounded-lg font-bold text-lg
                        ${cart.length === 0 
                          ? 'bg-gray-300 cursor-not-allowed' 
                          : 'bg-green-600 hover:bg-green-700 text-white'
                        }
                      `}
                    >
                      PROCEED TO PAYMENT ({cart.length} items)
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ) : paymentStep === 'payment' ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Payment Method</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Cash Payment */}
                <button
                  onClick={() => completeSale('cash')}
                  className="p-6 border-2 border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 text-left"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold">KSh</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-800">Cash Payment</h4>
                      <p className="text-gray-600">Pay with cash</p>
                    </div>
                  </div>
                  <div className="text-lg font-bold text-green-600 mt-4">
                    Total: KSh {total.toLocaleString()}
                  </div>
                </button>

                {/* M-Pesa Payment */}
                <div className="p-6 border-2 border-blue-300 rounded-lg bg-blue-50">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                      <Smartphone className="text-white" size={24} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-800">M-Pesa Payment</h4>
                      <p className="text-gray-600">STK Push to customer</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Customer M-Pesa Number</label>
                    <input
                      type="tel"
                      value={currentSale.mpesaNumber}
                      onChange={(e) => setCurrentSale({...currentSale, mpesaNumber: e.target.value})}
                      placeholder="07XXXXXXXX"
                      className="w-full p-3 border rounded-lg text-lg"
                    />
                    <p className="text-sm text-gray-500 mt-1">Enter 10-digit Safaricom number</p>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-gray-700 mb-2">Customer Email (Optional)</label>
                    <input
                      type="email"
                      value={currentSale.customerEmail}
                      onChange={(e) => setCurrentSale({...currentSale, customerEmail: e.target.value})}
                      placeholder="customer@example.com"
                      className="w-full p-3 border rounded-lg"
                    />
                  </div>
                  
                  <button
                    onClick={processMpesaPayment}
                    disabled={mpesaLoading || !currentSale.mpesaNumber}
                    className={`
                      w-full p-4 rounded-lg font-bold text-lg flex items-center justify-center gap-3
                      ${mpesaLoading || !currentSale.mpesaNumber
                        ? 'bg-gray-300 cursor-not-allowed'
                        : 'bg-green-600 hover:bg-green-700 text-white'
                      }
                    `}
                  >
                    {mpesaLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Processing M-Pesa...
                      </>
                    ) : (
                      <>
                        <Smartphone size={24} />
                        SEND M-PESA REQUEST
                      </>
                    )}
                  </button>
                  
                  <div className="text-lg font-bold text-blue-600 mt-4 text-center">
                    Amount: KSh {total.toLocaleString()}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setPaymentStep('cart')}
                className="w-full p-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                ← Back to Cart
              </button>
            </div>
          </div>
        ) : (
          // Payment Complete
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingCart className="text-green-600" size={40} />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Payment Complete! ✅</h3>
              <p className="text-gray-600 mb-2">Sale completed successfully</p>
              <p className="text-lg font-bold text-green-600 mb-6">
                Receipt #{sales[sales.length - 1]?.receiptNo}
              </p>
              
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <div className="text-xl font-bold mb-4">Sale Summary</div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Items:</span>
                    <span>{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Amount:</span>
                    <span className="font-bold">KSh {total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payment Method:</span>
                    <span>{currentSale.paymentMethod === 'mpesa' ? 'M-Pesa' : 'Cash'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Profit:</span>
                    <span className="text-green-600 font-bold">KSh {profit.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4">
                <button
                  onClick={generateReceipt}
                  className="flex-1 bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
                >
                  <Download size={20} />
                  Download Receipt
                </button>
                
                <button
                  onClick={() => {
                    setPaymentStep('cart');
                    setCart([]);
                  }}
                  className="flex-1 bg-green-600 text-white p-4 rounded-lg hover:bg-green-700"
                >
                  New Sale
                </button>
              </div>
              
              <div className="mt-6 text-sm text-gray-500">
                Auto-returning to dashboard in 5 seconds...
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // ====================== ADD PRODUCT COMPONENT ======================
  const AddProductView = () => {
    const [formData, setFormData] = useState({
      name: '',
      category: 'Building Materials',
      quantity: '',
      unit: 'piece',
      costPrice: '',
      sellingPrice: '',
      supplier: '',
      lowStockAlert: '5'
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      
      // Validate
      if (!formData.name || !formData.quantity || !formData.costPrice || !formData.sellingPrice) {
        alert('Please fill in all required fields');
        return;
      }

      const newProduct = {
        id: Date.now(),
        ...formData,
        quantity: parseInt(formData.quantity),
        costPrice: parseFloat(formData.costPrice),
        sellingPrice: parseFloat(formData.sellingPrice),
        lowStockAlert: parseInt(formData.lowStockAlert),
        dateAdded: new Date().toISOString().split('T')[0]
      };
      
      // Add product
      setProducts([...products, newProduct]);
      
      // Add to stock history
      setStockHistory([...stockHistory, {
        id: Date.now(),
        productId: newProduct.id,
        productName: newProduct.name,
        type: 'addition',
        quantity: newProduct.quantity,
        costPrice: newProduct.costPrice,
        date: newProduct.dateAdded,
        notes: 'Initial stock addition'
      }]);

      // Show success
      alert(`Product "${newProduct.name}" added successfully!`);
      
      // Reset form
      setFormData({
        name: '',
        category: 'Building Materials',
        quantity: '',
        unit: 'piece',
        costPrice: '',
        sellingPrice: '',
        supplier: '',
        lowStockAlert: '5'
      });
    };

    return (
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Add New Product</h2>
        
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Product Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full p-4 border-2 border-gray-300 rounded-lg text-lg"
                placeholder="e.g., Cement 50kg, Nails 3-inch, Mahogany Timber"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Category *</label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full p-4 border-2 border-gray-300 rounded-lg text-lg"
              >
                <option value="Building Materials">Building Materials</option>
                <option value="Timber">Timber</option>
                <option value="Furniture">Furniture</option>
                <option value="Hardware">Hardware</option>
                <option value="Paint">Paint</option>
                <option value="Tools">Tools</option>
                <option value="Electrical">Electrical</option>
                <option value="Plumbing">Plumbing</option>
                <option value="Roofing">Roofing</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Quantity *</label>
              <input
                type="number"
                required
                min="0"
                value={formData.quantity}
                onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                className="w-full p-4 border-2 border-gray-300 rounded-lg text-lg"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Unit</label>
              <select
                value={formData.unit}
                onChange={(e) => setFormData({...formData, unit: e.target.value})}
                className="w-full p-4 border-2 border-gray-300 rounded-lg text-lg"
              >
                <option value="piece">Piece</option>
                <option value="kg">Kilogram</option>
                <option value="bag">Bag</option>
                <option value="roll">Roll</option>
                <option value="liter">Liter</option>
                <option value="tin">Tin</option>
                <option value="sheet">Sheet</option>
                <option value="meter">Meter</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Low Stock Alert</label>
              <input
                type="number"
                min="0"
                value={formData.lowStockAlert}
                onChange={(e) => setFormData({...formData, lowStockAlert: e.target.value})}
                className="w-full p-4 border-2 border-gray-300 rounded-lg text-lg"
                placeholder="5"
              />
              <p className="text-sm text-gray-500 mt-1">Alert when stock reaches this level</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Cost Price (KSh) *</label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                value={formData.costPrice}
                onChange={(e) => setFormData({...formData, costPrice: e.target.value})}
                className="w-full p-4 border-2 border-gray-300 rounded-lg text-lg"
                placeholder="0.00"
              />
              <p className="text-sm text-gray-500 mt-1">Price you buy from supplier</p>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Selling Price (KSh) *</label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                value={formData.sellingPrice}
                onChange={(e) => setFormData({...formData, sellingPrice: e.target.value})}
                className="w-full p-4 border-2 border-gray-300 rounded-lg text-lg"
                placeholder="0.00"
              />
              <p className="text-sm text-gray-500 mt-1">Price you sell to customers</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Supplier</label>
              <select
                value={formData.supplier}
                onChange={(e) => setFormData({...formData, supplier: e.target.value})}
                className="w-full p-4 border-2 border-gray-300 rounded-lg text-lg"
              >
                <option value="">Select supplier</option>
                {suppliers.map(supplier => (
                  <option key={supplier.id} value={supplier.name}>
                    {supplier.name} ({supplier.contact})
                  </option>
                ))}
                <option value="other">Other supplier</option>
              </select>
            </div>

            {formData.supplier === 'other' && (
              <div>
                <label className="block text-gray-700 font-semibold mb-2">New Supplier Name</label>
                <input
                  type="text"
                  value={formData.newSupplier || ''}
                  onChange={(e) => setFormData({...formData, newSupplier: e.target.value})}
                  className="w-full p-4 border-2 border-gray-300 rounded-lg text-lg"
                  placeholder="Enter new supplier name"
                />
              </div>
            )}
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="text-blue-500" size={20} />
              <span className="font-semibold text-blue-700">Profit Preview:</span>
            </div>
            {formData.costPrice && formData.sellingPrice ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-3 bg-white rounded">
                  <div className="text-sm text-gray-600">Profit per Unit</div>
                  <div className="text-xl font-bold text-green-600">
                    KSh {(parseFloat(formData.sellingPrice) - parseFloat(formData.costPrice)).toLocaleString()}
                  </div>
                </div>
                <div className="text-center p-3 bg-white rounded">
                  <div className="text-sm text-gray-600">Profit Margin</div>
                  <div className="text-xl font-bold text-green-600">
                    {formData.costPrice > 0 
                      ? (((parseFloat(formData.sellingPrice) - parseFloat(formData.costPrice)) / parseFloat(formData.costPrice)) * 100).toFixed(1)
                      : '0'}%
                  </div>
                </div>
                <div className="text-center p-3 bg-white rounded">
                  <div className="text-sm text-gray-600">Total Profit Potential</div>
                  <div className="text-xl font-bold text-green-600">
                    {formData.quantity 
                      ? `KSh ${((parseFloat(formData.sellingPrice) - parseFloat(formData.costPrice)) * parseInt(formData.quantity)).toLocaleString()}`
                      : 'KSh 0'}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-600">Enter cost and selling prices to see profit calculation</p>
            )}
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white p-4 rounded-lg text-lg font-semibold hover:bg-blue-700 flex items-center justify-center gap-2"
            >
              <Plus size={24} />
              Add Product to Inventory
            </button>
            <button
              type="button"
              onClick={() => setCurrentView('dashboard')}
              className="flex-1 bg-gray-300 text-gray-700 p-4 rounded-lg text-lg font-semibold hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  };

  // ====================== ADD STOCK COMPONENT ======================
  const AddStockView = () => {
    const [selectedProduct, setSelectedProduct] = useState('');
    const [quantity, setQuantity] = useState('');
    const [costPrice, setCostPrice] = useState('');
    const [notes, setNotes] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      
      if (!selectedProduct || !quantity || !costPrice) {
        alert('Please select a product and enter quantity and cost price');
        return;
      }

      const product = products.find(p => p.id === parseInt(selectedProduct));
      if (!product) return;

      // Update product quantity
      const updatedProducts = products.map(p => 
        p.id === product.id 
          ? { ...p, quantity: p.quantity + parseInt(quantity) }
          : p
      );

      // Add to stock history
      const newStockRecord = {
        id: Date.now(),
        productId: product.id,
        productName: product.name,
        type: 'restock',
        quantity: parseInt(quantity),
        costPrice: parseFloat(costPrice),
        date: new Date().toISOString().split('T')[0],
        notes: notes || 'Stock addition'
      };

      setProducts(updatedProducts);
      setStockHistory([...stockHistory, newStockRecord]);

      // Show success
      alert(`Added ${quantity} ${product.unit} of ${product.name} to stock`);
      
      // Reset form
      setSelectedProduct('');
      setQuantity('');
      setCostPrice('');
      setNotes('');
    };

    return (
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Add Stock (Restock)</h2>
        
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Select Product *</label>
            <select
              required
              value={selectedProduct}
              onChange={(e) => {
                setSelectedProduct(e.target.value);
                const product = products.find(p => p.id === parseInt(e.target.value));
                if (product) {
                  setCostPrice(product.costPrice.toString());
                }
              }}
              className="w-full p-4 border-2 border-gray-300 rounded-lg text-lg"
            >
              <option value="">Choose a product to restock</option>
              {products.map(product => (
                <option key={product.id} value={product.id}>
                  {product.name} - Current: {product.quantity} {product.unit} - KSh {product.costPrice}/unit
                </option>
              ))}
            </select>
          </div>

          {selectedProduct && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Quantity to Add *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full p-4 border-2 border-gray-300 rounded-lg text-lg"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Cost Price per Unit (KSh) *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    value={costPrice}
                    onChange={(e) => setCostPrice(e.target.value)}
                    className="w-full p-4 border-2 border-gray-300 rounded-lg text-lg"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Notes (Optional)</label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-4 border-2 border-gray-300 rounded-lg text-lg"
                  placeholder="e.g., New batch from supplier, price increase, etc."
                />
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Summary:</h4>
                {selectedProduct && quantity && costPrice && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-white rounded">
                      <div className="text-sm text-gray-600">New Total Stock</div>
                      <div className="text-xl font-bold">
                        {(() => {
                          const product = products.find(p => p.id === parseInt(selectedProduct));
                          return product ? (product.quantity + parseInt(quantity)) : 0;
                        })()} units
                      </div>
                    </div>
                    <div className="text-center p-3 bg-white rounded">
                      <div className="text-sm text-gray-600">Total Cost</div>
                      <div className="text-xl font-bold text-blue-600">
                        KSh {(parseFloat(costPrice) * parseInt(quantity)).toLocaleString()}
                      </div>
                    </div>
                    <div className="text-center p-3 bg-white rounded">
                      <div className="text-sm text-gray-600">Value Added</div>
                      <div className="text-xl font-bold text-green-600">
                        KSh {(parseFloat(costPrice) * parseInt(quantity)).toLocaleString()}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={!selectedProduct}
              className={`
                flex-1 p-4 rounded-lg text-lg font-semibold flex items-center justify-center gap-2
                ${selectedProduct 
                  ? 'bg-green-600 text-white hover:bg-green-700' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }
              `}
            >
              <ArrowUp size={24} />
              Add Stock
            </button>
            <button
              type="button"
              onClick={() => setCurrentView('dashboard')}
              className="flex-1 bg-gray-300 text-gray-700 p-4 rounded-lg text-lg font-semibold hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>

        {/* Low Stock Products */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Products Needing Restocking</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products
              .filter(p => p.quantity <= p.lowStockAlert)
              .map(product => (
                <button
                  key={product.id}
                  onClick={() => {
                    setSelectedProduct(product.id.toString());
                    setCostPrice(product.costPrice.toString());
                  }}
                  className="p-4 border border-red-300 bg-red-50 rounded-lg text-left hover:bg-red-100"
                >
                  <div className="font-semibold text-gray-800">{product.name}</div>
                  <div className="text-sm text-gray-600">{product.category}</div>
                  <div className="mt-2 flex justify-between items-center">
                    <span className="text-red-600 font-bold">Only {product.quantity} {product.unit} left</span>
                    <span className="text-sm bg-red-100 text-red-700 px-2 py-1 rounded">Restock</span>
                  </div>
                </button>
              ))}
          </div>
        </div>
      </div>
    );
  };

  // ====================== PRODUCTS LIST COMPONENT ======================
  const ProductsListView = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [sortBy, setSortBy] = useState('name');

    const filteredProducts = products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           p.supplier?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !filterCategory || p.category === filterCategory;
      return matchesSearch && matchesCategory;
    }).sort((a, b) => {
      switch (sortBy) {
        case 'name': return a.name.localeCompare(b.name);
        case 'quantity': return a.quantity - b.quantity;
        case 'profit': return (b.sellingPrice - b.costPrice) - (a.sellingPrice - a.costPrice);
        default: return 0;
      }
    });

    const categories = [...new Set(products.map(p => p.category))];

    return (
      <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-6">All Products</h2>
        
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products or suppliers..."
                className="w-full pl-10 p-3 border-2 border-gray-300 rounded-lg"
              />
            </div>
            
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="p-3 border-2 border-gray-300 rounded-lg"
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="p-3 border-2 border-gray-300 rounded-lg"
            >
              <option value="name">Sort by Name</option>
              <option value="quantity">Sort by Quantity</option>
              <option value="profit">Sort by Profit</option>
            </select>
          </div>

          {/* Products Grid/Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left font-semibold">Product</th>
                  <th className="p-3 text-left font-semibold">Category</th>
                  <th className="p-3 text-left font-semibold">Supplier</th>
                  <th className="p-3 text-center font-semibold">Stock</th>
                  <th className="p-3 text-right font-semibold">Cost</th>
                  <th className="p-3 text-right font-semibold">Price</th>
                  <th className="p-3 text-right font-semibold">Profit</th>
                  <th className="p-3 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map(product => {
                  const profitPerUnit = product.sellingPrice - product.costPrice;
                  const totalProfitPotential = profitPerUnit * product.quantity;
                  const isLowStock = product.quantity <= product.lowStockAlert;
                  
                  return (
                    <tr key={product.id} className="border-b hover:bg-gray-50">
                      <td className="p-3">
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-gray-600">{product.unit}</div>
                      </td>
                      <td className="p-3 text-gray-600">{product.category}</td>
                      <td className="p-3 text-gray-600">{product.supplier || '-'}</td>
                      <td className="p-3 text-center">
                        <div className="flex items-center justify-center">
                          <span className={`font-semibold ${isLowStock ? 'text-red-600' : 'text-gray-800'}`}>
                            {product.quantity}
                          </span>
                          {isLowStock && (
                            <AlertCircle className="ml-2 text-red-500" size={16} />
                          )}
                        </div>
                        {isLowStock && (
                          <div className="text-xs text-red-500 mt-1">Alert: {product.lowStockAlert}</div>
                        )}
                      </td>
                      <td className="p-3 text-right text-gray-600">KSh {product.costPrice.toLocaleString()}</td>
                      <td className="p-3 text-right font-semibold">KSh {product.sellingPrice.toLocaleString()}</td>
                      <td className="p-3 text-right">
                        <div className="text-green-600 font-semibold">KSh {profitPerUnit.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">Total: KSh {totalProfitPotential.toLocaleString()}</div>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => {
                            setCurrentView('addStock');
                            // Could pre-select this product
                          }}
                          className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200"
                        >
                          Restock
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Package className="mx-auto mb-4 text-gray-300" size={48} />
              <p>No products found</p>
              <p className="text-sm">Try changing your search or filters</p>
            </div>
          )}
        </div>

        {/* Inventory Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-sm text-gray-600">Total Products</div>
            <div className="text-2xl font-bold">{products.length}</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-sm text-gray-600">Total Stock Value</div>
            <div className="text-2xl font-bold text-green-600">
              KSh {products.reduce((sum, p) => sum + (p.costPrice * p.quantity), 0).toLocaleString()}
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-sm text-gray-600">Low Stock Items</div>
            <div className="text-2xl font-bold text-red-600">
              {products.filter(p => p.quantity <= p.lowStockAlert).length}
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-sm text-gray-600">Out of Stock</div>
            <div className="text-2xl font-bold text-red-600">
              {products.filter(p => p.quantity === 0).length}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ====================== SALES HISTORY COMPONENT ======================
  const SalesHistoryView = () => {
    const [dateFilter, setDateFilter] = useState('all'); // 'today', 'week', 'month', 'all'
    const [paymentFilter, setPaymentFilter] = useState('all');
    
    const filteredSales = sales.filter(sale => {
      if (dateFilter === 'today') {
        return sale.date === new Date().toISOString().split('T')[0];
      }
      if (dateFilter === 'week') {
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return new Date(sale.date) >= weekAgo;
      }
      if (dateFilter === 'month') {
        const monthAgo = new Date();
        monthAgo.setDate(monthAgo.getDate() - 30);
        return new Date(sale.date) >= monthAgo;
      }
      return true;
    }).filter(sale => {
      if (paymentFilter === 'all') return true;
      return sale.paymentMethod === paymentFilter;
    });

    const totalRevenue = filteredSales.reduce((sum, s) => sum + s.total, 0);
    const totalProfit = filteredSales.reduce((sum, s) => sum + s.profit, 0);
    const totalTransactions = filteredSales.length;

    return (
      <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Sales History</h2>
        
        {/* Filters & Stats */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="p-3 border-2 border-gray-300 rounded-lg"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
            </select>
            
            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="p-3 border-2 border-gray-300 rounded-lg"
            >
              <option value="all">All Payments</option>
              <option value="cash">Cash Only</option>
              <option value="mpesa">M-Pesa Only</option>
            </select>
            
            <div className="col-span-2 grid grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-sm text-blue-600">Transactions</div>
                <div className="text-2xl font-bold">{totalTransactions}</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-sm text-green-600">Revenue</div>
                <div className="text-2xl font-bold">KSh {totalRevenue.toLocaleString()}</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-sm text-purple-600">Profit</div>
                <div className="text-2xl font-bold">KSh {totalProfit.toLocaleString()}</div>
              </div>
            </div>
          </div>

          {/* Sales List */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left font-semibold">Receipt #</th>
                  <th className="p-3 text-left font-semibold">Date</th>
                  <th className="p-3 text-left font-semibold">Items</th>
                  <th className="p-3 text-left font-semibold">Payment</th>
                  <th className="p-3 text-left font-semibold">Staff</th>
                  <th className="p-3 text-right font-semibold">Total</th>
                  <th className="p-3 text-right font-semibold">Profit</th>
                </tr>
              </thead>
              <tbody>
                {filteredSales.map(sale => (
                  <tr key={sale.id} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-medium">{sale.receiptNo || `SALE${sale.id}`}</td>
                    <td className="p-3 text-gray-600">{sale.date}</td>
                    <td className="p-3">
                      <div className="text-sm">
                        {sale.items.slice(0, 2).map((item, idx) => (
                          <div key={idx}>{item.name} × {item.quantity}</div>
                        ))}
                        {sale.items.length > 2 && (
                          <div className="text-blue-600">+{sale.items.length - 2} more</div>
                        )}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${
                        sale.paymentMethod === 'mpesa' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {sale.paymentMethod === 'mpesa' ? 'M-Pesa' : 'Cash'}
                        {sale.paymentMethod === 'mpesa' && sale.mpesaNumber && (
                          <span className="text-xs">({sale.mpesaNumber})</span>
                        )}
                      </div>
                    </td>
                    <td className="p-3 text-gray-600">{sale.staff || '-'}</td>
                    <td className="p-3 text-right font-bold">KSh {sale.total.toLocaleString()}</td>
                    <td className="p-3 text-right text-green-600 font-semibold">
                      KSh {sale.profit.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredSales.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <ShoppingCart className="mx-auto mb-4 text-gray-300" size={48} />
              <p>No sales found</p>
              <p className="text-sm">Try changing your filters</p>
            </div>
          )}
        </div>

        {/* Sales Chart Summary */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Sales Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg">
              <div className="text-sm opacity-90">Daily Average</div>
              <div className="text-2xl font-bold mt-2">
                KSh {totalTransactions > 0 ? Math.round(totalRevenue / totalTransactions).toLocaleString() : '0'}
              </div>
            </div>
            <div className="p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg">
              <div className="text-sm opacity-90">M-Pesa Sales</div>
              <div className="text-2xl font-bold mt-2">
                KSh {filteredSales.filter(s => s.paymentMethod === 'mpesa').reduce((sum, s) => sum + s.total, 0).toLocaleString()}
              </div>
            </div>
            <div className="p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg">
              <div className="text-sm opacity-90">Cash Sales</div>
              <div className="text-2xl font-bold mt-2">
                KSh {filteredSales.filter(s => s.paymentMethod === 'cash').reduce((sum, s) => sum + s.total, 0).toLocaleString()}
              </div>
            </div>
            <div className="p-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg">
              <div className="text-sm opacity-90">Avg Profit Margin</div>
              <div className="text-2xl font-bold mt-2">
                {totalRevenue > 0 ? ((totalProfit / totalRevenue) * 100).toFixed(1) : '0'}%
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ====================== REPORTS COMPONENT ======================
  const ReportsView = () => {
    const [reportType, setReportType] = useState('sales');
    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
    const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);

    // Filter data based on date range
    const filteredSales = sales.filter(s => 
      s.date >= startDate && s.date <= endDate
    );
    
    const filteredStockHistory = stockHistory.filter(sh => 
      sh.date >= startDate && sh.date <= endDate
    );

    // Calculate report metrics
    const totalSales = filteredSales.reduce((sum, s) => sum + s.total, 0);
    const totalProfit = filteredSales.reduce((sum, s) => sum + s.profit, 0);
    const totalItemsSold = filteredSales.reduce((sum, s) => 
      sum + s.items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0
    );
    
    const mpesaSales = filteredSales.filter(s => s.paymentMethod === 'mpesa');
    const cashSales = filteredSales.filter(s => s.paymentMethod === 'cash');
    
    const stockAdditions = filteredStockHistory.filter(sh => sh.type === 'addition' || sh.type === 'restock');
    const totalStockAdded = stockAdditions.reduce((sum, s) => sum + s.quantity, 0);
    const totalStockCost = stockAdditions.reduce((sum, s) => sum + (s.quantity * s.costPrice), 0);

    // Generate CSV report
    const generateCSV = () => {
      let csvContent = '';
      
      if (reportType === 'sales') {
        csvContent = 'Receipt #,Date,Items,Payment Method,Total,Profit\n';
        filteredSales.forEach(sale => {
          csvContent += `${sale.receiptNo},${sale.date},${sale.items.length},${sale.paymentMethod},${sale.total},${sale.profit}\n`;
        });
      } else if (reportType === 'stock') {
        csvContent = 'Date,Product,Type,Quantity,Cost Price,Total Cost,Notes\n';
        filteredStockHistory.forEach(record => {
          csvContent += `${record.date},${record.productName},${record.type},${record.quantity},${record.costPrice},${record.quantity * record.costPrice},${record.notes}\n`;
        });
      }
      
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${reportType}_report_${startDate}_to_${endDate}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    };

    return (
      <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Reports & Analytics</h2>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          {/* Report Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Report Type</label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full p-3 border-2 border-gray-300 rounded-lg"
              >
                <option value="sales">Sales Report</option>
                <option value="stock">Stock Movement</option>
                <option value="profit">Profit Analysis</option>
              </select>
            </div>
            
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full p-3 border-2 border-gray-300 rounded-lg"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-semibold mb-2">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full p-3 border-2 border-gray-300 rounded-lg"
              />
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="text-sm text-blue-600">Total Sales</div>
              <div className="text-2xl font-bold mt-2">KSh {totalSales.toLocaleString()}</div>
              <div className="text-xs text-gray-500 mt-1">{filteredSales.length} transactions</div>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg">
              <div className="text-sm text-green-600">Total Profit</div>
              <div className="text-2xl font-bold mt-2">KSh {totalProfit.toLocaleString()}</div>
              <div className="text-xs text-gray-500 mt-1">{totalItemsSold} items sold</div>
            </div>
            
            <div className="bg-purple-50 p-6 rounded-lg">
              <div className="text-sm text-purple-600">M-Pesa vs Cash</div>
              <div className="text-2xl font-bold mt-2">
                {mpesaSales.length}:{cashSales.length}
              </div>
              <div className="text-xs text-gray-500 mt-1">M-Pesa: {mpesaSales.length}, Cash: {cashSales.length}</div>
            </div>
            
            <div className="bg-orange-50 p-6 rounded-lg">
              <div className="text-sm text-orange-600">Stock Added</div>
              <div className="text-2xl font-bold mt-2">{totalStockAdded}</div>
              <div className="text-xs text-gray-500 mt-1">Cost: KSh {totalStockCost.toLocaleString()}</div>
            </div>
          </div>

          {/* Report Content */}
          {reportType === 'sales' && (
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Sales Report Details</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-3 text-left">Date</th>
                      <th className="p-3 text-left">Receipt #</th>
                      <th className="p-3 text-left">Payment</th>
                      <th className="p-3 text-right">Amount</th>
                      <th className="p-3 text-right">Profit</th>
                      <th className="p-3 text-right">Margin</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSales.map(sale => (
                      <tr key={sale.id} className="border-b hover:bg-gray-50">
                        <td className="p-3">{sale.date}</td>
                        <td className="p-3 font-medium">{sale.receiptNo}</td>
                        <td className="p-3">
                          <span className={`px-2 py-1 rounded text-sm ${
                            sale.paymentMethod === 'mpesa' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {sale.paymentMethod}
                          </span>
                        </td>
                        <td className="p-3 text-right font-bold">KSh {sale.total.toLocaleString()}</td>
                        <td className="p-3 text-right text-green-600">KSh {sale.profit.toLocaleString()}</td>
                        <td className="p-3 text-right">
                          {((sale.profit / sale.total) * 100).toFixed(1)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {reportType === 'stock' && (
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Stock Movement Report</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-3 text-left">Date</th>
                      <th className="p-3 text-left">Product</th>
                      <th className="p-3 text-left">Type</th>
                      <th className="p-3 text-right">Quantity</th>
                      <th className="p-3 text-right">Unit Cost</th>
                      <th className="p-3 text-right">Total Cost</th>
                      <th className="p-3 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStockHistory.map(record => (
                      <tr key={record.id} className="border-b hover:bg-gray-50">
                        <td className="p-3">{record.date}</td>
                        <td className="p-3 font-medium">{record.productName}</td>
                        <td className="p-3">
                          <span className={`px-2 py-1 rounded text-sm ${
                            record.type === 'sale' 
                              ? 'bg-red-100 text-red-800' 
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {record.type}
                          </span>
                        </td>
                        <td className={`p-3 text-right font-bold ${
                          record.type === 'sale' ? 'text-red-600' : 'text-green-600'
                        }`}>
                          {record.type === 'sale' ? '-' : '+'}{record.quantity}
                        </td>
                        <td className="p-3 text-right">KSh {record.costPrice?.toLocaleString() || '0'}</td>
                        <td className="p-3 text-right">KSh {((record.costPrice || 0) * record.quantity).toLocaleString()}</td>
                        <td className="p-3 text-gray-600">{record.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 mt-8 pt-6 border-t">
            <button
              onClick={generateCSV}
              className="flex-1 bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 flex items-center justify-center gap-2"
            >
              <Download size={20} />
              Download {reportType === 'sales' ? 'Sales' : 'Stock'} Report (CSV)
            </button>
            
            <button
              onClick={() => window.print()}
              className="flex-1 bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
            >
              <Printer size={20} />
              Print Report
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ====================== STOCK HISTORY COMPONENT ======================
  const StockHistoryView = () => {
    const [filterType, setFilterType] = useState('all');
    const [filterProduct, setFilterProduct] = useState('');

    const filteredHistory = stockHistory.filter(record => {
      const matchesType = filterType === 'all' || record.type === filterType;
      const matchesProduct = !filterProduct || record.productId === parseInt(filterProduct);
      return matchesType && matchesProduct;
    });

    return (
      <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Stock Movement History</h2>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Movement Type</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full p-3 border-2 border-gray-300 rounded-lg"
              >
                <option value="all">All Movements</option>
                <option value="addition">Stock Additions</option>
                <option value="restock">Restocking</option>
                <option value="sale">Sales</option>
                <option value="adjustment">Adjustments</option>
              </select>
            </div>
            
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Product</label>
              <select
                value={filterProduct}
                onChange={(e) => setFilterProduct(e.target.value)}
                className="w-full p-3 border-2 border-gray-300 rounded-lg"
              >
                <option value="">All Products</option>
                {products.map(product => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex items-end">
              <button
                onClick={() => {
                  setFilterType('all');
                  setFilterProduct('');
                }}
                className="w-full bg-gray-200 text-gray-700 p-3 rounded-lg hover:bg-gray-300"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Stock History Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left font-semibold">Date</th>
                  <th className="p-3 text-left font-semibold">Product</th>
                  <th className="p-3 text-left font-semibold">Type</th>
                  <th className="p-3 text-right font-semibold">Quantity</th>
                  <th className="p-3 text-right font-semibold">Unit Cost</th>
                  <th className="p-3 text-right font-semibold">Total Value</th>
                  <th className="p-3 text-left font-semibold">Notes</th>
                  <th className="p-3 text-left font-semibold">User</th>
                </tr>
              </thead>
              <tbody>
                {filteredHistory.map(record => {
                  const isAddition = record.type === 'addition' || record.type === 'restock';
                  const totalValue = (record.costPrice || 0) * record.quantity;
                  
                  return (
                    <tr key={record.id} className="border-b hover:bg-gray-50">
                      <td className="p-3 text-gray-600">{record.date}</td>
                      <td className="p-3 font-medium">{record.productName}</td>
                      <td className="p-3">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          isAddition
                            ? 'bg-green-100 text-green-800'
                            : record.type === 'sale'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {record.type.charAt(0).toUpperCase() + record.type.slice(1)}
                        </span>
                      </td>
                      <td className={`p-3 text-right font-bold ${
                        isAddition ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {isAddition ? '+' : '-'}{record.quantity}
                      </td>
                      <td className="p-3 text-right">
                        {record.costPrice ? `KSh ${record.costPrice.toLocaleString()}` : '-'}
                      </td>
                      <td className="p-3 text-right font-semibold">
                        {record.costPrice ? `KSh ${totalValue.toLocaleString()}` : '-'}
                      </td>
                      <td className="p-3 text-gray-600">{record.notes || '-'}</td>
                      <td className="p-3 text-gray-600">{record.user || 'System'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredHistory.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <History className="mx-auto mb-4 text-gray-300" size={48} />
              <p>No stock movements found</p>
              <p className="text-sm">Try changing your filters</p>
            </div>
          )}
        </div>

        {/* Summary Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-sm text-gray-600">Total Movements</div>
            <div className="text-2xl font-bold mt-2">{filteredHistory.length}</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-sm text-gray-600">Stock Added</div>
            <div className="text-2xl font-bold text-green-600 mt-2">
              {filteredHistory.filter(h => h.type === 'addition' || h.type === 'restock')
                .reduce((sum, h) => sum + h.quantity, 0)}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-sm text-gray-600">Stock Sold</div>
            <div className="text-2xl font-bold text-red-600 mt-2">
              {Math.abs(filteredHistory.filter(h => h.type === 'sale')
                .reduce((sum, h) => sum + h.quantity, 0))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ====================== MANAGE USERS COMPONENT ======================
  const ManageUsersView = () => {
    const [showAddUser, setShowAddUser] = useState(false);
    const [newUser, setNewUser] = useState({
      username: '',
      password: '',
      name: '',
      role: 'staff'
    });

    const handleAddUser = (e) => {
      e.preventDefault();
      
      if (!newUser.username || !newUser.password || !newUser.name) {
        alert('Please fill in all fields');
        return;
      }

      // Check if username already exists
      if (users.find(u => u.username === newUser.username)) {
        alert('Username already exists');
        return;
      }

      const userToAdd = {
        id: Date.now(),
        ...newUser
      };

      setUsers([...users, userToAdd]);
      setShowAddUser(false);
      setNewUser({
        username: '',
        password: '',
        name: '',
        role: 'staff'
      });

      alert(`User ${newUser.name} added successfully!`);
    };

    const deleteUser = (id) => {
      if (id === currentUser.id) {
        alert('You cannot delete your own account');
        return;
      }

      if (window.confirm('Are you sure you want to delete this user?')) {
        setUsers(users.filter(u => u.id !== id));
      }
    };

    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">User Management</h2>
          <button
            onClick={() => setShowAddUser(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus size={20} />
            Add New User
          </button>
        </div>

        {/* Add User Modal */}
        {showAddUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Add New User</h3>
                <button
                  onClick={() => setShowAddUser(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleAddUser} className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={newUser.name}
                    onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Username *</label>
                  <input
                    type="text"
                    required
                    value={newUser.username}
                    onChange={(e) => setNewUser({...newUser, username: e.target.value})}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg"
                    placeholder="johndoe"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Password *</label>
                  <input
                    type="password"
                    required
                    value={newUser.password}
                    onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg"
                    placeholder="••••••••"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Role *</label>
                  <select
                    value={newUser.role}
                    onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg"
                  >
                    <option value="staff">Staff</option>
                    <option value="manager">Manager</option>
                    <option value="owner">Owner</option>
                  </select>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
                  >
                    Add User
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddUser(false)}
                    className="flex-1 bg-gray-300 text-gray-700 p-3 rounded-lg hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Users List */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left font-semibold">Name</th>
                  <th className="p-3 text-left font-semibold">Username</th>
                  <th className="p-3 text-left font-semibold">Role</th>
                  <th className="p-3 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="font-semibold text-blue-600">
                            {user.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-gray-500">
                            {user.id === currentUser.id ? 'Currently logged in' : ''}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 text-gray-600">{user.username}</td>
                    <td className="p-3">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        user.role === 'owner'
                          ? 'bg-purple-100 text-purple-800'
                          : user.role === 'manager'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </td>
                    <td className="p-3">
                      {user.id !== currentUser.id && (
                        <button
                          onClick={() => deleteUser(user.id)}
                          className="text-red-600 hover:text-red-800 px-3 py-1 rounded hover:bg-red-50"
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* User Roles Legend */}
        <div className="mt-6 bg-gray-50 p-6 rounded-lg">
          <h4 className="font-semibold text-gray-800 mb-3">User Roles & Permissions</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded border">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="font-semibold">Owner</span>
              </div>
              <p className="text-sm text-gray-600">Full system access, user management, all reports</p>
            </div>
            <div className="p-4 bg-white rounded border">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="font-semibold">Manager</span>
              </div>
              <p className="text-sm text-gray-600">Sales, stock management, reports (no user management)</p>
            </div>
            <div className="p-4 bg-white rounded border">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="font-semibold">Staff</span>
              </div>
              <p className="text-sm text-gray-600">Basic sales, product viewing (no sensitive operations)</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ====================== MAIN APP LAYOUT ======================
  return (
    <div className="min-h-screen bg-gray-100">
      {currentView === 'login' ? (
        <LoginView />
      ) : (
        <div className="flex">
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content */}
          <div className="flex-1 lg:ml-64">
            {/* Top Bar */}
            <header className="bg-white shadow-sm sticky top-0 z-40">
              <div className="flex items-center justify-between p-4">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2"
                >
                  <Menu size={24} />
                </button>
                
                <div className="flex-1">
                  <h1 className="text-xl font-semibold text-gray-800 ml-4 lg:ml-0">
                    HardwareBiz - Stock & Sales Management
                  </h1>
                </div>
                
                <div className="flex items-center gap-4">
                  {offlineMode && (
                    <div className="flex items-center gap-2 text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full text-sm">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                      Offline Mode
                    </div>
                  )}
                  <div className="hidden md:flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white">
                      {currentUser?.name?.charAt(0)}
                    </div>
                    <div className="text-sm">
                      <div className="font-semibold">{currentUser?.name}</div>
                      <div className="text-gray-500 capitalize">{currentUser?.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            </header>

            {/* Page Content */}
            <main className="p-4 lg:p-6">
              {currentView === 'dashboard' && <DashboardView />}
              {currentView === 'newSale' && <NewSaleView />}
              {currentView === 'products' && <ProductsListView />}
              {currentView === 'addProduct' && <AddProductView />}
              {currentView === 'addStock' && <AddStockView />}
              {currentView === 'salesHistory' && <SalesHistoryView />}
              {currentView === 'reports' && <ReportsView />}
              {currentView === 'stockHistory' && <StockHistoryView />}
              {currentView === 'manageUsers' && <ManageUsersView />}
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white p-4 mt-8">
              <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <div className="mb-4 md:mb-0">
                    <div className="flex items-center gap-2 mb-2">
                      <Package size={24} className="text-blue-400" />
                      <span className="text-xl font-bold">HardwarePro Kenya</span>
                    </div>
                    <p className="text-gray-400 text-sm">Stock & Sales Management System v1.0</p>
                  </div>
                  <div className="text-center md:text-right">
                    <p className="text-gray-400 text-sm">Designed for Kenyan Hardware Stores</p>
                    <p className="text-gray-400 text-sm">© {new Date().getFullYear()} - All rights reserved</p>
                    <div className="flex gap-4 mt-2 justify-center md:justify-end">
                      <span className="text-xs bg-green-900 text-green-200 px-2 py-1 rounded">M-Pesa Ready</span>
                      <span className="text-xs bg-blue-900 text-blue-200 px-2 py-1 rounded">Offline Capable</span>
                    </div>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
};

// Mock storage API for demo purposes
if (typeof window !== 'undefined') {
  window.storage = {
    async get(key) {
      const value = localStorage.getItem(key);
      return value ? { value } : null;
    },
    async set(key, value) {
      localStorage.setItem(key, value);
    }
  };
}

export default HardwareStoreSystem;
