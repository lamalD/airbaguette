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

  console.log('checkout page loaded after first useEffect')

  useEffect (() => {
    const storedJwt = sessionStorage.getItem('jwt');
    if (!storedJwt) {
      router.push('/sign-in')
    }
    getCartItems()
  }, [])

  const getCartItems = async () => {
  
    const storedUser  = JSON.parse(sessionStorage.getItem('user'));
    const storedJwt = sessionStorage.getItem('jwt');
    console.log(`getCartItems triggert for user ${storedUser.username} with id ${storedUser.id}`)

    if (storedUser != null) {

      const cartItemList_ = await GlobalApi.getCartItems(storedUser.id, storedJwt)
      
      setTotalCartItem(cartItemList_?.length)
      setCartItemList(cartItemList_)
    }
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
          </Elements>}
      </div>
    </div>
  )
}

export default Checkout