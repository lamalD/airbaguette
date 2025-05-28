'use client'

import React, { useEffect, useState } from "react";
import GlobalApi from "../_utils/GlobalApi";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogOverlay,
} from "@/components/ui/dialog"
import { Plus, ShoppingBasket } from "lucide-react";
import ProductItemDetail from "./ProductItemDetail";

export default function PromoBoard() {

    const [promoArray, setPromoArray] = useState([])
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(null)
    const [selectedItem, setSelectedItem] = useState(null)

    const promoProducts =  async () => {
        const products = await GlobalApi.getProductsForPromo()
        console.log('promoProducts: ', products)

        setPromoArray(products)
    }

    const openDialog = (item, index) => {
      setSelectedItem(item)
      setSelectedIndex(index)
      // setIsDialogOpen(true)
    }

    const closeDialog = () => {
      // setIsDialogOpen(false)
      setSelectedItem(null)
      setSelectedIndex(null)
    }

    useEffect(() => {
        promoProducts()
    }, [])

  return (
    <div className="bg-black text-yellow-300 py-6 px-3 rounded-xl shadow-lg w-full max-w-5xl mx-auto mt-10">
      <div className="text-3xl font-bold flex items-center gap-2 mb-4">
        <span className="text-white">🛬</span> Arrivals
      </div>
      <div className="grid grid-cols-5 text-left text-white border-t border-b border-yellow-300">
        <div className="col-span-2 py-2 border-b border-yellow-300">PRODUCT</div>
        <div className="py-2 border-b border-yellow-300">CAT</div>
        <div className="py-2 border-b border-yellow-300">PRIJS</div>
        <div className="py-2 border-b border-yellow-300 text-center">STATUS</div>
      </div>
      {promoArray.map((item, idx) => (
        <div
          key={idx}
          className="grid grid-cols-5 items-center text-left border-b border-gray-800 py-3 hover:bg-gray-900 transition"
        >
          {/* <div className="text-yellow-200">12:00</div> */}
          <div className="col-span-2 text-white">{item.name}</div>
          <div className="text-yellow-400">{item.category[0].name}</div>
          <div className="text-white">€ {item.mrp}</div>
          <div className="flex items-center gap-3">
            <span className="text-green-400 uppercase tracking-wide">
              ARRIVED
            </span>
            <Dialog open={selectedIndex === idx} onOpenChange={(open) => { if (!open) closeDialog(); }}>
              <DialogTrigger asChild>
                  <div
                      className='ml-auto bg-yellow-300 hover:bg-yellow-400 hover:cursor-pointer text-black text-xs font-bold py-1 px-2 rounded'
                      onClick={() => openDialog(item, idx)}
                  >
                      Bekijk
                  </div>
              </DialogTrigger>
              <DialogContent>
                  <DialogHeader>
                      <DialogTitle>{selectedItem ? selectedItem.name : ''}</DialogTitle>
                      <DialogDescription>
                          {selectedItem && <ProductItemDetail product={selectedItem} onClose={closeDialog} />}
                      </DialogDescription>
                  </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      ))}
    </div>
  );
}
