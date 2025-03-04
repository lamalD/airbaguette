'use client'

import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import React, { Suspense, useContext, useEffect, useState } from 'react'

import { format, parse } from 'date-fns'
import GlobalApi from '@/app/_utils/GlobalApi'
import { toast } from 'sonner'
import { UpdateCartContext } from '@/app/_context/UpdateCartContext'


function SuccessPage() {

  const router = useRouter()

  // const isLoggedIn = sessionStorage.getItem('jwt') ? true : false
  // const user = JSON.parse(sessionStorage.getItem('user'))
  // const jwt = sessionStorage.getItem('jwt')

  const [isLoggedIn, setIsLoggedIn] = useState(null)
  const [user, setUser ] = useState(null)
  const [jwt, setJwt] = useState(null)

  const {updateCart, setUpdateCart} = useContext(UpdateCartContext)

  const searchParams = useSearchParams()

  const amount = searchParams.get('amount')
  const paymentId = searchParams.get('payment_intent')
  const firstName = searchParams.get('fn')
  const lastName = searchParams.get('ln')
  const email = searchParams.get('em')
  const phone = searchParams.get('pn')
  const date = searchParams.get('dd')
  // const docId = searchParams.get('id')

  useEffect(() => {
    if (typeof window !== 'undefined') {
        const storedUser  = JSON.parse(sessionStorage.getItem('user'));
        const storedJwt = sessionStorage.getItem('jwt');
        setUser (storedUser );
        setJwt(storedJwt);
    }
  }, [])

  useEffect (() => {
    const storedJwt = sessionStorage.getItem('jwt')
      if (storedJwt) {
        router.push('/sign-in')
      }

      completeOrder()
  }, [])

  // Decode the URL-encoded string
  const decodedString = decodeURIComponent(date); 

  // Parse the decoded string to a Date object
  const dateObject = new Date(decodedString);

  // Format the date to dd/MM/yyyy
  const deliveryDate = format(dateObject, 'yyyy-MM-dd');

  console.log('DD: ', deliveryDate)

  const completeOrder = async () => {
    const storedUser  = JSON.parse(sessionStorage.getItem('user'))
    const storedJwt = sessionStorage.getItem('jwt')
    if (!storedJwt) {
      router.push('/sign-in')
    } else {

        const payload = {
            data : {
              totalOrderAmount: amount,
              userId: storedUser.id,
              username: storedUser.username,
              firstName: firstName,
              lastName: lastName,
              email: email,
              phone: phone,
              paymentId: paymentId,
              paymentDone: true,
              deliveryDate: deliveryDate,
              // orderItemList: cartItemList.map(item => ({
              //     product: item.product,
              //     amount: item.amount,
              //     quantity: item.quantity
              // }))
            }
        }

        try {
          // Get Order ID
          const orderResponse = await GlobalApi.getOrderId(storedUser.id, storedJwt);
          const documentId = orderResponse.data.data[0].documentId;
          console.log(documentId);
  
          // Update Order
          const updateResponse = await GlobalApi.updateOrder(documentId, payload, storedJwt);
          console.log('handleCheckout resp: ', updateResponse.data.data);
          toast.success('Order placed confirmed');
  
          // Optionally handle payment here
          // const orderId = updateResponse.data.data.documentId;
          // handlePayment(orderId);
  
          // Get Cart IDs
          const cartIdArrayResponse = await GlobalApi.getCartId(storedUser.id, storedJwt).then( resp => {
            return resp.data.data
          });
          console.log('getCartId: ', cartIdArrayResponse);

          if (cartIdArrayResponse.length > 0) {

            // Extract documentIds from the cartIdArrayResponse
            const documentIds = cartIdArrayResponse.map(item => item.documentId);
            console.log('Document IDs to delete: ', documentIds);
  
            // Delete Shopping Cart items by documentId
            for (const docId of documentIds) {
                await GlobalApi.deleteShoppingCart(docId, storedJwt);
                console.log(`Deleted item with documentId: ${docId}`);
            }
  
            // Update cart state
            setUpdateCart(!updateCart);
            
          }

          // router.push('/')
      } catch (error) {
          console.error('Error during order completion:', error);
          toast.error('An error occurred while completing the order');
      }
    }
  }
  return (
    <main className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-blue-500">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold mb-2">Order successfully placed!</h1>
        <h2 className="text-2xl">Payment received</h2>

        <div className="bg-white p-2 rounded-md text-blue-500 mt-5 text-4xl font-bold">
          € {amount}
        </div>
      </div>
    </main>
  )
}


// export default SuccessPage

// Wrap the SuccessPage component in a Susp ense boundary

export default function WrappedSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessPage />
    </Suspense>
  );
}