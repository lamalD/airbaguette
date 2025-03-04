'use client'

import convertToSubcurrency from '@/lib/convertToSubcurrency'
import { Elements, useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import GlobalApi from '@/app/_utils/GlobalApi'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import CheckOut from '@/app/_components/CheckOut'


if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error('Stripe public key is not defined')
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)

function Checkout() {

  const router = useRouter()
  
  // const user = JSON.parse(sessionStorage.getItem('user'))
  // const jwt = sessionStorage.getItem('jwt')

  const [user, setUser ] = useState(null);
  const [jwt, setJwt] = useState(null)

  const [totalCartItem, setTotalCartItem] = useState(0)
  const [cartItemList, setCartItemList] = useState([])
  const [subtotal, setSubtotal] = useState(0)

  const [error, setError] = useState()
  const [clientSecret, setClientSecret] = useState('')
  const [loading, setLoading] = useState(false)

  const [username, setUsername] = useState()
  const [email, setEmail] = useState()
  const [phone, setPhone] = useState()
  const [zip, setZip] = useState()
  const [address, setAddress] = useState()

  console.log('checkout page loaded')

  useEffect(() => {
    if (typeof window !== 'undefined') {
        const storedUser  = JSON.parse(sessionStorage.getItem('user'));
        const storedJwt = sessionStorage.getItem('jwt');
        setUser (storedUser );
        setJwt(storedJwt);
    }
  }, [])

  useEffect (() => {

    if (!jwt) {
      router.push('/sign-in')
    }
    getCartItems()
  }, [])

  const getCartItems = async () => {
  
    console.log(`getCartItems triggert for user ${user.username} with documentId ${user.documentId}`)

      const cartItemList_ = await GlobalApi.getCartItems(user.documentId, jwt)
      
      setTotalCartItem(cartItemList_?.length)
      setCartItemList(cartItemList_)
  }

  useEffect (() => {

    let total = 0
    cartItemList.forEach(element => {
      
        total = total + element.amount
    });

    setSubtotal(total)

  }, [cartItemList])

  useEffect(() => {

    if (subtotal > 0) {

      console.log('subtotal = ', subtotal)
      
      handlePayment(subtotal)
  
    }

}, [subtotal])

const handlePayment = (subtotal) => {
    console.log("amount: ", convertToSubcurrency(subtotal))

    fetch('/api/create-intent', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: convertToSubcurrency(subtotal) }),
    })
    .then((res) => res.json())
    .then((data) => setClientSecret(data.clientSecret))   
}


  return (
    <div className=''>
      <h2 className='p-3 bg-primary text-xl font-bold text-center text-white'>Checkout</h2>
      <div className='p-5 px-5 md:px-10 py-8'>
        {subtotal>0&& 
          <Elements 
            stripe={stripePromise}
            options = {{
              mode: 'payment',
              amount: convertToSubcurrency(subtotal),
              currency: 'eur',
            }}
          >

          <CheckOut />
          {/* <div className='flex flex-col items-center justify-center gap-4 w-full'>
            <div className='flex mx-10 border'>
                <h2 className='p-3 bg-gray-200 font-bold text-center'>Total Cart ({totalCartItem})</h2>
                <div className='p-4 flex flex-col gap-4'>
                    <h2 className='font-bold flex justify-between'>Subtotal : <span>€ {subtotal.toFixed(2)}</span></h2>
                    <hr />
                    <h2 className='flex justify-between'>Delivery : <span>€ 0</span></h2>
                    <h2 className='flex justify-between'>Total : <span>€ {(subtotal).toFixed(2)}</span></h2>
                </div>
            </div>
            <div className='flex-1'>
                {clientSecret&& <PaymentElement />}
            </div>
                <Button className=''>Payment</Button>
          </div>   */}
          </Elements>}
      </div>
    </div>
  )
}

export default Checkout