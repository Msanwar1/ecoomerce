import React, { useState, useEffect, createContext, useContext, useRef } from 'react';

// --- ICONS (using inline SVGs for simplicity) ---
const ShoppingCartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
    </svg>
);
const SunIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    </svg>
);
const MoonIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
);
const MenuIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>
);
const XIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);
const StarIcon = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0.5">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
);


// --- MOCK DATA ---
const mockProducts = [
  { id: 1, name: 'Quantum-Core Laptop', price: 1299.99, image: 'https://wallpaperaccess.com/full/191366.jpg', category: 'Electronics', rating: 5, deal: true },
  { id: 2, name: 'Aura Smart Watch', price: 399.99, image: 'https://staticg.sportskeeda.com/editor/2024/01/0ae4d-17067051112438-1920.jpg', category: 'Wearables', rating: 4 },
  { id: 3, name: 'Sonic-Wave Headphones', price: 199.99, image: 'https://media.diy.com/is/image/KingfisherDigital/sonic-the-hedgehog-kids-interactive-headphones~5055371625531_01c_MP?$MOB_PREV$&$width=768&$height=768', category: 'Audio', rating: 5 },
  { id: 4, name: 'Ergo-Flow Keyboard', price: 149.99, image: 'https://www.dsi-keyboards.com/wp-content/uploads/2020/01/KB-ACK-916UB_03.jpg', category: 'Accessories', rating: 4 },
  { id: 5, name: 'Galactic-View VR Headset', price: 599.99, image: 'https://techcrunch.com/wp-content/uploads/2016/10/mi-vr_03-1.jpg', category: 'Gaming', rating: 5, deal: true },
  { id: 6, name: 'Nova-Charge Power Bank', price: 79.99, image: 'https://th.bing.com/th/id/OIP.iJRt6C6jTstKpITczVRWAAHaHa?w=189&h=189&c=7&r=0&o=7&dpr=1.1&pid=1.7&rm=3', category: 'Accessories', rating: 4 },
  { id: 7, name: 'Stealth-Pro Gaming Mouse', price: 99.99, image: 'https://th.bing.com/th/id/OIP.pzwq-ajVT6GInbXDnhif6QHaHa?w=172&h=180&c=7&r=0&o=7&dpr=1.1&pid=1.7&rm=3', category: 'Gaming', rating: 5 },
  { id: 8, name: 'Echo-Sphere Smart Speaker', price: 249.99, image: 'data:image/webp;base64,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', category: 'Audio', rating: 4 },
];

const mockCategories = [
    { name: 'Latest Tech', image: 'https://placehold.co/800x600/1e40af/ffffff?text=Latest+Tech' },
    { name: 'Audio Gear', image: 'https://placehold.co/800x600/9d174d/ffffff?text=Audio+Gear' },
    { name: 'Gaming World', image: 'https://placehold.co/800x600/047857/ffffff?text=Gaming+World' },
    { name: 'Accessories', image: 'https://placehold.co/800x600/b45309/ffffff?text=Accessories' }
];


// --- CONTEXT PROVIDERS ---
const CartContext = createContext();
const ThemeContext = createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [toast, setToast] = useState({ show: false, message: '' });

    const addToCart = (product) => {
        setCart(prevCart => {
            const existingProduct = prevCart.find(item => item.id === product.id);
            if (existingProduct) {
                return prevCart.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
        setToast({ show: true, message: `${product.name} added to cart!` });
        setTimeout(() => setToast({ show: false, message: '' }), 3000);
    };
    
    const removeFromCart = (productId) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId, quantity) => {
        if (quantity < 1) {
            removeFromCart(productId);
            return;
        }
        setCart(prevCart => prevCart.map(item => item.id === productId ? {...item, quantity} : item));
    };

    const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, cartTotal, cartItemCount, toast }}>
            {children}
        </CartContext.Provider>
    );
};

const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    const toggleTheme = () => setIsDarkMode(!isDarkMode);

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};


// --- HOOKS ---
const useCart = () => useContext(CartContext);
const useTheme = () => useContext(ThemeContext);


// --- COMPONENTS ---
const Navbar = ({ onCartClick }) => {
    const { cartItemCount } = useCart();
    const { isDarkMode, toggleTheme } = useTheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg sticky top-0 z-40 shadow-md">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex-shrink-0">
                        <a href="#" className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                            Chroma
                        </a>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-pink-500 px-3 py-2 rounded-md text-md font-medium transition-colors">Home</a>
                            <a href="#products" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-pink-500 px-3 py-2 rounded-md text-md font-medium transition-colors">Products</a>
                            <a href="#categories" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-pink-500 px-3 py-2 rounded-md text-md font-medium transition-colors">Categories</a>
                            <a href="#deals" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-pink-500 px-3 py-2 rounded-md text-md font-medium transition-colors">Deals</a>
                        </div>
                    </div>
                    <div className="flex items-center">
                        
                        <button onClick={onCartClick} className="ml-4 p-2 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none transition-colors relative">
                            <ShoppingCartIcon />
                            {cartItemCount > 0 && (
                                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-pink-600 text-white text-xs font-bold">
                                    {cartItemCount}
                                </span>
                            )}
                        </button>
                        <div className="md:hidden ml-2">
                            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-md text-gray-600 dark:text-gray-400">
                                {isMenuOpen ? <XIcon /> : <MenuIcon />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {isMenuOpen && (
                 <div className="md:hidden px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <a href="#" className="block text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-2 rounded-md text-base font-medium">Home</a>
                    <a href="#products" className="block text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-2 rounded-md text-base font-medium">Products</a>
                    <a href="#categories" className="block text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-2 rounded-md text-base font-medium">Categories</a>
                    <a href="#deals" className="block text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-2 rounded-md text-base font-medium">Deals</a>
                </div>
            )}
        </nav>
    );
};

const Header = () => (
    <header className="relative bg-gray-50 dark:bg-gray-800 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
            <div className="text-center">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                    <span className="block">Discover Your Next</span>
                    <span className="block bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 mt-2">Favorite Gadget</span>
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-gray-500 dark:text-gray-300">
                    Explore our curated collection of the latest and greatest in tech. Innovation at your fingertips.
                </p>
                <div className="mt-8 flex justify-center">
                    <a href="#products" className="inline-block text-white font-bold rounded-full bg-gradient-to-r from-purple-600 to-pink-600 py-4 px-10 text-lg hover:scale-105 transform transition-transform duration-300 shadow-lg">
                        Shop Now
                    </a>
                </div>
            </div>
        </div>
        <div className="absolute top-0 left-0 w-64 h-64 bg-purple-200 dark:bg-purple-900/50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-pink-200 dark:bg-pink-900/50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-blue-200 dark:bg-blue-900/50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
    </header>
);

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const renderStars = (rating) => {
        return Array(5).fill(0).map((_, i) => (
            <StarIcon key={i} className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} />
        ));
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden group transform hover:-translate-y-2 transition-transform duration-300 ease-in-out">
            <div className="relative">
                <img src={product.image} alt={product.name} className="w-full h-56 object-cover" />
                <div className="absolute top-0 right-0 bg-pink-600 text-white text-xs font-bold px-3 py-1 m-2 rounded-full">{product.category}</div>
            </div>
            <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{product.name}</h3>
                <div className="flex items-center mb-4">
                    {renderStars(product.rating)}
                    <span className="text-gray-600 dark:text-gray-400 ml-2 text-sm">({product.rating}.0)</span>
                </div>
                <p className="text-2xl font-extrabold text-purple-600 dark:text-pink-500 mb-4">₹{product.price}</p>
                <button 
                    onClick={() => addToCart(product)}
                    className="mt-auto w-full text-white font-bold rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 py-3 px-4 text-center transform group-hover:scale-105 transition-transform duration-300"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

const ProductGrid = () => (
    <section id="products" className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white mb-12">Our Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {mockProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    </section>
);

const FeaturedDeals = () => {
    const dealProducts = mockProducts.filter(p => p.deal);
    const { addToCart } = useCart(); // FIX: Call hook at the top level
    
    return (
        <section id="deals" className="bg-gray-100 dark:bg-gray-900 py-16 sm:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white mb-12">Today's Hottest Deals</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {dealProducts.map(product => (
                        <div key={product.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row items-center group">
                            <img src={product.image} alt={product.name} className="w-full md:w-1/2 h-64 object-cover"/>
                            <div className="p-8 text-center md:text-left">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{product.name}</h3>
                                <p className="text-gray-500 dark:text-gray-400 mt-2">Limited Time Offer!</p>
                                <p className="text-4xl font-extrabold text-pink-600 my-4">₹{product.price}</p>
                                <button onClick={() => addToCart(product)} className="text-white font-bold rounded-full bg-gradient-to-r from-purple-600 to-pink-600 py-3 px-8 text-lg hover:scale-105 transform transition-transform duration-300">
                                    Grab It Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const CategoryShowcase = () => (
    <section id="categories" className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white mb-12">Shop by Category</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {mockCategories.map(category => (
                    <a href="#" key={category.name} className="relative rounded-2xl overflow-hidden h-80 group shadow-lg">
                        <img src={category.image} alt={category.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"/>
                        <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center">
                            <h3 className="text-white text-2xl font-bold">{category.name}</h3>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    </section>
);

const Footer = () => (
    <footer className="bg-gray-800 dark:bg-black text-gray-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h3 className="text-xl font-bold text-white mb-4">ShopSphere</h3>
                    <p className="text-gray-400">Your one-stop shop for the future of tech.</p>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Shop</h3>
                    <ul>
                        <li className="mb-2"><a href="#products" className="hover:text-pink-500">Products</a></li>
                        <li className="mb-2"><a href="#deals" className="hover:text-pink-500">Deals</a></li>
                        <li className="mb-2"><a href="#categories" className="hover:text-pink-500">Categories</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
                    <ul>
                        <li className="mb-2"><a href="#" className="hover:text-pink-500">Contact Us</a></li>
                        <li className="mb-2"><a href="#" className="hover:text-pink-500">FAQ</a></li>
                        <li className="mb-2"><a href="#" className="hover:text-pink-500">Shipping</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Stay Connected</h3>
                    <p className="text-gray-400 mb-4">Join our newsletter for the latest updates.</p>
                    <form className="flex">
                        <input type="email" placeholder="Your email" className="w-full rounded-l-lg p-2 text-gray-800"/>
                        <button className="bg-pink-600 text-white p-2 rounded-r-lg font-bold">Go</button>
                    </form>
                </div>
            </div>
            <div className="mt-8 border-t border-gray-700 pt-8 text-center text-gray-500">
                <p>&copy; {new Date().getFullYear()} ShopSphere. All Rights Reserved.</p>
            </div>
        </div>
    </footer>
);

const CartSidebar = ({ isOpen, onClose }) => {
    const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
    const sidebarRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                onClose();
            }
        };
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    return (
        <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div ref={sidebarRef} className={`fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-gray-800 shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Cart</h2>
                        <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                            <XIcon className="w-6 h-6 text-gray-600 dark:text-gray-400"/>
                        </button>
                    </div>
                    {cart.length === 0 ? (
                        <div className="flex-grow flex flex-col items-center justify-center text-center p-6">
                             <ShoppingCartIcon className="w-24 h-24 text-gray-300 dark:text-gray-600 mb-4"/>
                            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Your cart is empty</h3>
                            <p className="text-gray-500 dark:text-gray-400 mt-2">Looks like you haven't added anything yet.</p>
                            <button onClick={onClose} className="mt-6 text-white font-bold rounded-full bg-gradient-to-r from-purple-600 to-pink-600 py-3 px-8 text-lg hover:scale-105 transform transition-transform duration-300">
                                Start Shopping
                            </button>
                        </div>
                    ) : (
                        <div className="flex-grow overflow-y-auto p-6">
                            {cart.map(item => (
                                <div key={item.id} className="flex items-center mb-6">
                                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg mr-4"/>
                                    <div className="flex-grow">
                                        <h4 className="font-bold text-gray-800 dark:text-white">{item.name}</h4>
                                        <p className="text-gray-600 dark:text-gray-400">${item.price.toFixed(2)}</p>
                                        <div className="flex items-center mt-2">
                                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 py-1 border rounded-l dark:border-gray-600">-</button>
                                            <span className="px-3 py-1 border-t border-b dark:border-gray-600">{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 border rounded-r dark:border-gray-600">+</button>
                                        </div>
                                    </div>
                                    <button onClick={() => removeFromCart(item.id)} className="ml-4 text-red-500 hover:text-red-700">
                                        <XIcon className="w-5 h-5"/>
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                    {cart.length > 0 && (
                        <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-lg font-medium text-gray-700 dark:text-gray-300">Subtotal</span>
                                <span className="text-xl font-bold text-gray-900 dark:text-white">${cartTotal.toFixed(2)}</span>
                            </div>
                            <button className="w-full text-white font-bold rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 py-4 text-center text-lg hover:scale-105 transform transition-transform duration-300">
                                Proceed to Checkout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const Toast = () => {
    const { toast } = useCart();
    return (
        <div className={`fixed bottom-5 right-5 bg-gray-900 text-white py-3 px-6 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out ${toast.show ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            {toast.message}
        </div>
    );
};


// --- MAIN APP ---
export default function App() {
    return (
        <ThemeProvider>
            <CartProvider>
                <MainContent />
            </CartProvider>
        </ThemeProvider>
    );
}

const MainContent = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);

    return (
        <div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
            <Navbar onCartClick={() => setIsCartOpen(true)} />
            <Header />
            <main>
                <ProductGrid />
                <FeaturedDeals />
                <CategoryShowcase />
            </main>
            <Footer />
            <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
            <Toast />
        </div>
    );
};
