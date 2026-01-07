import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '@/App.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Events from '@/pages/Events';
import Shop from '@/pages/Shop';
import Lessons from '@/pages/Lessons';
import Contact from '@/pages/Contact';
import { Toaster } from '@/components/ui/sonner';
import { CartProvider } from '@/context/CartContext';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div className="App min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/events" element={<Events />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/lessons" element={<Lessons />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
          <Toaster />
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;