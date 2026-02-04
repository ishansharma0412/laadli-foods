import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, Instagram, Facebook, Mail, Phone, 
  MessageCircle, ShieldCheck, Award, Truck, ChevronRight, 
  MapPin, Globe, Star, ShoppingBag, Leaf 
} from 'lucide-react';

// --- 1. PRODUCT DATABASE ---
const PRODUCTS = [
  { 
    id: 1, 
    name: "Premium Makhana", 
    tag: "Bestseller", 
    cat: "Makhana", 
    price: "249", 
    // REPLACE THIS with your uploaded image in public folder '/makhana-pack.jpg' if available
    img: "p3.png", 
    desc: "Jumbo size, farm-fresh Fox Nuts. Zero preservatives.",
    amazon: "https://amazon.in",
    flipkart: "https://flipkart.com"
  },
  { 
    id: 2, 
    name: "Peri Peri Makhana", 
    tag: "Spicy", 
    cat: "Flavoured", 
    price: "299", 
    img: "p2.png", 
    desc: "Roasted with zesty red chili spices. Non-fried snack.",
    amazon: "https://amazon.in",
    flipkart: "https://flipkart.com"
  },
  { 
    id: 3, 
    name: "Cream & Onion", 
    tag: "Kids Fav", 
    cat: "Flavoured", 
    price: "299", 
    img: "p4.png", 
    desc: "Smooth creamy flavor with a crunch.",
    amazon: "https://amazon.in",
    flipkart: "https://flipkart.com"
  },
  { 
    id: 4, 
    name: "Pudina Crunch", 
    tag: "Fresh", 
    cat: "Flavoured", 
    price: "299", 
    img: "p5.png", 
    desc: "Refreshing mint masala. Perfect for summers.",
    amazon: "https://amazon.in",
    flipkart: "https://flipkart.com"
  },
  { 
    id: 5, 
    name: "Unpolished Toor Daal", 
    tag: "Raw", 
    cat: "Staples", 
    price: "185", 
    img: "p6.png", 
    desc: "High protein, unpolished dal from MP farms.",
    amazon: "https://amazon.in",
    flipkart: "https://flipkart.com"
  },
  { 
    id: 6, 
    name: "Organic Moringa Powder", 
    tag: "Pure", 
    cat: "Organic", 
    price: "145", 
    img: "p7.png", 
    desc: "100% Natural | Rich in Antioxidants | Immunity Booster",
    amazon: "https://amazon.in",
    flipkart: "https://flipkart.com"
  },
];

// --- 2. REUSABLE UI COMPONENTS ---

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
};
// --- EMOTIONAL CONNECT SECTION ---
// --- EMOTIONAL CONNECT SECTION (UPDATED) ---
const EmotionalSection = () => (
  <section className="py-24 px-6 md:px-12 bg-brand-cream relative overflow-hidden">
    {/* Abstract Background Elements */}
    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-rust/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none"></div>
    <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-teal/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl pointer-events-none"></div>

    <div className="max-w-4xl mx-auto text-center relative z-10">
      {/* Icon */}
      <div className="mb-8 flex justify-center">
         {/* Heart Hand Icon or Leaf Icon */}
        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-sm text-brand-rust">
           <Leaf size={32} />
        </div>
      </div>

      {/* Heading */}
      <h2 className="text-3xl md:text-5xl font-serif text-brand-teal mb-8 font-bold leading-tight">
        It's not just food. It's <span className="text-brand-rust italic">'Laad'.</span>
      </h2>

      {/* Emotional Copy - Universal Appeal */}
      <p className="text-lg md:text-xl text-brand-dark/70 leading-relaxed font-sans mb-8">
        In Indian homes, <strong>'Laad'</strong> (Love/Care) isn't spoken; it's served on a plate. It’s the extra spoon of ghee, the hand-picked grains, and the refusal to compromise on quality for the ones we love.
      </p>
      
      <p className="text-lg md:text-xl text-brand-dark/70 leading-relaxed font-sans mb-12">
        At Laadli Foods, we believe <strong>everyone deserves that love</strong>. Whether you are feeding your growing child, your aging parents, or nourishing yourself—you deserve food that is 100% pure, honest, and chemical-free.
      </p>

      {/* The Core Promise */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-brand-teal/5 inline-block mx-auto">
        <p className="font-serif text-xl md:text-2xl text-brand-teal italic mb-4">
          "Our Promise is simple: If we wouldn't serve it to our family, we won't serve it to yours."
        </p>
        <div className="flex flex-col items-center gap-2 mt-6">
          <div className="h-1 w-12 bg-brand-rust rounded-full"></div>
          <p className="text-xs font-bold uppercase tracking-widest text-brand-dark/50">From our heart to your home</p>
        </div>
      </div>

    </div>
  </section>
);

const Section = ({ children, className = "" }) => (
  <section className={`py-20 md:py-28 px-6 md:px-12 relative ${className}`}>
    <div className="max-w-7xl mx-auto relative z-10">{children}</div>
  </section>
);

const Button = ({ variant = 'primary', children, className = "", ...props }) => {
  const styles = {
    primary: "bg-brand-teal text-white hover:bg-brand-rust shadow-lg hover:shadow-xl border border-transparent",
    secondary: "bg-brand-rust text-white hover:bg-brand-dark shadow-lg border border-transparent",
    outline: "border-2 border-brand-teal text-brand-teal hover:bg-brand-teal hover:text-white",
  };
  return (
    <button className={`px-8 py-4 rounded-xl font-bold uppercase text-[11px] tracking-widest transition-all active:scale-95 flex items-center justify-center gap-2 ${styles[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const ProductCard = ({ p }) => (
  <motion.div 
    layout 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-white rounded-[2rem] p-4 shadow-sm hover:shadow-2xl transition-all duration-500 border border-brand-teal/5 flex flex-col h-full"
  >
    <div className="aspect-[4/5] rounded-[1.5rem] bg-brand-cream overflow-hidden mb-5 relative group">
      <img src={p.img} alt={p.name} className="w-full h-full object-contain p-6 group-hover:scale-110 transition duration-700 mix-blend-multiply" />
      <div className="absolute top-4 left-4">
        <span className="bg-brand-rust text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">{p.tag}</span>
      </div>
    </div>
    
    <div className="px-2 pb-2 flex-grow">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-serif font-bold text-brand-teal leading-tight">{p.name}</h3>
        <span className="text-lg font-bold text-brand-rust">₹{p.price}</span>
      </div>
      <p className="text-sm text-brand-dark/60 mb-6 font-sans line-clamp-2">{p.desc}</p>
    </div>

    <div className="flex gap-2 mt-auto">
      <a href={p.amazon} target="_blank" rel="noopener noreferrer" className="flex-1">
        <button className="w-full py-3 rounded-lg bg-[#232F3E] text-white text-[10px] font-bold uppercase tracking-widest hover:opacity-90 transition shadow-md">
          Amazon
        </button>
      </a>
      <a href={p.flipkart} target="_blank" rel="noopener noreferrer" className="flex-1">
        <button className="w-full py-3 rounded-lg bg-[#2874F0] text-white text-[10px] font-bold uppercase tracking-widest hover:opacity-90 transition shadow-md">
          Flipkart
        </button>
      </a>
    </div>
  </motion.div>
);

// --- 3. PAGE COMPONENTS ---

const HomePage = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    
    {/* 1. HERO SECTION (TOP BANNER) */}
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-brand-teal/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none"/>

      {/* Hero Content */}
      <div className="flex-grow flex items-center pt-24 pb-8 px-6 md:px-12 relative z-10">
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Text */}
          <div className="order-2 lg:order-1">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-[2px] w-12 bg-brand-rust"></span>
              <span className="text-brand-rust font-bold text-xs uppercase tracking-[0.3em]">Pure • Honest • Indian</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-serif text-brand-teal leading-[0.95] mb-8 font-bold">
              Laadli <span className="text-brand-rust italic">Foods.</span> <br/>
              <span className="text-5xl md:text-7xl opacity-80">Taste of Home.</span>
            </h1>
            <p className="max-w-md text-lg text-brand-dark/70 mb-10 leading-relaxed font-sans">
              Premium Makhana, unpolished Daals, and authentic Spices. 
              No shortcuts, just pure nutrition for your family.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products"><Button variant="primary">Shop Now</Button></Link>
              <Link to="/distributor"><Button variant="outline">Partner With Us</Button></Link>
            </div>
            
            <div className="mt-12 flex gap-8">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-teal">
                <Award className="text-brand-rust" size={20}/> 100% Natural
              </div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-teal">
                <ShieldCheck className="text-brand-rust" size={20}/> FSSAI Certified
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="order-1 lg:order-2 relative h-full flex justify-center items-center">
            <div className="w-full max-w-md aspect-[4/5] rounded-t-[12rem] rounded-b-[2rem] bg-brand-teal overflow-hidden relative shadow-2xl border-4 border-white">
              <img 
                src="2.png" 
                alt="Laadli Foods Packaging" 
                className="w-full h-full object-contain p-15 opacity-90 hover:scale-105 transition duration-[2s]"
              />
              <div className="absolute bottom-5 left-0 right-0 text-center text-white">
                <p className="font-serif italic text-3xl">Laadli Foods</p>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em]">Premium Collection</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TICKER */}
      <div className="bg-brand-teal py-4 w-full relative z-20">
        <div className="flex justify-center gap-8 md:gap-16 text-white/90 text-xs font-bold uppercase tracking-widest flex-wrap px-4">
          <span className="flex items-center gap-2"><Truck size={16}/> Pan India Delivery</span>
          <span className="flex items-center gap-2"><Star size={16}/> Premium Quality</span>
          <span className="flex items-center gap-2"><Leaf size={16}/> Farm Fresh Sourcing</span>
        </div>
      </div>

    </div>

    {/* ---------------------------------------------------- */}
    {/* 2. EMOTIONAL SECTION (YE NAYA ADD KIYA HAI YAHAN)    */}
    {/* ---------------------------------------------------- */}
    <EmotionalSection />

    {/* 3. FEATURED PRODUCTS (BESTSELLERS) */}
    <Section className="bg-white">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-serif text-brand-teal mb-4 font-bold">Our Bestsellers</h2>
        <p className="text-brand-dark/60">Loved by thousands of Indian households.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {PRODUCTS.slice(0, 3).map(p => <ProductCard key={p.id} p={p} />)}
      </div>
      <div className="text-center mt-12">
        <Link to="/products"><Button variant="secondary">View All Products</Button></Link>
      </div>
    </Section>
  </motion.div>
);
const AboutPage = () => (
  <Section className="pt-32 min-h-screen">
    <div className="max-w-4xl mx-auto">
      <h2 className="text-6xl font-serif text-brand-teal mb-8">Our Story</h2>
      <p className="text-2xl text-brand-rust italic mb-12">"Laadli Foods isn't just a brand; it's a promise to return to the roots of Indian nutrition."</p>
      
      <div className="grid md:grid-cols-2 gap-12 mb-20">
        <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-brand-teal/10">
          <h3 className="text-2xl font-serif font-bold text-brand-teal mb-4">The Beginning</h3>
          <p className="text-brand-dark/70 leading-relaxed">
            We noticed that the market was flooded with polished dals and processed snacks. We wanted to bring back the food our grandmothers approved of. 
            That's how <strong>Laadli Foods</strong> was born—starting with premium Makhana and expanding to essential staples.
          </p>
        </div>
        <div className="bg-brand-teal text-white p-10 rounded-[2rem] shadow-xl">
          <h3 className="text-2xl font-serif font-bold mb-4">Our Mission</h3>
          <p className="opacity-90 leading-relaxed">
            To provide every Indian household with unadulterated, farm-fresh produce. We source directly from farmers to ensure fair trade and unmatched quality.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div className="p-6 bg-brand-cream rounded-2xl border border-brand-teal/10">
          <h4 className="text-3xl font-bold text-brand-rust mb-2">10+</h4>
          <p className="text-xs uppercase font-bold tracking-widest text-brand-teal">Varieties</p>
        </div>
        <div className="p-6 bg-brand-cream rounded-2xl border border-brand-teal/10">
          <h4 className="text-3xl font-bold text-brand-rust mb-2">100%</h4>
          <p className="text-xs uppercase font-bold tracking-widest text-brand-teal">Natural</p>
        </div>
        <div className="p-6 bg-brand-cream rounded-2xl border border-brand-teal/10">
          <h4 className="text-3xl font-bold text-brand-rust mb-2">500+</h4>
          <p className="text-xs uppercase font-bold tracking-widest text-brand-teal">Retailers</p>
        </div>
        <div className="p-6 bg-brand-cream rounded-2xl border border-brand-teal/10">
          <h4 className="text-3xl font-bold text-brand-rust mb-2">24h</h4>
          <p className="text-xs uppercase font-bold tracking-widest text-brand-teal">Dispatch</p>
        </div>
      </div>
    </div>
  </Section>
);

const DistributorPage = () => {
  // 1. FORM STATE BANANA
  const [formData, setFormData] = useState({
    ownerName: '',
    businessName: '',
    mobile: '',
    city: '',
    details: ''
  });

  // 2. INPUT HANDLE KARNA
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // 3. SUBMIT KARNE PAR WHATSAPP KHOLNA
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // --- SETTINGS: Apna Number Yahan Daalein ---
    const myNumber = "919219611054"; 

    // Message Design Karna
    const message = `*🔔 New Distributor Inquiry*\n\n` +
      `*👤 Name:* ${formData.ownerName}\n` +
      `*🏢 Business:* ${formData.businessName}\n` +
      `*📞 Mobile:* ${formData.mobile}\n` +
      `*📍 City:* ${formData.city}\n` +
      `*📝 Details:* ${formData.details}`;

    // URL Encode karke WhatsApp kholna
    const url = `https://wa.me/${myNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <Section className="pt-32 min-h-screen">
      <div className="grid lg:grid-cols-2 gap-16 items-start">
        {/* LEFT SIDE TEXT (SAME AS BEFORE) */}
        <div>
          <span className="text-brand-rust font-bold text-xs uppercase tracking-[0.3em] mb-4 block">B2B Opportunities</span>
          <h2 className="text-5xl font-serif text-brand-teal mb-6 font-bold">Partner with <br/> Laadli Foods.</h2>
          <p className="text-lg text-brand-dark/70 mb-10 leading-relaxed">
            Join our growing network of distributors and retailers. We offer competitive margins, marketing support, and consistent supply of premium FMCG products.
          </p>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-brand-teal flex items-center justify-center text-white shrink-0"><Truck size={20}/></div>
              <div>
                <h4 className="font-bold text-brand-teal">Pan-India Logistics</h4>
                <p className="text-sm text-brand-dark/60">Reliable shipping to any pincode in India.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-brand-rust flex items-center justify-center text-white shrink-0"><Award size={20}/></div>
              <div>
                <h4 className="font-bold text-brand-teal">High Margins</h4>
                <p className="text-sm text-brand-dark/60">Best-in-class ROI for our partners.</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE FORM (UPDATED) */}
        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-brand-teal/5">
          <form onSubmit={handleSubmit} className="space-y-6">
            <h3 className="text-2xl font-serif font-bold text-brand-teal mb-2">Distributor Application</h3>
            <p className="text-sm text-brand-dark/50 mb-6">Fill in your details, and we will receive it directly on WhatsApp.</p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <input 
                name="ownerName"
                value={formData.ownerName}
                onChange={handleChange}
                required 
                type="text" 
                placeholder="Owner Name" 
                className="w-full p-4 rounded-xl bg-brand-cream border border-brand-teal/10 outline-none focus:border-brand-teal transition" 
              />
              <input 
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                required 
                type="text" 
                placeholder="Business Name" 
                className="w-full p-4 rounded-xl bg-brand-cream border border-brand-teal/10 outline-none focus:border-brand-teal transition" 
              />
            </div>

            <input 
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              required 
              type="tel" 
              placeholder="Mobile Number" 
              className="w-full p-4 rounded-xl bg-brand-cream border border-brand-teal/10 outline-none focus:border-brand-teal transition" 
            />

            <input 
              name="city"
              value={formData.city}
              onChange={handleChange}
              required 
              type="text" 
              placeholder="City & State" 
              className="w-full p-4 rounded-xl bg-brand-cream border border-brand-teal/10 outline-none focus:border-brand-teal transition" 
            />

            <textarea 
              name="details"
              value={formData.details}
              onChange={handleChange}
              rows="3" 
              placeholder="Current Business Details (e.g. Wholesaler, Retailer)" 
              className="w-full p-4 rounded-xl bg-brand-cream border border-brand-teal/10 outline-none focus:border-brand-teal transition"
            ></textarea>
            
            <Button type="submit" className="w-full bg-[#25D366] hover:bg-[#128C7E] flex items-center justify-center gap-2">
              <MessageCircle size={20} /> Send via WhatsApp
            </Button>
          </form>
        </div>
      </div>
    </Section>
  );
};

const ContactPage = () => {
  // --- SETTINGS: APNA NUMBER YAHAN DALNA ---
  const phoneNumber = "919219611054"; // 91 ke baad apna number likho bina space ke
  const message = "Hello Laadli Foods! I have a query regarding your products."; // Customer ka message
  
  // WhatsApp Link Generate karna
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <Section className="pt-32 min-h-screen">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-serif text-brand-teal mb-4 font-bold">Contact Us</h2>
        <p className="text-brand-dark/60">We'd love to hear from you.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-20">
        <div className="bg-white p-8 rounded-3xl text-center shadow-sm hover:shadow-lg transition">
          <div className="w-16 h-16 bg-brand-cream text-brand-teal rounded-full flex items-center justify-center mx-auto mb-6"><Phone size={24}/></div>
          <h3 className="font-bold text-lg mb-2">Call Us</h3>
          <p className="text-brand-dark/60">+91 98765 43210</p>
          <p className="text-xs text-brand-rust mt-2 font-bold uppercase">Mon-Sat (9am - 6pm)</p>
        </div>
        <div className="bg-white p-8 rounded-3xl text-center shadow-sm hover:shadow-lg transition">
          <div className="w-16 h-16 bg-brand-cream text-brand-teal rounded-full flex items-center justify-center mx-auto mb-6"><Mail size={24}/></div>
          <h3 className="font-bold text-lg mb-2">Email Us</h3>
          <p className="text-brand-dark/60">sales@laadlifoods.com</p>
          <p className="text-xs text-brand-rust mt-2 font-bold uppercase">For Orders & Support</p>
        </div>
        <div className="bg-white p-8 rounded-3xl text-center shadow-sm hover:shadow-lg transition">
          <div className="w-16 h-16 bg-brand-cream text-brand-teal rounded-full flex items-center justify-center mx-auto mb-6"><MapPin size={24}/></div>
          <h3 className="font-bold text-lg mb-2">Headquarters</h3>
          <p className="text-brand-dark/60">Mumbai, Maharashtra</p>
          <p className="text-xs text-brand-rust mt-2 font-bold uppercase">India</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto bg-brand-teal text-white p-10 md:p-16 rounded-[3rem] text-center">
        <h3 className="text-3xl font-serif mb-6 font-bold">Quick Chat?</h3>
        <p className="opacity-80 mb-10">
          Have a quick question about our products or your order status? 
          Chat with our support team on WhatsApp.
        </p>
        
        {/* WORKING WHATSAPP BUTTON */}
        <a 
          href={whatsappURL}
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-white text-brand-teal px-10 py-4 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-brand-rust hover:text-white transition inline-flex items-center gap-3 mx-auto"
        >
          <MessageCircle size={20}/> Open WhatsApp
        </a>

      </div>
    </Section>
  );
};

const ProductsPage = () => {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? PRODUCTS : PRODUCTS.filter(p => p.cat === active);

  return (
    <Section className="pt-32 min-h-screen">
      <div className="mb-12">
        <h2 className="text-5xl font-serif text-brand-teal mb-8 font-bold">All Products</h2>
        <div className="flex flex-wrap gap-3">
          {["All", "Makhana", "Flavoured", "Staples", "Spices"].map(cat => (
            <button 
              key={cat} 
              onClick={() => setActive(cat)}
              className={`px-6 py-3 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all
                ${active === cat ? 'bg-brand-rust text-white shadow-lg' : 'bg-white text-brand-dark border border-brand-teal/10 hover:border-brand-teal'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      
      {filtered.length > 0 ? (
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filtered.map(p => <ProductCard key={p.id} p={p} />)}
        </div>
      ) : (
        <div className="text-center py-20 opacity-50">
          <p>No products found in this category coming soon.</p>
        </div>
      )}
    </Section>
  );
};

// --- 4. MAIN LAYOUT & NAVIGATION ---

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <BrowserRouter>
      <ScrollToTop />
      
      {/* HEADER */}
      <nav className="fixed w-full h-24 z-50 glass-nav flex items-center px-6 md:px-12 justify-between">
        <Link to="/" className="text-3xl font-serif font-bold text-brand-teal tracking-tight">
          Laadli <span className="text-brand-rust">Foods.</span>
        </Link>
        
        {/* Desktop Nav - Cleaned up Redundancy */}
        <div className="hidden lg:flex gap-10 text-[11px] font-bold uppercase tracking-[0.2em] text-brand-dark/80">
          <Link to="/" className="hover:text-brand-rust transition">Home</Link>
          <Link to="/about" className="hover:text-brand-rust transition">Our Story</Link>
          <Link to="/products" className="hover:text-brand-rust transition">Shop</Link>
          <Link to="/contact" className="hover:text-brand-rust transition">Contact</Link>
        </div>

        <div className="flex gap-4 items-center">
           {/* 'B2B Partner' Button handles the Distributor Link visually */}
           <Link to="/distributor" className="hidden md:block">
             <button className="px-6 py-3 rounded-lg bg-brand-teal/10 text-brand-teal text-[10px] font-bold uppercase tracking-widest hover:bg-brand-teal hover:text-white transition">
               B2B Partner
             </button>
           </Link>
           <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden text-brand-teal p-2">
             <Menu size={28}/>
           </button>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }} 
            animate={{ x: 0 }} 
            exit={{ x: '100%' }} 
            className="fixed inset-0 z-[60] bg-brand-teal text-white flex flex-col p-10"
          >
            <div className="flex justify-between items-center mb-16">
              <span className="text-2xl font-serif font-bold">Laadli Foods.</span>
              <button onClick={() => setIsMobileMenuOpen(false)}><X size={32}/></button>
            </div>
            
            <div className="flex flex-col gap-8 text-3xl font-serif font-bold" onClick={() => setIsMobileMenuOpen(false)}>
              <Link to="/">Home</Link>
              <Link to="/about">Our Story</Link>
              <Link to="/products">All Products</Link>
              <Link to="/distributor">Distributor / B2B</Link>
              <Link to="/contact">Contact Us</Link>
            </div>
            
            <div className="mt-auto pt-8 border-t border-white/20">
               <p className="text-xs opacity-60 uppercase tracking-widest mb-4">Follow Us</p>
               <div className="flex gap-6">
                 <Instagram size={24}/> <Facebook size={24}/>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ROUTES */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/distributor" element={<DistributorPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>

      {/* FOOTER */}
      <footer className="bg-brand-dark text-brand-cream py-20 px-6 md:px-12 mt-auto">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 border-b border-white/10 pb-12 mb-12">
          <div className="md:col-span-2">
            <h2 className="text-4xl font-serif font-bold mb-6">Laadli <span className="text-brand-rust">Foods.</span></h2>
            <p className="opacity-60 max-w-sm font-sans leading-relaxed">
              Reinventing Indian superfoods. We promise zero preservatives, no palm oil, and absolute transparency. From our farms to your family.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-brand-rust mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm opacity-80 font-sans">
              <li><Link to="/" className="hover:text-brand-rust transition">Home</Link></li>
              <li><Link to="/products" className="hover:text-brand-rust transition">Shop Collection</Link></li>
              <li><Link to="/distributor" className="hover:text-brand-rust transition">Become Distributor</Link></li>
              <li><Link to="/contact" className="hover:text-brand-rust transition">Support</Link></li>
            </ul>
          </div>
          <div>
             <h4 className="text-xs font-bold uppercase tracking-widest text-brand-rust mb-6">Contact</h4>
             <p className="text-sm opacity-80 mb-2">sales@laadlifoods.com</p>
             <p className="text-sm opacity-80 mb-6">+91 98765 43210</p>
             <div className="flex gap-4">
               <Instagram className="opacity-60 hover:opacity-100 cursor-pointer transition"/>
               <Facebook className="opacity-60 hover:opacity-100 cursor-pointer transition"/>
             </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between opacity-40 text-xs font-sans">
          <p>© 2026 Laadli Foods Private Limited.</p>
          <p>Made with honest ingredients.</p>
        </div>
      </footer>
    </BrowserRouter>
  );
}