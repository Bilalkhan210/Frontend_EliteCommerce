import React, { useState, useEffect } from 'react';
import {
  Product,
  Category,
  Brand,
  CartItem,
  Order,
  Customer,
  ViewMode,
  User,
} from './types';
import {
  INITIAL_PRODUCTS,
  INITIAL_ORDERS,
  INITIAL_CUSTOMERS,
} from './data/mockData';

// Shared Layout Components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { AddProductModal } from './components/AddProductModal';
import { AddCategoryModal } from './components/AddCategoryModal';
import { AddBrandModal } from './components/AddBrandModal';
import { CheckoutModal } from './components/CheckoutModal';
import { AdminSidebar } from './components/AdminSidebar';
import { AdminHeader } from './components/AdminHeader';

// View Components
import { HomeView } from './views/HomeView';
import { ShopView } from './views/ShopView';
import { CategoryView } from './views/CategoryView';
import { DealsView } from './views/DealsView';
import { NewArrivalsView } from './views/NewArrivalsView';
import { ProductDetailView } from './views/ProductDetailView';
import { AdminOverviewView } from './views/AdminOverviewView';
import { AdminProductsView } from './views/AdminProductsView';
import { AdminOrdersView } from './views/AdminOrdersView';
import { AdminCustomersView } from './views/AdminCustomersView';
import { AdminAnalyticsView } from './views/AdminAnalyticsView';
import { AdminSettingsView } from './views/AdminSettingsView';
import { AdminCategoriesView } from './views/AdminCategoriesView';
import { AdminBrandsView } from './views/AdminBrandsView';
import { AuthView } from './views/AuthView';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>(() => {
    return (localStorage.getItem('currentView') as ViewMode) || 'home';
  });

  // Persist view on change
  useEffect(() => {
    localStorage.setItem('currentView', currentView);
  }, [currentView]);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);

  // Fetch all data from API on mount
  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchBrands();
    fetchOrders();
    fetchCustomers();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/products`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/categories`);
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchBrands = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/brands`);
      const data = await response.json();
      setBrands(data);
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders`);
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const fetchCustomers = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/customers`);
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const [selectedProduct, setSelectedProduct] = useState<Product>(INITIAL_PRODUCTS[0]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>(['prod-1']);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [isAddBrandOpen, setIsAddBrandOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdminSidebarOpen, setIsAdminSidebarOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));

  const handleLogin = (user: User, userToken: string) => {
    setCurrentUser(user);
    setToken(userToken);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', userToken);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('currentView');
    setCurrentView('home');
  };

  // Cart Actions
  const handleAddToCart = (
    product: Product,
    quantity = 1,
    selectedColor = product.colors[0]?.name || 'Default'
  ) => {
    if (!currentUser) {
      alert('Please login or register first to add items to your cart.');
      setCurrentView('auth');
      return;
    }
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id && item.selectedColor === selectedColor
      );
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.selectedColor === selectedColor
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, selectedColor }];
    });
  };

  const handleUpdateCartQuantity = (productId: string, qty: number) => {
    if (qty <= 0) {
      handleRemoveCartItem(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity: qty } : item
      )
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Wishlist Actions
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) =>
      prev.includes(product.id)
        ? prev.filter((id) => id !== product.id)
        : [...prev, product.id]
    );
  };

  // Product Admin Actions
  const handleSaveProduct = async (prodData: Partial<Product>) => {
    try {
      const method = prodData.id ? 'PUT' : 'POST';
      const url = prodData.id
        ? `${API_BASE_URL}/products/${prodData.id}`
        : `${API_BASE_URL}/products`;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(prodData),
      });

      if (response.ok) {
        fetchProducts(); // Refresh list
        setIsAddProductOpen(false);
      }
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          fetchProducts();
        }
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  // Category Admin Actions
  const handleSaveCategory = async (catData: Partial<Category>) => {
    try {
      const method = catData.id ? 'PUT' : 'POST';
      const url = catData.id
        ? `${API_BASE_URL}/categories/${catData.id}`
        : `${API_BASE_URL}/categories`;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(catData),
      });

      if (response.ok) {
        fetchCategories();
        setIsAddCategoryOpen(false);
      }
    } catch (error) {
      console.error('Error saving category:', error);
    }
  };

  const handleDeleteCategory = async (categoryId: number) => {
    if (confirm('Are you sure you want to delete this category?')) {
      try {
        const response = await fetch(`${API_BASE_URL}/categories/${categoryId}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          fetchCategories();
        }
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    }
  };

  // Brand Admin Actions
  const handleSaveBrand = async (brandData: Partial<Brand>) => {
    try {
      const method = brandData.id ? 'PUT' : 'POST';
      const url = brandData.id
        ? `${API_BASE_URL}/brands/${brandData.id}`
        : `${API_BASE_URL}/brands`;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(brandData),
      });

      if (response.ok) {
        fetchBrands();
        setIsAddBrandOpen(false);
      }
    } catch (error) {
      console.error('Error saving brand:', error);
    }
  };

  const handleDeleteBrand = async (brandId: number) => {
    if (confirm('Are you sure you want to delete this brand?')) {
      try {
        const response = await fetch(`${API_BASE_URL}/brands/${brandId}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          fetchBrands();
        }
      } catch (error) {
        console.error('Error deleting brand:', error);
      }
    }
  };

  // Order Admin Actions
  const handleUpdateOrderStatus = (
    orderId: string,
    status: 'Completed' | 'Processing' | 'Cancelled'
  ) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
  };

  const isAdminView = currentView.startsWith('admin-');
  const isAuthView = currentView === 'auth';

  // Protect Admin Routes
  useEffect(() => {
    if (isAdminView && (!currentUser || currentUser.role !== 'Super Admin')) {
      setCurrentView('auth');
    }
  }, [currentView, currentUser]);

  const wishlistProducts = products.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="min-h-screen bg-[#f7f9fb] font-sans text-[#191c1e] selection:bg-[#3525cd] selection:text-white">
      {/* 1. Storefront Navigation */}
      {!isAdminView && !isAuthView && (
        <Navbar
          currentView={currentView}
          onNavigate={setCurrentView}
          cartCount={cart.reduce((a, b) => a + b.quantity, 0)}
          wishlistCount={wishlistIds.length}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenWishlist={() => setIsWishlistOpen(true)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          currentUser={currentUser}
          onLogout={handleLogout}
        />
      )}

      {/* 2. Admin Sidebar & Header */}
      {isAdminView && (
        <div className="flex min-h-screen w-full overflow-x-hidden">
          <AdminSidebar
            currentView={currentView}
            onNavigate={(view) => {
              setCurrentView(view);
              setIsAdminSidebarOpen(false);
            }}
            isOpen={isAdminSidebarOpen}
            onClose={() => setIsAdminSidebarOpen(false)}
            onOpenAddProduct={() => {
              setEditingProduct(null);
              setIsAddProductOpen(true);
            }}
          />
          <div className="flex-1 lg:pl-[280px] flex flex-col w-full min-w-0">
            <AdminHeader
              onNavigate={setCurrentView}
              onLogout={handleLogout}
              onMenuClick={() => setIsAdminSidebarOpen(true)}
              title={
                currentView === 'admin-overview'
                  ? 'Dashboard Overview'
                  : currentView === 'admin-products'
                  ? 'Products Catalog'
                  : currentView === 'admin-orders'
                  ? 'Orders Console'
                  : currentView === 'admin-customers'
                  ? 'Customer Accounts'
                  : currentView === 'admin-analytics'
                  ? 'Analytics & Growth'
                  : 'Settings'
              }
            />
            <main className="flex-1 bg-[#f7f9fb]">
              {currentView === 'admin-overview' && (
                <AdminOverviewView
                  orders={orders}
                  products={products}
                  onNavigate={setCurrentView}
                  onOpenAddProduct={() => {
                    setEditingProduct(null);
                    setIsAddProductOpen(true);
                  }}
                />
              )}
              {currentView === 'admin-products' && (
                <AdminProductsView
                  products={products}
                  onOpenAddProduct={() => {
                    setEditingProduct(null);
                    setIsAddProductOpen(true);
                  }}
                  onEditProduct={(p) => {
                    setEditingProduct(p);
                    setIsAddProductOpen(true);
                  }}
                  onDeleteProduct={handleDeleteProduct}
                />
              )}
              {currentView === 'admin-categories' && (
                <AdminCategoriesView
                  categories={categories}
                  onOpenAddCategory={() => {
                    setEditingCategory(null);
                    setIsAddCategoryOpen(true);
                  }}
                  onEditCategory={(c) => {
                    setEditingCategory(c);
                    setIsAddCategoryOpen(true);
                  }}
                  onDeleteCategory={handleDeleteCategory}
                />
              )}
              {currentView === 'admin-brands' && (
                <AdminBrandsView
                  brands={brands}
                  onOpenAddBrand={() => {
                    setEditingBrand(null);
                    setIsAddBrandOpen(true);
                  }}
                  onEditBrand={(b) => {
                    setEditingBrand(b);
                    setIsAddBrandOpen(true);
                  }}
                  onDeleteBrand={handleDeleteBrand}
                />
              )}
              {currentView === 'admin-orders' && (
                <AdminOrdersView
                  orders={orders}
                  onUpdateOrderStatus={handleUpdateOrderStatus}
                />
              )}
              {currentView === 'admin-customers' && (
                <AdminCustomersView customers={customers} />
              )}
              {currentView === 'admin-analytics' && <AdminAnalyticsView />}
              {currentView === 'admin-settings' && <AdminSettingsView />}
            </main>
          </div>
        </div>
      )}

      {/* 3. Customer Storefront Main Views */}
      {!isAdminView && !isAuthView && (
        <main>
          {currentView === 'home' && (
            <HomeView
              products={products}
              onNavigate={setCurrentView}
              onSelectProduct={setSelectedProduct}
              onAddToCart={handleAddToCart}
            />
          )}

          {currentView === 'shop' && (
            <ShopView
              products={products}
              categories={categories}
              currentView={currentView}
              onNavigate={setCurrentView}
              onSelectProduct={setSelectedProduct}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
              wishlistIds={wishlistIds}
              searchQuery={searchQuery}
              onOpenQuickView={setQuickViewProduct}
            />
          )}

          {currentView === 'deals' && (
            <DealsView
              products={products}
              categories={categories}
              onNavigate={setCurrentView}
              onSelectProduct={setSelectedProduct}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
              wishlistIds={wishlistIds}
              searchQuery={searchQuery}
              onOpenQuickView={setQuickViewProduct}
            />
          )}

          {currentView === 'new-arrivals' && (
            <NewArrivalsView
              products={products}
              categories={categories}
              onNavigate={setCurrentView}
              onSelectProduct={setSelectedProduct}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
              wishlistIds={wishlistIds}
              searchQuery={searchQuery}
              onOpenQuickView={setQuickViewProduct}
            />
          )}

          {currentView === 'category' && (
            <CategoryView
              products={products}
              categories={categories}
              onNavigate={setCurrentView}
              onSelectProduct={setSelectedProduct}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
              wishlistIds={wishlistIds}
              searchQuery={searchQuery}
              onOpenQuickView={setQuickViewProduct}
            />
          )}

          {currentView === 'product-detail' && (
            <ProductDetailView
              product={selectedProduct}
              onNavigate={setCurrentView}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
              isWishlisted={wishlistIds.includes(selectedProduct.id)}
            />
          )}
        </main>
      )}

      {/* 4. Authentication View */}
      {isAuthView && (
        <AuthView onNavigate={setCurrentView} onLogin={handleLogin} />
      )}

      {/* 5. Footer (Storefront Only) */}
      {!isAdminView && !isAuthView && <Footer onNavigate={setCurrentView} />}

      {/* 6. Drawers & Modals */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlistProducts}
        onRemoveWishlist={(id) =>
          setWishlistIds((prev) => prev.filter((wId) => wId !== id))
        }
        onAddToCart={handleAddToCart}
      />

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={
          quickViewProduct ? wishlistIds.includes(quickViewProduct.id) : false
        }
      />

      <AddProductModal
        isOpen={isAddProductOpen}
        onClose={() => setIsAddProductOpen(false)}
        onSave={handleSaveProduct}
        editingProduct={editingProduct}
      />

      <AddCategoryModal
        isOpen={isAddCategoryOpen}
        onClose={() => setIsAddCategoryOpen(false)}
        onSave={handleSaveCategory}
        editingCategory={editingCategory}
      />

      <AddBrandModal
        isOpen={isAddBrandOpen}
        onClose={() => setIsAddBrandOpen(false)}
        onSave={handleSaveBrand}
        editingBrand={editingBrand}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        currentUser={currentUser}
        cartItems={cart}
        totalAmount={cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)}
        onOrderSuccess={() => {
          setCart([]);
          setIsCheckoutOpen(false);
        }}
      />
    </div>
  );
}
