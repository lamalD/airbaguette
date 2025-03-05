'use client'

import { useEffect, useState } from 'react'
import { addDays, format, isAfter, isBefore } from "date-fns"
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

    const isDateSelectable = (date) => {
        // const today = new Date()
        startDate.setHours(23, 59, 0, 0)
        return !isBefore(date, startDate) && !isAfter(date, endDate)
    }

    const handleDateSelect = (selectedDate) => {
        if (isDateSelectable(selectedDate)) {
            setDate(selectedDate)
            setIsOpen(false)
        } else {
            console.log('Selected date is out of range')
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

    const handleSubmit = async (event) => {

        event.preventDefault()
        setLoading(true)
      
        if (!stripe || !elements) {
          return;
        }

        if (!stripe || !elements) {
            return;
          }
      
          const { error: submitError } = await elements.submit();
      
          if (submitError) {
            setErrorMessage(submitError.message);
            setLoading(false);
            return;
          }
      
          const { error } = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams: {
              return_url: `https://airbaguette.vercel.app/payment-success?amount=${subtotal}&fn=${firstName}&ln=${lastName}&em=${email}&pn=${phone}&dd=${date}&id=${cartItemList.documentId}`,
            },
            
          });
      
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
                                    <li key={item.id} className='flex flex-col md:flex-row items-center mb-2'>
                                        <div>
                                            <p className='font-bold'>{item.name}</p>
                                            <p className='text-gray-600'>Quantity: {item.quantity}</p>
                                            <p className='text-gray-600'>Amount: €{item.amount}</p>
                                        </div>
                                    </li>
                                )
                            )}
                        </ul>
                    }
                </div>
                <div className='p-4 flex-1 flex-col gap-4'>
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