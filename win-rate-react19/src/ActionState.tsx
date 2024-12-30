import { useActionState, useState } from "react";
"use server";
//cartの中身を定義
type CartItem = {
    id: number;
    name: string;
    exist: boolean;
}

//cartのState
type CartState = {
  cartSize: number;
  cart: CartItem[];
};

//cartStateの初期値
const initialStateExample:CartState ={
    cartSize:5,
    cart:[
        {
            id:1,
            name:"test1",
            exist:true,
        },
        {
            id:2,
            name: "test2",
            exist:false,
        },
        {
            id:3,
            name: "test3",
            exist:true,
        }
    ]
};

type AddToCartResponse = {
  success: boolean;
  cartSize?: number;
  message: string;
};

type AddToCartFormProps = {
    itemID: number;
    itemTitle: string;
    exist: boolean;
};
//加えるItem


async function addToCart(initialState: CartState,addItem: AddToCartFormProps,): Promise<AddToCartResponse> {
    const cartSize = initialState.cartSize

    if (addItem.itemID-1<=cartSize) {
        console.log("cartItem",initialState.cart)
    return {
        success: true,
        cartSize: initialState.cartSize + 1,
        message: "あと" + (initialState.cartSize - addItem.itemID) + "個まで追加可能",
    };
    } else {
    return {
        success: false,
        message: "Cart is full",
    };
    }
}

const addItemTest:AddToCartFormProps = { itemID: 4,itemTitle: "test4",exist:true};
