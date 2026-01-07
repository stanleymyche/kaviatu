import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCart } from '@/context/CartContext';
import axios from 'axios';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const CheckoutDialog = ({ open, onOpenChange }) => {
  const { cart, getCartTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create order
      const orderData = {
        ...formData,
        items: cart.map(item => ({
          product_id: item.id,
          product_name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        total_amount: getCartTotal(),
      };

      const response = await axios.post(`${API}/orders`, orderData);
      
      // In production, this would initiate M-Pesa STK push
      // For now, we'll just show success message
      toast.success('Order placed successfully! You will receive M-Pesa payment prompt shortly.');
      
      clearCart();
      onOpenChange(false);
      setFormData({
        customer_name: '',
        customer_email: '',
        customer_phone: '',
      });
    } catch (error) {
      console.error('Order error:', error);
      toast.error('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Checkout</DialogTitle>
          <DialogDescription>
            Complete your order. You'll receive an M-Pesa payment prompt on your phone.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="customer_name">Full Name</Label>
            <Input
              id="customer_name"
              name="customer_name"
              value={formData.customer_name}
              onChange={handleInputChange}
              required
              data-testid="checkout-name-input"
            />
          </div>
          
          <div>
            <Label htmlFor="customer_email">Email</Label>
            <Input
              id="customer_email"
              name="customer_email"
              type="email"
              value={formData.customer_email}
              onChange={handleInputChange}
              required
              data-testid="checkout-email-input"
            />
          </div>
          
          <div>
            <Label htmlFor="customer_phone">Phone Number (M-Pesa)</Label>
            <Input
              id="customer_phone"
              name="customer_phone"
              type="tel"
              placeholder="254XXXXXXXXX"
              value={formData.customer_phone}
              onChange={handleInputChange}
              required
              data-testid="checkout-phone-input"
            />
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Total Amount:</span>
              <span className="text-xl font-bold text-purple-600">
                KSh {getCartTotal().toFixed(2)}
              </span>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600"
            disabled={loading}
            data-testid="place-order-button"
          >
            {loading ? 'Processing...' : 'Place Order & Pay'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutDialog;