
import React, { useState, useEffect } from 'react';
import Input from './Input';
import Button from './Button';
import firebase from '../firebase'

const Order = () => {
    const [client, setClient] = useState('');
    const [table, setTable] = useState('');
    const [pedidos, setPedidos] = useState([]);
    const [total, setTotal] = useState('');

    function onSubmit(e) {
        e.preventDefault()

        firebase
            .firestore()
            .collection('orders')
            .add({
                client,
                table,
                pedidos,
                total
            })
            .then(() => {
                setTable('')
                setClient('')
                setPedidos('')
                setTotal('')

            })
    }

    return (
        <div>
            <Input
                id='clientName'
                title='Nome do cliente'
                type='text'
                value={client}
                onChange={(e) => setClient(e.target.value)}
            />
            <Input
                id='clientTable'
                title='Número da Mesa'
                type='number'
                value={table}
                onChange={(e) => setTable(e.target.value)}
            />
            <Button
                class="itens"
                handleClick={onSubmit}
                children="Enviar Pedidos" />
        </div>
    );
}




// const AllMenu = () => {

//     const [existingProducts, setExistingProducts] = useState([])

//     useEffect(() => {
//         const unsubscribe = firebase
//             .firestore()
//             .collection('menu')
//             .onSnapshot((snapshot) => {
//                 const dbExistingProducts = snapshot.docs.map((doc) => ({
//                     id: doc.id,
//                     ...doc.data()
//                 }))
//                 setExistingProducts(dbExistingProducts)
//             })
//         return () => unsubscribe()
//     }, [])
//     return existingProducts
// }

// const Order = () => {
//     const existingProducts = AllMenu()
//     const [orderProducts, setOrderProducts] = useState([])

//     const addProduct = (item) => {
//         const itemIndex = orderProducts.findIndex(i => i.item.name === item.name);
//         console.log(itemIndex);

//         if (itemIndex === -1) {
//             const orderItem = { quantity: 1, item: item }
//             setOrderProducts(current => [...current, orderItem]);
//         } else {
//             const selectedProduct = orderProducts[itemIndex]
//             selectedProduct.quantity = selectedProduct.quantity + 1
//             console.log(orderProducts);
//             setOrderProducts([...orderProducts]);
//         }
//     };
//     return (
//         <>
//             <AddClientInfo />
//             <div className="print-order">
//                 {orderProducts.map(orderProduct => (
//                     <p>
//                         nome: {orderProduct.item.name} quantidade:{" "}
//                         {orderProduct.quantity} preco: {orderProduct.item.price}
//                         total: {orderProduct.quantity * orderProduct.item.price}
//                     </p>
//                 ))}
//                 <p>
//                     Valor Total do Pedido:{" "}
//                     <strong>
//                         {orderProducts.reduce((total, orderProducts) => total + orderProducts.item.price, 0)} reais
//               </strong>

//                 </p>
//                 <Button
//               key={i}
//               handleClick={() => addProduct(item)}
//               class="itens"
//               title={`${item.name} ${item.price} reais`}
//             />
//             </div>
//         </>
//     )

// }


export default Order;