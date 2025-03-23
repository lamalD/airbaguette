'use client'

import { useEffect, useState } from 'react'
import { addDays, format, isAfter, isBefore, isSameDay } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
 
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button'
import { Separator } from "@/components/ui/separator"

import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'
import convertToSubcurrency from '@/lib/convertToSubcurrency'
import GlobalApi from '../_utils/GlobalApi'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'

function CheckOut() {

    const stripe = useStripe();
    const elements = useElements();

    const router = useRouter()
      
    // const user = JSON.parse(sessionStorage.getItem('user'))
    // const jwt = sessionStorage.getItem('jwt')

    const [user, setUser ] = useState(null)
    const [jwt, setJwt] = useState(null)

    const [errorMessage, setErrorMessage] = useState();
    const [clientSecret, setClientSecret] = useState("");
    const [loading, setLoading] = useState(false);

    const [totalCartItem, setTotalCartItem] = useState(0)
    const [cartItemList, setCartItemList] = useState([])
    const [subtotal, setSubtotal] = useState(0)

    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [email, setEmail] = useState()
    const [phone, setPhone] = useState()

    const [date, setDate] = useState()
    const [isOpen, setIsOpen] = useState(false)
    const startDate = new Date()
    const endDate = addDays(new Date(), 7)

    // Set the cutoff time to 08:50 GMT+1 today
    const setCutoffTime = () => {
        const today = new Date();
        today.setHours(9, 0, 0, 0); // Set to 08:50:00
        // Adjust for GMT+1
        today.setMinutes(today.getMinutes() + today.getTimezoneOffset() + 60);
        return today;
    }

    const isDateSelectable = (selectedDate) => {
        // const today = new Date()
        // startDate.setHours(8, 50, 0, 0)
        // console.log('startDate = ', startDate)
        // return !isBefore(date, startDate) && !isAfter(date, endDate)
        const cutoffTime = setCutoffTime();
        console.log('Cutoff time = ', cutoffTime);

        // Convert selectedDate to a Date object
        const selectedDateTime = new Date(selectedDate);
        console.log('Selected date time = ', selectedDateTime);

        // Get today's date without time for comparison
        const today = new Date();
        // today.setHours(0, 0, 0, 0); // Set time to midnight
        console.log('today: ', today)

        // Check if the selected date is today
        if (selectedDateTime.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0)) {
            console.log('today, still ok for cutt off')
            // Check if the selected date is before the cutoff time
            // if (isBefore(selectedDateTime, cutoffTime)) {
                if (selectedDateTime < cutoffTime) {
                    console.log('selectedDateTime < cutt off')
                return false; // Selectable if before cutoff
            }

            // if (isAfter(selectedDateTime, cutoffTime)) {
                if (selectedDateTime > cutoffTime) {
                    console.log('selectedDateTime > cutt off')
                return true; // Not selectable if after cutoff
            }
        }

        // If the selected date is in the future (after today)
        if (selectedDateTime > today) {
            console.log('selectedDateTime > today')
            return true; // Selectable if after today
        }

        // If the selected date is in the past (before today)
        if (selectedDateTime < today) {
            console.log('selectedDateTime < today')
            return false; // Not selectable if before today
        }

        // Check if the selected date is before the cutoff time
        // if (isBefore(selectedDateTime, cutoffTime)) {
        //     return true; // Selectable if before cutoff
        // }

        // if (isAfter(selectedDateTime, cutoffTime)) {
        //     return false; // Not selectable if after cutoff
        // }

        // Allow selection if the date is within the next 7 days
        // return !isAfter(selectedDateTime, endDate);
    }

    const handleDateSelect = (selectedDate) => {

        const now = new Date();
        const selectedDateTime = new Date(selectedDate);
        selectedDateTime.setHours(now.getHours(), now.getMinutes(), now.getSeconds());
        console.log('sDT: ', selectedDateTime)

        if (isDateSelectable(selectedDateTime)) {
            setDate(selectedDateTime)
            console.log("Selected date:", selectedDateTime)
            setIsOpen(false)
        } else {
            console.log('Selected date is out of range')
            console.log("Selected date:", selectedDateTime)
            toast.error('Datum niet meer beschikbaar voor bestelling!')
        }
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedUser  = JSON.parse(sessionStorage.getItem('user'));
            const storedJwt = sessionStorage.getItem('jwt');
            setUser (storedUser );
            setJwt(storedJwt);
        }
    }, [])

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
            
            console.log('CartItemList: ', cartItemList_)
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

    const updateOrder = async (deliveryDate) => {
        const storedUser  = JSON.parse(sessionStorage.getItem('user'))
        const storedJwt = sessionStorage.getItem('jwt')

        console.log('updateOrder triggert with DD: ', deliveryDate)
        // if (!storedJwt) {
        //   router.push('/sign-in')
        // } else {
    
            const payload = {
                data : {
                //   totalOrderAmount: amount,
                //   userId: storedUser.id,
                //   username: storedUser.username,
                  firstName: firstName,
                  lastName: lastName,
                  email: email,
                  phone: phone,
                //   paymentId: paymentId,
                //   paymentDone: true,
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
            //   toast.success('Bestelling geplaatst');
    
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

    const handleSubmit = async (event) => {

        event.preventDefault()
        setLoading(true)
      
        if (!stripe || !elements) {
          return;
        }
      
        const { error: submitError } = await elements.submit();
    
        if (submitError) {
        setErrorMessage(submitError.message);
        setLoading(false);
        return;
        }
    
        const formattedDate = date ? format(date, "yyyy-MM-dd") : ""

        await updateOrder(formattedDate)

        const { error } = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams: {
                return_url: `https://www.airbaguette.be/payment-success?amount=${subtotal}&fn=${firstName}&ln=${lastName}&em=${email}&pn=${phone}&dd=${formattedDate}&id=${cartItemList.documentId}`,
            },
        })
    
        if (error) {
        // This point is only reached if there's an immediate error when
        // confirming the payment. Show the error to your customer (for example, payment details incomplete)
        setErrorMessage(error.message);
        } else {
        // The payment UI automatically closes with a success animation.
        // Your customer is redirected to your `return_url`.
                    
        }
    
        setLoading(false);
    }

    if (!clientSecret || !stripe || !elements) {
        return (
          <div className="flex items-center justify-center">
            <div
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
          </div>
        );
      }

  return (
    <div className='flex flex-col 
                    md:flex-row md:items-start md:justify-between md:space-x-10 md:gap-4 md:mx-10'>
            <div className='flex-1 flex-col items-center justify-between w-full h-full rounded-md '>
                <div className='flex-1 bg-gray-200'>
                    <h2 className='p-3 bg-gray-200 font-bold text-left'>Totale Bestelling ({totalCartItem})</h2>
                    {cartItemList && 
                        <ul className='p-3'>
                            {cartItemList.map(item => (
                                    <li key={item.id} className='flex items-center mb-2'>
                                        <div className='flex flex-row justify-between w-full'>
                                            <p className='text-black text-xs md:text-lg'>{item.quantity} x {item.name}</p>
                                            <p className='text-black text-xs md:text-lg'>€ {(item.amount).toFixed(2)}</p>
                                        </div>
                                    </li>
                                )
                            )}
                        </ul>
                    }
                </div>
                <div className='p-4 flex-1 flex-col gap-4 space-y-1 md:space-y-2'>
                    <h2 className='font-bold flex justify-between text-xs md:text-xl'>Subtotaal <span>€ {subtotal.toFixed(2)}</span></h2>
                    <hr />
                    <h2 className='flex justify-between text-green-800 font-medium text-xs md:text-xl'>Levering <span>GRATIS</span></h2>
                    <h2 className='font-bold flex justify-between text-xs md:text-xl'>Totaal <span>€ {(subtotal).toFixed(2)}</span></h2>
                </div>
            </div>
            <form onSubmit={handleSubmit} className='flex bg-slate-100 p-4 rounded-md'>
                <div className='flex-1 flex-col items-center justify-center'>
                    <div className='flex flex-col items-center justify-between mb-10 space-y-2'>
                        <div className='flex flex-col gap-2 mb-2'>
                            <h2 className='text-left font-bold'>Datum voor levering</h2>
                            <Popover className='' open={isOpen} onOpenChange={setIsOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-[300px] justify-start text-left font-normal",
                                        !date && "text-muted-foreground"
                                    )}
                                    onClick={() => setIsOpen(true)}
                                    >
                                    <CalendarIcon />
                                    {date ? format(date, "dd/MM/yyyy") : <span>Selecteer een datum</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
                                    <Select
                                        onValueChange={(value) =>
                                            // setDate(addDays(new Date(), parseInt(value)))
                                            handleDateSelect(addDays(new Date(), parseInt(value)))
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent position="popper">
                                            <SelectItem value="1">Morgen</SelectItem>
                                            <SelectItem value="2">Overmorgen</SelectItem>
                                            {/* <SelectItem value="3">In 3 days</SelectItem> */}
                                            {/* <SelectItem value="7">In a week</SelectItem> */}
                                        </SelectContent>
                                    </Select>
                                    <div className="rounded-md border">
                                        <Calendar 
                                            mode="single" 
                                            selected={date} 
                                            // onSelect={setDate}
                                            onSelect={handleDateSelect}
                                        />
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>
                        <Separator />
                        <div className='flex flex-col w-full gap-2 py-2'>
                            <Input 
                                placeholder='Naam' 
                                className='bg-white'
                                onChange = {(e) => setLastName(e.target.value)}
                            />
                            <Input 
                                placeholder='Voornaam' 
                                className='bg-white'
                                onChange = {(e) => setFirstName(e.target.value)}
                            />
                            <Input 
                                type='email' 
                                placeholder='Email' 
                                className='bg-white'
                                onChange = {(e) => setEmail(e.target.value)}
                            />
                            <Input 
                                type='tel' 
                                placeholder='Tel. Nummer' 
                                className='bg-white'
                                onChange = {(e) => setPhone(e.target.value)}
                            />
                        </div>
                        <Separator />
                    </div>
                    <div className='flex items-center'>
                        {clientSecret && <PaymentElement/>}

                        {errorMessage && <div>{errorMessage}</div>}
                    </div>
                    <Button
                        disabled={!stripe || loading || !date}
                        className='text-white w-full p-5 mt-10 bg-black rounded-md font-bold disabled:opacity-50 disabled:animate-pulse'
                    >
                        {
                            !loading ? 
                                // `Betaal €${subtotal.toFixed(2)}`
                                'Betalen' 
                            : 
                                'Processing'
                        }
                    </Button>
                </div>  
            </form>
        </div>
  )
}

export default CheckOut