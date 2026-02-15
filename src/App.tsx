import React, { useState, useEffect } from 'react';
import {
    Search,
    Heart,
    ShoppingCart,
    Home,
    ClipboardList,
    User,
    ArrowLeft,
    Share2,
    Trash2,
    Star,
    LogOut,
    ChevronRight,
    Filter,
    Grid,
    List,
    Plus,
    Minus,
    ShoppingBag,
    CreditCard,
    Smartphone,
    Truck,
    CheckCircle,
    AlertCircle,
    Loader2
} from 'lucide-react';

const API_BASE = 'https://ecommerce-backend-3hz3.onrender.com';


// --- Types ---
type Screen = 'splash' | 'login' | 'otp' | 'products' | 'wishlist' | 'profile' | 'cart' | 'payment' | 'success' | 'orders';

interface Product {
    id: number;
    name: string;
    brand: string;
    price: number;
    oldPrice: number;
    discount: number;
    rating: number;
    image: string;
    stock: number;
    colors: string[];
    sizes: string[];
}

interface CartItem extends Product {
    quantity: number;
}

// --- Mock Data ---
const MOCK_PRODUCTS: Product[] = [
    {
        id: 1,
        name: "Floral Maxi Dress",
        brand: "Fashionista",
        price: 2499,
        oldPrice: 2999,
        discount: 17,
        rating: 5.0,
        image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400",
        stock: 50,
        colors: ["Red", "Blue", "Yellow"],
        sizes: ["S", "M", "L", "XL"]
    },
    {
        id: 2,
        name: "Black Saree Dress",
        brand: "Glamour",
        price: 3999,
        oldPrice: 4599,
        discount: 13,
        rating: 5.0,
        image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=400",
        stock: 30,
        colors: ["Black"],
        sizes: ["OS"]
    },
    {
        id: 3,
        name: "Cotton Summer Dress",
        brand: "CottonDays",
        price: 1699,
        oldPrice: 1999,
        discount: 15,
        rating: 5.0,
        image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400",
        stock: 45,
        colors: ["White", "Print"],
        sizes: ["XS", "S", "M"]
    },
    {
        id: 4,
        name: "White Linen Shirt",
        brand: "UrbanClassic",
        price: 1299,
        oldPrice: 1599,
        discount: 18,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1598033129183-c4f50c7176c8?w=400",
        stock: 40,
        colors: ["White", "Beige"],
        sizes: ["M", "L", "XL"]
    },
    {
        id: 5,
        name: "Checkered Casual Shirt",
        brand: "DenimCo",
        price: 1499,
        oldPrice: 1899,
        discount: 21,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1588359410707-160de4772120?w=400",
        stock: 25,
        colors: ["Blue/White", "Red/Black"],
        sizes: ["S", "M", "L"]
    },
    {
        id: 6,
        name: "Slim Fit Chinos",
        brand: "UrbanClassic",
        price: 1999,
        oldPrice: 2499,
        discount: 20,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400",
        stock: 35,
        colors: ["Khaki", "Navy", "Olive"],
        sizes: ["30", "32", "34", "36"]
    },
    {
        id: 7,
        name: "Classic Indigo Jeans",
        brand: "RoughNeck",
        price: 2799,
        oldPrice: 3499,
        discount: 20,
        rating: 5.0,
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400",
        stock: 20,
        colors: ["Indigo", "Black"],
        sizes: ["30", "32", "34"]
    }
];

// --- Components ---

const LoadingOverlay = () => (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(255,255,255,0.8)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Loader2 className="animate-spin" size={40} color="var(--primary)" />
        <style>{`.animate-spin { animation: spin 1s linear infinite; } @keyframes spin { from {transform: rotate(0deg);} to {transform: rotate(360deg);} }`}</style>
    </div>
);

const SplashScreen = ({ onFinish }: { onFinish: () => void }) => {
    useEffect(() => {
        const timer = setTimeout(onFinish, 2500);
        return () => clearTimeout(timer);
    }, [onFinish]);

    return (
        <div className="screen splash-screen" style={{ background: 'white', justifyContent: 'center', alignItems: 'center', height: '100vh', textAlign: 'center' }}>
            <div className="logo-container">
                <svg width="120" height="120" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="#fff" stroke="#eee" strokeWidth="1" />
                    <path d="M30 70 L50 20 L70 70" fill="none" stroke="#2b4594" strokeWidth="8" strokeLinecap="round" />
                    <path d="M40 70 L50 45 L60 70" fill="none" stroke="#f26522" strokeWidth="8" strokeLinecap="round" />
                    <path d="M30 70 Q50 60 70 70" fill="none" stroke="#f26522" strokeWidth="8" strokeLinecap="round" />
                </svg>
                <h1 style={{ marginTop: '20px', fontSize: '32px', fontWeight: '800', color: '#2b4594' }}>AMOGA <span style={{ color: '#f26522' }}>MART</span></h1>
            </div>
            <div className="loading-bar" style={{ width: '150px', height: '4px', background: '#eee', marginTop: '40px', borderRadius: '2px', overflow: 'hidden', position: 'relative' }}>
                <div className="loading-progress" style={{ position: 'absolute', height: '100%', background: 'linear-gradient(90deg, #f26522, #eb2f06)', width: '60%', animation: 'loadProgress 2s infinite ease-in-out' }} />
            </div>
            <style>{`@keyframes loadProgress { 0% { left: -60%; } 100% { left: 100%; } }`}</style>
        </div>
    );
};

const LoginScreen = ({ onSendOtp }: { onSendOtp: (contact: string) => void }) => {
    const [tab, setTab] = useState<'mobile' | 'email'>('mobile');
    const [contact, setContact] = useState('');

    return (
        <div className="screen login-screen">
            <div className="login-header" style={{ background: 'linear-gradient(180deg, #e34c2d 0%, #7d5fff 100%)', padding: '60px 30px', borderBottomLeftRadius: '50% 30px', borderBottomRightRadius: '50% 30px', color: 'white', textAlign: 'center' }}>
                <h2 style={{ fontSize: '32px' }}>Welcome</h2>
                <p>Sign in to your account</p>
            </div>
            <div className="login-content" style={{ padding: '40px 25px' }}>
                <h3>Login</h3>
                <p style={{ color: 'var(--text-muted)' }}>Enter your details to continue</p>
                <div className="tab-container" style={{ display: 'flex', background: '#f1f2f6', padding: '5px', borderRadius: '12px', margin: '25px 0' }}>
                    <button onClick={() => setTab('mobile')} style={{ flex: 1, padding: '12px', borderRadius: '10px', background: tab === 'mobile' ? 'white' : 'transparent', fontWeight: '600' }}>Mobile</button>
                    <button onClick={() => setTab('email')} style={{ flex: 1, padding: '12px', borderRadius: '10px', background: tab === 'email' ? 'white' : 'transparent', fontWeight: '600' }}>Email</button>
                </div>
                <div className="input-group">
                    <label className="input-label">{tab === 'mobile' ? 'Mobile Number' : 'Email Address'}</label>
                    <input className="input-field" value={contact} onChange={e => setContact(e.target.value)} placeholder={tab === 'mobile' ? '8190009005' : 'user@example.com'} />
                </div>
                <button className="btn-primary" onClick={() => onSendOtp(contact)} style={{ width: '100%', marginTop: '10px' }}>SEND OTP</button>
            </div>
        </div>
    );
};

const OTPVerificationScreen = ({ contact, onVerify, onBack }: { contact: string, onVerify: (otp: string) => void, onBack: () => void }) => {
    const [otp, setOtp] = useState('');
    return (
        <div className="screen otp-screen">
            <div className="header" style={{ padding: '20px' }}>
                <button onClick={onBack}><ArrowLeft size={24} /></button>
            </div>
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <div style={{ background: '#f1f2f6', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                    <Smartphone size={40} color="var(--primary)" />
                </div>
                <h3 style={{ fontSize: '24px', marginBottom: '10px' }}>Verify Details</h3>
                <p style={{ color: 'var(--text-muted)' }}>Enter the 4-digit code sent to <br /><strong>{contact}</strong></p>
                <div style={{ margin: '40px 0' }}>
                    <input
                        type="text"
                        maxLength={4}
                        value={otp}
                        onChange={e => setOtp(e.target.value)}
                        style={{ fontSize: '32px', letterSpacing: '20px', textAlign: 'center', width: '200px', border: 'none', borderBottom: '2px solid var(--primary)', background: 'transparent' }}
                        placeholder="0000"
                    />
                </div>
                <button className="btn-primary" onClick={() => onVerify(otp)} style={{ width: '100%' }}>VERIFY & CONTINUE</button>
                <p style={{ marginTop: '20px', color: 'var(--text-muted)', fontSize: '14px' }}>Didn't receive code? <span style={{ color: 'var(--primary)', fontWeight: '700' }}>Resend</span></p>
            </div>
        </div>
    );
};

const ProductListScreen = ({ cartCount, onGoToCart, onAddToCart, onToggleWishlist, wishlist, darkMode, toggleDarkMode }: { cartCount: number, onGoToCart: () => void, onAddToCart: (p: Product) => void, onToggleWishlist: (id: number) => void, wishlist: number[], darkMode: boolean, toggleDarkMode: () => void }) => {
    const [search, setSearch] = useState('');
    const filteredProducts = MOCK_PRODUCTS.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="screen products-screen">
            <div className="header" style={{ padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <button onClick={toggleDarkMode} style={{ background: 'var(--bg-white)', borderRadius: '50%', padding: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                        {darkMode ? <Plus size={20} /> : <Minus size={20} />} {/* Using Plus/Minus as Moon/Sun mock if not available, but let's see if we have better icons */}
                    </button>
                    <h2 style={{ fontSize: '18px', fontWeight: '700' }}>Explore</h2>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <h2 style={{ fontSize: '18px', fontWeight: '700' }}>Amoga Mart</h2>
                </div>
                <button onClick={onGoToCart} style={{ position: 'relative' }}>
                    <ShoppingCart size={24} />
                    {cartCount > 0 && <span style={{ position: 'absolute', top: '-5px', right: '-8px', background: 'red', color: 'white', fontSize: '10px', borderRadius: '10px', padding: '2px 6px', fontWeight: 'bold' }}>{cartCount}</span>}
                </button>
            </div>
            <div className="search-bar" style={{ padding: '0 20px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', background: 'var(--border-light)', padding: '12px 15px', borderRadius: '12px' }}>
                    <Search size={20} color="var(--text-muted)" style={{ marginRight: '10px' }} />
                    <input
                        placeholder="Search products, brands..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        style={{ background: 'transparent', border: 'none', flex: 1, color: 'var(--text-main)' }}
                    />
                </div>
            </div>
            <div className="product-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', padding: '0 20px', overflowY: 'auto' }}>
                {filteredProducts.map(product => {
                    const isWishlisted = wishlist.includes(product.id);
                    return (
                        <div key={product.id} className="product-card" style={{ background: 'var(--bg-white)', borderRadius: '15px', overflow: 'hidden', border: '1px solid var(--border-light)', boxShadow: 'var(--card-shadow)' }}>
                            <div style={{ position: 'relative' }}>
                                <img src={product.image} alt={product.name} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                                <button onClick={() => onToggleWishlist(product.id)} style={{ position: 'absolute', top: '10px', right: '10px', background: 'white', borderRadius: '50%', padding: '6px' }}>
                                    <Heart size={16} color={isWishlisted ? "red" : "var(--text-muted)"} fill={isWishlisted ? "red" : "none"} />
                                </button>
                            </div>
                            <div style={{ padding: '12px' }}>
                                <h4 style={{ fontSize: '14px', height: '36px', overflow: 'hidden' }}>{product.name}</h4>
                                <div style={{ margin: '8px 0' }}>
                                    <span style={{ fontSize: '15px', fontWeight: '700', color: 'var(--danger)' }}>₹{product.price}</span>
                                </div>
                                <button className="btn-secondary" onClick={() => onAddToCart(product)} style={{ width: '100%', padding: '10px', fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                    <ShoppingCart size={16} /> Add to Cart
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const CartScreen = ({ cart, onUpdateQty, onRemove, onCheckout, onBack }: { cart: CartItem[], onUpdateQty: (id: number, delta: number) => void, onRemove: (id: number) => void, onCheckout: () => void, onBack: () => void }) => {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return (
        <div className="screen cart-screen">
            <div className="header" style={{ padding: '20px', display: 'flex', alignItems: 'center', borderBottom: '1px solid #eee' }}>
                <button onClick={onBack} style={{ marginRight: '15px' }}><ArrowLeft size={24} /></button>
                <h2 style={{ fontSize: '20px', fontWeight: '800', flex: 1, textAlign: 'center' }}>My Cart</h2>
                <div style={{ width: '24px' }}></div>
            </div>
            <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
                {cart.length === 0 ? <div style={{ textAlign: 'center', marginTop: '100px' }}><h3>Cart is empty</h3></div> : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {cart.map(item => (
                            <div key={item.id} style={{ display: 'flex', gap: '15px', background: 'white', borderRadius: '15px', padding: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                                <img src={item.image} style={{ width: '80px', height: '100px', borderRadius: '10px', objectFit: 'cover' }} />
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <h4 style={{ fontSize: '15px', fontWeight: '600' }}>{item.name}</h4>
                                        <button onClick={() => onRemove(item.id)}><Trash2 size={18} color="var(--danger)" /></button>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                                        <span style={{ fontWeight: '700', color: 'var(--primary)' }}>₹{item.price}</span>
                                        <div style={{ display: 'flex', alignItems: 'center', background: '#f1f2f6', borderRadius: '8px', padding: '4px' }}>
                                            <button onClick={() => onUpdateQty(item.id, -1)} style={{ padding: '4px' }}><Minus size={14} /></button>
                                            <span style={{ padding: '0 10px', fontWeight: '600' }}>{item.quantity}</span>
                                            <button onClick={() => onUpdateQty(item.id, 1)} style={{ padding: '4px' }}><Plus size={14} /></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {cart.length > 0 && (
                <div style={{ padding: '20px', background: 'white', boxShadow: '0 -10px 20px rgba(0,0,0,0.05)', borderTopLeftRadius: '20px', borderTopRightRadius: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Total Amount</span>
                        <span style={{ fontSize: '20px', fontWeight: '800', color: 'var(--secondary)' }}>₹{total}</span>
                    </div>
                    <button className="btn-primary" onClick={onCheckout} style={{ width: '100%', padding: '16px' }}>Checkout Now</button>
                </div>
            )}
        </div>
    );
};

const WishlistScreen = ({ wishlist, onToggleWishlist, onAddToCart, onBack }: { wishlist: number[], onToggleWishlist: (id: number) => void, onAddToCart: (p: Product) => void, onBack: () => void }) => {
    const wishlistProducts = MOCK_PRODUCTS.filter(p => wishlist.includes(p.id));

    return (
        <div className="screen wishlist-screen">
            <div className="header" style={{ padding: '20px', display: 'flex', alignItems: 'center', borderBottom: '1px solid #eee' }}>
                <button onClick={onBack} style={{ marginRight: '15px' }}><ArrowLeft size={24} /></button>
                <h2 style={{ fontSize: '20px', fontWeight: '800', flex: 1, textAlign: 'center' }}>My Wishlist</h2>
                <div style={{ width: '24px' }}></div>
            </div>
            <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
                {wishlistProducts.length === 0 ? (
                    <div style={{ textAlign: 'center', marginTop: '100px' }}>
                        <Heart size={64} color="#f1f2f6" fill="#f1f2f6" style={{ marginBottom: '20px' }} />
                        <h3>Your wishlist is empty</h3>
                        <p style={{ color: 'var(--text-muted)', marginTop: '10px' }}>Explore products and like them to see them here.</p>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                        {wishlistProducts.map(product => (
                            <div key={product.id} className="product-card" style={{ background: 'white', borderRadius: '15px', overflow: 'hidden', border: '1px solid #f1f2f6' }}>
                                <div style={{ position: 'relative' }}>
                                    <img src={product.image} alt={product.name} style={{ width: '100%', height: '160px', objectFit: 'cover' }} />
                                    <button onClick={() => onToggleWishlist(product.id)} style={{ position: 'absolute', top: '10px', right: '10px', background: 'white', borderRadius: '50%', padding: '6px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                                        <Heart size={16} color="red" fill="red" />
                                    </button>
                                </div>
                                <div style={{ padding: '10px' }}>
                                    <h4 style={{ fontSize: '13px', height: '32px', overflow: 'hidden' }}>{product.name}</h4>
                                    <div style={{ margin: '5px 0' }}>
                                        <span style={{ fontSize: '14px', fontWeight: '700', color: 'var(--danger)' }}>₹{product.price}</span>
                                    </div>
                                    <button className="btn-secondary" onClick={() => onAddToCart(product)} style={{ width: '100%', padding: '8px', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                                        <ShoppingCart size={14} /> Add
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const ProfileScreen = ({ contact, orders, onViewOrders, onBack, onLogout }: { contact: string, orders: any[], onViewOrders: () => void, onBack: () => void, onLogout: () => void }) => {
    return (
        <div className="screen profile-screen">
            <div className="header" style={{ padding: '20px', display: 'flex', alignItems: 'center', borderBottom: '1px solid var(--border-light)' }}>
                <button onClick={onBack} style={{ marginRight: '15px' }}><ArrowLeft size={24} /></button>
                <h2 style={{ fontSize: '20px', fontWeight: '800', flex: 1, textAlign: 'center' }}>My Profile</h2>
                <div style={{ width: '24px' }}></div>
            </div>
            <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
                <div style={{ textAlign: 'center', padding: '20px 0', borderBottom: '1px solid var(--border-light)' }}>
                    <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'linear-gradient(45deg, var(--primary), var(--secondary))', margin: '0 auto 15px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '40px', fontWeight: '700' }}>
                        {contact ? contact.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <h3 style={{ fontSize: '20px', fontWeight: '700' }}>User</h3>
                    <p style={{ color: 'var(--text-muted)' }}>{contact || 'Not logged in'}</p>
                </div>

                <div style={{ marginTop: '20px' }}>
                    <button onClick={onViewOrders} style={{ display: 'flex', alignItems: 'center', padding: '15px 0', width: '100%', border: 'none', background: 'transparent', borderBottom: '1px solid var(--border-light)', color: 'inherit' }}>
                        <div style={{ color: 'var(--primary)', marginRight: '15px' }}><ClipboardList size={20} /></div>
                        <span style={{ flex: 1, fontWeight: '500', textAlign: 'left' }}>My Orders ({orders.length})</span>
                        <ChevronRight size={18} color="var(--text-muted)" />
                    </button>
                    {[
                        { icon: <CreditCard size={20} />, label: 'Payments' },
                        { icon: <Truck size={20} />, label: 'Shipping Address' },
                        { icon: <Star size={20} />, label: 'Reviews & Ratings' },
                        { icon: <AlertCircle size={20} />, label: 'Help Center' }
                    ].map((item, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', padding: '15px 0', borderBottom: '1px solid var(--border-light)' }}>
                            <div style={{ color: 'var(--primary)', marginRight: '15px' }}>{item.icon}</div>
                            <span style={{ flex: 1, fontWeight: '500' }}>{item.label}</span>
                            <ChevronRight size={18} color="var(--text-muted)" />
                        </div>
                    ))}
                    <button onClick={onLogout} style={{ display: 'flex', alignItems: 'center', padding: '15px 0', width: '100%', border: 'none', background: 'transparent', color: 'var(--danger)', fontWeight: '600' }}>
                        <LogOut size={20} style={{ marginRight: '15px' }} />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

const OrderHistoryScreen = ({ orders, onBack }: { orders: any[], onBack: () => void }) => {
    return (
        <div className="screen orders-screen">
            <div className="header" style={{ padding: '20px', display: 'flex', alignItems: 'center', borderBottom: '1px solid var(--border-light)' }}>
                <button onClick={onBack} style={{ marginRight: '15px' }}><ArrowLeft size={24} /></button>
                <h2 style={{ fontSize: '20px', fontWeight: '800', flex: 1, textAlign: 'center' }}>My Orders</h2>
                <div style={{ width: '24px' }}></div>
            </div>
            <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
                {orders.length === 0 ? (
                    <div style={{ textAlign: 'center', marginTop: '100px' }}>
                        <ClipboardList size={64} color="var(--border-light)" style={{ marginBottom: '20px' }} />
                        <h3>No orders yet</h3>
                        <p style={{ color: 'var(--text-muted)', marginTop: '10px' }}>Place an order to see it here.</p>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        {orders.map((order, idx) => (
                            <div key={idx} style={{ background: 'var(--bg-white)', borderRadius: '15px', padding: '15px', border: '1px solid var(--border-light)', boxShadow: 'var(--card-shadow)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                    <span style={{ fontWeight: '700' }}>Order #{idx + 1}</span>
                                    <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>{new Date(order.date).toLocaleDateString()}</span>
                                </div>
                                <div style={{ marginBottom: '10px' }}>
                                    {order.items.map((item: any, i: number) => (
                                        <div key={i} style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                                            {item.name} x {item.quantity}
                                        </div>
                                    ))}
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-light)', paddingTop: '10px' }}>
                                    <span style={{ fontWeight: '600' }}>Total</span>
                                    <span style={{ fontWeight: '700', color: 'var(--secondary)' }}>₹{order.total}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const PaymentScreen = ({ amount, onProcess, onBack }: { amount: number, onProcess: (method: string) => void, onBack: () => void }) => {
    const [method, setMethod] = useState('upi');
    return (
        <div className="screen payment-screen">
            <div className="header" style={{ padding: '20px' }}>
                <button onClick={onBack}><ArrowLeft size={24} /></button>
                <h2 style={{ fontSize: '20px', fontWeight: '800', textAlign: 'center', flex: 1 }}>Payment</h2>
            </div>
            <div style={{ padding: '20px' }}>
                <div style={{ background: 'var(--bg-light)', padding: '20px', borderRadius: '15px', marginBottom: '30px', textAlign: 'center' }}>
                    <p style={{ color: 'var(--text-muted)' }}>Amount to Pay</p>
                    <h1 style={{ fontSize: '32px', color: 'var(--secondary)' }}>₹{amount}</h1>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {[
                        { id: 'upi', label: 'UPI (GPay / PhonePe)', icon: <Smartphone size={24} /> },
                        { id: 'card', label: 'Credit / Debit Card', icon: <CreditCard size={24} /> },
                        { id: 'cod', label: 'Cash on Delivery', icon: <Truck size={24} /> }
                    ].map(opt => (
                        <div key={opt.id} onClick={() => setMethod(opt.id)} style={{
                            display: 'flex', alignItems: 'center', gap: '15px', padding: '20px', borderRadius: '12px', border: method === opt.id ? '2px solid var(--secondary)' : '1.5px solid #eee',
                            background: method === opt.id ? 'rgba(93, 95, 239, 0.05)' : 'white'
                        }}>
                            <div style={{ color: method === opt.id ? 'var(--secondary)' : 'var(--text-muted)' }}>{opt.icon}</div>
                            <span style={{ fontWeight: '600', flex: 1 }}>{opt.label}</span>
                            <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: '2px solid var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {method === opt.id && <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--secondary)' }} />}
                            </div>
                        </div>
                    ))}
                </div>

                <button className="btn-primary" onClick={() => onProcess(method)} style={{ width: '100%', marginTop: '40px', padding: '18px' }}>PAY NOW</button>
            </div>
        </div>
    );
};

const SuccessScreen = ({ onReset }: { onReset: () => void }) => (
    <div className="screen success-screen" style={{ textAlign: 'center', justifyContent: 'center', padding: '40px' }}>
        <CheckCircle size={100} color="var(--success)" style={{ margin: '0 auto 20px' }} />
        <h1>Order Placed!</h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '10px' }}>Your order has been successfully placed. <br />You will receive a confirmation shortly.</p>
        <button className="btn-primary" onClick={onReset} style={{ marginTop: '40px', width: '100%' }}>CONTINUE SHOPPING</button>
    </div>
);

// --- Main App ---

export default function App() {
    const [screen, setScreen] = useState<Screen>('splash');
    const [loading, setLoading] = useState(false);
    const [contact, setContact] = useState('');
    const [cart, setCart] = useState<CartItem[]>([]);
    const [wishlist, setWishlist] = useState<number[]>([]);
    const [orders, setOrders] = useState<any[]>([]);
    const [darkMode, setDarkMode] = useState(false);

    const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }, [darkMode]);

    const showToast = (message: string, type: 'success' | 'error' = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 5000);
    };

    const callApi = async (path: string, body: object) => {
        setLoading(true);
        try {
            const res = await fetch(`${API_BASE}${path}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'API Error');
            return data;
        } catch (e: any) {
            showToast(e.message, 'error');
            return null;
        } finally {
            setLoading(false);
        }
    };

    const sendOtp = async (val: string) => {
        if (!val) return showToast('Enter contact info', 'error');
        setContact(val);
        const res = await callApi('/otp/send', { contact: val });
        if (res) {
            showToast(`OTP Sent! (SIMULATION: ${res.simulationOtp})`, 'success');
            setScreen('otp');
        }
    };

    const verifyOtp = async (otp: string) => {
        const res = await callApi('/otp/verify', { contact, otp });
        if (res) {
            showToast('Login Successful!', 'success');
            setScreen('products');
        }
    };

    const processPayment = async (method: string) => {
        const amount = cart.reduce((s, i) => s + i.price * i.quantity, 0);
        const res = await callApi('/payment/process', { amount, method });
        if (res) {
            const newOrder = {
                items: [...cart],
                total: amount,
                date: new Date().toISOString(),
                method
            };
            setOrders([newOrder, ...orders]);
            setCart([]);
            setScreen('success');
        }
    };

    return (
        <div className={`app-container ${darkMode ? 'dark' : ''}`}>
            {loading && <LoadingOverlay />}
            {toast && (
                <div style={{
                    position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)',
                    background: toast.type === 'success' ? '#2ecc71' : '#e74c3c',
                    color: 'white', padding: '12px 24px', borderRadius: '12px', zIndex: 10000,
                    boxShadow: '0 4px 15px rgba(0,0,0,0.2)', fontWeight: '600', animation: 'slideDown 0.3s ease-out'
                }}>
                    {toast.message}
                </div>
            )}
            <style>{`
        @keyframes slideDown { 
            from { transform: translate(-50%, -100px); opacity: 0; }
            to { transform: translate(-50%, 0); opacity: 1; }
        }
      `}</style>

            {screen === 'splash' && <SplashScreen onFinish={() => setScreen('login')} />}
            {screen === 'login' && <LoginScreen onSendOtp={sendOtp} />}
            {screen === 'otp' && <OTPVerificationScreen contact={contact} onVerify={verifyOtp} onBack={() => setScreen('login')} />}
            {screen === 'products' && <ProductListScreen cartCount={cart.reduce((s, i) => s + i.quantity, 0)} onGoToCart={() => setScreen('cart')} onAddToCart={p => { setCart(curr => curr.find(x => x.id === p.id) ? curr.map(x => x.id === p.id ? { ...x, quantity: x.quantity + 1 } : x) : [...curr, { ...p, quantity: 1 }]); showToast('Added to cart!'); }} onToggleWishlist={id => { setWishlist(curr => curr.includes(id) ? curr.filter(i => i !== id) : [...curr, id]); showToast(wishlist.includes(id) ? 'Removed from wishlist' : 'Added to wishlist'); }} wishlist={wishlist} darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />}
            {screen === 'wishlist' && <WishlistScreen wishlist={wishlist} onToggleWishlist={id => setWishlist(curr => curr.filter(i => i !== id))} onAddToCart={p => { setCart(curr => curr.find(x => x.id === p.id) ? curr.map(x => x.id === p.id ? { ...x, quantity: x.quantity + 1 } : x) : [...curr, { ...p, quantity: 1 }]); showToast('Added to cart!'); }} onBack={() => setScreen('products')} />}
            {screen === 'profile' && <ProfileScreen contact={contact} orders={orders} onViewOrders={() => setScreen('orders' as Screen)} onBack={() => setScreen('products')} onLogout={() => { setScreen('login'); showToast('Logged out'); }} />}
            {screen === 'orders' && <OrderHistoryScreen orders={orders} onBack={() => setScreen('profile')} />}
            {screen === 'cart' && <CartScreen cart={cart} onUpdateQty={(id, delta) => setCart(curr => curr.map(item => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item))} onRemove={id => setCart(curr => curr.filter(item => item.id !== id))} onCheckout={() => setScreen('payment')} onBack={() => setScreen('products')} />}
            {screen === 'payment' && <PaymentScreen amount={cart.reduce((s, i) => s + i.price * i.quantity, 0)} onBack={() => setScreen('cart')} onProcess={processPayment} />}
            {screen === 'success' && <SuccessScreen onReset={() => setScreen('products')} />}

            {['products', 'wishlist', 'profile', 'orders'].includes(screen) && <BottomNav active={screen as Screen} setScreen={setScreen} />}
        </div>
    );
}

const BottomNav = ({ active, setScreen }: { active: Screen, setScreen: (s: Screen) => void }) => {
    const tabs = [
        { id: 'products', icon: <Home size={22} />, label: 'Home' },
        { id: 'wishlist', icon: <Heart size={22} />, label: 'Wishlist' },
        { id: 'profile', icon: <User size={22} />, label: 'Profile' }
    ];
    return (
        <div className="bottom-nav glass" style={{ position: 'absolute', bottom: '0', left: '0', right: '0', height: '70px', display: 'flex', justifyContent: 'space-around', alignItems: 'center', borderTop: '1px solid var(--border-light)', background: 'var(--bg-white)', zIndex: 100 }}>
            {tabs.map(tab => (
                <button key={tab.id} onClick={() => setScreen(tab.id as Screen)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: (active === tab.id || (active === 'orders' && tab.id === 'profile')) ? 'var(--secondary)' : 'var(--text-muted)', background: 'transparent', border: 'none' }}>
                    {tab.icon} <span style={{ fontSize: '11px' }}>{tab.label}</span>
                </button>
            ))}
        </div>
    );
};
