import { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingCart, Package } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';
import { useCart } from '@/context/CartContext';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API}/products`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  const getCategoryLabel = (category) => {
    const labels = {
      chess_board: 'Chess Boards',
      chess_clock: 'Chess Clocks',
      merchandise: 'Merchandise',
      lesson_package: 'Lesson Packages',
    };
    return labels[category] || category;
  };

  const categories = ['all', ...new Set(products.map(p => p.category))];
  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <ShoppingCart className="h-16 w-16 mx-auto mb-4" />
            <h1 className="text-5xl font-bold mb-4" data-testid="shop-title">Kashoe Chess Shop</h1>
            <p className="text-xl text-orange-100">
              Quality chess equipment, club merchandise, and lesson packages
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="all" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="inline-flex" data-testid="category-tabs">
                <TabsTrigger value="all" onClick={() => setActiveCategory('all')}>All</TabsTrigger>
                <TabsTrigger value="chess_board" onClick={() => setActiveCategory('chess_board')}>Chess Boards</TabsTrigger>
                <TabsTrigger value="chess_clock" onClick={() => setActiveCategory('chess_clock')}>Chess Clocks</TabsTrigger>
                <TabsTrigger value="merchandise" onClick={() => setActiveCategory('merchandise')}>Merchandise</TabsTrigger>
                <TabsTrigger value="lesson_package" onClick={() => setActiveCategory('lesson_package')}>Lessons</TabsTrigger>
              </TabsList>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-500">Loading products...</p>
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="card-hover flex flex-col" data-testid={`product-card-${product.id}`}>
                    {product.image_url ? (
                      <img 
                        src={product.image_url} 
                        alt={product.name}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gradient-to-br from-purple-100 to-orange-100 rounded-t-lg flex items-center justify-center">
                        <Package className="h-16 w-16 text-purple-400" />
                      </div>
                    )}
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg">{product.name}</CardTitle>
                        <Badge variant="secondary">{getCategoryLabel(product.category)}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-purple-600">KSh {product.price.toFixed(2)}</span>
                        {product.stock > 0 ? (
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            In Stock ({product.stock})
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-red-600 border-red-600">
                            Out of Stock
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full btn-primary text-white"
                        onClick={() => handleAddToCart(product)}
                        disabled={product.stock === 0}
                        data-testid={`add-to-cart-${product.id}`}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Package className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500 text-lg">No products available in this category.</p>
              </div>
            )}
          </Tabs>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Shopping Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-semibold text-lg mb-2">Secure Payment</h3>
                <p className="text-gray-600 text-sm">Pay securely with M-Pesa</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-semibold text-lg mb-2">Quality Guarantee</h3>
                <p className="text-gray-600 text-sm">Authentic chess equipment</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-semibold text-lg mb-2">Nairobi Delivery</h3>
                <p className="text-gray-600 text-sm">Fast delivery in Nairobi</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Shop;