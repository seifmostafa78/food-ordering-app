import CartItems from "./_components/CartItems";
import CheckoutForm from "./_components/CheckoutForm";

function CartPage() {
  return (
    <main>
      <section className="section-gap">
        <div className="container">
          <h1 className="text-primary font-bold text-4xl italic text-center mb-6">Cart</h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <CartItems />
            <CheckoutForm />
          </div>
        </div>
      </section>
    </main>
  );
}

export default CartPage;
